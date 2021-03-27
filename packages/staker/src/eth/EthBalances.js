'use strict';

import React from 'react';
import {Text} from 'ink';
import Table from 'ink-table';
import {t} from 'saihubot-cli-adapter/dist/i18n';
import {CHAIN_ETHEREUM} from 'staker-freenodes';
import {useEthscanBalance, useEthscanTokensBalance} from 'staker-hooks';
// import useTokenList from './useTokenList';

import {formatData} from '../helpers/format';

import {i18nValidator, i18nBalance} from '../i18n';

export const EthBalances = ({addresses, fetch}) => {
  if (!addresses) return null;
  const [loadEth, balanceEth] = useEthscanBalance(addresses, CHAIN_ETHEREUM);
  // const [tokenMap] = useTokenList(fetch);
  const [loadToken, balanceToken] = useEthscanTokensBalance(
      addresses, CHAIN_ETHEREUM);
  if (loadEth && loadToken) {
    return (<Text>{t('query', {i18n: i18nBalance})}</Text>);
  }

  const balance = [...formatData(balanceEth), ...formatData(balanceToken)];
  return balance.length > 0 ?
  (<>
    <Text>{t('accountBalance', {i18n: i18nValidator})}</Text>
    <Table data={balance} />
    <Text> </Text>
  </>) :
  null;
};

export default EthBalances;
