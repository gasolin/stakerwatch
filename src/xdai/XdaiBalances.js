'use strict';
import React, {useEffect, useState} from 'react';
import {Text} from 'ink';
import Table from 'ink-table';
import {t} from 'saihubot-cli-adapter/dist/i18n';

import {xdaiFetch} from './utils';
import {TOKENMAP} from './token';

import useNativeTokenBalance from '../eth/useNativeTokenBalance';
import useTokenBalance from '../eth/useTokenBalance';
import {formatData} from '../helpers/format';

const i18nXdai = {
  'en': {
    query: 'Query balance on xDai Chain...',
    xdaiBalance: 'xDai Chain Balance',
  },
  'zh_TW': {
    query: '查詢 xDai 網路餘額中...',
    xdaiBalance: 'xDai 網路餘額',
  },
  'props': ['blocknum'],
};

export const XdaiBalances = ({addresses, fetch}) => {
  const [xdaiLoading, xdaiBalance] = useNativeTokenBalance({
    addresses,
    fetch,
    networkFetch: xdaiFetch,
    tokenName: 'xDai',
  });
  const [tokenLoading, tokenBalance] = useTokenBalance({
    addresses,
    fetch,
    networkFetch: xdaiFetch,
    tokenMap: TOKENMAP,
  });

  if (xdaiLoading && tokenLoading) {
    return (<Text>{t('query', {i18n: i18nXdai})}</Text>);
  }

  const balance = [...formatData(xdaiBalance), ...formatData(tokenBalance)];
  return balance.length > 0 ?
    (<>
      <Text>{t('xdaiBalance', {i18n: i18nXdai})}</Text>
      <Table data={balance} />
      <Text> </Text>
    </>) :
    null;
};

export default XdaiBalances;
