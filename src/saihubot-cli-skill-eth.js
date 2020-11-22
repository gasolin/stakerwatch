'use strict';
import React, { useEffect, useState } from 'React';
import {Text} from 'ink';
import {t} from 'saihubot/dist/i18n';
import {getConfig, getRandomItem} from './utils';

const API = {
  GASSTATION: 'https://ethgasstation.info/api/ethgasAPI.json',
  GASNOW: 'https://www.gasnow.org/api/v3/gas/price?utm_source=:gaso',
  GASTRACKER: 'https://api.etherscan.io/api?module=gastracker&action=gasoracle',
};

function int(num) {
  return parseInt(num, 10);
}

// ==== GAS ===

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

// ==== ADDRESS EXPLORER ===

const i18nAddr = {
  'en': {
    needAddr: 'Please pass the address or define SAIHUBOT_ETH_ADDR first',
    pick: 'pick address explorer from the list',
  },
  'zh_TW': {
    needAddr: '請傳入地址，或是預先定義 SAIHUBOT_ETH_ADDR 參數',
    pick: '從列表中選取合適的地址探索工具',
  },
  props: [],
};

export const skillAddressExplorer = {
  name: 'address',
  help: '⭐️ address|addr [address] - pick address explorer from list',
  requirements: {
    addons: ['confirm']
  },
  rule: /(^address |^addr )(.*)|(^address |^addr)/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ETH_ADDR', '');
      if (addr === '') {
        robot.send(t('needAddr', {i18n: i18nAddr}));
        robot.render();
        return;
      }
    }
    let data = addr || msg[2];
    robot.addons.confirm(t('pick', {i18n: i18nAddr}), [
      {
        title: 'Random',
        id: 'random',
        rule: /^random/i,
        action: () => robot.ask(`${getRandomItem([
          'bitquery',
          'blockchair',
          'bloxy',
          'etherscan',
        ])} ${data}`),
      },
      {
        title: 'BitQuery',
        id: 'query',
        rule: /^query/i,
        action: () => robot.ask(`bitquery ${data}`),
      },
      {
        title: 'Blockchair',
        id: 'chair',
        rule: /^chair/i,
        action: () => robot.ask(`blockchair ${data}`),
      },
      {
        title: 'Bloxy',
        id: 'bloxy',
        rule: /^bloxy/i,
        action: () => robot.ask(`bloxy ${data}`),
      },
      {
        title: 'EtherScan',
        id: 'scan',
        rule: /^scan/i,
        action: () => robot.ask(`etherscan ${data}`),
      },
    ]);
  },
}

/** check contract address on etherscan */
export const skillSearchEtherscan = {
  name: 'etherscan',
  help: 'etherscan|scan [address] - check contract address on etherscan',
  requirements: {
    addons: ['search'],
  },
  rule: /(^etherscan |^scan )(.*)/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ETH_ADDR', '');
      if (addr === '') {
        robot.send(t('needAddr', {i18n: i18nAddr}));
        robot.render();
        return;
      }
    }
    const data = addr || msg[2];
    const url = 'https://www.etherscan.io/address/' + data;
    robot.addons.search('Check', msg[2], url, 'etherscan');
  },
};

/**
 * check token symbol, address or tx hash on bloxy.info.
 *
 * can pass the address or pre-define the
 * SAIHUBOT_ETH_ADDR environment variable
 */
export const skillSearchBloxy = {
  name: 'bloxy',
  help: 'bloxy [address] - check token symbol, address or tx hash on bloxy.info',
  requirements: {
    addons: ['search'],
  },
  rule: /(^bloxy )(.*)|^bloxy/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ETH_ADDR', '');
      if (addr === '') {
        robot.send(t('needAddr', {i18n: i18nAddr}));
        robot.render();
        return;
      }
    }
    const data = addr || msg[2];
    const url = 'https://bloxy.info/address/' + data;
    robot.addons.search('Check', data, url, 'bloxy.info');
  },
};

/**
 * check address on blockchair.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ETH_ADDR environment variable
 */
export const skillSearchBlockchair = {
  name: 'blockchair',
  help: 'blockchair [address] - check address on blockchair.com',
  requirements: {
    addons: ['search'],
  },
  rule: /(^blockchair )(.*)|^blockchair/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ETH_ADDR', '');
      if (addr === '') {
        robot.send(t('needAddr', {i18n: i18nAddr}));
        robot.render();
        return;
      }
    }
    const data = addr || msg[2];
    const url = 'https://blockchair.com/ethereum/address/' + data;
    robot.addons.search('Check', data, url, 'blockchair');
  },
};

/**
 * check address on bitquery.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ETH_ADDR environment variable
 */
export const skillSearchBitQuery = {
  name: 'bitquery',
  help: 'bitquery [address] - check address on explorer.bitquery.io',
  requirements: {
    addons: ['search'],
  },
  rule: /(^bitquery )(.*)|^bitquery/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ETH_ADDR', '');
      if (addr === '') {
        robot.send(t('needAddr', {i18n: i18nAddr}));
        robot.render();
        return;
      }
    }
    const data = addr || msg[2];
    const url = 'https://explorer.bitquery.io/ethereum/address/' + data;
    robot.addons.search('Check', data, url, 'explorer.bitquery.io');
  },
};

// ==== TX ===

/** check transaction (tx) on etherscan */
export const skillSearchEtherscanTx = {
  name: 'etherscantx',
  help: 'etherscan-tx|etherscantx|scan-tx|scantx [tx] - check transaction (tx) on etherscan',
  requirements: {
    addons: ['search'],
  },
  rule: /(^etherscantx |^etherscan-tx |^scantx |^scan-tx )(.*)/i,
  action: function(robot, msg) {
    const url = 'https://www.etherscan.io/tx/' + msg[2];
    robot.addons.search('Check tx', msg[2], url, 'etherscan');
  },
};


/**
 * check transaction (tx) on blockchair.
 */
export const skillSearchBlockchairTx = {
  name: 'blockchair',
  help: 'blockchair-tx|blockchairtx [tx] - check transaction (tx) on blockchair.com',
  requirements: {
    addons: ['search'],
  },
  rule: /(^blockchair-tx |^blockchairtx )(.*)/i,
  action: function(robot, msg) {
    const url = 'https://blockchair.com/ethereum/transaction/' + msg[2];
    robot.addons.search('Check tx', data, url, 'blockchair');
  },
};

/**
 * check transaction (tx) on explorer.bitquery.io.
 */
export const skillSearchBitQueryTx = {
  name: 'bitquerytx',
  help: 'bitquery-tx|bitquerytx|query-tx|querytx [tx] - check transaction (tx) on bitquery',
  requirements: {
    addons: ['search'],
  },
  rule: /(^bitquerytx |^bitquery-tx |^querytx |^query-tx )(.*)/i,
  action: function(robot, msg) {
    const url = 'https://explorer.bitquery.io/ethereum/tx/' + msg[2];
    robot.addons.search('Check tx', msg[2], url, 'explorer.bitquery.io');
  },
};

// ==== BEACON VALIDATOR ===

const i18nValidator = {
  'en': {
    needAddr: 'Please pass the index/address or define SAIHUBOT_VALIDATOR first'
  },
  'zh_TW': {
    needAddr: '請傳入索引/地址，或是預先定義 SAIHUBOT_VALIDATOR 參數'
  },
  props: [],
};

/**
 * check validator address on beaconscan.
 *
 * can pass the validator index or address, or pre-define the
 * SAIHUBOT_VALIDATOR environment variable
 */
export const skillSearchBeaconscan = {
  name: 'beaconscan',
  help: 'beaconscan|scan [address] - check validator address or number on beaconscan',
  requirements: {
    addons: ['search'],
  },
  rule: /(^beaconscan )(.*)|^beaconscan/i,
  action: function(robot, msg) {
    let validator = '';
    if (msg[2] === undefined) {
      validator = getConfig('VALIDATOR', '');
      if (validator === '') {
        robot.send(t('needAddr', {i18n: i18nValidator}));
        robot.render();
        return;
      }
    }
    const data = validator || msg[2];
    const url = 'https://beaconscan.com/medalla/validator/' + data;
    robot.addons.search('Check', data, url, 'beaconscan(medalla)');
  },
};

/**
 * check validator address on beaconcha.in.
 *
 * can pass the validator index or address, or pre-define the
 * SAIHUBOT_VALIDATOR environment variable
 */
export const skillSearchBeaconchain = {
  name: 'beaconchain',
  help: 'beaconchain|beaconcha|beaconcha.in [address] - check validator address or number on beaconscan',
  requirements: {
    addons: ['search'],
  },
  i18n: {
    'en': {
      needAddr: 'Please pass the index/address or define SAIHUBOT_VALIDATOR first'
    },
    'zh_TW': {
      needAddr: '請傳入索引/地址，或是預先定義 SAIHUBOT_VALIDATOR 參數'
    },
    props: [],
  },
  rule: /(^beaconchain |^beaconcha |^beaconcha\.in )(.*)|^beaconchain|^beaconcha|^beaconcha\.in/i,
  action: function(robot, msg) {
    let validator = '';
    if (msg[2] === undefined) {
      validator = getConfig('VALIDATOR', '');
      if (validator === '') {
        robot.send(t('needAddr', {i18n: i18nValidator}));
        robot.render();
        return;
      }
    }
    const data = validator.trim() || msg[2];
    const url = 'https://medalla.beaconcha.in/validator/' + data;
    robot.addons.search('Check', data, url, 'beaconcha.in(medalla)');
  },
};

export const skillsGas = [
  skillGasNow,
  skillGasStation,
  skillGasTracker,
];
export const skillsAddress = [
  skillAddressExplorer,
  skillSearchBitQuery,
  skillSearchBlockchair,
  skillSearchBloxy,
  skillSearchEtherscan,
];
export const skillsTx = [
  skillSearchBitQueryTx,
  skillSearchBlockchairTx,
  skillSearchEtherscanTx,
];
export const skillsValidator = [
  skillSearchBeaconchain,
  skillSearchBeaconscan,
];

const skills = [
  ...skillsGas,
  ...skillsAddress,
  ...skillsTx,
  ...skillsValidator,
];
export {skills};
