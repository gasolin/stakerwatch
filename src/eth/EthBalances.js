'use strict';

import React, {useEffect, useState} from 'react';
import { getEtherBalances, getTokensBalances } from '@mycrypto/eth-scan';
import { Text } from 'ink';
import Table from 'ink-table';
import { t } from 'saihubot-cli-adapter/dist/i18n';

import {formatAddress} from '../utils';
import {getNodeURL} from '../ethRpc';
import {i18nValidator, i18nBalance} from '../i18n';

let cachedTokenMap = [];

export const EthBalances = ({addresses, fetch}) => {
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
      if (cachedTokenMap.length === 0) {
        const json  = await fetch('https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link')
          .then(response => response.json());
        cachedTokenMap = json.tokens
      }
      const tokenBalances = await getTokensBalances(getNodeURL(), addresses, cachedTokenMap.map(entry => entry.address));
        Object.keys(tokenBalances).map(addr => // multi addr
          Object.entries(tokenBalances[addr]).map(([key, val]) => {
            if (val === 0n) return;

            const token = cachedTokenMap.find(entry => entry.address === key);
            data.push({
              [t('addr', {i18n: i18nBalance})]: formatAddress(addr),
              [t('token', {i18n: i18nBalance})]: token.symbol,
              [t('balance', {i18n: i18nBalance})]: (Number(val) / 10**token.decimals).toFixed(4),
              [t('source', {i18n: i18nBalance})]: token.name || '',
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

export default EthBalances;
