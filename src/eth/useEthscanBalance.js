import React, {useEffect, useState} from 'react';
import { getEtherBalances } from '@mycrypto/eth-scan';
import { t } from 'saihubot-cli-adapter/dist/i18n';

import {formatAddress} from '../utils';
import {getNodeURL} from '../helpers/ethRpc';
import {i18nBalance} from '../i18n';

export const useEthscanBalance = (addresses) => {
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
      setBalance(data);
      setLoading(false);
    }
    fetchEthBalance();
  }, [addresses]);

  return [loading, balance];
}

export default useEthscanBalance;
