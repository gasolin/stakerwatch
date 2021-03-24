'use strict';
import {ETH_NODES, getRandomItem} from 'staker-freenodes';

import {jsonRpcFetch} from '../helpers/jsonRpc';
import {getConfig} from '../utils';

let idx = 1;

// https://eth.wiki/json-rpc/API
export const rpcLastBlock = JSON.stringify({
  jsonrpc: '2.0',
  id: idx++,
  method: 'eth_blockNumber',
  params: [],
});

export const rpcEthBalance = (address) => JSON.stringify({
  jsonrpc: '2.0',
  id: idx++,
  method: 'eth_getBalance',
  params: [`${address}`, "latest"],
});

const ERC20_GET_BALANCE = '0x70a08231'
export const rpcTokenBalance = (address, token) => JSON.stringify({
  jsonrpc: '2.0',
  id: idx++,
  method: 'eth_call',
  params: [{
      to: token,
      data: `${ERC20_GET_BALANCE}${address.replace('0x', '').padStart(64, '0')}`,
    },
    'latest'
  ],
});

const DEFI_SDK_GET_BALANCES = '0xc84aae17'
export const rpcDefiGetBalances = (address) => JSON.stringify({
  jsonrpc: '2.0',
  id: idx++,
  method: 'eth_call',
  params: [{
      // https://docs.zerion.io/smart-contracts/addresses/main-contracts
      // AdapterRegistry (v3)
      to: '0xaDfc6460233221eCa99daC25d00f98d32eA3989e',
      data: `${DEFI_SDK_GET_BALANCES}${address.replace('0x', '').padStart(64, '0')}`,
    },
    'latest'
  ],
});

export const rpcGasPrice = () => JSON.stringify({
  jsonrpc: '2.0',
  id: idx++,
  method: 'eth_gasPrice',
  params: [],
});

let cachedNodeURL = '';

/**
 * Random pick a ethereum node.
 *
 * can set yours via set SAIHUBOT_NODE_URL environment variable.
 * @param {boolean} cache cached the returned node selection in a session (default false)
 */
export const getNodeURL = (cache = false) => {
  if (cache && cachedNodeURL) return cachedNodeURL;
  cachedNodeURL = getConfig('NODE_URL', getRandomItem(ETH_NODES));
  return cachedNodeURL;
}

export const ethFetch = (fetch, body) =>
  jsonRpcFetch(fetch, getNodeURL(), body);
