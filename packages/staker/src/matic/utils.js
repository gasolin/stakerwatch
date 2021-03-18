'use strict';

import { MATIC_NODES, getRandomItem } from 'staker-freenodes';

import {getConfig} from '../utils';
import {jsonRpcFetch} from '../helpers/jsonRpc';

let cachedMaticNodeUrl = '';


/**
 * Random pick a MATIC node.
 *
 * can set yours via set SAIHUBOT_MATIC_NODE_URL environment variable.
 */
 export const getMaticNodeURL = () => {
  if (cachedMaticNodeUrl) return cachedMaticNodeUrl;
  cachedMaticNodeUrl = getConfig('MATIC_NODE_URL', getRandomItem(MATIC_NODES));
  return cachedMaticNodeUrl;
};

export const maticFetch = (fetch, body) =>
  jsonRpcFetch(fetch, getMaticNodeURL(), body);

// self deployed ethscan contract
// https://github.com/MyCryptoHQ/eth-scan/blob/master/contracts/BalanceScanner.sol
export const MATIC_ETHSCAN_CONTRACT = '0xd570a3C50D157A58625e33C69F1542a5e5594b46';
