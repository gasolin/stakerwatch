'use strict';

import React from 'React';
import {Text} from 'ink';
import {t} from 'saihubot-cli-adapter/dist/i18n';
import {GAS_ESTIMATOR} from './saihubot-addon-ethgas'

// ==== GAS ===

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
  name: 'gastracker',
  help: '🛢 gastracker|tracker - Show current gas fee via Etherscan Gas Tracker',
  requirements: {
    addons: ['fetchGas'],
  },
  rule: /^(gas)?tracker$/i,
  action: function(robot, msg) {
    robot.send(t('fetching', {i18n: i18nGas}));
    robot.render();
    robot.addons.fetchGas(GAS_ESTIMATOR.GASTRACKER,
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
    addons: ['fetchGas'],
  },
  rule: /^(gas)?station$/i,
  action: function(robot, msg) {
    robot.send(t('fetching', {i18n: i18nGas}));
    robot.render();
    robot.addons.fetchGas(GAS_ESTIMATOR.GASSTATION,
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
    addons: ['fetch', 'fetchGas'],
  },
  rule: /^(gas)?now$/i,
  action: function(robot, msg) {
    robot.send(t('fetching', {i18n: i18nGas}));
    robot.render();
    robot.addons.fetchGas(GAS_ESTIMATOR.GASNOW,
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
    addons: ['fetchGas'],
  },
  rule: /^(gasprice)?oracle$/i,
  action: function(robot, msg) {
    robot.send(t('fetching', {i18n: i18nGas}));
    robot.render();
    robot.addons.fetchGas(GAS_ESTIMATOR.GASPRICEORACLE,
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
