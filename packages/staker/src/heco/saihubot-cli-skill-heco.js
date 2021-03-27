'use strict';
import React from 'react';
import { t } from 'saihubot-cli-adapter/dist/i18n';
import {EXPLORER_HECO, CHAIN_HECO_EXPLORER_HECOINFO} from 'staker-freenodes'

import {getConfig, singleAddr, getExplorerLink} from '../utils';
import {i18nAddr} from '../i18n';

/**
 * Check address or tx on Huobi Eco Chain.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillSearchHeco = {
  name: 'heco',
  help: '🏦heco [address|tx] - check address or tx on Huobi Eco Chain',
  requirements: {
    addons: ['search'],
  },
  rule: /(^heco )(.*)|^heco$/i,
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

    // only support single address
    getExplorerLink(
      singleAddr(addr || msg[2]),
      EXPLORER_HECO[CHAIN_HECO_EXPLORER_HECOINFO],
      robot.addons.search,
    )
  },
};

const skills = [
  skillSearchHeco,
];
export {skills};
