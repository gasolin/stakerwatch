import {getConfig} from '../utils';
import {i18nAddr} from '../i18n';

// Side Chain

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
    const data = addr || msg[2];
    if(isAddr(data)) {
      const url = 'https://bscscan.com/address/' + data;
      robot.addons.search('Check', data, url, 'Binance Smart Chain');
    } else {
      const url = 'https://bscscan.com/tx/' + data;
      robot.addons.search('Check tx', data, url, 'Binance Smart Chain');
    }
  },
};

const skills = [
  skillSearchBSCscan,
];
export {skills};
