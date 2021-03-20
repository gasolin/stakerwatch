'use strict';
import React, {useEffect, useState} from 'react';
import {Text} from 'ink';
import Table from 'ink-table';
import {t} from 'saihubot-cli-adapter/dist/i18n';
import {XDAI_TOKEN_CONTRACTS} from 'staker-contracts';

import {getXdaiNodeURL} from './utils';

import useEthscanBalance from '../helpers/useEthscanBalance';
import useEthscanTokensBalance from '../helpers/useEthscanTokensBalance';
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

export const XdaiBalances = ({addresses}) => {
  const nodeUrl = getXdaiNodeURL();
  const [xdaiLoading, xdaiBalance] = useEthscanBalance(
      addresses,
      nodeUrl,
      'xDAI',
  );
  const [tokenLoading, tokenBalance] = useEthscanTokensBalance(
      addresses,
      XDAI_TOKEN_CONTRACTS,
      nodeUrl,
  );

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
