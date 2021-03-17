'use strict';

export const fetchGas = (fetch, estimator, callback) =>
  fetch(estimator.api).then(response => response.json()).then(json => {
    const data = estimator.processGasData(json);
    callback && callback(data);
  });

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
