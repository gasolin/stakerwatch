'use strict';

import React from 'react';
import { Text } from 'ink';
import Table from 'ink-table';
import { t } from 'saihubot-cli-adapter/dist/i18n';

import useEthscanBalance from './useEthscanBalance';
import useEthscanTokensBalance from './useEthscanTokensBalance';

import {i18nValidator, i18nBalance} from '../i18n';

export const EthBalances = ({addresses, fetch}) => {
  if (!addresses) return null;
  const [loadEth, balanceEth] = useEthscanBalance(addresses);
  const [loadToken, balanceToken] = useEthscanTokensBalance(fetch, addresses);

  if (loadEth && loadToken) {
    return (<Text>{t('query', {i18n: i18nBalance})}</Text>)
  }

  const balance = [...balanceEth, ...balanceToken];
  return balance.length > 0
  ? (<>
    <Text>{t('accountBalance', {i18n: i18nValidator})}</Text>
    <Table data={balance} />
    <Text> </Text>
  </>)
  : null;
}

export default EthBalances;
