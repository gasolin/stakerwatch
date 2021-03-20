/* eslint-disable require-jsdoc */
import {useEffect, useState} from 'react';
import {getEtherBalances} from '@mycrypto/eth-scan';
import {getNodeURL, CHAIN_ETHEREUM} from 'staker-freenodes';
import {CHAIN_BASETOKEN, ETHSCAN_CONTRACT} from 'staker-contracts';

export const useEthscanBalance = (addresses, chainId = CHAIN_ETHEREUM) => {
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(true);
  if (!addresses) return null;
  const nodeUrl = getNodeURL(chainId);
  const contractAddress = ETHSCAN_CONTRACT[chainId];
  const tokenSymbol = CHAIN_BASETOKEN[chainId];

  const data = [];

  useEffect(() => {
    async function fetchEthBalance() {
      const ethBalances = await getEtherBalances(nodeUrl, addresses, {contractAddress});
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

// export default useEthscanBalance;
