# stakerwatch
Command line Utillity for Ethereum stakers.

[![npm version](https://badge.fury.io/js/staker.svg)](https://www.npmjs.com/package/staker)

This utility tool randomly pick free Ethereum Node to fetch the on-chain data in each command call. (Or you can specify a node if you want to)

# Usage

Make sure `node` is installed in your device.

Open terminal and type

```sh
$ npx staker stats

101151 ETH has been deposited for 3160 validators
[▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░] 19.29%
```

```
$ npx staker help

I have 10 skills:
* stats - lastest ETH2 stake state
* lastblock|block - get the lastest block number
* balance - last balance of [address]
* gasfee - Show current on-chain gas fee
* gasnow|now - Show current gas fee via gasnow
* gasstation|station - Show current gas fee via ETH Gas Station
* gastracker|tracker - Show current gas fee via Etherscan Gas Tracker
* etherscan|scan [address] - check contract address on etherscan
* qrcode [text] - Generate QRCode with [text]
* help - list available skills
...
```

### Get ETH2 staking stats

```sh
$ npx staker stats

101151 ETH has been deposited for 3160 validators
[▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░] 19.29%
```

### Observe Address or Contract

Given a ETH address and get related live stats

```sh
$ npx staker addr (or $ npx staker address)

The Address has 1 ETH

```

Given a ETH address and open the browser to search address on etherscan

```sh
$ npx staker etherscan [addr]

(open browser to search [addr] on etherscan)
```

Given any text (ex a ETH address) and get the QRCode

```sh
$ npx staker qrcode [addr]

(QRcode shows here)
```

### Get current Gas Fee (from multiple sources)

```sh
$ npx staker gasfee

Current on-chain gas fee is 48 gwei
```

```sh
$ npx staker gasnow

Current gas fee (report by gasnow) is H:70 M:50 L:48 gwei
```

```sh
$ npx staker gasstation

Current gas fee (report by gasstation) is H:90 M:70 L:60 gwei
```

```sh
$ npx staker gastracker

Current gas fee (report by etherscan) is H:90 M:70 L:60 gwei
```

# Config options

### Show result in different languages

Currently support `en`(english) and `zh_TW` (Traditional Chinese)

Set the `SAIHUBOT_LANG` environment variable

```
export SAIHUBOT_LANG=zh_TW
```

Then run the command.

### Use specified Ethereum Node

Set `SAIHUBOT_NODE_URL` to the node you want to use, ex: infura, or pick from https://ethereumnodes.com/

# Credit

Based on [Saihubot](https://github.com/gasolin/saihubot)

## License

Staker use MIT License

## ChangeLog

Check [ChangeLog](https://github.com/gasolin/stakerwatch/blob/gh-pages/CHANGELOG.md)

## Document

Check [Document](https://gasolin.github.io/stakerwatch/doc/)
