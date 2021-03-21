/* eslint-disable require-jsdoc */
import {useEffect, useState} from 'react';
import {getTokensBalances} from '@mycrypto/eth-scan';
import {getNodeURL, CHAIN_ETHEREUM} from 'staker-freenodes'
import {ETHSCAN_CONTRACT, TOKEN_CONTRACTS} from 'staker-contracts'

export const useEthscanTokensBalance = (addresses, chainId = CHAIN_ETHEREUM, tokenMap = []) => {
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(true);
  if (!Array.isArray(addresses) || addresses.length === 0) return [false, []];
  const nodeUrl = getNodeURL(chainId);
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
  }, []);

  return [loading, balance];
};

export default useEthscanTokensBalance;
