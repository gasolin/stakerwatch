function int(num) {
  return parseInt(num, 10)
}

export const GASSTATION = 'gasstation'
export const GASNOW = 'gasnow'
export const GASTRACKER = 'gastracker'
export const GASPRICEORACLE = 'gaspriceoracle'

export const GAS_ESTIMATOR_ETHEREUM = {
  [GASSTATION]: {
    name: 'Eth Gas Station',
    api: 'https://ethgasstation.info/api/ethgasAPI.json',
    processGasData: (json) => ({
      H: int(json.fast / 10),
      M: int(json.average / 10),
      L: int(json.safeLow / 10),
      source: 'EthGasStation',
    }),
  },
  [GASNOW]: {
    name: 'gasnow',
    api: 'https://www.gasnow.org/api/v3/gas/price?utm_source=:gaso',
    processGasData: (json) => ({
      H: int(json.data.fast / 10 ** 9),
      M: int(json.data.standard / 10 ** 9),
      L: int(json.data.slow / 10 ** 9),
      source: 'GasNow',
    }),
  },
  [GASTRACKER]: {
    name: 'Etherscan Gas Tracker',
    api: 'https://api.etherscan.io/api?module=gastracker&action=gasoracle',
    processGasData: (json) => ({
      H: json.result.FastGasPrice,
      M: json.result.ProposeGasPrice,
      L: json.result.SafeGasPrice,
      source: 'Etherscan',
    }),
  },
  [GASPRICEORACLE]: {
    name: 'Eth Gas Price Oracle',
    api: 'https://etherchain.org/api/gasPriceOracle',
    processGasData: (json) => ({
      H: int(json.fastest),
      M: int(json.standard),
      L: int(json.safeLow),
      source: 'Etherchain',
    }),
  },
}

export default {
  GAS_ESTIMATOR_ETHEREUM,
}
