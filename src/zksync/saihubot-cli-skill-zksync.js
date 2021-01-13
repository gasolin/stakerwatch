'use strict';
import React from 'react';
import { t } from 'saihubot-cli-adapter/dist/i18n';

import ZksyncBalances from './ZksyncBalances';

import {getConfig, parseArg, toArray, singleAddr, addrTxSearch} from '../utils';
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
    addrTxSearch(
      singleAddr(addr || msg[2]),
      (target) => {
        const url = 'https://zkscan.io/explorer/accounts/' + target;
      robot.addons.search('Check', target, url, 'zkSync');
      },
      (target) => {
        const url = 'https://zkscan.io/explorer/transactions/' + target;
        robot.addons.search('Check tx', target, url, 'zkSync');
      }
    )
  },
};


/**
 * Get balance of [addr] on ZkSync.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillGetZksyncBlance = {
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
  skillGetZksyncBlance,
  skillSearchZksync,
];
export {skills};
