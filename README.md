# stakerwat.ch
Command line Utillity for Ethereum stakers.

[![npm version](https://badge.fury.io/js/staker.svg)](https://www.npmjs.com/package/staker)

The utility tool that help you check ethereum blockchain stats, account balance, defi balances, address, transaction, gas fee with your terminal. Staker randomly pick a [free Ethereum Node](https://ethereumnodes.com/) to fetch the on-chain data instead of counting on [Infura](https://infura.io/). (You can specify a node if you want to)

# Usage

Make sure [node.js](https://nodejs.org) is installed in your device.

Open terminal and type

```sh
$ npx staker stats

101151 ETH has been deposited for 3160 validators
[▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░] 19.29%
```

Or, find all skills that `staker` command can do by type

```
$ npx staker help

I have 32 skills:
* 🗞 stats - lastest ETH2 stake state
* lastblock|block - get the lastest block number
* 🛢 gasfee - Show current on-chain gas fee
* 🔎gas - Pick a gas estimator from the list
* 🛢 gasnow|now - Show current gas fee via gasnow
* 🛢 gasstation|station - Show current gas fee via ETH Gas Station
* 🛢 gastracker|tracker - Show current gas fee via Etherscan Gas Tracker
* 💰balance - Show current balance of [address]
* 🔎account|defi - Pick an account explorer from the list
* 🧩debank [address] - check DeFi balances on Debank
* 🧩zapper [address] - check DeFi balance on Zapper
* 🧩zerion [address] - check DeFi Balance on Zerion
* 🔎address|addr [address] - Pick address explorer from the list
* 🏦bitquery [address] - check address on explorer.bitquery.io
* 🏦blockchair [address] - check address on blockchair.com
* 🏦bloxy [address] - check token symbol, address or tx hash on bloxy.info
* 🏦etherscan|scan [address] - check contract address on etherscan
* 🔎tx - Pick a transaction (tx) explorer from the list
* bitquery-tx|bitquerytx|query-tx|querytx [tx] - check transaction (tx) on bitquery
* blockchair-tx|blockchairtx [tx] - check transaction (tx) on blockchair.com
* etherscan-tx|etherscantx|scan-tx|scantx [tx] - check transaction (tx) on etherscan
* 🔎validator - Pick a beacon validator explorer from the list
* 🥓beaconchain|beaconcha|beaconcha.in [address] - check validator address or number on beaconscan
* 🥓beaconscan|scan [address] - check validator address or number on BeaconScan
* 🏦bsc|bscscan [address] - check address on Binance Smart Chain
* 🏦bsc-tx|bsctx|bscscan-tx|bscscantx [tx] - check transaction (tx) on Binance Smart Chain
* 🏦xdai [address] - check address on xDai Chain
* 🏦xdai-tx|xdaitx [tx] - check transaction (tx) on xDai Chain
* 🤩awesome|lucky - Show random awesome site around ethereum
* 📕chainid - Show EVM network providers chain and network id table
* qrcode [text] - Generate QRCode with [text]
* help - list available skills
```

### Get ETH2 staking stats

```sh
$ npx staker stats

101151 ETH has been deposited for 3160 validators
[▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░] 19.29%
```

### Get ETH2 validator summary (from multiple beacon explorer)

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

### Observe ETH Address or Contract (from multiple explorer)

Given a ETH address and get related live stats (Balance)

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
