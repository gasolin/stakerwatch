'use strict';
import React from 'react';
import Table from 'ink-table';
import {t} from 'saihubot-cli-adapter/dist/i18n';

import {getRandomItem} from './utils';

/**
 * Randomly picking an awesome ethereum tool.
 */
export const skillChainId = {
  name: 'chainId',
  help: '⛓ config|config [chain] - find MetaMask network config data (chain providers url and network id)',
  requirements: {
    addons: ['fetch'],
  },
  i18n: {
    'en': {
      'notfound': 'Not found any chain config with `{{term}}`',
    },
    'zh_TW': {
      'notfound': '沒找到符合 `{{term}}` 的網路設定'
    },
    props: ['term']
  },
  rule: /(^config )(.*)|^config$|^chainid$/i,
  action: function(robot, msg) {
    robot.send('Fetching chain ids...');
    robot.render();
    robot.addons.fetch('https://chainid.network/chains.json')
      .then(response => response.json())
      .then(json => {
        const term = msg[2] || '';
        const data = json.filter(entry => {
          if (!term) {
            return true
          }
          const lterm = term.toLowerCase();
          const name = entry.name.toLowerCase();
          const symbol = entry.nativeCurrency.symbol.toLowerCase();
          return name.indexOf(lterm) > -1 || symbol.indexOf(lterm) > -1;
        })
        .map(entry => ({
          name: entry.name,
          rpc: (entry.rpc && getRandomItem(entry.rpc)) || '',
          chainId: entry.chainId,
          symbol: (entry.nativeCurrency && entry.nativeCurrency.symbol) || '',
        })).filter(entry => entry.rpc !== '');
        if (data.length !== 0) {
          robot.sendComponent(<Table data={data} />);
        } else {
          robot.send(t('notfound', {i18n: this.i18n, term}));
        }
        robot.render();
      })
  }
}

const skills = [skillChainId];
export {skills};
