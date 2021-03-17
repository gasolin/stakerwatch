import { CHAIN_ETHEREUM, CHAIN_XDAI} from 'constants'

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

export const NODE_MAP = {
  [CHAIN_ETHEREUM]: ETH_NODES,
  [CHAIN_XDAI]: XDAI_NODES,
}

/** get random item from an array. */
export const getRandomItem = (arr, defaultItem = '') =>
  arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : defaultItem

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
  NODE_MAP,
  getNodeURL,
  getRandomItem,
}
