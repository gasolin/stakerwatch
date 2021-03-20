
'use strict';
import React, {useEffect, useState} from 'react';
import { Text } from 'ink';
import Table from 'ink-table';
import { t } from 'saihubot-cli-adapter/dist/i18n';

import useNativeTokenBalance from '../eth/useNativeTokenBalance';
import {optimismFetch} from './utils'

const i18nL2 = {
  'en': {
    fetching: 'Fetching Optimism data...',
    query: 'Query balance on Optimism...',
    l2Balance: 'Optimism Balance',
  },
  'zh_TW': {
    fetching: '取得 Optimism 資料中...',
    query: '查詢 Optimism 網路餘額中...',
    l2Balance: 'Optimism 網路餘額',
  },
}

export const OptimismBalances = ({addresses, fetch}) => {
  const [loading, balances] = useNativeTokenBalance({
    addresses,
    fetch,
    networkFetch: optimismFetch,
  })

  if (loading) {
    return (<Text>{t('query', {i18n: i18nL2})}</Text>)
  }

  return balances.length > 0
    ? (<>
      <Text>{t('l2Balance', {i18n: i18nL2})}</Text>
      <Table data={formatData(balances)} />
      <Text> </Text>
    </>)
    : null
}

export default OptimismBalances
