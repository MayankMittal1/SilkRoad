import {
  Connection,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction,
  PublicKey,
  SystemProgram,
  Keypair,
} from "@solana/web3.js";

import * as borsh from 'borsh';


async function establishConnection():Promise<Connection> {
  const rpcUrl = "http://api.devnet.solana.com";
  return new Connection(rpcUrl, "confirmed");
}

export class SaleAccount {
  owner = ' '.repeat(44)
  nft_address = ' '.repeat(44)
  price = ' '.repeat(10)
  is_available = ' '
  constructor(fields: { owner: string, nft_address: string, price: string, is_available: string} | undefined = undefined) {
    if (fields) {
      this.owner = fields.owner;
      this.nft_address = fields.nft_address;
      this.price = fields.price;
      this.is_available = fields.is_available;
    }
  }
}


const SaleSchema = new Map([
  [SaleAccount, { kind: 'struct', fields: [['owner', 'string'], ['nft_address', 'string'], ['price', 'string'], ['is_available', 'string']] }],
]);

export const Sale_Size = borsh.serialize(
  SaleSchema,
  new SaleAccount(),
).length;
  
export const program_id = new PublicKey("J21V5E6uFj1dKUK3f3JQbmEdheuAUmoL56xD9BWzFTHn");
  
export async function createSale(nft_address: any, initializerAccount: PublicKey, money:number, connection:any, sendTransaction:any) {
  const initializerAccountKey =initializerAccount;
  const SaleAccountPubkey = await PublicKey.createWithSeed(
    initializerAccountKey,
    nft_address.slice(0,10),
    program_id
  );
  
  const lamports = await connection.getMinimumBalanceForRentExemption(
    Sale_Size
  );
  let price=money.toString()+' '.repeat(10-money.toString().length)
  const instruction = SystemProgram.createAccountWithSeed({
    fromPubkey: initializerAccountKey,
    basePubkey: initializerAccountKey,
    seed: nft_address.slice(0,10),
    newAccountPubkey: SaleAccountPubkey,
    lamports: lamports,
    space: Sale_Size,
    programId: program_id,
  });

  const transaction = new Transaction().add(instruction);
  const signature = await sendTransaction(transaction, connection);
  console.log('created nft account',SaleAccountPubkey.toBase58());
  await connection.confirmTransaction(signature, 'processed');
  
  const initAccount = new TransactionInstruction({
    programId: program_id,
    keys: [
      { pubkey: SaleAccountPubkey, isSigner: false, isWritable: true },
      { pubkey: initializerAccountKey, isSigner: true, isWritable: false },
      { pubkey: new PublicKey(nft_address), isSigner: false, isWritable: false },
    ],
    data: Buffer.from(
      Uint8Array.of(0, ...Array.from(new TextEncoder().encode(price)))
    ),
  });

  const transaction2 = new Transaction().add(initAccount);
  const signature2 = await sendTransaction(transaction2, connection);
  await connection.confirmTransaction(signature2, 'processed');

  return SaleAccountPubkey.toBase58();
}

export async function saleHappened(nft_address: string, initializerAccount: string) {

  const connection = await establishConnection();
  const initializerAccountKey :PublicKey = new PublicKey(initializerAccount)
  const SaleAccountPubkey = await PublicKey.createWithSeed(
    initializerAccountKey,
    nft_address.slice(0,10),
    program_id
  );

  const accountInfo = await connection.getAccountInfo(SaleAccountPubkey);
  if (accountInfo === null) {
    throw 'Error: cannot find the account';
  }
  else {
    const initAccount = new TransactionInstruction({
      programId: program_id,
      keys: [
        { pubkey: SaleAccountPubkey, isSigner: false, isWritable: true },
        { pubkey: initializerAccountKey, isSigner: true, isWritable: false },
      ],
      data: Buffer.from(
        Uint8Array.of(1)
      ),
    });

    const transaction2 = new Transaction().add(initAccount);

    // await sendAndConfirmTransaction(connection, transaction2, [
    //   initializerAccount,
    // ]);

    return SaleAccountPubkey.toBase58()

  }
}

export async function fetch(key: string) {
    const connection = await establishConnection();
    var salepubkey = new PublicKey(key);
    const accountInfo = await connection.getAccountInfo(salepubkey);
    if (accountInfo === null) {
      throw Error
    }
    const Sale = borsh.deserialize(
      SaleSchema,
      SaleAccount,
      accountInfo.data
    );
    return Sale
  }

export async function fetchall() {
    const connection = await establishConnection();
    let abc= await connection.getProgramAccounts(program_id)
    return abc
  }
