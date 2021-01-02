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
import {addonFetchGas} from './saihubot-addon-ethgas';
import {skillQRCode} from './saihubot-cli-skill-delegates';
import {
  skillLastBlock,
  skillsAccount,
  skillsAddress,
} from './saihubot-cli-skill-eth';
import {
  skillEth2Stats,
  skillBeaconLastBlock,
  skillGetValidatorBlance,
  skillsValidator,
} from './saihubot-cli-skill-eth2';
import {skillsGas} from './saihubot-cli-skill-ethgas';
import {skillGetBlance, skillGetEthBlance} from './saihubot-cli-skill-balance';
import {skills as skillsXDAI} from './saihubot-cli-skill-xdai';
import {skills as skillsBSC} from './saihubot-cli-skill-bsc';
import {skillChainId} from './saihubot-cli-skill-chainid';
import {skillAwesomeEth} from './saihubot-skill-awesome';

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
    skillGetBlance,
    skillGetEthBlance,
    skillLastBlock,
    ...skillsAddress,
    skillGetValidatorBlance,
    skillBeaconLastBlock,
    ...skillsValidator,
    skillEth2Stats,
    ...skillsAccount,
    ...skillsGas,
    ...skillsXDAI,
    ...skillsBSC,
    skillChainId,
    skillAwesomeEth,
    skillQRCode,
    skillHelp,
  ],
  debug: cli.flags && cli.flags.debug,
});

bot.ask(cli.input.join(' '));
