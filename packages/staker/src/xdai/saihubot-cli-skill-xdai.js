'use strict';

import React from 'react';
import { t } from 'saihubot-cli-adapter/dist/i18n';
import { EXPLORER_XDAI, CHAIN_XDAI_EXPLORER_BLOCKSCOUT} from 'staker-freenodes'

import {getConfig, parseArg, toArray, singleAddr, getExplorerLink} from '../utils';
import {rpcLastBlock} from '../helpers/ethRpc';
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
  help: '🏦xdai [address|tx] - check address or tx on xDai',
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
    // only support single address
    getExplorerLink(
      singleAddr(addr || msg[2]),
      EXPLORER_XDAI[CHAIN_XDAI_EXPLORER_BLOCKSCOUT],
      robot.addons.search,
    )
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
export const skillGetXdaiBalance = {
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
    const addrs = toArray(addr || parseArg(msg[2]));
    robot.sendComponent(<XdaiBalances addresses={addrs} />);
    robot.render();
  },
}

const skills = [
  skillGetXdaiBalance,
  skillLastXdaiBlock,
  skillSearchXDai,
];
export {skills};
