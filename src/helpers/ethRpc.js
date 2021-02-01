'use strict';
import {getConfig, getRandomItem} from '../utils';

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

export const rpcTokenBalance = (address, token) => JSON.stringify({
  jsonrpc: '2.0',
  id: idx++,
  method: 'eth_call',
  params: [{
      to: token,
      data: `0x70a08231${address.replace('0x', '').padStart(64, '0')}`,
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

// free nodes without API keys from https://ethereumnodes.com/
const ETH_NODES = [
  'https://api.mycryptoapi.com/eth', // MyCrypto
  'https://web3.1inch.exchange/', // 1inch
  'https://cloudflare-eth.com/', // Cloudflare
  'https://mainnet-nethermind.blockscout.com/', // Blockscout
  'https://nodes.mewapi.io/rpc/eth', // MyEtherWallet
  'https://mainnet.eth.cloud.ava.do/', // AVADO
  'https://eth-mainnet.zerion.io/',
  'https://main-light.eth.linkpool.io',
];

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

export const baseFetchOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
};

export const ethFetch = (fetch, body) =>
  fetch(getNodeURL(), {
    ...baseFetchOptions,
    body,
  }).then(response => response.json());
