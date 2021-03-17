# staker-freenodes
Library pre-defines nodes, chain explorers, gas estimators for Ethereum compatible chains

[![npm version](https://badge.fury.io/js/staker-freenodes.svg)](https://www.npmjs.com/package/staker-freenodes)

## Usage

Install via

`npm install staker-freenodes`

Then you can access predefined  via

```
import {getNodeURL, CHAIN_ETHEREUM} from 'staker-freenodes'

getNodeURL(CHAIN_ETHEREUM) // return a random free node by chainId
```
