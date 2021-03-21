'use strict';
import React, {useEffect, useState} from 'react';
import {Text} from 'ink';
import Table from 'ink-table';
import {t} from 'saihubot-cli-adapter/dist/i18n';
import {CHAIN_MATIC} from 'staker-freenodes'
import {useEthscanBalance, useEthscanTokensBalance} from 'staker-hooks';

import {formatData} from '../helpers/format';

const i18nMatic = {
  'en': {
    query: 'Query balance on MATIC Chain...',
    balance: 'MATIC Balance',
  },
  'zh_TW': {
    query: '查詢 MATIC 智能網路餘額中...',
    balance: 'MATIC 智能網路餘額',
  },
  'props': ['blocknum'],
};

export const MaticBalances = ({addresses}) => {
  const [maticLoading, maticBalance] = useEthscanBalance(
      addresses,
      CHAIN_MATIC,
  );
  const [tokenLoading, tokenBalance] = useEthscanTokensBalance(
      addresses,
      CHAIN_MATIC,
  );

  if (maticLoading && tokenLoading) {
    return (<Text>{t('query', {i18n: i18nMatic})}</Text>);
  }

  const balance = [...formatData(maticBalance), ...formatData(tokenBalance)];
  return balance.length > 0 ?
    (<>
      <Text>{t('balance', {i18n: i18nMatic})}</Text>
      <Table data={balance} />
      <Text> </Text>
    </>) :
    null;
};

export default MaticBalances;
