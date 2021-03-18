'use strict';

import {getConfig} from '../utils';
import {jsonRpcFetch} from '../helpers/jsonRpc';

// ==== zkSync JSON RPC ===
// https://zksync.io/api/v0.1.html

let idx = 1;

export const rpcTokens = JSON.stringify({
  jsonrpc: '2.0',
  id: idx++,
  method: 'tokens',
  params: [],
});

export const rpcZkSyncBalance = (address) => JSON.stringify({
  jsonrpc: '2.0',
  id: idx++,
  method: 'account_info',
  params: [address],
});

// https://github.com/matter-labs/zksync/blob/dev/etc/js/env-config.js
let cachedZkSyncNodeUrl = '';

/**
 * Random pick a zksync node.
 *
 * can set yours via set SAIHUBOT_ZKSYNC_NODE_URL environment variable.
 */
export const getZksyncNodeURL = () => {
  if (cachedZkSyncNodeUrl) return cachedZkSyncNodeUrl;
  cachedZkSyncNodeUrl = getConfig('ZKSYNC_NODE_URL', 'https://api.zksync.io/jsrpc');
  return cachedZkSyncNodeUrl;
}

export const zksyncFetch = (fetch, body) =>
  jsonRpcFetch(fetch, getZksyncNodeURL(), body);
