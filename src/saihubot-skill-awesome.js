'use strict';

import { t } from 'saihubot/dist/i18n';

const AWESOME_LINKS = [
  'http://beaconcha.in/',
  'http://etherscan.io/',
  'https://ethstats.net/',
  'https://studio.glassnode.com/metrics?a=ETH&m=addresses.ActiveCount',
  'https://www.stateofthedapps.com/rankings/platform/ethereum',
  'https://debank.com/projects',
  'https://github.com/ConsenSys/ethereum-developer-tools-list/blob/master/README.md',
  'https://github.com/bkrem/awesome-solidity',
  'https://github.com/PhABC/ethereum-token-standards-list',
  'https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-phases/',
  'https://beaconcha.in/stakingServices',
  'https://blockchair.com/ethereum',
  'https://blog.ethereum.org/',
  'https://launchpad.ethereum.org/',
];

/**
 * Randomly picking an awesome ethereum tool.
 */
export const skillAwesomeEth = {
  name: 'awesome',
  help: '🤩awesome|lucky - Show random awesome site around ethereum',
  requirements: {
    addons: ['openLink'],
  },
  i18n: {
    en: {
      desc: 'Randomly picking an awesome ethereum tool',
    },
    'zh_TW': {
      desc: '隨機挑出一個實用的以太坊工具',
    }
  },
  rule: /^awesome|^lucky/i,
  action: function(robot, msg) {
    robot.send(t('desc', {i18n: this.i18n}));
    robot.addons.openLink(AWESOME_LINKS[Math.floor(Math.random() * AWESOME_LINKS.length)]);
  }
}

const skills = [skillAwesomeEth];
export {skills};
