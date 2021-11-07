export const LAMPORT_MULTIPLIER = 10 ** 9;
const WINSTON_MULTIPLIER = 10 ** 12;

export async function getAssetCostToStore(files) {
  // eslint-disable-next-line no-param-reassign
  const totalBytes = files.reduce((sum, f) => (sum += f.size), 0);
  const txnFeeInWinstons = parseInt(
    await (await fetch('https://arweave.net/price/0')).text(), 10,
  );
  const byteCostInWinstons = parseInt(
    await (
      await fetch(`https://arweave.net/price/${totalBytes.toString()}`)
    ).text(), 10,
  );
  const totalArCost = (txnFeeInWinstons * files.length + byteCostInWinstons) / WINSTON_MULTIPLIER;

  let conversionRates = JSON.parse(
    localStorage.getItem('conversionRates') || '{}',
  );

  if (
    !conversionRates
    || !conversionRates.expiry
    || conversionRates.expiry < Date.now()
  ) {
    conversionRates = {
      value: JSON.parse(
        await (
          await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=solana,arweave&vs_currencies=usd',
          )
        ).text(),
      ),
      expiry: Date.now() + 5 * 60 * 1000,
    };
  }

  // To figure out how many lamports are required, multiply ar byte cost by this number
  const arMultiplier = conversionRates.value.arweave.usd / conversionRates.value.solana.usd;
  // We also always make a manifest file, which, though tiny, needs payment.
  return LAMPORT_MULTIPLIER * totalArCost * arMultiplier * 1.1;
}
