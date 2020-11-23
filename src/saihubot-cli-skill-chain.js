'use strict';

import React from 'react';
import { Text } from 'ink';
import Table from 'ink-table';
import AsciiBar from 'ascii-bar';
import { t } from 'saihubot/dist/i18n';
import {getConfig, getNodeURL, TOKEN} from './utils';

const ADDR = {
  ETH2_DEPOSIT: '0x00000000219ab540356cbb839cbe05303d7705fa',
}

const baseFetchOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
};

const ethFetch = (fetch, rpc) =>
  fetch(getNodeURL(), {
    ...baseFetchOptions,
    body: rpc,
  }).then(response => response.json())

let idx = 1;

// https://eth.wiki/json-rpc/API
const rpcLastBlock = JSON.stringify({
  jsonrpc: '2.0',
  id: idx++,
  method: 'eth_blockNumber',
  params: [],
});

const rpcEthBalance = (address) => JSON.stringify({
  jsonrpc: '2.0',
  id: idx++,
  method: 'eth_getBalance',
  params: [`${address}`, "latest"],
});

const rpcTokenBalance = (address, token) => JSON.stringify({
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

const rpcGasPrice = () => JSON.stringify({
  jsonrpc: '2.0',
  id: idx++,
  method: 'eth_gasPrice',
  params: [],
});

/**
 * Get the lastest block number.
 */
export const skillLastBlock = {
  name: 'lastblock',
  help: 'lastblock|block - get the lastest block number',
  requirements: {
    addons: ['fetch'],
  },
  i18n: {
    'en': {
      summary: 'The lastest block is {{blocknum}}',
    },
    'zh_TW': {
      summary: '最新的區塊是 {{blocknum}}',
    },
    props: ['blocknum']
  },
  rule: /^lastblock|^block/i,
  action: function(robot, msg) {
    ethFetch(robot.addons.fetch, rpcLastBlock)
    .then(json => {
      const msg = t('summary', {i18n: this.i18n, blocknum: parseInt(json.result)});
      robot.send(msg);
      robot.render();
    })
  },
}

/**
 * Get balance of [address].
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ETH_ADDR environment variable
 */
export const skillGetBlance = {
  name: 'balance',
  help: '💰balance - last balance of [address]',
  requirements: {
    addons: ['fetch'],
  },
  i18n: {
    'en': {
      query: 'Query balance...',
      token: 'Symbol',
      balance: 'Balance',
      needAddr: 'Please pass the address or define SAIHUBOT_ETH_ADDR first',
    },
    'zh_TW': {
      query: '查詢餘額中...',
      token: '幣種',
      balance: '餘額',
      needAddr: '請傳入地址或是預先定義 SAIHUBOT_ETH_ADDR 參數',
    },
    props: ['balance', 'usdt']
  },
  rule: /(^balance )(.*)|^balance/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ETH_ADDR', '');
      if (addr.trim() === '') {
        robot.send(t('needAddr', {i18n: this.i18n}));
        robot.render();
        return;
      }
    }
    const parsedAddr = addr.trim() || msg[2];
    async function getBalances(i18n) {
      const eth = await ethFetch(robot.addons.fetch, rpcEthBalance(parsedAddr));
      const ethBalance = (parseInt(eth.result)/10**18).toFixed(4);
      const usdt = await ethFetch(robot.addons.fetch, rpcTokenBalance(parsedAddr, TOKEN.USDT.addr));
      const usdtBalance = Math.round(parseInt(usdt.result, 16) * 100 /10**TOKEN.USDT.decimals)/100;
      let data = [
        {
          [t('token', {i18n})]: 'ETH',
          [t('balance', {i18n})]: ethBalance,
        }
      ];
      usdtBalance && data.push({
        [t('token', {i18n})]: 'USDt',
        [t('balance', {i18n})]: usdtBalance,
      })
      robot.sendComponent(<Table data={data} />);
      robot.render();
    }
    robot.send(t('query', {i18n: this.i18n}));
    robot.render();
    getBalances(this.i18n);
  },
}

const ProgressBar = ({percent, message, title}) => {
  const barSize = 30;
  const bar = new AsciiBar({
    formatString: '#bar #message',
    undoneSymbol: "░",
    doneSymbol: "▓",
    width: barSize,
    total: barSize,
    start: Math.min(Math.round(percent * barSize), barSize),
    enableSpinner: false,
    lastUpdateForTiming: false,
    message,
  });
  return (<>
      <Text>{title}</Text>
      <Text>{bar.renderLine()}</Text>
    </>
  )
}

/**
 * get ETH2 stake progress.
 *
 * 100511 ETH has been deposited for 3140 validators
 * [▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░] 19.17%
 */
export const skillEth2Stats = {
  name: 'stakestat',
  help: '🗞stats - lastest ETH2 stake state',
  requirements: {
    addons: ['fetch'],
  },
  rule: /^stats/i,
  i18n: {
    "en": {
      summary: `{{balance}} ETH has been deposited for {{validators}} validators`,
    },
    "zh_TW": {
      summary: `已存入 {{balance}} ETH, 支持 {{validators}} 位驗證者`,
    },
    props: ['balance', 'validators'],
  },
  action: function(robot, msg) {
    ethFetch(robot.addons.fetch, rpcEthBalance(ADDR.ETH2_DEPOSIT))
    .then(json => {
      const balance = Math.floor((json.result)/10**18);
      const percent = balance/524288;
      const validators = Math.floor(balance/32);
      const result = t('summary', {i18n: this.i18n, balance, validators})
      robot.sendComponent(
        <>
          <ProgressBar
            title={result}
            percent={percent}
            message={`${parseFloat(percent * 100).toFixed(2)}%`}
          />
        </>
      )
      robot.render();
    })
  },
}

/**
 * Show current ethereum Gas fee from the chain.
 */
export const skillGasFee = {
  name: 'gasfee',
  help: 'gasfee - Show current on-chain gas fee',
  requirements: {
    addons: ['fetch'],
  },
  i18n: {
    'en': {
      fee: 'Current on-chain gas fee is {{gas}} gwei',
    },
    'zh_TW': {
      fee: '當前鏈上的 Gas 費用為 {{gas}} gwei',
    },
    props: ['gas']
  },
  rule: /^gasfee/i,
  action: function(robot, msg) {
    ethFetch(robot.addons.fetch, rpcGasPrice())
    .then(json => {
      const gas = Number(json.result) / 10**9;
      const msg = t('fee', {i18n: this.i18n, gas})
      robot.send(msg);
      robot.render();
    })
  },
}

export const skillsETH2 = [skillEth2Stats, skillLastBlock];
const skills = [...skillsETH2, skillGetBlance, skillGasFee];
export {skills};
