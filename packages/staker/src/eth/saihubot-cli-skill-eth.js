'use strict';

import {t} from 'saihubot-cli-adapter/dist/i18n';
import {
  getRandomItem,
  DEFI_EXPLORER_ETHEREUM,
  DEFI_DAPPRADAR,
  DEFI_DEBANK,
  DEFI_ZAPPER,
  DEFI_ZERION,
  EXPLORER_ETHEREUM,
  CHAIN_ETHEREUM_EXPLORER_ETHERSCAN,
  CHAIN_ETHEREUM_EXPLORER_BLOXY,
  CHAIN_ETHEREUM_EXPLORER_BLOCKCHAIR,
  CHAIN_ETHEREUM_EXPLORER_BITQUERY,
  CHAIN_ETHEREUM_EXPLORER_ETHERCHAIN,
  CHAIN_ETHEREUM_EXPLORER_TOKENVIEW,
  CHAIN_ETHEREUM_EXPLORER_ETHPLORER,
  CHAIN_ETHEREUM_EXPLORER_ANYBLOCK,
} from 'staker-freenodes';

import {getConfig, singleAddr, getExplorerLink} from '../utils';
import {i18nAddr} from '../i18n';
import {ethFetch, rpcLastBlock} from '../helpers/ethRpc';

/**
 * Get the latest block number.
 */
export const skillLastBlock = {
  name: 'lastblock',
  help: '🗂 lastblock|block|block-eth - get the latest Eth1 block number',
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
  rule: /^(last)?block(-eth)?$/i,
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
    // only support single address
    getExplorerLink(
      singleAddr(addr || msg[2]),
      EXPLORER_ETHEREUM[CHAIN_ETHEREUM_EXPLORER_ETHERSCAN],
      robot.addons.search,
    )
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
    const data = singleAddr(addr || msg[2]);
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
    // only support single address
    getExplorerLink(
      singleAddr(addr || msg[2]),
      EXPLORER_ETHEREUM[CHAIN_ETHEREUM_EXPLORER_BLOCKCHAIR],
      robot.addons.search,
    )
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
    // only support single address
    getExplorerLink(
      singleAddr(addr || msg[2]),
      EXPLORER_ETHEREUM[CHAIN_ETHEREUM_EXPLORER_BITQUERY],
      robot.addons.search,
    )
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
    // only support single address
    getExplorerLink(
      singleAddr(addr || msg[2]),
      EXPLORER_ETHEREUM[CHAIN_ETHEREUM_EXPLORER_ETHERCHAIN],
      robot.addons.search,
    )
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
    // only support single address
    getExplorerLink(
      singleAddr(addr || msg[2]),
      EXPLORER_ETHEREUM[CHAIN_ETHEREUM_EXPLORER_TOKENVIEW],
      robot.addons.search,
    )
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
    // only support single address
    getExplorerLink(
      singleAddr(addr || msg[2]),
      EXPLORER_ETHEREUM[CHAIN_ETHEREUM_EXPLORER_ETHPLORER],
      robot.addons.search,
    )
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
    // only support single address
    getExplorerLink(
      singleAddr(addr || msg[2]),
      EXPLORER_ETHEREUM[CHAIN_ETHEREUM_EXPLORER_ANYBLOCK],
      robot.addons.search,
    )
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
  rule: /^(account )(.*)|^(defi )(.*)|^account$|^defi$/i,
  action: function(robot, msg) {
    const addr = (msg[4] === undefined) ? getConfig('ADDR', '') : msg[4];
    if (addr === '') {
      robot.send(t('needAddr', {i18n: i18nAddr}));
      robot.render();
      return;
    }
    let data = singleAddr(addr);
    robot.addons.confirm(t('pick', {i18n: i18nAddr}), [
      {
        title: t('random', {i18n: i18nAddr}),
        id: 'random',
        rule: /^random/i,
        action: () => robot.ask(`${getRandomItem([
          'dappradar',
          'debank',
          'zapper',
          'zerion',
        ])} ${data}`),
      },
      {
        title: 'DappRadar',
        id: 'dappradar',
        rule: /^dappradar/i,
        action: () => robot.ask(`dappradar ${data}`),
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
 * Check DeFi Balance on DappRadar.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillSearchDappradar = {
  name: DEFI_DAPPRADAR,
  help: '🧩dappradar [address] - check DeFi balance on DappRadar',
  requirements: {
    addons: ['search'],
  },
  rule: /(^dappradar )(.*)|^dappradar$/i,
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
    const data = singleAddr(addr || msg[2]);
    const url = DEFI_EXPLORER_ETHEREUM[DEFI_DAPPRADAR].url(data);
    robot.addons.search('Check', data, url, 'DappRadar');
  },
};

/**
 * Check DeFi Balance on debank.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillSearchDebank = {
  name: DEFI_DEBANK,
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
    const data = singleAddr(addr || msg[2]);
    const url = DEFI_EXPLORER_ETHEREUM[DEFI_DEBANK].url(data);
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
  name: DEFI_ZAPPER,
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
    const data = singleAddr(addr || msg[2]);
    const url = DEFI_EXPLORER_ETHEREUM[DEFI_ZAPPER].url(data);
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
    const data = singleAddr(addr || msg[2]);
    const url = DEFI_EXPLORER_ETHEREUM[DEFI_ZERION].url(data);
    robot.addons.search('Check', data, url, 'Zerion');
  },
};

// ==== Fees ===

/**
 * Check Total Fees consumption on fees.wtf.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillFeesWtf = {
  name: 'feeswtf',
  help: '💸feeswtf [address] - Check total fees consumption on fees.wtf',
  requirements: {
    addons: ['search'],
  },
  rule: /(^feeswtf )(.*)|^feeswtf$/i,
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
    // only support single address
    const data = singleAddr(addr || msg[2]);
    const url = 'https://fees.wtf/?address=' + data;
    robot.addons.search('Check', data, url, 'fees.wtf');
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
  skillSearchDappradar,
  skillSearchDebank,
  skillSearchZapper,
  skillSearchZerion,
];

const skills = [
  skillLastBlock,
  ...skillsAccount,
  ...skillsAddress,
  skillFeesWtf,
];
export {skills};
