import React, {useEffect, useState} from 'react';
import { getEtherBalances, getTokensBalances } from '@mycrypto/eth-scan';
import { Text } from 'ink';
import Table from 'ink-table';
import { t } from 'saihubot-cli-adapter/dist/i18n';

import {getConfig, getNodeURL, xdaiFetch} from './utils';
import {rpcEthBalance, rpcTokenBalance} from './saihubot-cli-skill-chain';
import {i18nValidator} from './i18n';
import {tokenMap, xdaiTokenMap} from './token';

const balanceI18n = {
  'en': {
    query: 'Query current balance...',
    token: 'Symbol',
    balance: 'Balance',
    source: 'Source',
    needAddr: 'Please pass the address or define SAIHUBOT_ETH_ADDR first',
  },
  'zh_TW': {
    query: '查詢餘額中...',
    token: '幣種',
    balance: '餘額',
    source: '來源',
    needAddr: '請傳入地址或是預先定義 SAIHUBOT_ETH_ADDR 參數',
  },
  props: ['balance', 'usdt']
};

const EthBalances = ({addresses, fetch}) => {
  const [balance, setBalance] = useState([]);
  if (!addresses) return null;
  const data = [];

  useEffect(() => {
    async function fetchEthBalance() {
      const ethBalances = await getEtherBalances(getNodeURL(), addresses);
      Object.values(ethBalances).map(val => {
        if (val === 0n) return;
        data.push({
          [t('token', {i18n:balanceI18n})]: 'ETH',
          [t('balance', {i18n: balanceI18n})]: (Number(val) / 10**18).toFixed(8),
          [t('source', {i18n: balanceI18n})]: '',
        });
      });
      setBalance([...balance, ...data]);
    }

    async function fetchTokenBalance() {
      const tokenBalances = await getTokensBalances(getNodeURL(), addresses, Object.keys(tokenMap));
        Object.keys(tokenBalances).map(addr =>
          Object.entries(tokenBalances[addr]).map(([key, val]) => {
            if (val === 0n) return;
            const token = tokenMap[key];
            data.push({
              Symbol: token.symbol,
              Balance: (Number(val) / 10**token.decimals).toFixed(4),
              [t('source', {i18n: balanceI18n})]: token.source || '',
            });
          })
        );
        setBalance([...balance, ...data]);
    }
    if (addresses) {
      fetchEthBalance();
      fetchTokenBalance();
    }
  }, [addresses, fetch]);

  return balance.length > 0
  ? (<>
    <Text>{t('accountBalance', {i18n: i18nValidator})}</Text>
    <Table data={balance} />
  </>)
  : (<Text>{t('query', {i18n: balanceI18n})}</Text>);
}

// support multiple validators balance by comma (without space)
const ValidatorBalances = ({validator, fetch}) => {
  const [balance, setBalance] = useState([]);
  if (!validator) return null;

  let validators = typeof validator === 'string' && validator.indexOf(',') > -1
    ? validator.split(',').map(index => index.trim())
    : [validator + ''];
  const isOverflow = validators.length > 100;
  const data = [];
  useEffect(() => {
    if (isOverflow) {
      validators = validators.slice(0, 100);
    }

    async function fetchValidatorBalance() {
      fetch(`https://beaconcha.in/api/v1/validator/${validators.join(',')}`)
        .then(response => response.json())
        .then(json => {
          const arrData = Array.isArray(json.data) ? json.data : [json.data];
          json.data && Object.values(arrData).map(validator => {
            validator.balance && data.push({
              Symbol: 'ETH',
              Balance: `${Number(validator.balance)/10**9}`,
              Index: validator.validatorindex,
            });
          });
          setBalance(data);
        });
      }
    validator && fetchValidatorBalance();
  }, [validator, fetch]);

  return balance.length > 0
    ? (<>
      <Text>{t('validatorBalance', {i18n: i18nValidator})}</Text>
      <Text>{isOverflow ? '(Only shows the first 100 validators)' : ''}</Text>
      <Table data={balance} />
    </>)
    : (<Text>{t('query', {i18n: i18nValidator})}</Text>);
}

const XdaiBalances = ({addresses, fetch}) => {
  const [balance, setBalance] = useState([]);
  const data = [];
  useEffect(() => {
    async function fetchXdaiBalance() {
      const tokens = Object.keys(xdaiTokenMap);

      for (let i = 0; i < addresses.length ; i++) {
        const json = await xdaiFetch(fetch, rpcEthBalance(addresses[i]))
        const val = json.result === 0x0 ? 0 : Number(json.result)/10**18;
        if (val > 0) {
          data.push({
            Symbol: 'xDai',
            Balance: val,
            [t('source', {i18n: balanceI18n})]: '',
          });
        }

        for(let j = 0; j < tokens.length; j++) {
          const currentTokenAddr = tokens[j];
          const tokenInfo = xdaiTokenMap[currentTokenAddr];
          const tokenJson = await xdaiFetch(fetch, rpcTokenBalance(addresses[i], currentTokenAddr));
          if (tokenJson.result !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
            data.push({
              Symbol: tokenInfo.symbol,
              Balance: Number(tokenJson.result) / 10 ** tokenInfo.decimals,
              [t('source', {i18n: balanceI18n})]: '',
            });
          }
        }
      }
      setBalance([...balance, ...data]);
    }

    addresses && fetchXdaiBalance();
  }, [addresses, fetch]);

  return balance.length > 0
    ? (<>
      <Text>{t('xdaiBalance', {i18n: i18nValidator})}</Text>
      <Table data={balance} />
    </>)
    : (<Text>{t('query', {i18n: i18nValidator})}</Text>);
}

// support multiple account balance by comma (without space)
// also shows validator balances
const Balances = ({address, fetch}) => {
  const [validator, setValidator] = useState('');
  const addresses = address.indexOf(',') > -1 ? address.split(',').map(addr => addr.trim()) : [address];

  useEffect(() => {
    async function fetchValidators() {
      for (let i = 0; i < addresses.length ; i++) {
        const json = await fetch(`https://beaconcha.in/api/v1/validator/eth1/${addresses[i]}`)
          .then(response => response.json());
        const validators = Array.isArray(json.data) ? json.data : [json.data];
        if (validators && validators.length > 0) {
          const data = validators.length === 1
            ? validators[0].validatorindex
            : validators.filter(data => data.validatorindex !== 0).map(data => data.validatorindex).join(',');
          setValidator(validator ? validator + ',' + data : data);
        }
      }
    }

    if (address) {
      fetchValidators();
    }
  }, [address, fetch]);

  return (<>
    <EthBalances addresses={addresses} fetch={fetch} />
    <Text> </Text>
    <ValidatorBalances validator={validator} fetch={fetch} />
    <Text> </Text>
    <XdaiBalances addresses={addresses} fetch={fetch} />
  </>)
}

/**
 * Get ETH and stable coins balance of [address].
 * Includes the stable token load in AAVE and Compound
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ETH_ADDR environment variable
 */
export const skillGetBlance = {
  name: 'balance',
  help: '💰balance - Show [address] balance',
  requirements: {
    addons: ['fetch'],
  },
  rule: /(^balance )(.*)|^balance$/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ETH_ADDR', '');
      if (addr.trim() === '') {
        robot.send(t('needAddr', {i18n: balanceI18n}));
        robot.render();
        return;
      }
    }
    const parsedAddr = addr.trim() || msg[2];
    robot.sendComponent(<Balances address={parsedAddr} fetch={robot.addons.fetch} />);
    robot.render();
  },
}

/**
 * Get Validator's balance of [key].
 *
 * can pass the validator key, or pre-define the
 * SAIHUBOT_VALIDATOR environment variable
 */
export const skillGetValidatorBlance = {
  name: 'balance-validator',
  help: '💰balance-validator|balance-eth2 - Show Validator\'s balance of [key]',
  requirements: {
    addons: ['fetch'],
  },
  rule: /(^balance-(validator|eth2) )(.*)|^balance-(validator|eth2)$/i,
  action: function(robot, msg) {
    let validator = '';
    if (msg[3] === undefined) {
      validator = getConfig('VALIDATOR', '');
      if (validator === '') {
        robot.send(t('needAddr', {i18n: i18nValidator}));
        robot.render();
        return;
      }
    }

    const data = validator || msg[3];
    robot.sendComponent(<ValidatorBalances validator={data} fetch={robot.addons.fetch} />);
    robot.render();
  }
}

/**
 * Get balance of [addr] on xDai Chain.
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillGetXdaiBlance = {
  name: 'balance-xdai',
  help: '💰balance-xdai - Show address balance on xDai chain',
  requirements: {
    addons: ['fetch'],
  },
  rule: /(^balance-xdai )(.*)|^balance-xdai$/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ETH_ADDR', '');
      if (addr.trim() === '') {
        robot.send(t('needAddr', {i18n: balanceI18n}));
        robot.render();
        return;
      }
    }
    const parsedAddr = addr.trim() || msg[2];
    robot.sendComponent(<XdaiBalances address={parsedAddr} fetch={robot.addons.fetch} />);
    robot.render();
  },
}

const skills = [skillGetBlance, skillGetValidatorBlance, skillGetXdaiBlance];
export {skills};
