#!/usr/bin/env node
'use strict';
import meow from 'meow';
import SaihuBot from 'saihubot/dist/saihubot';
import {
  cliAdapter,
  addonConfirm,
  addonSearch,
  addonOpenLink,
  addonFetch,
  addonExec,
  skillHelp,
} from 'saihubot-cli-adapter';
import {addonFetchGas} from './saihubot-addon-ethgas.js';
import {skills as skillDelegates} from './saihubot-cli-skill-delegates.js';
import {
  skillLastBlock,
  skillsAccount,
  skillsAddress,
  skillFeesWtf,
} from './eth/saihubot-cli-skill-eth.js';
import {
  skillEth2Stats,
  skillBeaconLastBlock,
  skillGetValidatorBalance,
  skillsValidator,
} from './eth2/saihubot-cli-skill-eth2.js';
// import {skills as skillsDefi} from './defi/saihubot-cli-skill-defi';
import {skillsGas} from './eth/saihubot-cli-skill-ethgas.js';
import {skillGetBalance, skillGetEthBalance, skillGetTokensPrice} from './saihubot-cli-skill-balance.js';
import {skills as skillsXDAI} from './xdai/saihubot-cli-skill-xdai.js';
import {skills as skillsBSC} from './bsc/saihubot-cli-skill-bsc.js';
import {skills as skillsHeco} from './heco/saihubot-cli-skill-heco.js';
import {skills as skillsMatic} from './matic/saihubot-cli-skill-matic.js';
import {skills as skillOKExChain} from './okexchain/saihubot-cli-skill-okexchain.js';
import {skills as skillsZkSync} from './zksync/saihubot-cli-skill-zksync.js';
import {skills as skillsOptimism} from './optimism/saihubot-cli-skill-optimism.js';
import {skills as skillsChain} from './saihubot-cli-skill-chainid.js';
import {skillAwesomeEth} from './saihubot-skill-awesome.js';

const cli = meow(`
  v${process.env.npm_package_version}
  Usage
    $ staker [command]

  Options
    --debug show debug messages

  Examples
    $ staker help
`, {
  flags: {
    debug: {
      type: 'boolean',
      alias: 'd',
    },
  },
});

const bot = new SaihuBot({
  adapter: cliAdapter(cli),
  bot: '🤖',
  addons: [
    addonConfirm,
    addonSearch,
    addonFetch,
    addonOpenLink,
    addonExec,
    addonFetchGas,
  ],
  skills: [
    skillGetBalance,
    skillGetEthBalance,
    // ...skillsDefi,
    skillGetTokensPrice,
    skillLastBlock,
    ...skillsAddress,
    skillGetValidatorBalance,
    skillBeaconLastBlock,
    ...skillsValidator,
    skillEth2Stats,
    ...skillsAccount,
    ...skillsGas,
    skillFeesWtf,
    ...skillsChain,
    ...skillsBSC,
    ...skillsHeco,
    ...skillsMatic,
    ...skillOKExChain,
    ...skillsXDAI,
    ...skillsZkSync,
    ...skillsOptimism,
    skillAwesomeEth,
    ...skillDelegates,
    skillHelp,
  ],
  debug: cli.flags && cli.flags.debug,
});

bot.ask(cli.input.join(' '));
