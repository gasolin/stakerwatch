'use strict';
import React from 'react';
import Table from 'ink-table';

import {getRandomItem} from './utils';

/**
 * Randomly picking an awesome ethereum tool.
 */
export const skillChainId = {
  name: 'chainId',
  help: '📕chainid - Show EVM network providers chain and network id table',
  requirements: {
    addons: ['fetch'],
  },
  rule: /^chainid$/i,
  action: function(robot, msg) {
    robot.send('Fetching chain ids...');
    robot.render();
    robot.addons.fetch('https://chainid.network/chains.json')
      .then(response => response.json())
      .then(json => {
        const data = json.map(entry => ({
          name: entry.name,
          rpc: (entry.rpc && getRandomItem(entry.rpc)) || '',
          chainId: entry.chainId,
          symbol: (entry.nativeCurrency && entry.nativeCurrency.symbol) || '',
        })).filter(entry => entry.rpc !== '');
        robot.sendComponent(<Table data={data} />);
        robot.render();
      })
  }
}

const skills = [skillChainId];
export {skills};
