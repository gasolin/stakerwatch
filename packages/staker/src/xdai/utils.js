'use strict';
import {XDAI_NODES, getRandomItem} from 'staker-freenodes'

import {getConfig} from '../utils';
import {jsonRpcFetch} from '../helpers/jsonRpc';

// ==== xDai Chain JSON RPC ===

let cachedXdaiNodeUrl = '';

/**
 * Random pick a xdai node.
 *
 * can set yours via set SAIHUBOT_XDAI_NODE_URL environment variable.
 */
export const getXdaiNodeURL = () => {
  if (cachedXdaiNodeUrl) return cachedXdaiNodeUrl;
  cachedXdaiNodeUrl = getConfig('XDAI_NODE_URL', getRandomItem(XDAI_NODES));
  return cachedXdaiNodeUrl;
};

export const xdaiFetch = (fetch, body) =>
  jsonRpcFetch(fetch, getXdaiNodeURL(), body);
