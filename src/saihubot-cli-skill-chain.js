'use strict';

import React, {useEffect, useState} from 'react';
import { Text } from 'ink';
import AsciiBar from 'ascii-bar';
import humanizeDuration from 'humanize-duration';
import commaNumber from 'comma-number';
import { t } from 'saihubot-cli-adapter/dist/i18n';

import {rpcLastBlock, rpcEthBalance} from './ethRpc';
import {ethFetch} from './utils';

const ADDR = {
  ETH2_DEPOSIT: '0x00000000219ab540356cbb839cbe05303d7705fa',
}

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
      });
  },
}

const statsI18n = {
  "en": {
    fetching: 'Fetching data...',
    summary: `💰 Deposited ETH: {{balance}} (for {{validators}} 🧑‍🌾)`,
    statistics: `🤑 Reward Rate: {{apr}}%
🌾 Participation Rate: {{participationRate}}%
💃 Active Validators: {{activeValidator}}
📦 Latest Epoch: {{epoch}}

👬 Queued Validators: {{queueValidator}}
⏳ Wait time: {{waitTime}}
`,
  },
  "zh_TW": {
    fetching: '取得資料中...',
    summary: `💰 共存入 ETH: {{balance}} (支持 {{validators}} 🧑‍🌾)`,
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
export const calcWaitTime = (queueLength, activeValidator) => {
  //225 Epochs per day (1 epoch = 32 * 12s slots)
  //900 validators can be activated per day (4 per epoch)
  // https://www.reddit.com/r/ethstaker/comments/k9wf4x/estimated_timeline_of_apr_and_eth_staked/gf7m0rf/
  const daylyValidators= 225 * Math.max(Math.floor(activeValidator / 6500), 4);
  // need wait at least every 96 seconds per validator
  const perWaitTime = Math.floor(24 * 60 * 60 / daylyValidators);
  let time = 0;
  if (queueLength > 0) time = perWaitTime * queueLength;
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
  // more accurate: active - exit
  const queueValidator = beaconData && (validators - beaconData.validatorscount);
  const stats = t('statistics', {
    i18n: statsI18n,
    validators: balance && commaNumber(validators),
    activeValidator: beaconData && commaNumber(beaconData.validatorscount),
    participationRate: beaconData && Number(beaconData.globalparticipationrate * 100).toFixed(2),
    epoch: beaconData && beaconData.epoch,
    queueValidator: commaNumber(queueValidator),
    waitTime: beaconData && calcWaitTime(queueValidator, beaconData.validatorscount),
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
 * 🤑 Reward Rate: 12.00%
 * 🌾 Participation rate: 98.74%
 * 💃 Active Validators: 44,017
 * 📦 Latest Epoch: 5791
 *
 * 👬 Queued Validators: 20,315
 * ⏳ Wait time: 15 days, 1 hour
 *
 * 💰 Deposited ETH: 2,058,626 (for 64,332 🧑‍🌾)
 * [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 392.65%
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
  help: 'lastblock-eth2|lastblock-beacon|block-eth2|block-beacon - get the latest Eth2 block number',
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

export const skillsETH2 = [skillEth2Stats, skillLastBlock, skillBeaconLastBlock];
const skills = [...skillsETH2];
export {skills};
