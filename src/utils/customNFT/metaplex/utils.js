import { PublicKey } from '@solana/web3.js';

export const findProgramAddress = async (
  seeds,
  programId,
) => {
  const key = `pda-${
    seeds.reduce((agg, item) => agg + item.toString('hex'), '')
  }${programId.toString()}`;
  const cached = localStorage.getItem(key);
  if (cached) {
    const value = JSON.parse(cached);

    return [new PublicKey(value.key), parseInt(value.nonce, 10)];
  }

  const result = await PublicKey.findProgramAddress(seeds, programId);

  // localStorage.setItem(
  //   key,
  //   JSON.stringify({
  //     key: result[0].toBase58(),
  //     nonce: result[1],
  //   }),
  // );

  return result;
};

export const STABLE_COINS = new Set(['USDC', 'wUSDC', 'USDT']);
