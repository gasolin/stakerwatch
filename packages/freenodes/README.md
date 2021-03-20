# staker-freenodes

> Library pre-defines nodes, chain explorers, gas estimators for Ethereum compatible chains

[![npm version](https://badge.fury.io/js/staker-freenodes.svg)](https://www.npmjs.com/package/staker-freenodes)

## Current defined chains

- CHAIN_ETHEREUM: Ethereum
- CHAIN_BSC: Binance Smart Chain
- CHAIN_XDAI: xDai Chain
- CHAIN_MATIC: Polygon (MATIC) POS Chain
- L2_ZKSYNC: zkSync (L2)
- L2_OPTIMISM: Optimism (L2)

## Install

Install via

`npm install staker-freenodes`

## Usage

### Get free accessible Node by chain

You can access predefined ethereum nodes via

```
import {getNodeURL, CHAIN_ETHEREUM} from 'staker-freenodes'

console.log(getNodeURL(CHAIN_ETHEREUM)) // return a random free node by chainId
```

Or node from Binance Smart Chain via

```
import {getNodeURL, CHAIN_BSC} from 'staker-freenodes'
getNodeURL(CHAIN_BSC)
```

You can also get predefined Explorers list by chainId, and the gas-estimators list.
