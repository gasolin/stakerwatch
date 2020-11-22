#!/usr/bin/env node
'use strict';
import meow from 'meow';
import SaihuBot from 'saihubot/dist/saihubot';
import {
  cliAdapter,
  addonSearch,
  addonOpenLink,
  addonFetch,
  addonExec,
  skillHelp,
} from 'saihubot-cli-adapter';
import {skillQRCode} from './saihubot-cli-skill-delegates';
import {skillsAddress, skillsTx, skillsBeacon, skillsGas} from './saihubot-cli-skill-eth';
import {skills as skillsChain} from './saihubot-cli-skill-chain';
import {skills as skillAwesome} from './saihubot-skill-awesome';
const cli = meow(`
  Usage
    $ staker

  Options
    --debug show debug messages

  Examples
    $ staker stats
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
  addons: [addonSearch, addonFetch, addonOpenLink, addonExec],
  skills: [
    ...skillsChain,
    ...skillsGas,
    ...skillsAddress,
    ...skillsTx,
    ...skillsBeacon,
    ...skillAwesome,
    skillQRCode,
    skillHelp,
  ],
  debug: cli.flags && cli.flags.debug,
});

bot.ask(cli.input.join(' '));
