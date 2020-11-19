'use strict';
import React, { useEffect, useState } from 'React';
import {Text} from 'ink';
import {t} from 'saihubot/dist/i18n';

const API = {
  GASSTATION: 'https://ethgasstation.info/api/ethgasAPI.json',
  GASNOW: 'https://www.gasnow.org/api/v3/gas/price?utm_source=:gaso',
  GASTRACKER: 'https://api.etherscan.io/api?module=gastracker&action=gasoracle',
};

function int(num) {
  return parseInt(num, 10);
}

/**
 * Show current ethereum Gas fee via Etherscan Gas Tracker.
 * https://ethgasstation.info/https://etherscan.io/gastracker
 */
export const skillGasTracker = {
  name: 'gastracker',
  help: 'gastracker|tracker - Show current gas fee via Etherscan Gas Tracker',
  requirements: {
    addons: ['fetch'],
  },
  i18n: {
    'en': {
      gasfee: 'Current gas fee (report by etherscan) is H:{{H}} M:{{M}} L:{{L}} gwei',
    },
    'zh_TW': {
      gasfee: '目前的 gas 費用 (由 etherscan 提供) H:{{H}} M:{{M}} L:{{L}} gwei',
    },
    props: ['H', 'M', 'L']
  },
	rule: /^gastracker|^tracker/i,
  action: function(robot, msg) {
    robot.addons.fetch(API.GASTRACKER)
      .then(response => response.json())
      .then(json => {
        robot.sendComponent(<Text>
          {t('gasfee', {
            i18n: this.i18n,
            H: json.result.FastGasPrice,
            M: json.result.ProposeGasPrice,
            L: json.result.SafeGasPrice,
          })}
        </Text>);
        robot.render();
      })
  },
};

/**
 * Show current ethereum Gas fee via ETH GAS STATION.
 * https://ethgasstation.info/
 */
export const skillGasStation = {
  name: 'gasstation',
  help: 'gasstation|station - Show current gas fee via ETH Gas Station',
  requirements: {
    addons: ['fetch'],
  },
  i18n: {
    'en': {
      gasfee: 'Current gas fee (report by gasstation) is H:{{H}} M:{{M}} L:{{L}} gwei',
    },
    'zh_TW': {
      gasfee: '目前的 gas 費用 (由 gasstation 提供) H:{{H}} M:{{M}} L:{{L}} gwei',
    },
    props: ['H', 'M', 'L']
  },
	rule: /^gasstation|^station/i,
  action: function(robot, msg) {
    robot.addons.fetch(API.GASSTATION)
      .then(response => response.json())
      .then(json => {
        robot.sendComponent(<Text>
          {t('gasfee', {
            i18n: this.i18n,
            H: int(json.fast / 10),
            M: int(json.average / 10),
            L: int(json.safeLow / 10),
          })}
        </Text>);
        robot.render();
      })
  },
};

/**
 * Show current ethereum Gas fee via gasnow.
 * https://www.gasnow.org/
 */
export const skillGasNow = {
  name: 'gasnow',
  help: 'gasnow|now - Show current gas fee via gasnow',
  requirements: {
    addons: ['fetch'],
  },
  i18n: {
    'en': {
      gasfee: 'Current gas fee (report by gasnow) is H:{{H}} M:{{M}} L:{{L}} gwei',
    },
    'zh_TW': {
      gasfee: '目前的 gas 費用 (由 gasnow 提供) H:{{H}} M:{{M}} L:{{L}} gwei',
    },
    props: ['H', 'M', 'L']
  },
	rule: /^gasnow|^now/i,
  action: function(robot, msg) {
    robot.addons.fetch(API.GASNOW)
      .then(response => response.json())
      .then(json => {
        robot.sendComponent(<Text>
          {t('gasfee', {
            i18n: this.i18n,
            H: int(json.data.fast / 10**9),
            M: int(json.data.standard / 10**9),
            L: int(json.data.slow / 10**9),
          })}
        </Text>);
        robot.render();
      })
  },
};

/** check contract address on etherscan */
export const skillSearchEtherscan = {
  name: 'etherscan',
  help: 'etherscan|scan [address] - check contract address on etherscan',
  requirements: {
    addons: ['search'],
  },
  rule: /(^etherscan |^scan )(.*)/i,
	action: function(robot, msg) {
    const url = 'https://www.etherscan.io/address/' + msg[2];
    robot.addons.search('Check', msg[2], url, 'etherscan');
  },
};

const skills = [
  skillGasNow,
  skillGasStation,
  skillGasTracker,
  skillSearchEtherscan,
];
export {skills};
