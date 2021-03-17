'use strict';

import { getRandomItem } from 'staker-freenodes';

import {getConfig} from '../utils';
import {jsonRpcFetch} from '../helpers/jsonRpc';

// ==== Binance Smart Chain JSON RPC ===


export const BSC_NODES = [
  'https://bsc-dataseed1.binance.org',
  'https://bsc-dataseed2.binance.org',
  'https://bsc-dataseed3.binance.org',
  'https://bsc-dataseed4.binance.org',
  'https://bsc-dataseed1.defibit.io',
  'https://bsc-dataseed2.defibit.io',
  'https://bsc-dataseed3.defibit.io',
  'https://bsc-dataseed4.defibit.io',
  'https://bsc-dataseed1.ninicoin.io',
  'https://bsc-dataseed2.ninicoin.io',
  'https://bsc-dataseed3.ninicoin.io',
  'https://bsc-dataseed4.ninicoin.io',
];

let cachedBscNodeUrl = '';

/**
 * Random pick a BSC node.
 *
 * can set yours via set SAIHUBOT_BSC_NODE_URL environment variable.
 */
export const getBscNodeURL = () => {
  if (cachedBscNodeUrl) return cachedBscNodeUrl;
  cachedBscNodeUrl = getConfig('BSC_NODE_URL', getRandomItem(BSC_NODES));
  return cachedBscNodeUrl;
};

export const bscFetch = (fetch, body) =>
  jsonRpcFetch(fetch, getBscNodeURL(), body);

// self deployed ethscan contract
// https://github.com/MyCryptoHQ/eth-scan/blob/master/contracts/BalanceScanner.sol
export const BSC_ETHSCAN_CONTRACT = '0xeC7fb246a68Af0AA1828429B3A7C307e68680407';
