/* eslint-disable require-jsdoc */
import {useEffect, useRef, useState} from 'react';
import {JsonRpcProvider} from '@ethersproject/providers';
import {getTokensBalances} from '@mycrypto/eth-scan';
import {getNodeURL, CHAIN_ETHEREUM} from 'staker-freenodes'
import {ETHSCAN_CONTRACT, TOKEN_CONTRACTS} from 'staker-contracts'
import isDeepEqual from 'fast-deep-equal/react';

export const useEthscanTokensBalance = (addresses, chainId = CHAIN_ETHEREUM, tokenMap = []) => {
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(true);
  const addrRef = useRef(addresses);
  if (!Array.isArray(addresses) || addresses.length === 0) return [false, []];

  if (!isDeepEqual(addrRef.current, addresses)) {
    addrRef.current = addresses
  }

  const nodeUrl = new JsonRpcProvider(getNodeURL(chainId));
  const contractAddress = ETHSCAN_CONTRACT[chainId];
  const tokens = Array.isArray(tokenMap) && tokenMap.length > 0
    ? tokenMap
    : TOKEN_CONTRACTS[chainId];
  const data = [];

  useEffect(() => {
    async function fetchTokenBalance() {
      const tokenBalances = await getTokensBalances(
        nodeUrl, addresses,
        tokens.map((entry) => entry.address),
        {contractAddress}
      );
      Object.keys(tokenBalances).map((addr) => // multi addr
        Object.entries(tokenBalances[addr]).map(([key, val]) => {
          if (val === 0n) return;

          const token = tokens.find((entry) => entry.address === key);
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

    if (tokens.length > 0) {
      fetchTokenBalance();
    }
  }, [addrRef.current]);

  return [loading, balance];
};

export default useEthscanTokensBalance;
