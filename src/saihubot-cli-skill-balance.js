'use strict';

import React, {useEffect, useState} from 'react';
import { getEtherBalances, getTokensBalances } from '@mycrypto/eth-scan';
import { Text } from 'ink';
import Table from 'ink-table';
import { t } from 'saihubot-cli-adapter/dist/i18n';

import {getConfig, parseArg, toArray, formatAddress} from './utils';
import {getNodeURL} from './ethRpc';
import {i18nValidator, i18nBalance} from './i18n';
import {tokenMap} from './token';
import {ValidatorBalances} from './saihubot-cli-skill-eth2';
import {XdaiBalances} from './saihubot-cli-skill-xdai';

const EthBalances = ({addresses, fetch}) => {
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(true);
  if (!addresses) return null;
  const data = [];

  useEffect(() => {
    async function fetchEthBalance() {
      const ethBalances = await getEtherBalances(getNodeURL(), addresses);
      Object.values(ethBalances).map((val, idx) => {
        if (val === 0n) return;
        data.push({
          [t('addr', {i18n: i18nBalance})]: formatAddress(addresses[idx]),
          [t('token', {i18n: i18nBalance})]: 'ETH',
          [t('balance', {i18n: i18nBalance})]: (Number(val) / 10**18).toFixed(8),
          [t('source', {i18n: i18nBalance})]: '',
        });
      });
      setBalance([...balance, ...data]);
      setLoading(false);
    }

    async function fetchTokenBalance() {
      const tokenBalances = await getTokensBalances(getNodeURL(), addresses, Object.keys(tokenMap));
        Object.keys(tokenBalances).map(addr =>
          Object.entries(tokenBalances[addr]).map(([key, val]) => {
            if (val === 0n) return;
            const token = tokenMap[key];
            data.push({
              [t('addr', {i18n: i18nBalance})]: formatAddress(addr),
              [t('token', {i18n: i18nBalance})]: token.symbol,
              [t('balance', {i18n: i18nBalance})]: (Number(val) / 10**token.decimals).toFixed(4),
              [t('source', {i18n: i18nBalance})]: token.source || '',
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

  if (loading) {
    return (<Text>{t('query', {i18n: i18nBalance})}</Text>)
  }

  return balance.length > 0
  ? (<>
    <Text>{t('accountBalance', {i18n: i18nValidator})}</Text>
    <Table data={balance} />
    <Text> </Text>
  </>)
  : null;
}

// support multiple account balance by comma (without space)
// also shows validator balances
const Balances = ({addresses, fetch}) => {
  const [validator, setValidator] = useState('');
  const addrs = toArray(addresses);

  useEffect(() => {
    async function fetchValidators() {
      for (let i = 0; i < addrs.length ; i++) {
        const json = await fetch(`https://beaconcha.in/api/v1/validator/eth1/${addrs[i]}`)
          .then(response => response.json());
        const validators = toArray(json.data);
        if (validators && validators.length > 0) {
          const data = validators.length === 1
            ? validators[0].validatorindex
            : validators.filter(data => data.validatorindex !== 0).map(data => data.validatorindex).join(',');
          setValidator(validator ? validator + ',' + data : data);
        }
      }
    }

    if (addresses) {
      fetchValidators();
    }
  }, [addresses, fetch]);

  return (<>
    <EthBalances addresses={addrs} fetch={fetch} />
    <ValidatorBalances validator={validator} fetch={fetch} />
    <XdaiBalances addresses={addrs} fetch={fetch} />
  </>)
}

/**
 * Get ETH and stable coins balance of [address].
 * Includes the stable token load in AAVE and Compound
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
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
      addr = getConfig('ADDR', '');
      if (!addr) {
        robot.send(t('needAddr', {i18n: i18nBalance}));
        robot.render();
        return;
      }
    }
    const parsedAddr = addr || parseArg(msg[2]);
    robot.sendComponent(<Balances addresses={parsedAddr} fetch={robot.addons.fetch} />);
    robot.render();
  },
}

/**
 * Get ETH and stable coins balance of [address] on Ethereum Network.
 * Includes the stable token load in AAVE and Compound
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillGetEthBlance = {
  name: 'balance-eth',
  help: '💰balance-eth - Show [address] balance on Ethereum Network',
  requirements: {
    addons: ['fetch'],
  },
  rule: /(^balance-?eth )(.*)|^balance-?eth$/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ADDR', '');
      if (!addr) {
        robot.send(t('needAddr', {i18n: i18nBalance}));
        robot.render();
        return;
      }
    }
    const parsedAddr = addr || parseArg(msg[2]);
    const addrs = toArray(parsedAddr);
    robot.sendComponent(<EthBalances addresses={addrs} fetch={robot.addons.fetch} />);
    robot.render();
  },
}

const skills = [skillGetBlance, skillGetEthBlance];
export {skills};
