'use strict';

import {t} from 'saihubot-cli-adapter/dist/i18n';

import { GAS_ESTIMATOR_ETHEREUM as GAS_ESTIMATOR, getRandomItem, ETH_NODES } from 'staker-freenodes'

import {ethFetch, rpcGasPrice} from '../helpers/ethRpc';

// ==== GAS ===

const i18nGas = {
  'en': {
    fetching: 'Fetching gas...',
    gasfee: '⛽️Gas prices (from {{source}}):\n🚀Fast: {{H}} Gwei\n🚘Average: {{M}} Gwei\n🚜Slow:{{L}} Gwei',
    random: 'Random',
  },
  'zh_TW': {
    fetching: '取得 gas 費用...',
    gasfee: '⛽️gas 價格 (來自 {{source}}):\n🚀快速: {{H}} Gwei\n🚘普通: {{M}} Gwei\n🚜慢: {{L}} Gwei',
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
    addons: ['confirm', 'fetch', 'fetchGas']
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
  name: GAS_ESTIMATOR.GASTRACKER.name,
  help: '⛽ gastracker|tracker - Show current gas fee via Etherscan Gas Tracker',
  requirements: {
    addons: ['fetchGas'],
  },
  rule: /^(gas)?tracker$/i,
  action: function(robot, msg) {
    robot.send(t('fetching', {i18n: i18nGas}));
    robot.render();
    robot.addons.fetchGas(GAS_ESTIMATOR.GASTRACKER,
      data => {
        robot.send(t('gasfee', {
          i18n: i18nGas,
          ...data,
        }));
        robot.render();
      });
  },
};

/**
 * Show current ethereum Gas fee via Eth GAS STATION.
 * https://ethgasstation.info/
 */
export const skillGasStation = {
  name: GAS_ESTIMATOR.GASSTATION.name,
  help: '⛽ gasstation|station - Show current gas fee via Eth Gas Station',
  requirements: {
    addons: ['fetchGas'],
  },
  rule: /^(gas)?station$/i,
  action: function(robot, msg) {
    robot.send(t('fetching', {i18n: i18nGas}));
    robot.render();
    robot.addons.fetchGas(GAS_ESTIMATOR.GASSTATION,
      data => {
        robot.send(t('gasfee', {
          i18n: i18nGas,
          ...data,
        }));
        robot.render();
      });
  },
};

/**
 * Show current ethereum Gas fee via gasnow.
 * https://www.gasnow.org/
 */
export const skillGasNow = {
  name: GAS_ESTIMATOR.GASNOW.name,
  help: '⛽ gasnow|now - Show current gas fee via gasnow',
  requirements: {
    addons: ['fetch', 'fetchGas'],
  },
  rule: /^(gas)?now$/i,
  action: function(robot, msg) {
    robot.send(t('fetching', {i18n: i18nGas}));
    robot.render();
    robot.addons.fetchGas(GAS_ESTIMATOR.GASNOW,
      data => {
        robot.send(t('gasfee', {
          i18n: i18nGas,
          ...data,
        }));
        robot.render();
      });
  },
};

/**
 * Show current ethereum Gas fee via Eth GAS PRICE ORACLE.
 * https://etherchain.org/tools/gasPriceOracle
 */
export const skillGasPriceOracle = {
  name: GAS_ESTIMATOR.GASPRICEORACLE.name,
  help: '⛽ gaspriceoracle|oracle - Show current gas fee via Eth Gas Price Oracle',
  requirements: {
    addons: ['fetchGas'],
  },
  rule: /^(gasprice)?oracle$/i,
  action: function(robot, msg) {
    robot.send(t('fetching', {i18n: i18nGas}));
    robot.render();
    robot.addons.fetchGas(GAS_ESTIMATOR.GASPRICEORACLE,
      data => {
        robot.send(t('gasfee', {
          i18n: i18nGas,
          ...data,
        }));
        robot.render();
      });
  },
};


/**
 * Show current ethereum Gas fee from the chain.
 */
export const skillGasFee = {
  name: 'gasfee',
  help: '⛽ gasfee - Show current on-chain gas fee',
  requirements: {
    addons: ['fetch'],
  },
  i18n: {
    'en': {
      fetching: 'Fetching gas...',
      fee: 'Current on-chain gas fee is {{gas}} gwei',
    },
    'zh_TW': {
      fetching: '取得 gas 費用...',
      fee: '當前鏈上的 Gas 費用為 {{gas}} gwei',
    },
    props: ['gas']
  },
  rule: /^gasfee/i,
  action: function(robot, msg) {
    robot.send(t('fetching', {i18n: this.i18n}));
    robot.render();
    ethFetch(robot.addons.fetch, rpcGasPrice())
    .then(json => {
      const gas = Number(json.result) / 10**9;
      const msg = t('fee', {i18n: this.i18n, gas})
      robot.send(msg);
      robot.render();
    })
  },
}

export const skillsGas = [
  skillGasEstimator,
  skillGasFee,
  skillGasNow,
  skillGasPriceOracle,
  skillGasStation,
  skillGasTracker,
];

const skills = [...skillsGas];

export {skills};
