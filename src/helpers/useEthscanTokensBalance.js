/* eslint-disable require-jsdoc */
import React, {useEffect, useState} from 'react';
import {getTokensBalances} from '@mycrypto/eth-scan';

export const useEthscanTokensBalance = (
    addresses, tokenMap = [], nodeUrl, contractAddress = '') => {
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(true);

  const data = [];
  useEffect(() => {
    async function fetchTokenBalance() {
      const tokenBalances = contractAddress ?
        await getTokensBalances(
            nodeUrl, addresses,
            tokenMap.map((entry) => entry.address),
            {contractAddress}) :
        await getTokensBalances(
            nodeUrl, addresses, tokenMap.map((entry) => entry.address));

      Object.keys(tokenBalances).map((addr) => // multi addr
        Object.entries(tokenBalances[addr]).map(([key, val]) => {
          if (val === 0n) return;

          const token = tokenMap.find((entry) => entry.address === key);
          data.push({
            address: addr,
            token: token.symbol,
            balance: (Number(val) / 10**token.decimals).toFixed(4),
            source: token.name || '',
          });
        })
      );
      setBalance(data);
      setLoading(false);
    }
    if (addresses && Array.isArray(tokenMap) && tokenMap.length !== 0) {
      fetchTokenBalance();
    }
  }, [addresses, tokenMap]);

  return [loading, balance];
};

export default useEthscanTokensBalance;
