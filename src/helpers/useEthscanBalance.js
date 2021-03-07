import React, {useEffect, useState} from 'react';
import {getEtherBalances} from '@mycrypto/eth-scan';

export const useEthscanBalance = (addresses, nodeUrl, tokenSymbol = 'ETH') => {
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(true);
  if (!addresses) return null;
  const data = [];

  useEffect(() => {
    async function fetchEthBalance() {
      const ethBalances = await getEtherBalances(nodeUrl, addresses);
      Object.values(ethBalances).map((val, idx) => {
        if (val === 0n) return;
        data.push({
          address: addresses[idx],
          token: tokenSymbol,
          balance: (Number(val) / 10**18).toFixed(8),
          source: '',
        });
      });
      setBalance(data);
      setLoading(false);
    }
    fetchEthBalance();
  }, [addresses]);

  return [loading, balance];
};

export default useEthscanBalance;
