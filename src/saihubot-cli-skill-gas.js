import React from 'React';
import {Text} from 'ink';
import {t} from 'saihubot-cli-adapter/dist/i18n';

function int(num) {
  return parseInt(num, 10);
}

// ==== GAS ===

// Addon
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

const i18nGas = {
  'en': {
    fetching: 'Fetching gas...',
    gasfee: 'Current gas fee is H:{{H}} M:{{M}} L:{{L}} gwei (report by {{source}})',
    random: 'Random',
  },
  'zh_TW': {
    fetching: '取得 gas 費用...',
    gasfee: '目前的 gas 費用 H:{{H}} M:{{M}} L:{{L}} gwei (由 {{source}} 提供)',
    random: '隨機',
  },
  props: ['H', 'M', 'L', 'source']
}

/**
 * pick gas estimator from the list
 */
export const skillGasEstimator = {
  name: 'gas',
  help: '🔎gas - Pick a gas estimator from the list',
  requirements: {
    addons: ['confirm']
  },
  rule: /^gas$/i,
  action: function(robot, msg) {
    robot.addons.confirm(t('pick', {i18n: i18nGas}), [
      {
        title: t('random', {i18n: i18nGas}),
        id: 'random',
        rule: /^random/i,
        action: () => robot.ask(`${getRandomItem([
          'gasfee',
          'gasnow',
          'gasstation',
          'gastracker',
          'gaspriceoracle',
        ])}`),
      },
      {
        title: 'Gas Fee',
        id: 'fee',
        rule: /^fee/i,
        action: () => robot.ask(`gasfee`),
      },
      {
        title: 'Gas Now',
        id: 'now',
        rule: /^now/i,
        action: () => robot.ask(`gasnow`),
      },
      {
        title: 'Gas Price Oracle',
        id: 'oracle',
        rule: /^oracle/i,
        action: () => robot.ask(`gaspriceoracle`),
      },
      {
        title: 'GasStation',
        id: 'station',
        rule: /^station/i,
        action: () => robot.ask(`gasstation`),
      },
      {
        title: 'Gas Tracker',
        id: 'tracker',
        rule: /^tracker/i,
        action: () => robot.ask(`gastracker`),
      },
    ]);
  },
}

/**
 * Show current ethereum Gas fee via Etherscan Gas Tracker.
 * https://ethgasstation.info/https://etherscan.io/gastracker
 */
export const skillGasTracker = {
  name: 'gastracker',
  help: '🛢 gastracker|tracker - Show current gas fee via Etherscan Gas Tracker',
  requirements: {
    addons: ['fetch'],
  },
  rule: /^(gas)?tracker$/i,
  action: function(robot, msg) {
    robot.send(t('fetching', {i18n: i18nGas}));
    robot.render();
    fetchGas(robot.addons.fetch, GAS_ESTIMATOR.GASTRACKER,
      data => {
        robot.sendComponent(<Text>
          {t('gasfee', {
            i18n: i18nGas,
            ...data,
          })}
        </Text>);
        robot.render();
      });
  },
};

/**
 * Show current ethereum Gas fee via Eth GAS STATION.
 * https://ethgasstation.info/
 */
export const skillGasStation = {
  name: 'gasstation',
  help: '🛢 gasstation|station - Show current gas fee via Eth Gas Station',
  requirements: {
    addons: ['fetch'],
  },
  rule: /^(gas)?station$/i,
  action: function(robot, msg) {
    robot.send(t('fetching', {i18n: i18nGas}));
    robot.render();
    fetchGas(robot.addons.fetch, GAS_ESTIMATOR.GASSTATION,
      data => {
        robot.sendComponent(<Text>
          {t('gasfee', {
            i18n: i18nGas,
            ...data,
          })}
        </Text>);
        robot.render();
      });
  },
};

/**
 * Show current ethereum Gas fee via gasnow.
 * https://www.gasnow.org/
 */
export const skillGasNow = {
  name: 'gasnow',
  help: '🛢 gasnow|now - Show current gas fee via gasnow',
  requirements: {
    addons: ['fetch'],
  },
  rule: /^(gas)?now$/i,
  action: function(robot, msg) {
    robot.send(t('fetching', {i18n: i18nGas}));
    robot.render();
    fetchGas(robot.addons.fetch, GAS_ESTIMATOR.GASNOW,
      data => {
        robot.sendComponent(<Text>
          {t('gasfee', {
            i18n: i18nGas,
            ...data,
          })}
        </Text>);
        robot.render();
      });
  },
};

/**
 * Show current ethereum Gas fee via Eth GAS PRICE ORACLE.
 * https://etherchain.org/tools/gasPriceOracle
 */
export const skillGasPriceOracle = {
  name: 'gaspriceoracle',
  help: '🛢 gaspriceoracle|oracle - Show current gas fee via Eth Gas Price Oracle',
  requirements: {
    addons: ['fetch'],
  },
  rule: /^(gasprice)?oracle$/i,
  action: function(robot, msg) {
    robot.send(t('fetching', {i18n: i18nGas}));
    robot.render();
    fetchGas(robot.addons.fetch, GAS_ESTIMATOR.GASPRICEORACLE,
      data => {
        robot.sendComponent(<Text>
          {t('gasfee', {
            i18n: i18nGas,
            ...data,
          })}
        </Text>);
        robot.render();
      });
  },
};

export const skillsGas = [
  skillGasEstimator,
  skillGasNow,
  skillGasPriceOracle,
  skillGasStation,
  skillGasTracker,
];

const skills = [...skillsGas];

export {skills};
