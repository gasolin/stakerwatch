'use strict';

import React, {useEffect, useState} from 'react';
import { Text } from 'ink';
import AsciiBar from 'ascii-bar';
import humanizeDuration from 'humanize-duration';
import commaNumber from 'comma-number';
import { t } from 'saihubot-cli-adapter/dist/i18n';
import {getNodeURL} from './utils';

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
  }).then(response => response.json());

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

/*const rpcTokenBalance = (address, token) => JSON.stringify({
  jsonrpc: '2.0',
  id: idx++,
  method: 'eth_call',
  params: [{
      to: token,
      data: `0x70a08231${address.replace('0x', '').padStart(64, '0')}`,
    },
    'latest'
  ],
});*/

const rpcGasPrice = () => JSON.stringify({
  jsonrpc: '2.0',
  id: idx++,
  method: 'eth_gasPrice',
  params: [],
});

/**
 * Get the latest block number.
 */
export const skillLastBlock = {
  name: 'lastblock',
  help: 'lastblock|block - get the latest Eth1 block number',
  requirements: {
    addons: ['fetch'],
  },
  i18n: {
    'en': {
      fetching: 'Fetching data...',
      summary: 'The latest block is **{{blocknum}}**',
    },
    'zh_TW': {
      fetching: '取得資料中...',
      summary: '最新的區塊是 **{{blocknum}}**',
    },
    props: ['blocknum']
  },
  rule: /^(last)?block$/i,
  action: function(robot, msg) {
    robot.send(t('fetching', {i18n: this.i18n}));
    robot.render();
    ethFetch(robot.addons.fetch, rpcLastBlock)
    .then(json => {
      const msg = t('summary', {i18n: this.i18n, blocknum: parseInt(json.result)});
      robot.send(msg);
      robot.render();
    })
  },
}

const statsI18n = {
  "en": {
    fetching: 'Fetching data...',
    summary: `{{balance}} ETH has been deposited for {{validators}} validators`,
    statistics: `🤑 Reward Rate: {{apr}}%
🌾 Participation rate: {{participationRate}}%
💃 Active Validator: {{activeValidator}}
📦 Latest Epoch: {{epoch}}

👬 Queued Validator: {{queueValidator}}
⏳ Wait time: {{waitTime}}
`,
  },
  "zh_TW": {
    fetching: '取得資料中...',
    summary: `已存入 {{balance}} ETH, 支持 {{validators}} 位驗證者`,
    statistics: `🤑 預估收益率: {{apr}}%
🌾 參與度: {{participationRate}}%
💃 活躍驗證者: {{activeValidator}}
📦 最近的 Epoch: {{epoch}}

👬 排隊中的驗證者: {{queueValidator}}
⏳ 預估等待時間: {{waitTime}}
`,
  },
  props: ['apr', 'balance', 'validators', 'activeValidator', 'participationRate', 'epoch', 'queueValidator', 'waitTime'],
}


// https://github.com/TheRyanMiller/Eth2RewardsCalc/blob/master/getBeaconData.js
export const calcWaitTime = (queueLength) => {
  //225 Epochs per day (1 epoch = 32 * 12s slots)
  //900 validators can be activated per day (4 per epoch)
  // 1 validator every 96 seconds
  let time = 0;
  if (queueLength > 0) time = 96 * queueLength;
  return humanizeDuration(time * 1000, { round: true, units: ["d", "h"] });
}

// https://www.reddit.com/r/ethstaker/comments/k7e9k0/what_will_be_the_minimum_apr_rate_for_eth2_stake/gexwpzq/
export const calcAPR = (validatorscount) =>  (14300 / Math.sqrt(validatorscount)).toFixed(2);

const ProgressBar = ({fetch, ethFetch}) => {
  const [beaconData, setBeaconData] = useState({});
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    async function fetchBalance() {
      ethFetch(fetch, rpcEthBalance(ADDR.ETH2_DEPOSIT))
      .then(json => setBalance(Math.floor((json.result)/10**18)));
    }
    fetchBalance();
  }, [ethFetch, fetch]);

  useEffect(() => {
    async function fetchLatest() {
      fetch('https://beaconcha.in/api/v1/epoch/latest')
      .then(response => response.json())
      .then(json => setBeaconData(json.data));
    }
    fetchLatest();
  }, [fetch]);

  const percent = balance/524288;
  const validators = Math.floor(balance/32);
  const message = `${parseFloat(percent * 100).toFixed(2)}%`;

  const barSize = 20;
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

  const title = t('summary', {
    i18n: statsI18n,
    balance: commaNumber(balance),
    validators: balance && commaNumber(validators),
  });
  const queueValidator = beaconData && (validators - beaconData.validatorscount);
  const stats = t('statistics', {
    i18n: statsI18n,
    validators: balance && commaNumber(validators),
    activeValidator: beaconData && commaNumber(beaconData.validatorscount),
    participationRate: beaconData && Number(beaconData.globalparticipationrate * 100).toFixed(2),
    epoch: beaconData && beaconData.epoch,
    queueValidator: commaNumber(queueValidator),
    waitTime: calcWaitTime(queueValidator),
    apr: beaconData &&　calcAPR(beaconData.totalvalidatorbalance / 10**9),
  });
  return balance ? (<>
      <Text>{stats}</Text>
      <Text>{title}</Text>
      <Text>{bar.renderLine()}</Text>
    </>
  ) : <Text>{t('fetching', {i18n: statsI18n})}</Text>
}

/**
 * Get Eth2 stake state.
 *
 * 🌾 Participation rate: 99.08%
 * 💃 Active Validator: 25,467
 * 📦 Latest Epoch: 1148
 * 👬 Queued Validator: 10,054
 * ⏳ Wait time: 11 days, 4 hours
 *
 * 1,136,688 ETH has been deposited for 35,521 validators
 * [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 216.81%
 */
export const skillEth2Stats = {
  name: 'stakestat',
  help: '🗞 stats - latest Eth2 stake state',
  requirements: {
    addons: ['fetch'],
  },
  rule: /^stats/i,
  action: function(robot, msg) {
    robot.sendComponent(
      <>
        <ProgressBar
          fetch = {robot.addons.fetch}
          ethFetch={ethFetch}
        />
      </>
    )
    robot.render();
  },
}

/**
 * Get the latest Eth2 block number.
 */
export const skillBeaconLastBlock = {
  name: 'lastBlockBeacon',
  help: 'lastblock-eth2|lastblock-beacon|block-eth2|block-beacon - get the latest Eth1 block number',
  requirements: {
    addons: ['fetch'],
  },
  i18n: {
    'en': {
      fetching: 'Fetching data...',
      summary: 'The latest BeaconChain Epoch **#{{epoch}}** Slot **#{{slot}}** (proposed by **#{{proposer}}**)',
    },
    'zh_TW': {
      fetching: '取得資料中...',
      summary: '最新的 BeaconChain Epoch **#{{epoch}}**Slot **#{{slot}}** (出塊者 **#{{proposer}}**)',
    },
    props: ['epoch', 'proposer', 'slot']
  },
  rule: /^(last)?block-(beacon|eth2)$/i,
  action: function(robot, msg) {
    robot.send(t('fetching', {i18n: this.i18n}));
    robot.render();
    robot.addons.fetch('https://beaconcha.in/api/v1/block/latest')
      .then(response => response.json())
      .then(json => {
        const data = json.data;
        const msg = t('summary', {
          i18n: this.i18n,
          epoch: data.epoch,
          slot: data.slot,
          proposer: data.proposer,
        });
        robot.send(msg);
        robot.render();
      })
  },
}

/**
 * Show current ethereum Gas fee from the chain.
 */
export const skillGasFee = {
  name: 'gasfee',
  help: '🛢 gasfee - Show current on-chain gas fee',
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

export const skillsETH2 = [skillEth2Stats, skillLastBlock, skillBeaconLastBlock];
const skills = [...skillsETH2, skillGasFee];
export {skills};
