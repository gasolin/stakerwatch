'use strict';

function int(num) {
  return parseInt(num, 10);
}

export const fetchGas = (fetch, estimator, callback) =>
  fetch(estimator.api).then(response => response.json()).then(json => {
    const data = estimator.processGasData(json);
    callback && callback(data);
  });

export const GAS_ESTIMATOR = {
  GASSTATION: {
    api: 'https://ethgasstation.info/api/ethgasAPI.json',
    processGasData: json => ({
      H: int(json.fast / 10),
      M: int(json.average / 10),
      L: int(json.safeLow / 10),
      source: 'Eth Gas Station',
    }),
  },
  GASNOW: {
    api: 'https://www.gasnow.org/api/v3/gas/price?utm_source=:gaso',
    processGasData: json => ({
      H: int(json.data.fast / 10**9),
      M: int(json.data.standard / 10**9),
      L: int(json.data.slow / 10**9),
      source: 'gasnow',
    }),
  },
  GASTRACKER: {
    api: 'https://api.etherscan.io/api?module=gastracker&action=gasoracle',
    processGasData: json => ({
      H: json.result.FastGasPrice,
      M: json.result.ProposeGasPrice,
      L: json.result.SafeGasPrice,
      source: 'Etherscan',
    }),
  },
  GASPRICEORACLE: {
    api: 'https://etherchain.org/api/gasPriceOracle',
    processGasData: json => ({
      H: int(json.fastest),
      M: int(json.standard),
      L: int(json.safeLow),
      source: 'Etherchain',
    }),
  }
}

// Addon
/**
 * fetch Eth estimate Gas Price
 */
export const addonFetchGas = {
  name: 'fetchGas',
  requirements: {
    addons: ['fetch'],
  },
  action: (robot) => (estimator, callback) =>
    fetchGas(robot.addons.fetch, estimator, callback),
};

const addons = [addonFetchGas];

export {addons};
