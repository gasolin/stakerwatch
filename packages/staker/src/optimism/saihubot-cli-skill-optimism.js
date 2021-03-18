'use strict';
import React from 'react';
import { t } from 'saihubot-cli-adapter/dist/i18n';

// import OptimismBalances from './OptimismBalances';

import {getConfig, parseArg, toArray, singleAddr, addrTxSearch} from '../utils';
import {i18nBalance} from '../i18n';

/**
 * Check address or tx on optimism.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillSearchOptimism = {
  name: 'optimism',
  help: '🏦optimism [address|tx] - check address or tx on optimism',
  requirements: {
    addons: ['search'],
  },
  rule: /(^optimism )(.*)|^optimism$/i,
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
        const url = `https://mainnet-l2-explorer.surge.sh/account/${target}`;
        robot.addons.search('Check', target, url, 'optimism');
      },
      (target) => {
        const url = `https://mainnet-l2-explorer.surge.sh/tx/${target}`;
        robot.addons.search('Check tx', target, url, 'optimism');
      }
    )
  },
};


/**
 * Get balance of [addr] on Optimism.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
// export const skillGetOptimismBalance = {
//   name: 'balance-optimism',
//   help: '💰balance-optimism - Show address balance on Optimism',
//   requirements: {
//     addons: ['fetch'],
//   },
//   rule: /(^balance-optimism )(.*)|^balance-optimism$/i,
//   action: function(robot, msg) {
//     let addr = '';
//     if (msg[2] === undefined) {
//       addr = getConfig('ADDR', '');
//       if (!addr) {
//         robot.send(t('needAddr', {i18n: i18nBalance}));
//         robot.render();
//         return;
//       }
//     }
//     const parsedAddr = addr || parseArg(msg[2]);
//     const addrs = toArray(parsedAddr);
//     robot.sendComponent(<OptimismBalances addresses={addrs} fetch={robot.addons.fetch} />);
//     robot.render();
//   },
// }

const skills = [
  // skillGetOptimismBlance,
  skillSearchOptimism,
];
export {skills};
