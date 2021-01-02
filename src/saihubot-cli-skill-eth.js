'use strict';

import {t} from 'saihubot-cli-adapter/dist/i18n';

import {getConfig, getRandomItem} from './utils';
import {i18nAddr} from './i18n';
import {ethFetch, rpcLastBlock} from './ethRpc';

const isAddr = data => data.length === 42;

/**
 * Get the latest block number.
 */
export const skillLastBlock = {
  name: 'lastblock',
  help: '🗂 lastblock|block - get the latest Eth1 block number',
  requirements: {
    addons: ['fetch'],
  },
  i18n: {
    'en': {
      fetching: 'Fetching data...',
      summary: 'The latest block is **{{blocknum}}**',
    },
    'zh_TW': {
      fetching: '取得資料中...',
      summary: '最新的區塊是 **{{blocknum}}**',
    },
    props: ['blocknum']
  },
  rule: /^(last)?block$/i,
  action: function(robot, msg) {
    robot.send(t('fetching', {i18n: this.i18n}));
    robot.render();
    ethFetch(robot.addons.fetch, rpcLastBlock)
      .then(json => {
        const msg = t('summary', {i18n: this.i18n, blocknum: parseInt(json.result)});
        robot.send(msg);
        robot.render();
      });
  },
}

// ==== ADDRESS EXPLORER ===

/**
 * Check address explorer from the list
 */
export const skillAddressExplorer = {
  name: 'address',
  help: '🔎address|addr [address|tx] - Pick address explorer from the list',
  requirements: {
    addons: ['confirm']
  },
  rule: /(^addr(ess)? )(.*)|(^addr(ess)?$)/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[3] === undefined) {
      addr = getConfig('ADDR', '');
      if (addr === '') {
        robot.send(t('needAddr', {i18n: i18nAddr}));
        robot.render();
        return;
      }
    }
    let data = addr || msg[3];
    robot.addons.confirm(t('pick', {i18n: i18nAddr}), [
      {
        title: t('random', {i18n: i18nAddr}),
        id: 'random',
        rule: /^random/i,
        action: () => robot.ask(`${getRandomItem([
          'anyblock',
          'bitquery',
          'blockchair',
          'bloxy',
          'etherchain',
          'etherscan',
          'ethplorer',
          'tokenview',
        ])} ${data}`),
      },
      {
        title: 'ANYblock',
        id: 'anyblock',
        rule: /^anyblock/i,
        action: () => robot.ask(`anyblock ${data}`),
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
      {
        title: 'Ethplorer',
        id: 'ethplorer',
        rule: /^ethplorer/i,
        action: () => robot.ask(`ethplorer ${data}`),
      },
      {
        title: 'Tokenview',
        id: 'tokenview',
        rule: /^tokenview/i,
        action: () => robot.ask(`tokenview ${data}`),
      },
    ]);
  },
}

/** Check contract address or tx on etherscan */
export const skillSearchEtherscan = {
  name: 'etherscan',
  help: '🏦etherscan|scan [address|tx] - check address or tx on Etherscan',
  requirements: {
    addons: ['search'],
  },
  rule: /(^(ether)?scan )(.*)|^(ether)?scan$/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[3] === undefined) {
      addr = getConfig('ADDR', '');
      if (addr === '') {
        robot.send(t('needAddr', {i18n: i18nAddr}));
        robot.render();
        return;
      }
    }
    const data = addr || msg[3];
    if(isAddr(data)) {
      const url = 'https://www.etherscan.io/address/' + data;
      robot.addons.search('Check', data, url, 'Etherscan');
    } else {
      const url = 'https://www.etherscan.io/tx/' + data;
      robot.addons.search('Check tx', data, url, 'Etherscan');
    }
  },
};

/**
 * Check token symbol, address or tx hash on bloxy.info.
 *
 * can pass the address or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillSearchBloxy = {
  name: 'bloxy',
  help: '🏦bloxy [address|tx] - check token symbol, address or tx hash on bloxy.info',
  requirements: {
    addons: ['search'],
  },
  rule: /(^bloxy )(.*)|^bloxy$/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ADDR', '');
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
 * Check address or tx on blockchair.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillSearchBlockchair = {
  name: 'blockchair',
  help: '🏦blockchair [address|tx] - check address or tx on blockchair.com',
  requirements: {
    addons: ['search'],
  },
  rule: /(^blockchair )(.*)|^blockchair$/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ADDR', '');
      if (addr === '') {
        robot.send(t('needAddr', {i18n: i18nAddr}));
        robot.render();
        return;
      }
    }
    const data = addr || msg[2];
    if(isAddr(data)) {
      const url = 'https://blockchair.com/ethereum/address/' + data;
      robot.addons.search('Check', data, url, 'blockchair');
    } else {
      const url = 'https://blockchair.com/ethereum/transaction/' + data;
      robot.addons.search('Check tx', data, url, 'blockchair');
    }
  },
};

/**
 * Check address or tx on bitquery.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillSearchBitQuery = {
  name: 'bitquery',
  help: '🏦bitquery [address|tx] - check address or tx on explorer.bitquery.io',
  requirements: {
    addons: ['search'],
  },
  rule: /(^bitquery )(.*)|^bitquery$/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ADDR', '');
      if (addr === '') {
        robot.send(t('needAddr', {i18n: i18nAddr}));
        robot.render();
        return;
      }
    }
    const data = addr || msg[2];
    if(isAddr(data)) {
      const url = 'https://explorer.bitquery.io/ethereum/address/' + data;
      robot.addons.search('Check', data, url, 'explorer.bitquery.io');
    } else {
      const url = 'https://explorer.bitquery.io/ethereum/tx/' + data;
      robot.addons.search('Check tx', data, url, 'explorer.bitquery.io');
    }
  },
};

/** Check contract address or tx on etherchain.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillSearchEtherchain = {
  name: 'etherchain',
  help: '🏦etherchain|chain [address|tx] - check address or tx on etherchain',
  requirements: {
    addons: ['search'],
  },
  rule: /(^(ether)?chain )(.*)|^(ether)?chain$/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[3] === undefined) {
      addr = getConfig('ADDR', '');
      if (addr === '') {
        robot.send(t('needAddr', {i18n: i18nAddr}));
        robot.render();
        return;
      }
    }
    const data = addr || msg[3];
    if(isAddr(data)) {
      const url = 'https://etherchain.org/account/' + data;
      robot.addons.search('Check', data, url, 'etherchain.org');
    } else {
      const url = 'https://etherchain.org/tx/' + data;
      robot.addons.search('Check tx', data, url, 'etherchain');
    }
  },
};

/** Check contract address or tx on Tokenview.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillSearchTokenview = {
  name: 'tokenview',
  help: '🏦tokenview [address|tx] - check address or tx on tokenview',
  requirements: {
    addons: ['search'],
  },
  rule: /^(tokenview )(.*)|^tokenview$/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ADDR', '');
      if (addr === '') {
        robot.send(t('needAddr', {i18n: i18nAddr}));
        robot.render();
        return;
      }
    }
    const data = addr || msg[2];
    if(isAddr(data)) {
      const url = 'https://eth.tokenview.com/en/address/' + data;
      robot.addons.search('Check', data, url, 'tokenview');
    } else {
      const url = 'https://eth.tokenview.com/en/tx/' + data;
      robot.addons.search('Check tx', data, url, 'tokenview');
    }
  },
};

/** Check contract address or tx on Ethplorer.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillSearchEthplorer = {
  name: 'ethplorer',
  help: '🏦ethplorer [address|tx] - check address or tx on ethplorer',
  requirements: {
    addons: ['search'],
  },
  rule: /^(ethplorer )(.*)|^ethplorer$/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ADDR', '');
      if (addr === '') {
        robot.send(t('needAddr', {i18n: i18nAddr}));
        robot.render();
        return;
      }
    }
    const data = addr || msg[2];
    if(isAddr(data)) {
      const url = 'https://ethplorer.io/address/' + data;
      robot.addons.search('Check', data, url, 'Ethplorer');
    } else {
      const url = 'https://ethplorer.io/tx/' + data;
      robot.addons.search('Check tx', data, url, 'Ethplorer');
    }
  },
};

/** Check contract address or tx on ANYblock.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillSearchAnyblock = {
  name: 'anyblock',
  help: '🏦anyblock [address|tx] - check address or tx on ANYblock',
  requirements: {
    addons: ['search'],
  },
  rule: /^(anyblock )(.*)|^anyblock$/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ADDR', '');
      if (addr === '') {
        robot.send(t('needAddr', {i18n: i18nAddr}));
        robot.render();
        return;
      }
    }
    const data = addr || msg[2];
    if(isAddr(data)) {
      const url = 'https://explorer.anyblock.tools/ethereum/ethereum/mainnet/address/' + data;
      robot.addons.search('Check', data, url, 'ANYblock');
    } else {
      const url = 'https://explorer.anyblock.tools/ethereum/ethereum/mainnet/transaction/' + data;
      robot.addons.search('Check tx', data, url, 'ANYblock');
    }
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
      addr = getConfig('ADDR', '');
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
 * SAIHUBOT_ADDR environment variable
 */
export const skillSearchDebank = {
  name: 'debank',
  help: '🧩debank [address] - check DeFi balance on Debank',
  requirements: {
    addons: ['search'],
  },
  rule: /(^debank )(.*)|^debank$/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ADDR', '');
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
 * SAIHUBOT_ADDR environment variable
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
      addr = getConfig('ADDR', '');
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
 * SAIHUBOT_ADDR environment variable
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
      addr = getConfig('ADDR', '');
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

export const skillsAddress = [
  skillAddressExplorer,
  skillSearchAnyblock,
  skillSearchBitQuery,
  skillSearchBlockchair,
  skillSearchBloxy,
  skillSearchEtherchain,
  skillSearchEtherscan,
  skillSearchEthplorer,
  skillSearchTokenview,
];

export const skillsAccount = [
  skillAccountPicker,
  skillSearchDebank,
  skillSearchZapper,
  skillSearchZerion,
];

const skills = [
  skillLastBlock,
  ...skillsAccount,
  ...skillsAddress,
];
export {skills};
