'use strict';
import React from 'react';
import { t } from 'saihubot-cli-adapter/dist/i18n';
import {EXPLORER_OKEXCHAIN, CHAIN_OKEXCHAIN_EXPLORER_OKLINK} from 'staker-freenodes'

import {getConfig, singleAddr, getExplorerLink} from '../utils';
import {i18nAddr} from '../i18n';

/**
 * Check address or tx on OKExChain.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillSearchOKExChain = {
  name: 'okexchain',
  help: '🏦okexchain [address|tx] - check address or tx on OKExChain',
  requirements: {
    addons: ['search'],
  },
  rule: /(^okexchain )(.*)|^okexchain$/i,
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
      EXPLORER_OKEXCHAIN[CHAIN_OKEXCHAIN_EXPLORER_OKLINK],
      robot.addons.search,
    )
  },
};

const skills = [
  skillSearchOKExChain,
];
export {skills};
