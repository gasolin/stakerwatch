#!/usr/bin/env node
'use strict';
import meow from 'meow';
import SaihuBot from 'saihubot/dist/saihubot';
import {
  cliAdapter,
  addonSearch,
  addonFetch,
  addonExec,
  skillHelp,
} from 'saihubot-cli-adapter';
import {skillQRCode} from './saihubot-cli-skill-delegate-qrcode';
import {skills as skillsEth} from './saihubot-cli-skill-eth';
import {skills as slillsChain} from './saihubot-cli-skill-chain';

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
  addons: [addonSearch, addonFetch, addonExec],
  skills: [
    ...slillsChain,
    ...skillsEth,
    skillQRCode,
    skillHelp,
  ],
  debug: cli.flags && cli.flags.debug,
});

bot.ask(cli.input.join(' '));
