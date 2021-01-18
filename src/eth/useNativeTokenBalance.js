import React, {useEffect, useState} from 'react';
import { t } from 'saihubot-cli-adapter/dist/i18n';

import {rpcEthBalance} from '../helpers/ethRpc';
import {i18nBalance} from '../i18n';
import {formatAddress} from '../utils';

export const useNativeTokenBalance = ({
  addresses,
  fetch,
  networkFetch,
}) => {
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(true);
  if (!addresses) return null;

  const data = [];
  useEffect(() => {
    async function fetchBalance() {
      for (let i = 0; i < addresses.length ; i++) {
        const json = await networkFetch(fetch, rpcEthBalance(addresses[i]))
        const val = json.result === 0x0 ? 0 : Number(json.result)/10**18;
        if (val > 0) {
          data.push({
            [t('addr', {i18n: i18nBalance})]: formatAddress(addresses[i]),
            [t('token', {i18n: i18nBalance})]: 'xDai',
            [t('balance', {i18n: i18nBalance})]: val,
            [t('source', {i18n: i18nBalance})]: '',
          });
        }
      }
      setBalance(data);
      setLoading(false);
    }
    fetchBalance();
  }, [addresses, fetch, networkFetch]);

  return [loading, balance];
}

export default useNativeTokenBalance;
