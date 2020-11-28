/**
 * get SAIHUBOT_[env] environment variable and
 * return as string or array.
 */
export const getConfig = (env, defaultValue) => {
  const param = process && process.env[`SAIHUBOT_${env}`];
  const data = param && param.indexOf(',') > 0
    ? param.split(',').map(item => item.trim())
    : param;
  return data
    ? data
    : defaultValue;
}

/** get random item from an array. */
export const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// free nodes without API keys from https://ethereumnodes.com/
const ETH_NODES = [
  'https://api.mycryptoapi.com/eth', // MyCrypto
  'https://web3.1inch.exchange/', // 1inch
  'https://cloudflare-eth.com/', // Cloudflare
  'https://mainnet-nethermind.blockscout.com/', // Blockscout
  'https://nodes.mewapi.io/rpc/eth', // MyEtherWallet
  'https://mainnet.eth.cloud.ava.do/', // AVADO
];

let cachedNodeURL = '';

/**
 * Random pick a ethereum node.
 *
 * can set yours via set SAIHUBOT_NODE_URL environment variable.
 */
export const getNodeURL = () => {
  if (cachedNodeURL) return cachedNodeURL;
  cachedNodeURL = getConfig('NODE_URL', getRandomItem(ETH_NODES));
  return cachedNodeURL;
}
