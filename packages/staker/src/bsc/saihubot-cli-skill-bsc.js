'use strict';
import React from 'react';
import { t } from 'saihubot-cli-adapter/dist/i18n';
import {EXPLORER_BSC, CHAIN_BSC_EXPLORER_BSCSCAN} from 'staker-freenodes'

import {getConfig, parseArg, singleAddr, toArray, getExplorerLink} from '../utils';
import {i18nAddr} from '../i18n';
import BscBalances from './BscBalances';
import {bscFetch} from './utils'

/**
 * Check address or tx on bscscan.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillSearchBSCscan = {
  name: 'bscscan',
  help: '🏦bsc|bscscan [address|tx] - check address or tx on Binance Smart Chain',
  requirements: {
    addons: ['search'],
  },
  rule: /(^bscscan |^bsc )(.*)|^bscscan$|^bsc$/i,
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
      EXPLORER_BSC[CHAIN_BSC_EXPLORER_BSCSCAN],
      robot.addons.search,
    )
  },
};

/**
 * Get balance of [addr] on Binance Smart Chain.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillGetBscBalance = {
  name: 'balance-bsc',
  help: '💰balance-bsc - Show address balance on Binance Smart chain',
  requirements: {
    addons: ['fetch'],
  },
  rule: /(^balance-bsc )(.*)|^balance-bsc$/i,
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
    robot.sendComponent(<BscBalances addresses={addrs} fetch={robot.addons.fetch} bscFetch={bscFetch} />);
    robot.render();
  },
}

const skills = [
  skillGetBscBalance,
  skillSearchBSCscan,
];
export {skills};
