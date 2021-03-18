import {
  CHAIN_ETHEREUM,
  CHAIN_BSC,
  CHAIN_XDAI,
  CHAIN_MATIC,
  L2_ZKSYNC,
  L2_OPTIMISM,
} from './chains'

export const CHAIN_ETHEREUM_EXPLORER_ETHERSCAN = 'etherscan'
export const CHAIN_ETHEREUM_EXPLORER_BLOXY = 'bloxy'
export const CHAIN_ETHEREUM_EXPLORER_BLOCKCHAIR = 'blockchair'
export const CHAIN_ETHEREUM_EXPLORER_BITQUERY = 'bitquery'
export const CHAIN_ETHEREUM_EXPLORER_ETHERCHAIN = 'etherchain'
export const CHAIN_ETHEREUM_EXPLORER_TOKENVIEW = 'tokenview'
export const CHAIN_ETHEREUM_EXPLORER_ETHPLORER = 'ethplorer'
export const CHAIN_ETHEREUM_EXPLORER_ANYBLOCK = 'anyblock'

export const CHAIN_BSC_EXPLORER_BSCSCAN = 'bscscan'
export const CHAIN_BSC_EXPLORER_BITQUERY = 'bitquery'

export const CHAIN_XDAI_EXPLORER_BLOCKSCOUT = 'blockscout'

export const CHAIN_MATIC_EXPLORER_BLOCKSCOUT = 'maticvigil'

export const L2_ZKSYNC_EXPLORER = 'Zksync'

export const L2_OPTIMISM_EXPLORER = 'Optimism'

export const EXPLORER_ETHEREUM = {
  [CHAIN_ETHEREUM_EXPLORER_ETHERSCAN]: {
    address: (target) => `https://www.etherscan.io/address/${target}`,
    name: 'Etherscan',
    tx: (target) => `https://www.etherscan.io/tx/${target}`,
  },
  [CHAIN_ETHEREUM_EXPLORER_BLOXY]: {
    address: (target) => `https://bloxy.info/address/${target}`,
    name: 'Bloxy',
    tx: (target) => `https://bloxy.info/address/${target}`,
  },
  [CHAIN_ETHEREUM_EXPLORER_BLOCKCHAIR]: {
    address: (target) => `https://blockchair.com/ethereum/address/${target}`,
    name: 'BlockChair',
    tx: (target) => `https://blockchair.com/ethereum/transaction/${target}`,
  },
  [CHAIN_ETHEREUM_EXPLORER_BITQUERY]: {
    address: (target) =>
      `https://explorer.bitquery.io/ethereum/address/${target}`,
    name: 'BlockQuery',
    tx: (target) => `https://explorer.bitquery.io/ethereum/tx/${target}`,
  },
  [CHAIN_ETHEREUM_EXPLORER_ETHERCHAIN]: {
    address: (target) => `https://etherchain.org/account/${target}`,
    name: 'EtherChain',
    tx: (target) => `https://etherchain.org/tx/${target}`,
  },
  [CHAIN_ETHEREUM_EXPLORER_TOKENVIEW]: {
    address: (target) => `https://eth.tokenview.com/en/address/${target}`,
    name: 'TokenView',
    tx: (target) => `https://eth.tokenview.com/en/tx/${target}`,
  },
  [CHAIN_ETHEREUM_EXPLORER_ETHPLORER]: {
    address: (target) => `https://ethplorer.io/address/${target}`,
    name: 'Ethplorer',
    tx: (target) => `https://ethplorer.io/tx/${target}`,
  },
  [CHAIN_ETHEREUM_EXPLORER_ANYBLOCK]: {
    address: (target) =>
      `https://explorer.anyblock.tools/ethereum/ethereum/mainnet/address/${target}`,
    name: 'AnyBlock',
    tx: (target) =>
      `https://explorer.anyblock.tools/ethereum/ethereum/mainnet/transaction/${target}`,
  },
}

export const EXPLORER_BSC = {
  [CHAIN_BSC_EXPLORER_BSCSCAN]: {
    address: (target) => `https://bscscan.com/address/${target}`,
    name: 'BSCScan',
    tx: (target) => `https://bscscan.com/tx/${target}`,
  },
  [CHAIN_BSC_EXPLORER_BITQUERY]: {
    address: (target) => `https://explorer.bitquery.io/bsc/address/${target}`,
    name: 'BlockQuery',
    tx: (target) => `https://explorer.bitquery.io/bsc/tx/${target}`,
  },
}

export const EXPLORER_XDAI = {
  [CHAIN_XDAI_EXPLORER_BLOCKSCOUT]: {
    address: (target) =>
      `https://blockscout.com/poa/xdai/address/${target}/tokens`,
    name: 'BlockScout',
    tx: (target) =>
      `https://blockscout.com/poa/xdai/tx/${target}/internal-transactions`,
  },
}

export const EXPLORER_MATIC = {
  [CHAIN_MATIC_EXPLORER_BLOCKSCOUT]: {
    address: (target) =>
      `https://explorer-mainnet.maticvigil.com/address/${target}`,
    name: 'Matic Explorer',
    tx: (target) => `https://explorer-mainnet.maticvigil.com/tx/${target}`,
  },
}

export const EXPLORER_L2_ZKSYNC = {
  [L2_ZKSYNC_EXPLORER]: {
    address: (target) => `https://zkscan.io/explorer/accounts/${target}`,
    name: 'ZkSync Explorer',
    tx: (target) => `https://zkscan.io/explorer/transactions/${target}`,
  },
}

export const EXPLORER_L2_OPTIMISM = {
  [L2_OPTIMISM_EXPLORER]: {
    address: (target) => `https://mainnet-l2-explorer.surge.sh/account/${target}`,
    name: 'Optimistic Ethereum Explorer',
    tx: (target) => `https://mainnet-l2-explorer.surge.sh/tx/${target}`,
  }
}

export const EXPLORER_MAP = {
  [CHAIN_ETHEREUM]: EXPLORER_ETHEREUM,
  [CHAIN_BSC]: EXPLORER_BSC,
  [CHAIN_XDAI]: EXPLORER_XDAI,
  [CHAIN_MATIC]: EXPLORER_MATIC,
  [L2_ZKSYNC]: EXPLORER_L2_ZKSYNC,
  [L2_OPTIMISM]: EXPLORER_L2_OPTIMISM,
}

export default {
  EXPLORER_ETHEREUM,
  EXPLORER_BSC,
  EXPLORER_XDAI,
  EXPLORER_MATIC,
  EXPLORER_L2_ZKSYNC,
  EXPLORER_L2_OPTIMISM,
  EXPLORER_MAP,
}
