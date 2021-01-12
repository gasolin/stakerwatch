'use strict';

import React from 'react';
import { t } from 'saihubot-cli-adapter/dist/i18n';

import {getConfig, parseArg, toArray} from '../utils';
import {rpcLastBlock} from '../ethRpc';
import {i18nAddr, i18nBalance} from '../i18n';
import XdaiBalances from './XdaiBalances';
import {xdaiFetch} from './utils'

/**
 * Check address or tx on xDai.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillSearchXDai = {
  name: 'xdai',
  help: '🏦xdai [address|tx] - check address or tx on xDai Chain',
  requirements: {
    addons: ['search'],
  },
  rule: /(^xdai )(.*)|^xdai$/i,
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
      const url = 'https://blockscout.com/poa/xdai/address/' + data + '/tokens';
      robot.addons.search('Check', data, url, 'xDai');
    } else {
      const url = 'https://blockscout.com/poa/xdai/tx/' + data + '/internal-transactions';
      robot.addons.search('Check tx', data, url, 'xDai Chain');
    }
  },
};

/**
 * Get the latest block number.
 */
export const skillLastXdaiBlock = {
  name: 'lastblock-xdai',
  help: '🗂 lastblock-xdai|block-xdai - get the latest xDai block number',
  requirements: {
    addons: ['fetch'],
  },
  i18n: {
    'en': {
      fetching: 'Fetching xDai data...',
      summary: 'The latest xDai block is **{{blocknum}}**',
    },
    'zh_TW': {
      fetching: '取得 xDai 資料中...',
      summary: '最新的xDai區塊是 **{{blocknum}}**',
    },
    props: []
  },
  rule: /^(last)?block-?xdai$/i,
  action: function(robot, msg) {
    robot.send(t('fetching', {i18n: this.i18n}));
    robot.render();
    xdaiFetch(robot.addons.fetch, rpcLastBlock)
      .then(json => {
        const msg = t('summary', {i18n: this.i18n, blocknum: parseInt(json.result)});
        robot.send(msg);
        robot.render();
      });
  },
}

/**
 * Get balance of [addr] on xDai Chain.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillGetXdaiBlance = {
  name: 'balance-xdai',
  help: '💰balance-xdai - Show address balance on xDai chain',
  requirements: {
    addons: ['fetch'],
  },
  rule: /(^balance-xdai )(.*)|^balance-xdai$/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ADDR', '');
      if (!addr) {
        robot.send(t('needAddr', {i18n: i18nBalance}));
        robot.render();
        return;
      }
    }
    const parsedAddr = addr || parseArg(msg[2]);
    const addrs = toArray(parsedAddr);
    robot.sendComponent(<XdaiBalances addresses={addrs} fetch={robot.addons.fetch} xdaiFetch={xdaiFetch} />);
    robot.render();
  },
}

const skills = [
  skillGetXdaiBlance,
  skillLastXdaiBlock,
  skillSearchXDai,
];
export {skills};
