/* eslint-disable require-jsdoc */
'use strict';
import React from 'react';
import {t} from 'saihubot-cli-adapter/dist/i18n';

import DefiStakes from './DefiStakes'
import {getConfig, singleAddr} from '../utils';
import {i18nAddr} from '../i18n';

/**
 * Show balance in Defi projects.
 */
export const skillGetDefiBalance = {
  name: 'balance-defi',
  help: '💰balance-defi - Show balance in Defi projects',
  requirements: {
    addons: ['fetch'],
  },
  rule: /^balance-defi$|^(balance-defi )(.*)$/i,
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
    const data = singleAddr(addr || msg[2]);
    robot.sendComponent(<DefiStakes address={data} fetch={robot.addons.fetch} />);
  },
};

const skills = [skillGetDefiBalance];

export {skills};
