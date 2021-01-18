import React, {useEffect, useState} from 'react';
import { t } from 'saihubot-cli-adapter/dist/i18n';

import {rpcTokenBalance} from '../helpers/ethRpc';
import {i18nBalance} from '../i18n';
import {formatAddress} from '../utils';

export const useTokenBalance = ({
  addresses,
  fetch,
  networkFetch,
  tokenMap,
}) => {
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(true);
  if (!addresses) return null;

  const data = [];
  useEffect(() => {
    async function fetchBalance() {
      const tokens = Object.keys(tokenMap);
      for (let i = 0; i < addresses.length ; i++) {
        for(let j = 0; j < tokens.length; j++) {
          const currentTokenAddr = tokens[j];
          const tokenInfo = tokenMap[currentTokenAddr];
          const tokenJson = await networkFetch(fetch, rpcTokenBalance(addresses[i], currentTokenAddr));
          if (tokenJson.result !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
            data.push({
              [t('addr', {i18n: i18nBalance})]: formatAddress(addresses[i]),
              [t('token', {i18n: i18nBalance})]: tokenInfo.symbol,
              [t('balance', {i18n: i18nBalance})]: Number(tokenJson.result) / 10 ** tokenInfo.decimals,
              [t('source', {i18n: i18nBalance})]: tokenInfo.name,
            });
          }
        }
      }
      setBalance(data);
      setLoading(false);
    }

    fetchBalance();
  }, [addresses, fetch, networkFetch, tokenMap]);

  return [loading, balance];
}

export default useTokenBalance;
