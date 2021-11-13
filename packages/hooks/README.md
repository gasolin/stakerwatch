# staker-hooks

> DEPRECATED: people interest in this package please consider to [useDapp](https://github.com/EthWorks/useDApp)

> React Hooks for Ethereum and compatible chains

[![NPM](https://img.shields.io/npm/v/staker-hooks.svg)](https://www.npmjs.com/package/staker-hooks)

Currently provide `useEthscanBalance` and `useEthscanTokensBalance` to query balances via [eth-scan](https://www.npmjs.com/package/@mycrypto/eth-scan) and expand the support chain to Ethereum, xDai, Binance Smart Chain, and Polygon (Matic POS chain).

## Install

```sh
npm install --save staker-hooks
```

## Get native and token balances

```
import React from 'react'
import {useEthscanBalance, useEthscanTokensBalance} from 'staker-hooks';

export const XdaiBalances = ({addresses, chainId}) => {
  const [nativeLoading, nativeBalance] = useEthscanBalance(
      addresses,
      chainId, // can neglect if use ethereum chain
  );
  const [tokenLoading, tokenBalance] = useEthscanTokensBalance(
      addresses,
      chainId, // can neglect if use ethereum chain
  );

  if (nativeLoading || tokenLoading) {
    return (<Text>Loading</Text>);
  }

  const balance = [...formatData(nativeBalance), ...formatData(tokenBalance)];
  return balance.length > 0 ?
    (<>
      {balance.map(token => (
        <View key={token.token}>
          <Text>{token.token}</Text>
          <Text>{token.balance}</Text>
        </View>
      ))}
    </>) :
    null;
}
```

## Get tokens price

```
import React from 'react'
import {useTokensPrice} from 'staker-hooks';

export const Balances = () => {
  const [prices] = useTokensPrice(['ETH','BTC'])
  return (
    <Text>
      {JSON.stringify(prices)}
    </Text>
  )
}
```

## License

MIT © [gasolin](https://github.com/gasolin)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
