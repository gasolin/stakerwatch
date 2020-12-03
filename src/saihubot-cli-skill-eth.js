'use strict';
import React, { useEffect, useState } from 'React';
import {Text} from 'ink';
import {t} from 'saihubot-cli-adapter/dist/i18n';

import {getConfig, getRandomItem} from './utils';
import {i18nValidator} from './i18n';

const API = {
  GASSTATION: 'https://ethgasstation.info/api/ethgasAPI.json',
  GASNOW: 'https://www.gasnow.org/api/v3/gas/price?utm_source=:gaso',
  GASTRACKER: 'https://api.etherscan.io/api?module=gastracker&action=gasoracle',
  GASPRICEORACLE: 'https://etherchain.org/api/gasPriceOracle',
};

function int(num) {
  return parseInt(num, 10);
}

const i18nAddr = {
  'en': {
    needAddr: 'Please pass the address or define SAIHUBOT_ETH_ADDR first',
    pick: 'pick address explorer from the list',
    random: 'Random',
  },
  'zh_TW': {
    needAddr: '請傳入地址，或是預先定義 SAIHUBOT_ETH_ADDR 參數',
    pick: '從列表中選取合適的地址探索工具',
    random: '隨機',
  },
  props: [],
};

// ==== GAS ===

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
    robot.addons.confirm(t('pick', {i18n: i18nAddr}), [
      {
        title: t('random', {i18n: i18nAddr}),
        id: 'random',
        rule: /^random/i,
        action: () => robot.ask(`${getRandomItem([
          'gasfee',
          'gasnow',
          'gasstation',
          'gastracker',
          'gaspriceoracle',
        ])} ${data}`),
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
  i18n: {
    'en': {
      gasfee: 'Current gas fee (report by etherscan) is H:{{H}} M:{{M}} L:{{L}} gwei',
    },
    'zh_TW': {
      gasfee: '目前的 gas 費用 (由 etherscan 提供) H:{{H}} M:{{M}} L:{{L}} gwei',
    },
    props: ['H', 'M', 'L']
  },
  rule: /^gastracker$|^tracker$/i,
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
  help: '🛢 gasstation|station - Show current gas fee via ETH Gas Station',
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
  rule: /^gasstation$|^station$/i,
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
  help: '🛢 gasnow|now - Show current gas fee via gasnow',
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
  rule: /^gasnow$|^now$/i,
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

/**
 * Show current ethereum Gas fee via ETH GAS PRICE ORACLE.
 * https://etherchain.org/tools/gasPriceOracle
 */
export const skillGasPriceOracle = {
  name: 'gaspriceoracle',
  help: '🛢 gaspriceoracle|oracle - Show current gas fee via ETH Gas Price Oracle',
  requirements: {
    addons: ['fetch'],
  },
  i18n: {
    'en': {
      gasfee: 'Current gas fee (report by Gas Price Oracle) is H:{{H}} M:{{M}} L:{{L}} gwei',
    },
    'zh_TW': {
      gasfee: '目前的 gas 費用 (由 Gas Price Oracle 提供) H:{{H}} M:{{M}} L:{{L}} gwei',
    },
    props: ['H', 'M', 'L']
  },
  rule: /^gaspriceoracle$|^oracle$/i,
  action: function(robot, msg) {
    robot.addons.fetch(API.GASPRICEORACLE)
      .then(response => response.json())
      .then(json => {
        robot.sendComponent(<Text>
          {t('gasfee', {
            i18n: this.i18n,
            H: int(json.fastest),
            M: int(json.standard),
            L: int(json.safeLow),
          })}
        </Text>);
        robot.render();
      })
  },
};

// ==== ADDRESS EXPLORER ===

/**
 * Check address explorer from the list
 */
export const skillAddressExplorer = {
  name: 'address',
  help: '🔎address|addr [address] - Pick address explorer from the list',
  requirements: {
    addons: ['confirm']
  },
  rule: /(^address |^addr )(.*)|(^address$|^addr$)/i,
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
        title: t('random', {i18n: i18nAddr}),
        id: 'random',
        rule: /^random/i,
        action: () => robot.ask(`${getRandomItem([
          'bitquery',
          'blockchair',
          'bloxy',
          'etherchain',
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
        title: 'EtherChain',
        id: 'chain',
        rule: /^chain/i,
        action: () => robot.ask(`etherchain ${data}`),
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

/** Check contract address on etherscan */
export const skillSearchEtherscan = {
  name: 'etherscan',
  help: '🏦etherscan|scan [address] - check contract address on etherscan',
  requirements: {
    addons: ['search'],
  },
  rule: /(^etherscan |^scan )(.*)|^etherscan$|^scan$/i,
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
 * Check token symbol, address or tx hash on bloxy.info.
 *
 * can pass the address or pre-define the
 * SAIHUBOT_ETH_ADDR environment variable
 */
export const skillSearchBloxy = {
  name: 'bloxy',
  help: '🏦bloxy [address] - check token symbol, address or tx hash on bloxy.info',
  requirements: {
    addons: ['search'],
  },
  rule: /(^bloxy )(.*)|^bloxy$/i,
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
 * Check address on blockchair.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ETH_ADDR environment variable
 */
export const skillSearchBlockchair = {
  name: 'blockchair',
  help: '🏦blockchair [address] - check address on blockchair.com',
  requirements: {
    addons: ['search'],
  },
  rule: /(^blockchair )(.*)|^blockchair$/i,
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
 * Check address on bitquery.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ETH_ADDR environment variable
 */
export const skillSearchBitQuery = {
  name: 'bitquery',
  help: '🏦bitquery [address] - check address on explorer.bitquery.io',
  requirements: {
    addons: ['search'],
  },
  rule: /(^bitquery )(.*)|^bitquery$/i,
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

/** Check contract address on etherchain */
export const skillSearchEtherchain = {
  name: 'etherchain',
  help: '🏦etherchain|chain [address] - check contract address on etherchain',
  requirements: {
    addons: ['search'],
  },
  rule: /(^etherchain |^chain )(.*)|^etherchain$|^chain$/i,
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
    const url = 'https://etherchain.org/account/' + data;
    robot.addons.search('Check', msg[2], url, 'etherchain.org');
  },
};

// Side Chain

/**
 * Check address on bscscan.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ETH_ADDR environment variable
 */
export const skillSearchBSCscan = {
  name: 'bscscan',
  help: '🏦bsc|bscscan [address] - check address on Binance Smart Chain',
  requirements: {
    addons: ['search'],
  },
  rule: /(^bscscan |^bsc )(.*)|^bscscan$|^bsc$/i,
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
    const url = 'https://bscscan.com/address/' + data;
    robot.addons.search('Check', data, url, 'Binance Smart Chain');
  },
};


/**
 * Check address on xDai.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ETH_ADDR environment variable
 */
export const skillSearchXDai = {
  name: 'xdai',
  help: '🏦xdai [address] - check address on xDai Chain',
  requirements: {
    addons: ['search'],
  },
  rule: /(^xdai )(.*)|^xdai$/i,
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
    const url = 'https://blockscout.com/poa/xdai/address/' + data + '/tokens';
    robot.addons.search('Check', data, url, 'xDai');
  },
};

// ==== TX ===

/**
 * pick transaction (tx) explorer from the list
 */
export const skillTxPicker = {
  name: 'tx',
  help: '🔎tx - Pick a transaction (tx) explorer from the list',
  requirements: {
    addons: ['confirm']
  },
  rule: /^(tx )(.*)/i,
  action: function(robot, msg) {
    const data = msg[2];
    robot.addons.confirm(t('pick', {i18n: i18nAddr}), [
      {
        title: t('random', {i18n: i18nAddr}),
        id: 'random',
        rule: /^random/i,
        action: () => robot.ask(`${getRandomItem([
          'bitquerytx',
          'blockchair',
          'bloxy',
          'etherscantx',
        ])} ${data}`),
      },
      {
        title: 'BitQuery',
        id: 'querytx',
        rule: /^querytx/i,
        action: () => robot.ask(`querytx ${data}`),
      },
      {
        title: 'BlockChair',
        id: 'chairtx',
        rule: /^chairtx/i,
        action: () => robot.ask(`chairtx ${data}`),
      },
      {
        title: 'Bloxy',
        id: 'bloxy',
        rule: /^bloxy/i,
        action: () => robot.ask(`bloxy ${data}`),
      },
      {
        title: 'Etherchain',
        id: 'chaintx',
        rule: /^chaintx/i,
        action: () => robot.ask(`chaintx ${data}`),
      },
      {
        title: 'Etherscan',
        id: 'scantx',
        rule: /^scantx/i,
        action: () => robot.ask(`scantx ${data}`),
      },
    ]);
  },
}

/**
 * Check transaction (tx) on etherscan.
 */
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
 * Check transaction (tx) on blockchair.
 */
export const skillSearchBlockchairTx = {
  name: 'blockchair',
  help: 'blockchair-tx|blockchairtx [tx] - check transaction (tx) on blockchair.com',
  requirements: {
    addons: ['search'],
  },
  rule: /(^blockchair-tx |^blockchairtx |^chair-tx |^chairtx )(.*)/i,
  action: function(robot, msg) {
    const url = 'https://blockchair.com/ethereum/transaction/' + msg[2];
    robot.addons.search('Check tx', data, url, 'blockchair');
  },
};

/**
 * Check transaction (tx) on explorer.bitquery.io.
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

/**
 * Check transaction (tx) on etherchain.
 */
export const skillSearchEtherchainTx = {
  name: 'etherchaintx',
  help: 'etherchain-tx|etherchaintx|chain-tx|chaintx [tx] - check transaction (tx) on etherchain',
  requirements: {
    addons: ['search'],
  },
  rule: /(^etherchain-?tx |^chain-?tx )(.*)/i,
  action: function(robot, msg) {
    const url = 'https://etherchain.org/tx/' + msg[2];
    robot.addons.search('Check tx', msg[2], url, 'etherchain');
  },
};

// Side chain

/**
 * Check transaction (tx) on Binance Smart Chain.
 */
export const skillSearchBSCscanTx = {
  name: 'bscscantx',
  help: '🏦bsc-tx|bsctx|bscscan-tx|bscscantx [tx] - check transaction (tx) on Binance Smart Chain',
  requirements: {
    addons: ['search'],
  },
  rule: /(^bsc(scan)?-?tx )(.*)/i,
  action: function(robot, msg) {
    const data = msg[3];
    const url = 'https://bscscan.com/tx/' + data;
    robot.addons.search('Check tx', data, url, 'Binance Smart Chain');
  },
};

/**
 * Check transaction (tx) on xDai Chain.
 */
export const skillSearchXDaiTx = {
  name: 'xdaitx',
  help: '🏦xdai-tx|xdaitx [tx] - check transaction (tx) on xDai Chain',
  requirements: {
    addons: ['search'],
  },
  rule: /(^xdai-?tx )(.*)/i,
  action: function(robot, msg) {
    const data = msg[3];
    const url = 'https://blockscout.com/poa/xdai/tx/' + data + '/internal-transactions';
    robot.addons.search('Check tx', data, url, 'xDai Chain');
  },
};

// ==== BEACON VALIDATOR ===

/**
 * pick beacon validator explorer from the list
 *
 * can pass the validator index or address, or pre-define the
 * SAIHUBOT_VALIDATOR environment variable
 */
export const skillValidatorPicker = {
  name: 'validator',
  help: '🔎validator - Pick a beacon validator explorer from the list',
  requirements: {
    addons: ['confirm']
  },
  rule: /(^validator )(.*)|^validator$/i,
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
    robot.addons.confirm(t('pick', {i18n: i18nAddr}), [
      {
        title: t('random', {i18n: i18nAddr}),
        id: 'random',
        rule: /^random/i,
        action: () => robot.ask(`${getRandomItem([
          'beaconscan',
          'beaconchain',
        ])} ${data}`),
      },
      {
        title: 'Beaconscan',
        id: 'beaconscan',
        rule: /^beaconscan/i,
        action: () => robot.ask(`beaconscan ${data}`),
      },
      {
        title: 'Beaconcha.in',
        id: 'beaconchain',
        rule: /^beaconchain/i,
        action: () => robot.ask(`beaconchain ${data}`),
      },
    ]);
  },
}

/**
 * Check validator address on beaconscan.
 *
 * can pass the validator index or address, or pre-define the
 * SAIHUBOT_VALIDATOR environment variable
 */
export const skillSearchBeaconscan = {
  name: 'beaconscan',
  help: '🥓beaconscan|scan [address] - check validator address or number on BeaconScan',
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
    const url = 'https://beaconscan.com/validator/' + data;
    robot.addons.search('Check', data, url, 'BeaconScan');
  },
};

/**
 * Check validator address on beaconcha.in.
 *
 * can pass the validator index or address, or pre-define the
 * SAIHUBOT_VALIDATOR environment variable
 */
export const skillSearchBeaconchain = {
  name: 'beaconchain',
  help: '🥓beaconchain|beaconcha|beaconcha.in [address] - check validator address or number on beaconscan',
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
  rule: /(^beaconcha(in|.in)? )(.*)|^beaconcha(in|.in)?$/i,
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
    const data = validator.trim() || msg[3];
    const url = 'https://beaconcha.in/validator/' + data;
    robot.addons.search('Check', data, url, 'beaconcha.in');
  },
};

// ==== Account/DeFi Balance Tracking ===

/**
 * pick account explorer from the list
 */
export const skillAccountPicker = {
  name: 'account',
  help: '🔎account|defi - Pick an account explorer from the list',
  requirements: {
    addons: ['confirm']
  },
  rule: /^account$|^defi$/i,
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
        title: t('random', {i18n: i18nAddr}),
        id: 'random',
        rule: /^random/i,
        action: () => robot.ask(`${getRandomItem([
          'debank',
          'zapper',
          'zerion',
        ])} ${data}`),
      },
      {
        title: 'Debank',
        id: 'debank',
        rule: /^debank/i,
        action: () => robot.ask(`debank ${data}`),
      },
      {
        title: 'Zapper',
        id: 'zapper',
        rule: /^zapper/i,
        action: () => robot.ask(`zapper ${data}`),
      },
      {
        title: 'Zerion',
        id: 'zerion',
        rule: /^zerion/i,
        action: () => robot.ask(`zerion ${data}`),
      },
    ]);
  },
}

/**
 * Check DeFi Balance on debank.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ETH_ADDR environment variable
 */
export const skillSearchDebank = {
  name: 'debank',
  help: '🧩debank [address] - check DeFi balances on Debank',
  requirements: {
    addons: ['search'],
  },
  rule: /(^debank )(.*)|^debank$/i,
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
    const url = 'https://debank.com/portfolio/' + data;
    robot.addons.search('Check', data, url, 'Debank');
  },
};

/**
 * Check DeFi Balance on Zapper.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ETH_ADDR environment variable
 */
export const skillSearchZapper = {
  name: 'zapper',
  help: '🧩zapper [address] - check DeFi balance on Zapper',
  requirements: {
    addons: ['search'],
  },
  rule: /(^zapper )(.*)|^zapper$/i,
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
    const url = 'https://zapper.fi/dashboard?address=' + data;
    robot.addons.search('Check', data, url, 'Zapper');
  },
};


/**
 * Check DeFi Balance on Zerion.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ETH_ADDR environment variable
 */
export const skillSearchZerion = {
  name: 'zerion',
  help: '🧩zerion [address] - check DeFi Balance on Zerion',
  requirements: {
    addons: ['search'],
  },
  rule: /(^zerion )(.*)|^zerion$/i,
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
    const url = 'https://app.zerion.io/' + data + '/overview';
    robot.addons.search('Check', data, url, 'Zerion');
  },
};

export const skillsGas = [
  skillGasEstimator,
  skillGasNow,
  skillGasPriceOracle,
  skillGasStation,
  skillGasTracker,
];
export const skillsAddress = [
  skillAddressExplorer,
  skillSearchBitQuery,
  skillSearchBlockchair,
  skillSearchBloxy,
  skillSearchEtherchain,
  skillSearchEtherscan,
];
export const skillsTx = [
  skillTxPicker,
  skillSearchBitQueryTx,
  skillSearchBlockchairTx,
  skillSearchEtherchainTx,
  skillSearchEtherscanTx,
];
export const skillsValidator = [
  skillValidatorPicker,
  skillSearchBeaconchain,
  skillSearchBeaconscan,
];
export const skillsAccount = [
  skillAccountPicker,
  skillSearchDebank,
  skillSearchZapper,
  skillSearchZerion,
];
export const skillsSideChain = [
  skillSearchBSCscan,
  skillSearchBSCscanTx,
  skillSearchXDai,
  skillSearchXDaiTx,
];

const skills = [
  ...skillsGas,
  ...skillsAccount,
  ...skillsAddress,
  ...skillsTx,
  ...skillsValidator,
  ...skillsSideChain,
];
export {skills};
