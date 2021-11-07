import { MintLayout, Token } from '@solana/spl-token';
import { PublicKey, SystemProgram, TransactionInstruction } from '@solana/web3.js';
import crypto from 'crypto';
import { toast } from 'react-toastify';
import { sleep } from '.';
import { createAssociatedTokenAccountInstruction, createMint } from './metaplex/accounts';
import { getAssetCostToStore } from './metaplex/assets';
import { sendTransactionWithRetry } from './metaplex/connectionHelpers';
import { AR_SOL_HOLDER_ID, programIds } from './metaplex/ids';
import {
  createMasterEdition, createMetadata, Data, updateMetadata
} from './metaplex/metadata';
import { findProgramAddress } from './metaplex/utils';

const RESERVED_TXN_MANIFEST = 'manifest.json';

export default async function mintNFT(connection, wallet, files, metadata) {
  // Check the wallet eligibility
  const walletBalance = await connection.getBalance(new PublicKey(wallet.publicKey.toString()));
  if (walletBalance < 50000000) {
    throw new Error('You need at least 0.05 SOL in your wallet');
  }

  const metadataContent = {
    name: metadata.name,
    symbol: metadata.symbol,
    description: metadata.description,
    seller_fee_basis_points: metadata.sellerFeeBasisPoints,
    image: metadata.image,
    animation_url: metadata.animation_url,
    external_url: metadata.external_url,
    attributes:metadata.attributes,
    properties: {
      ...metadata.properties,
      creators: metadata.creators?.map((creator) => ({
        address: creator.address.toBase58(),
        share: creator.share,
      })),
    },
  };

  const realFiles = [
    ...files,
    new File([JSON.stringify(metadataContent)], 'metadata.json'),
  ];

  // eslint-disable-next-line no-use-before-define
  const { instructions: pushInstructions, signers: pushSigners } = await prepPayForFilesTxn(wallet, realFiles, metadata);

  const TOKEN_PROGRAM_ID = programIds().token;
  const mintRent = await connection.getMinimumBalanceForRentExemption(
    MintLayout.span,
  );

  const payerPublicKey = new PublicKey(wallet.publicKey.toString());
  const instructions = [...pushInstructions];
  const signers = [...pushSigners];

  const mintKey = createMint(
    instructions,
    wallet.publicKey,
    mintRent,
    0,
    // Some weird bug with phantom where it's public key doesnt mesh with data encode wellff
    payerPublicKey,
    payerPublicKey,
    signers,
  );

  const recipientKey = (
    await findProgramAddress(
      [
        wallet.publicKey.toBuffer(),
        programIds().token.toBuffer(),
        mintKey.toBuffer(),
      ],
      programIds().associatedToken,
    )
  )[0];
  createAssociatedTokenAccountInstruction(
    instructions,
    recipientKey,
    wallet.publicKey,
    wallet.publicKey,
    mintKey,
  );

  const metadataAccount = await createMetadata(
    new Data({
      symbol: metadata.symbol,
      name: metadata.name,
      uri: ' '.repeat(64), // size of url for arweave
      sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
      creators: metadata.creators,
    }),
    payerPublicKey,
    mintKey,
    payerPublicKey,
    instructions,
    wallet.publicKey,
  );

  toast.success("Waiting for signature...")

  const { txid } = await sendTransactionWithRetry(
    connection,
    wallet,
    instructions,
    signers,
    'singleGossip',
    false,
    undefined,
    () => {
      toast.success("Creating token...")
    },
  );

  try {
    await connection.confirmTransaction(txid, 'max');
  } catch {
    // ignore
  }

  // Force wait for max confirmations
  // await connection.confirmTransaction(txid, 'max');
  await connection.getParsedConfirmedTransaction(txid, 'confirmed');

  // this means we're done getting AR txn setup. Ship it off to ARWeave!
  const data = new FormData();

  const tags = realFiles.reduce(
    (acc, f) => {
      acc[f.name] = [{ name: 'mint', value: mintKey.toBase58() }];
      return acc;
    },
    {},
  );
  data.append('tags', JSON.stringify(tags));
  data.append('transaction', txid);
  realFiles.map((f) => data.append('file[]', f));

  toast.success("Uploading file...")

  const result = await (
    await fetch(
      "https://us-central1-principal-lane-200702.cloudfunctions.net/uploadFile2",
      {
        method: 'POST',
        body: data,
      },
    )
  ).json();

  const metadataFile = result.messages?.find(
    (m) => m.filename === RESERVED_TXN_MANIFEST,
  );

  if (metadataFile?.transactionId && wallet.publicKey) {
    const updateInstructions = [];
    const updateSigners = [];

    // TODO: connect to testnet arweave
    const arweaveLink = `https://arweave.net/${metadataFile.transactionId}`;
    await updateMetadata(
      new Data({
        name: metadata.name,
        symbol: metadata.symbol,
        uri: arweaveLink,
        creators: metadata.creators,
        sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
      }),
      undefined,
      undefined,
      mintKey,
      payerPublicKey,
      updateInstructions,
      metadataAccount,
    );

    updateInstructions.push(
      Token.createMintToInstruction(
        TOKEN_PROGRAM_ID,
        mintKey,
        recipientKey,
        payerPublicKey,
        [],
        1,
      ),
    );

    // // In this instruction, mint authority will be removed from the main mint, while
    // // minting authority will be maintained for the Printing mint (which we want.)
    await createMasterEdition(
      undefined,
      mintKey,
      payerPublicKey,
      payerPublicKey,
      payerPublicKey,
      updateInstructions,
    );

    toast.success('Waiting for signature...')

    await sendTransactionWithRetry(
      connection,
      wallet,
      updateInstructions,
      updateSigners,
      'singleGossip',
      false,
      undefined,
      () => {
        toast.success('Updating metadata...');
      },
    );

    await sleep(2000);

    toast.success("NFT created!")
  }

  return { metadataAccount, mintKey, nftAddress: recipientKey.toString() };
}

export const prepPayForFilesTxn = async (wallet, files) => {
  const { memo } = programIds();

  const instructions = [];
  const signers = [];

  if (wallet.publicKey) {
    instructions.push(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: AR_SOL_HOLDER_ID,
        lamports: await getAssetCostToStore(files),
      }),
    );
  }

  for (let i = 0; i < files.length; i += 1) {
    const hashSum = crypto.createHash('sha256');
    // eslint-disable-next-line no-await-in-loop
    hashSum.update(await files[i].text());
    const hex = hashSum.digest('hex');
    instructions.push(
      new TransactionInstruction({
        keys: [],
        programId: memo,
        data: Buffer.from(hex),
      }),
    );
  }

  return {
    instructions,
    signers,
  };
};
