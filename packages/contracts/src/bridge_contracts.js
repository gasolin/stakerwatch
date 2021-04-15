import { CHAIN_ETHEREUM } from 'staker-freenodes'

const TYPE_LAYER2 = 'layer2'
// const TYPE_SIDECHAIN = 'sidechain'

export const ETH_BRIDGE_CONTRACTS = {
  "Aztec": {
    "bridges": [
      {
        "address": "0x737901bea3eeb88459df9ef1BE8fF3Ae1B42A2ba",
        "deployed_at_block": 11967192,
        "tokens": ["ETH"]
      }
    ],
    "website": "https://zk.money",
    "type": TYPE_LAYER2
  },
  "dydx": {
    "bridges": [
      {
        "address": "0xD54f502e184B6B739d7D27a6410a67dc462D69c8",
        "deployed_at_block": 11834295,
        "tokens": ["USDC"]
      }
    ],
    "website": "https://dydx.exchange/",
    "type": TYPE_LAYER2
  },
  "DeversiFi": {
    "bridges": [
      {
        "address": "0x5d22045DAcEAB03B158031eCB7D9d06Fad24609b",
        "deployed_at_block": 10141009,
        "tokens": [
          "AAVE",
          "ALN",
          "ANT",
          "BAL",
          "BAT",
          "COMP",
          "CRV",
          "cUSDT",
          "DAI",
          "DUSK",
          "ETH",
          "GLM",
          "HEZ",
          "LDO",
          "LINK",
          "LRC",
          "MKR",
          "MLN",
          "NEC",
          "OMG",
          "PNK",
          "SNX",
          "SUSHI",
          "UNI",
          "USDT",
          "USDC",
          "WBTC",
          "YFI",
          "ZRX"
        ]
      }
    ],
    "website": "https://www.deversifi.com/",
    "type": TYPE_LAYER2
  },
  "Fuel": {
    "bridges": [
      {
        "address": "0x6880f6Fd960D1581C2730a451A22EED1081cfD72",
        "deployed_at_block": 11787727,
        "tokens": ["DAI", "USDT", "USDC"]
      }
    ],
    "website": "https://fuel.sh/",
    "type": TYPE_LAYER2
  },
  "ImmutableX": {
    "bridges": [
      {
        "address": "0x5FDCCA53617f4d2b9134B29090C87D01058e27e9",
        "deployed_at_block": 12011518,
        "tokens": ["ETH"]
      }
    ],
    "website": "https://www.immutable.com/",
    "type": TYPE_LAYER2
  },
  "Loopring": {
    "bridges": [
      {
        "address": "0x674bdf20A0F284D710BC40872100128e2d66Bd3f",
        "deployed_at_block": 11149779,
        "tokens": ["ETH", "LRC", "USDT", "USDC", "WBTC", "DAI", "LINK", "MKR"]
      }
    ],
    "website": "https://loopring.org",
    "type": TYPE_LAYER2
  },
  "Optimism": {
    "bridges": [
      {
        "address": "0x045e507925d2e05D114534D0810a1abD94aca8d6",
        "deployed_at_block": 11656238,
        "tokens": ["SNX"]
      }
    ],
    "website": "https://optimism.io/",
    "type": TYPE_LAYER2
  },
  "ZKSwap": {
    "bridges": [
      {
        "address": "0x8eca806aecc86ce90da803b080ca4e3a9b8097ad",
        "deployed_at_block": 11841962,
        "tokens": [
          "1INCH",
          "AAVE",
          "BADGER",
          "BBTC",
          "BNB",
          "BUSD",
          "CREAM",
          "DAI",
          "DODO",
          "ETH",
          "FEI",
          "LINK",
          "LON",
          "LRC",
          "MASK",
          "MKR",
          "REN",
          "RUNE",
          "SNX",
          "SUSHI",
          "TRIBE",
          "UNI",
          "USDC",
          "USDT",
          "WBTC",
          "WQTUM",
          "XDEX",
          "YFI",
        ]
      }
    ],
    "website": "https://zkswap.info/en",
    "type": TYPE_LAYER2
  },
  "zkSync": {
    "bridges": [
      {
        "address": "0xaBEA9132b05A70803a4E85094fD0e1800777fBEF",
        "deployed_at_block": 10269890,
        "tokens": ["ETH", "DAI", "USDC", "USDT", "GLM", "WBTC"]
      }
    ],
    "website": "https://zksync.io/",
    "type": TYPE_LAYER2
  }
}

export const BRIDGE_CONTRACTS = {
  [CHAIN_ETHEREUM]: ETH_BRIDGE_CONTRACTS,
}
