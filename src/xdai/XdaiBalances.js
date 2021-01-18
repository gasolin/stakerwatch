'use strict';
import React, {useEffect, useState} from 'react';
import { Text } from 'ink';
import Table from 'ink-table';
import { t } from 'saihubot-cli-adapter/dist/i18n';

import {xdaiFetch} from './utils'
import {xdaiTokenMap} from './token';

import {formatAddress} from '../utils';
import {rpcEthBalance, rpcTokenBalance} from '../helpers/ethRpc';
import {i18nBalance} from '../i18n';

const i18nXdai = {
  'en': {
    query: 'Query balance on xDai Chain...',
    xdaiBalance: 'xDai Chain Balance',
  },
  'zh_TW': {
    query: '查詢 xDai 網路餘額中...',
    xdaiBalance: 'xDai 網路餘額',
  },
  props: ['blocknum']
}

export const XdaiBalances = ({addresses, fetch}) => {
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(true);
  const data = [];
  useEffect(() => {
    async function fetchXdaiBalance() {
      const tokens = Object.keys(xdaiTokenMap);

      for (let i = 0; i < addresses.length ; i++) {
        const json = await xdaiFetch(fetch, rpcEthBalance(addresses[i]))
        const val = json.result === 0x0 ? 0 : Number(json.result)/10**18;
        if (val > 0) {
          data.push({
            [t('addr', {i18n: i18nBalance})]: formatAddress(addresses[i]),
            [t('token', {i18n: i18nBalance})]: 'xDai',
            [t('balance', {i18n: i18nBalance})]: val,
            [t('source', {i18n: i18nBalance})]: '',
          });
        }

        for(let j = 0; j < tokens.length; j++) {
          const currentTokenAddr = tokens[j];
          const tokenInfo = xdaiTokenMap[currentTokenAddr];
          const tokenJson = await xdaiFetch(fetch, rpcTokenBalance(addresses[i], currentTokenAddr));
          if (tokenJson.result !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
            data.push({
              [t('addr', {i18n: i18nBalance})]: formatAddress(addresses[i]),
              [t('token', {i18n: i18nBalance})]: tokenInfo.symbol,
              [t('balance', {i18n: i18nBalance})]: Number(tokenJson.result) / 10 ** tokenInfo.decimals,
              [t('source', {i18n: i18nBalance})]: tokenInfo.name,
            });
          }
        }
      }
      setBalance([...balance, ...data]);
      setLoading(false);
    }

    addresses && fetchXdaiBalance();
  }, [addresses, fetch]);

  if (loading) {
    return (<Text>{t('query', {i18n: i18nXdai})}</Text>)
  }

  return balance.length > 0
    ? (<>
      <Text>{t('xdaiBalance', {i18n: i18nXdai})}</Text>
      <Table data={balance} />
      <Text> </Text>
    </>)
    : null
}

export default XdaiBalances;
