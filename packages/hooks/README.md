# staker-hooks

> React Hooks for Ethereum and compatible chains

[![NPM](https://img.shields.io/npm/v/staker-hooks.svg)](https://www.npmjs.com/package/staker-hooks)

## Install

```sh
npm install --save staker-hooks
```

## Usage

```
import React from 'react'
import {CHAIN_XDAI} from 'staker-freenodes'
import {useEthscanBalance, useEthscanTokensBalance} from 'staker-hooks';

export const XdaiBalances = ({addresses}) => {
  const [xdaiLoading, xdaiBalance] = useEthscanBalance(
      addresses,
      CHAIN_XDAI, // can neglect if use ethereum chain
  );
  const [tokenLoading, tokenBalance] = useEthscanTokensBalance(
      addresses,
      CHAIN_XDAI, // can neglect if use ethereum chain
  );

  if (xdaiLoading && tokenLoading) {
    return (<Text>{t('query', {i18n: i18nXdai})}</Text>);
  }

  const balance = [...formatData(xdaiBalance), ...formatData(tokenBalance)];
  return balance.length > 0 ?
    (<>
      <Text>{t('xdaiBalance', {i18n: i18nXdai})}</Text>
      <Table data={balance} />
      <Text> </Text>
    </>) :
    null;
}
```
## License

MIT © [gasolin](https://github.com/gasolin)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
