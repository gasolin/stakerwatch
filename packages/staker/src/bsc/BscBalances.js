'use strict';
import React, {useEffect, useState} from 'react';
import {Text} from 'ink';
import Table from 'ink-table';
import {t} from 'saihubot-cli-adapter/dist/i18n';
import {CHAIN_BSC} from 'staker-freenodes';
import {useEthscanBalance, useEthscanTokensBalance} from 'staker-hooks';

import {formatData} from '../helpers/format';

const i18nBSC = {
  'en': {
    query: 'Query balance on Binance Smart Chain...',
    balance: 'Binance Smart Chain Balance',
  },
  'zh_TW': {
    query: '查詢 Binance 智能網路餘額中...',
    balance: 'Binance 智能網路餘額',
  },
  'props': ['blocknum'],
};

export const BscBalances = ({addresses}) => {
  const [bscLoading, bscBalance] = useEthscanBalance(addresses, CHAIN_BSC);
  const [tokenLoading, tokenBalance] = useEthscanTokensBalance(
      addresses,
      CHAIN_BSC,
  );

  if (bscLoading && tokenLoading) {
    return (<Text>{t('query', {i18n: i18nBSC})}</Text>);
  }

  const balance = [...formatData(bscBalance), ...formatData(tokenBalance)];
  return balance.length > 0 ?
    (<>
      <Text>{t('balance', {i18n: i18nBSC})}</Text>
      <Table data={balance} />
      <Text> </Text>
    </>) :
    null;
};

export default BscBalances;
