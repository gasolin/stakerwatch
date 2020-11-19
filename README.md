# stakerwatch
Command line Utillity for Ethereum stakers.

[![npm version](https://badge.fury.io/js/staker.svg)](https://www.npmjs.com/package/staker)

This utility tool doesn't count on Infura, but randomly pick a free Ethereum Node to fetch the on-chain data. (You can specify a node if you want to)

# Usage

Make sure `node` is installed in your device.

Open terminal and type

```sh
$ npx staker stats

101151 ETH has been deposited for 3160 validators
[▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░] 19.29%
```

Or, find all skills that `staker` command can do by type

```
$ npx staker help

I have 16 skills:
* stats - lastest ETH2 stake state
* lastblock|block - get the lastest block number
* balance - last balance of [address]
* gasfee - Show current on-chain gas fee
* gasnow|now - Show current gas fee via gasnow
* gasstation|station - Show current gas fee via ETH Gas Station
* gastracker|tracker - Show current gas fee via Etherscan Gas Tracker
* etherscan|scan [address] - check contract address on etherscan
* bloxy [address] - check address on bloxy.info
* blockchair [address] - check address on blockchair.com
* bitquery [address] - check address on explorer.bitquery.io
* beaconscan|scan [address] - check validator address or number on beaconscan
* beaconchain|beaconcha|beaconcha.in [address] - check validator address or number on beaconscan
* awesome|lucky - Show random awesome site around ethereum
* qrcode [text] - Generate QRCode with [text]
* help - list available skills
```

### Get ETH2 staking stats

```sh
$ npx staker stats

101151 ETH has been deposited for 3160 validators
[▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░] 19.29%
```

### Get validator summary

Via [beaconscan](https://beaconscan.com/)

```sh
$ npx staker beaconscan [address or index]

Check [address or index] via beaconscan(medalla)
```

Via [beaconcha.in](https://www.beaconcha.in/)
```sh
$ npx staker beaconchain [address or index]

Check [address or index] via beaconcha.in(medalla)
```

### Observe Address or Contract

Given a ETH address and get related live stats

```sh
$ npx staker balance [addr]

The Address has 1 ETH
```

Given a ETH address and open the browser to search address on [Etherscan](https://etherscan.io/)

```sh
$ npx staker etherscan [addr]

(open browser to search [addr] on etherscan)
```

Given a ETH address and open the browser to search address on [BitQuery](https://explorer.bitquery.io)

```sh
$ npx staker bitquery [addr]

(open browser to search [addr] on explorer.bitquery.io)
```

Given a ETH address and open the browser to search address on [Blockchair](https://blockchair.com/ethereum)

```sh
$ npx staker blockchair [addr]

(open browser to search [addr] on blockchair)
```

Given a ETH address and open the browser to search address on [Bloxy](https://bloxy.info/)

```sh
$ npx staker bloxy [addr]

(open browser to search [addr] on bloxy.info)
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

# Configuable options

### Show result in different languages

Currently support `en`(english) and `zh_TW` (Traditional Chinese)

Set the `SAIHUBOT_LANG` environment variable

```
export SAIHUBOT_LANG=zh_TW
```

Then run the command.

### Use specified Ethereum Node

Set `SAIHUBOT_NODE_URL` to the node you want to use, ex: infura, or pick from https://ethereumnodes.com/

### Pre-define Ethereum Address

do `export SAIHUBOT_ETH_ADDR=0x.....` and you can use balance command without pass the address

```sh
npx staker balance

The Address has 1 ETH
```

### Pre-define Validator Address

do `export SAIHUBOT_ETH_VALIDATOR=12345` and you can use `beaconchain` or `beaconscan` command without pass the address

```sh
npx staker beaconchain

Check 12345 via beaconchain
```


# Credit

Stakerwatch is based on [Saihubot](https://github.com/gasolin/saihubot), the chatbot ops framework without server requirement.

It's command line adapter is based on React for CLIs ([ink](https://www.npmjs.com/package/ink)).

## License

Staker use MIT License

## ChangeLog

Check [ChangeLog](https://github.com/gasolin/stakerwatch/blob/gh-pages/CHANGELOG.md)

## Document

Check [Document](https://gasolin.github.io/stakerwatch/doc/)

## Contribution

There are plenty ways to contribute to stakerwatch.

Share your creative Usage on social media.

Translate skills to your languages.

Report bug, add your ideas to https://github.com/gasolin/stakerwatch/issues

Send patch to https://github.com/gasolin/stakerwatch/pulls
