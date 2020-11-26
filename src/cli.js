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
import {skillQRCode} from './saihubot-cli-skill-delegates';
import {skillsAccount, skillsAddress, skillsTx, skillsValidator, skillsGas} from './saihubot-cli-skill-eth';
import {skillsETH2, skillGetBlance, skillGasFee} from './saihubot-cli-skill-chain';
import {skills as skillAwesome} from './saihubot-skill-awesome';
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
  ],
  skills: [
    ...skillsETH2,
    skillGasFee,
    ...skillsGas,
    skillGetBlance,
    ...skillsAccount,
    ...skillsAddress,
    ...skillsTx,
    ...skillsValidator,
    ...skillAwesome,
    skillQRCode,
    skillHelp,
  ],
  debug: cli.flags && cli.flags.debug,
});

bot.ask(cli.input.join(' '));
