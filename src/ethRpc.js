'use strict';

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
