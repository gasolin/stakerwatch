import React, {useEffect, useState} from 'react';
import { getTokensBalances } from '@mycrypto/eth-scan';
import { t } from 'saihubot-cli-adapter/dist/i18n';

import {formatAddress} from '../utils';
import {getNodeURL} from '../helpers/ethRpc';
import {i18nBalance} from '../i18n';

let cachedTokenMap = [];

export const useEthscanTokensBalance = (fetch, addresses) => {
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(true);
  if (!addresses) return null;
  const data = [];

  useEffect(() => {
    async function fetchTokenBalance() {
      if (cachedTokenMap.length === 0) {
        const json  = await fetch('https://wispy-bird-88a7.uniswap.workers.dev/?url=http://tokens.1inch.eth.link')
          .then(response => response.json());
        cachedTokenMap = json.tokens
      }
      const tokenBalances = await getTokensBalances(getNodeURL(), addresses, cachedTokenMap.map(entry => entry.address));
        Object.keys(tokenBalances).map(addr => // multi addr
          Object.entries(tokenBalances[addr]).map(([key, val]) => {
            if (val === 0n) return;

            const token = cachedTokenMap.find(entry => entry.address === key);
            data.push({
              [t('addr', {i18n: i18nBalance})]: formatAddress(addr),
              [t('token', {i18n: i18nBalance})]: token.symbol,
              [t('balance', {i18n: i18nBalance})]: (Number(val) / 10**token.decimals).toFixed(4),
              [t('source', {i18n: i18nBalance})]: token.name || '',
            });
          })
        );
        setBalance(data);
        setLoading(false);
    }
    fetchTokenBalance();
  }, [addresses]);

  return [loading, balance];
}

export default useEthscanTokensBalance;
