'use strict';
import React from 'react';
import { t } from 'saihubot-cli-adapter/dist/i18n';

import {getConfig, parseArg, singleAddr, toArray, addrTxSearch} from '../utils';
import {i18nAddr} from '../i18n';
import MaticBalances from './MaticBalances';

/**
 * Check address or tx on Matic.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillSearchMatic = {
  name: 'matic',
  help: '🏦matic [address|tx] - check address or tx on Matic',
  requirements: {
    addons: ['search'],
  },
  rule: /(^matic )(.*)|^matic$/i,
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
        const url = 'https://explorer-mainnet.maticvigil.com/address/' + target;
        robot.addons.search('Check', target, url, 'Matics');
      },
      (target) => {
        const url = 'https://explorer-mainnet.maticvigil.com/tx/' + target;
        robot.addons.search('Check tx', target, url, 'Matics');
      }
    )
  },
};


/**
 * Get balance of [addr] on MATIC Chain.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
 export const skillGetMaticBalance = {
  name: 'balance-matic',
  help: '💰balance-matic - Show address balance on MATIC chain',
  requirements: {
    addons: ['fetch'],
  },
  rule: /(^balance-matic )(.*)|^balance-matic$/i,
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
    robot.sendComponent(<MaticBalances addresses={addrs} />);
    robot.render();
  },
}

const skills = [
  skillGetMaticBalance,
  skillSearchMatic,
];
export {skills};
