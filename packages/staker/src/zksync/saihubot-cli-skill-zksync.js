'use strict';
import React from 'react';
import { t } from 'saihubot-cli-adapter/dist/i18n';
import {EXPLORER_L2_ZKSYNC, L2_ZKSYNC_EXPLORER} from 'staker-freenodes'

import ZksyncBalances from './ZksyncBalances';

import {getConfig, parseArg, toArray, singleAddr, getExplorerLink} from '../utils';
import {i18nBalance} from '../i18n';

/**
 * Check address or tx on zkSync.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillSearchZksync = {
  name: 'zksync',
  help: '🏦zksync [address|tx] - check address or tx on zkSync',
  requirements: {
    addons: ['search'],
  },
  rule: /(^zksync )(.*)|^zksync$/i,
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
      EXPLORER_L2_ZKSYNC[L2_ZKSYNC_EXPLORER],
      robot.addons.search,
    )
  },
};


/**
 * Get balance of [addr] on ZkSync.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillGetZksyncBalance = {
  name: 'balance-zksync',
  help: '💰balance-zksync - Show address balance on ZkSync',
  requirements: {
    addons: ['fetch'],
  },
  rule: /(^balance-zksync )(.*)|^balance-zksync$/i,
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
    robot.sendComponent(<ZksyncBalances addresses={addrs} fetch={robot.addons.fetch} />);
    robot.render();
  },
}

const skills = [
  skillGetZksyncBalance,
  skillSearchZksync,
];
export {skills};
