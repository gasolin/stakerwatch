'use strict';

import {getConfig, getRandomItem} from '../utils';
import {jsonRpcFetch} from '../helpers/jsonRpc';

// ==== xDai Chain JSON RPC ===

// https://www.xdaichain.com/for-developers/developer-resources#json-rpc-endpoints
export const XDAI_NODES = [
  'https://rpc.xdaichain.com/',
  'https://xdai.poanetwork.dev/',
];

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
