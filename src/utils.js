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

  cachedNodeURL = getConfig(
    'NODE_URL',
    ETH_NODES[Math.floor(Math.random() * ETH_NODES.length)]
  );
  return cachedNodeURL;
}

export const TOKEN = {
  USDT: {
    addr: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    decimals: 6,
  },
  DAI: {
    addr: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
  },
  USDC: {
    addr: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    decimals: 6,
  }
}
