export const CHAIN_ETHEREUM = 'eth'
export const CHAIN_BSC = 'bsc'
export const CHAIN_XDAI = 'xdai'
export const CHAIN_MATIC = 'matic'
export const CHAIN_HECO = 'heco'
export const L2_ZKSYNC = 'zksync'
export const L2_OPTIMISM = 'optimism'

export const DEFAULT_CHAIN = CHAIN_ETHEREUM

export const CHAIN_ID_MAP = {
  [CHAIN_ETHEREUM]: 1,
  [CHAIN_BSC]: 56,
  [CHAIN_XDAI]: 100,
  [CHAIN_HECO]: 128,
  [CHAIN_MATIC]: 137,
}

export default {
  CHAIN_ETHEREUM,
  CHAIN_BSC,
  CHAIN_XDAI,
  CHAIN_MATIC,
  CHAIN_HECO,
  L2_ZKSYNC,
  L2_OPTIMISM,
  DEFAULT_CHAIN,
  CHAIN_ID_MAP,
}
