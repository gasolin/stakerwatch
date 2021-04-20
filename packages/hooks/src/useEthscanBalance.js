/* eslint-disable require-jsdoc */
import {useEffect, useRef, useState} from 'react';
import {JsonRpcProvider} from '@ethersproject/providers';
import {getEtherBalances} from '@mycrypto/eth-scan';
import {getNodeURL, CHAIN_ETHEREUM} from 'staker-freenodes';
import {CHAIN_BASETOKEN, ETHSCAN_CONTRACT} from 'staker-contracts';
import isDeepEqual from 'fast-deep-equal/react';

export const useEthscanBalance = (addresses, chainId = CHAIN_ETHEREUM) => {
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(true);
  const addrRef = useRef(addresses);
  if (!Array.isArray(addresses) || addresses.length === 0) return [false, []];

  if (!isDeepEqual(addrRef.current, addresses)) {
    addrRef.current = addresses
  }

  const nodeUrl = new JsonRpcProvider(getNodeURL(chainId));
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
  }, [addrRef.current]);
  return [loading, balance];
};

export default useEthscanBalance;
