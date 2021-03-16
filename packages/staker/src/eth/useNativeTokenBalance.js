import React, {useEffect, useState} from 'react';

import {rpcEthBalance} from '../helpers/ethRpc';

export const useNativeTokenBalance = ({
  addresses,
  fetch,
  networkFetch,
  tokenName = 'ETH',
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
            address: addresses[i],
            token: tokenName,
            balance: val,
            source: '',
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
