import {
  CHAIN_ETHEREUM,
  CHAIN_XDAI,
  CHAIN_BSC,
  CHAIN_MATIC,
  CHAIN_HECO,
  L2_ZKSYNC,
  L2_OPTIMISM,
} from './chains'

// free nodes without API keys from https://ethereumnodes.com/
export const ETH_NODES = [
  'https://api.mycryptoapi.com/eth', // MyCrypto
  'https://cloudflare-eth.com/', // Cloudflare
  'https://mainnet-nethermind.blockscout.com/', // Blockscout
  'https://mainnet.eth.cloud.ava.do/', // AVADO
  'https://eth-mainnet.zerion.io/',
  'https://main-light.eth.linkpool.io',
]

// https://www.xdaichain.com/for-developers/developer-resources#json-rpc-endpoints
export const XDAI_NODES = [
  'https://rpc.xdaichain.com/',
  'https://xdai.poanetwork.dev/',
]

// https://docs.binance.org/smart-chain/developer/rpc.html
export const BSC_NODES = [
  'https://bsc-dataseed.binance.org/',
  'https://bsc-dataseed1.binance.org',
  'https://bsc-dataseed2.binance.org',
  'https://bsc-dataseed3.binance.org',
  'https://bsc-dataseed4.binance.org',
  'https://bsc-dataseed1.defibit.io',
  'https://bsc-dataseed2.defibit.io',
  'https://bsc-dataseed3.defibit.io',
  'https://bsc-dataseed4.defibit.io',
  'https://bsc-dataseed1.ninicoin.io',
  'https://bsc-dataseed2.ninicoin.io',
  'https://bsc-dataseed3.ninicoin.io',
  'https://bsc-dataseed4.ninicoin.io',
]

export const MATIC_NODES = [
  'https://rpc-mainnet.maticvigil.com/',
  'https://rpc-mainnet.matic.network',
]

export const HECO_NODES = [
  'https://http-mainnet.hecochain.com',
]

export const ZKSYNC_NODES = [
  'https://api.zksync.io/jsrpc',
]

export const OPTIMISM_NODES = [
  'https://mainnet.optimism.io',
]

export const NODE_MAP = {
  [CHAIN_ETHEREUM]: ETH_NODES,
  [CHAIN_XDAI]: XDAI_NODES,
  [CHAIN_BSC]: BSC_NODES,
  [CHAIN_MATIC]: MATIC_NODES,
  [CHAIN_HECO]: HECO_NODES,
  [L2_ZKSYNC]: ZKSYNC_NODES,
  [L2_OPTIMISM]: OPTIMISM_NODES,
}

/** get random item from an array. */
export const getRandomItem = (arr, defaultItem = '') => {
  if (arr.length === 1) {
    return arr[0]
  }
  return Array.isArray(arr) && arr.length > 0
    ? arr[Math.floor(Math.random() * arr.length)]
    : defaultItem
}

let cachedNodeURL = ''

/**
 * Random pick a ethereum node.
 *
 * can set yours via set SAIHUBOT_NODE_URL environment variable.
 * @param {boolean} cache cached the returned node selection in a session (default false)
 */
export const getNodeURL = (chainId = CHAIN_ETHEREUM, cache = false) => {
  if (cache && cachedNodeURL) return cachedNodeURL
  const nodes = NODE_MAP[chainId]
  if (!nodes) return ''
  cachedNodeURL = getRandomItem(nodes, nodes[0])
  return cachedNodeURL
}

export default {
  ETH_NODES,
  XDAI_NODES,
  BSC_NODES,
  MATIC_NODES,
  HECO_NODES,
  ZKSYNC_NODES,
  OPTIMISM_NODES,
  NODE_MAP,
  getNodeURL,
  getRandomItem,
}
