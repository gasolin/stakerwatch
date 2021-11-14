'use strict';
import React from 'react';
import Table from 'ink-table';
import {t} from 'saihubot-cli-adapter/dist/i18n';
import {ETH_NODES, getRandomItem} from 'staker-freenodes';

/**
 * Randomly picking an awesome ethereum tool.
 */
export const skillChainId = {
  name: 'chainId',
  help: '⛓ network|config|network [chain] - find network config data (chain providers url and network id)',
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
  rule: /^(network |config )(.*)|^(network|config)/i,
  action: function(robot, msg) {
    robot.send('Fetching network configs...');
    robot.render();
    robot.addons.fetch('https://chainid.network/chains.json')
      .then(response => response.json())
      .then(json => {
        const term = msg[2] || '';
        const data = json.filter(entry => {
          if (!term) {
            return true
          }
          if (!isNaN(+term)) {
            return entry.chainId === +term
          }

          const lterm = term.toLowerCase();
          const name = entry.name.toLowerCase();
          const chain = entry.chain.toLowerCase();
          const symbol = entry.nativeCurrency.symbol.toLowerCase();
          return name.indexOf(lterm) > -1
                 || chain.indexOf(lterm) > -1
                 || symbol.indexOf(lterm) > -1;
        })
        .map(entry => ({
          name: entry.name,
          // randomly pick an rpc url
          rpc: entry.rpc && getRandomItem(entry.rpc.filter(rpc => !rpc.startsWith('wss://'))) || '',
          chainId: entry.chainId, //'0x' + entry.chainId.toString(16),
          symbol: (entry.nativeCurrency && entry.nativeCurrency.symbol) || '',
        })).filter(entry => entry.rpc !== '');
        if (data.length !== 0) {
          robot.sendComponent(<Table data={data} />);
        } else {
          robot.send(t('notfound', {i18n: this.i18n, term}));
        }
        robot.render();
      })
      .catch(err => {
        robot.send(err.message);
        robot.render();
      })
  }
}

/**
 * List free accessible ethereum nodes.
 */
export const skillNodes = {
  name: 'nodes',
  help: '⛓ nodes - list free accessible ethereum nodes',
  requirements: {
    adapters: ['cli'],
  },
  rule: /^nodes$/i,
  action: function(robot, msg) {
    robot.send(ETH_NODES.join('\n'));
    robot.render();
  }
}

const skills = [skillChainId, skillNodes];
export {skills};
