'use strict';
import React, {useEffect, useState} from 'react';
import { Text } from 'ink';
import Table from 'ink-table';
import { t } from 'saihubot-cli-adapter/dist/i18n';

import {rpcTokens, rpcZkSyncBalance, zksyncFetch} from './utils';

import {formatData} from '../helpers/format';

const i18nL2 = {
  'en': {
    fetching: 'Fetching zkSync data...',
    query: 'Query balance on zkSync...',
    summary: 'The latest zkSync block is **{{blocknum}}**',
    l2Balance: 'zkSync Balance',
  },
  'zh_TW': {
    fetching: '取得 zkSync 資料中...',
    query: '查詢 zkSync 網路餘額中...',
    summary: '最新的zkSync區塊是 **{{blocknum}}**',
    l2Balance: 'zkSync 網路餘額',
  },
  props: ['blocknum']
}

export const ZksyncBalances = ({addresses, fetch}) => {
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(true);
  const data = [];
  useEffect(() => {
    async function fetchZksyncBalance() {
      const tokenJson = await zksyncFetch(fetch, rpcTokens);
      const tokenMap = tokenJson.result;

      for (let i = 0; i < addresses.length ; i++) {
        const json = await zksyncFetch(fetch, rpcZkSyncBalance(addresses[i]));
        const balances = json.result?.committed?.balances || {};
        if ((Object.keys(balances)).length > 0) {
          Object.entries(balances).forEach(([sym, balance]) => {
            data.push({
              address: addresses[i],
              token: sym,
              balance: (Number(balance) / 10 ** tokenMap[sym].decimals).toFixed(4),
              source: '',
            });
          })
        }
      }
      setBalance(data);
      setLoading(false);
    }

    addresses && fetchZksyncBalance();
  }, [addresses, fetch]);

  if (loading) {
    return (<Text>{t('query', {i18n: i18nL2})}</Text>)
  }

  return balance.length > 0
    ? (<>
      <Text>{t('l2Balance', {i18n: i18nL2})}</Text>
      <Table data={formatData(balance)} />
      <Text> </Text>
    </>)
    : null
}

export default ZksyncBalances
