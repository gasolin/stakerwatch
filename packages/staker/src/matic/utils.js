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
