import { PublicKey } from '@solana/web3.js';

export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
const LOG_10 = Math.log(10);

export const sleep = async (ms) => { await new Promise((r) => setTimeout(r, ms)); };

export const currencyFormatter = (number, ratio = 1, symbol = '$') => {
  if (Number.isNaN(number)) return `\u00A0${symbol} NaN`;
  const fromattedNumber = number * ratio;
  let fractionDigits = 2 - Math.round(Math.log(ratio) / LOG_10);
  fractionDigits = fractionDigits < 0 ? 0 : fractionDigits;
  const numberFormat = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  });
  const isSmall = fromattedNumber < 10 ** -fractionDigits;
  if (isSmall) {
    return `<${symbol}${10 ** -fractionDigits}`;
  }
  // eslint-disable-next-line no-useless-escape
  return `\u00A0${symbol}${numberFormat.format(fromattedNumber)}`;
};

const WINSTON_MULTIPLIER = 10 ** 12;

export const computeStorageFees = (bytes, costs) => {
  const nFiles = 2;
  const costInAr = (costs.arweaveTxnFee * nFiles + costs.oneByteCost * bytes) / WINSTON_MULTIPLIER;
  const arMultiplier = costs.arweave / costs.solana;
  const total = costInAr * arMultiplier * 1.1;
  return total;
};
