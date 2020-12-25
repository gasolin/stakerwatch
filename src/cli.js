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
  skillsAccount,
  skillsAddress,
  skillsValidator,
  skillsSideChain,
} from './saihubot-cli-skill-eth';
import {skillsGas} from './saihubot-cli-skill-ethgas';
import {skillsETH2, skillsXDAI, skillGasFee} from './saihubot-cli-skill-chain';
import {skills as skillAwesome} from './saihubot-skill-awesome';
import {skills as skillBalance} from './saihubot-cli-skill-balance';
import {skillChainId} from './saihubot-cli-skill-chainid';

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
    ...skillsETH2,
    skillGasFee,
    ...skillsGas,
    ...skillBalance,
    ...skillsAccount,
    ...skillsAddress,
    ...skillsValidator,
    ...skillsSideChain,
    ...skillsXDAI,
    ...skillAwesome,
    skillChainId,
    skillQRCode,
    skillHelp,
  ],
  debug: cli.flags && cli.flags.debug,
});

bot.ask(cli.input.join(' '));
