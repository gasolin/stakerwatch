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

// https://www.xdaichain.com/for-developers/developer-resources#json-rpc-endpoints
const XDAI_NODES = [
  'https://rpc.xdaichain.com/',
  'https://xdai.poanetwork.dev/',
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

let cachedXdaiNodeUrl = '';

/**
 * Random pick a xdai node.
 *
 * can set yours via set SAIHUBOT_XDAI_NODE_URL environment variable.
 */
export const getXdaiNodeURL = () => {
  if (cachedXdaiNodeUrl) return cachedXdaiNodeUrl;
  cachedXdaiNodeUrl = getConfig('XDAI_NODE_URL', getRandomItem(XDAI_NODES));
  return cachedXdaiNodeUrl;
}

const baseFetchOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
};

export const ethFetch = (fetch, body) =>
  fetch(getNodeURL(), {
    ...baseFetchOptions,
    body,
  }).then(response => response.json());

export const xdaiFetch = (fetch, body) =>
  fetch(getXdaiNodeURL(), {
    ...baseFetchOptions,
    body,
  }).then(response => response.json());
