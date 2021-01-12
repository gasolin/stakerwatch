'use strict';

import {getConfig, isAddr} from '../utils';
import {i18nAddr} from '../i18n';

/**
 * Check address or tx on Matics.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillSearchMatics = {
  name: 'matics',
  help: '🏦matics [address|tx] - check address or tx on Matics',
  requirements: {
    addons: ['search'],
  },
  rule: /(^matics )(.*)|^matics$/i,
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
      const url = 'https://explorer-mainnet.maticvigil.com/address/' + data;
      robot.addons.search('Check', data, url, 'Matics');
    } else {
      const url = 'https://explorer-mainnet.maticvigil.com/tx/' + data;
      robot.addons.search('Check tx', data, url, 'Matics');
    }
  },
};

const skills = [
  skillSearchMatics,
];
export {skills};
