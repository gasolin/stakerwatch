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

export default {
  ETH_NODES,
  XDAI_NODES,
  NODE_MAP,
}
