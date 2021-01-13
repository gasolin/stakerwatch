'use strict';

import {getConfig, singleAddr, addrTxSearch} from '../utils';
import {i18nAddr} from '../i18n';

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
    addrTxSearch(
      singleAddr(addr || msg[2]),
      (target) => {
        const url = 'https://bscscan.com/address/' + target;
        robot.addons.search('Check', target, url, 'Binance Smart Chain');
      },
      (target) => {
        const url = 'https://bscscan.com/tx/' + target;
        robot.addons.search('Check tx', target, url, 'Binance Smart Chain');
      }
    )
  },
};

const skills = [
  skillSearchBSCscan,
];
export {skills};
