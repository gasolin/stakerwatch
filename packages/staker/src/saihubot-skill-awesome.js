'use strict';

import { t } from 'saihubot-cli-adapter/dist/i18n';

//TODO: add desc
const AWESOME_LINKS = [
  {
    link: 'https://twitter.com/stakerwatch',
    description: 'twitter for the stakerwat.ch project',
  },
  {
    link: 'https://ethstats.net/',
    description: 'Ethereum related stats',
  },
  {
    link: 'https://studio.glassnode.com/metrics?a=ETH&m=addresses.ActiveCount',
    description: '',
  },
  {
    link: 'https://www.stateofthedapps.com/rankings/platform/ethereum',
    description: '',
  },
  {
    link: 'https://debank.com/projects',
    description: 'List Defi Projects',
  },
  {
    link: 'https://github.com/ConsenSys/ethereum-developer-tools-list/blob/master/README.md',
    description: '',
  },
  {
    link: 'https://github.com/bkrem/awesome-solidity',
    description: 'awesome list of solidity related projects',
  },
  {
    link: 'https://github.com/PhABC/ethereum-token-standards-list',
    description: '',
  },
  {
    link: 'https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-phases/',
    description: 'Explain Ethereum 2.0 phases',
  },
  {
    link: 'https://beaconcha.in/stakingServices',
    description: 'List of Ethereum 2.0 staking services',
  },
  {
    link: 'https://blockchair.com/ethereum',
    description: '',
  },
  {
    link: 'https://blog.ethereum.org/',
    description: '',
  },
  {
    link: 'https://launchpad.ethereum.org/',
    description: '',
  },
  {
    link: 'https://ethernodes.org/',
    description: '',
  },
  {
    link: 'https://www.youtube.com/watch?v=ShJZf5lsXiM',
    description: '',
  },
  {
    link: 'https://ethgas.watch/',
    description: 'Collection of gasfee estimators',
  },
  {
    link: 'https://beaconcha.in/education',
    description: '',
  },
  {
    link: 'https://defipulse.com/',
    description: '',
  },
  {
    link: 'https://cryptofees.info/',
    description: '',
  },
  {
    link: 'https://app.defiscore.io/assets/usdt',
    description: '',
  },
  {
    link: 'https://txstreet.com/',
    description: 'Gamify Tx explorer',
  },
  {
    link: 'https://terminal.tokenterminal.com/',
    description: '',
  },
  {
    link: 'https://notes.ethereum.org/@protolambda/eth2_tooling',
    description: 'Ethereum 2 tooling',
  },
  {
    link: 'https://app.daohaus.club/explore',
    description: 'List of DAOs',
  },
  {
    link: 'https://github.com/ethereum/EIPs/tree/master/EIPS',
    description: 'List of Ethereum Improvement Proposals',
  },
  {
    link: 'https://ethmerge.com/',
    description: 'The ETH 2.0 merge live document',
  },
  {
    link: 'https://www.l2beat.com/',
    description: 'Layer 2 project pulse',
  },
  {
    link: 'https://chainlist.org/',
    description: 'Helping users connect to EVM powered networks',
  },
  {
    link: 'https://defillama.com/',
    description: 'list multichain DEFI projects',
  },
  {
    link: 'https://ethereum.org/en/history/',
    description: 'Ethereum milestones',
  }
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
    robot.addons.openLink(AWESOME_LINKS[Math.floor(Math.random() * AWESOME_LINKS.length)]?.link);
  }
}

const skills = [skillAwesomeEth];
export {skills};
