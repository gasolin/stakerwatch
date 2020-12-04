# stakerwat.ch
Command line Utillity for Ethereum stakers.

[![npm version](https://badge.fury.io/js/staker.svg)](https://www.npmjs.com/package/staker)

The utility tool works as an interactive Eth/Eth2 Awesome List on your console.

For example you can use `staker` command to check Eth2 deposit stats; Check any account/address balance / transaction. Or check the gas fee before you make a deal.

The command currently support multiple sources. You can use the default `address, validator, gas` command to explore tools that you have rarely experienced.

The command randomly pick a [free Ethereum Node](https://ethereumnodes.com/) to fetch the on-chain data instead of counting on [Infura](https://infura.io/). (You can specify a node if you want to)

If you think this tool is useful, please consider support with the [Gitcoin Grant](https://gitcoin.co/grants/1664/stakerwatch)

## Usage

Make sure [node.js](https://nodejs.org) is installed in your device.

Open terminal and type

```sh
$ npx staker stats

966402 ETH has been deposited for 30200 validators
[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 184.33%
```

Or type `staker help` to find all skills that `staker` command can do

```
$ npx staker help

I have 36 skills:
* 🗞 stats - lastest Eth2 stake state
* lastblock|block - get the lastest block number
* 🛢 gasfee - Show current on-chain gas fee
* 🔎gas - Pick a gas estimator from the list
* 🛢 gasnow|now - Show current gas fee via gasnow
* 🛢 gaspriceoracle|oracle - Show current gas fee via Eth Gas Price Oracle
* 🛢 gasstation|station - Show current gas fee via Eth Gas Station
* 🛢 gastracker|tracker - Show current gas fee via Etherscan Gas Tracker
* 💰balance - Show current balance of [address]
* 💰balance-validator - Show Validator's balance of [key]
* 🔎account|defi - Pick an account explorer from the list
* 🧩debank [address] - check DeFi balance on Debank
* 🧩zapper [address] - check DeFi balance on Zapper
* 🧩zerion [address] - check DeFi Balance on Zerion
* 🔎address|addr [address] - Pick address explorer from the list
* 🏦bitquery [address] - check address on explorer.bitquery.io
* 🏦blockchair [address] - check address on blockchair.com
* 🏦bloxy [address] - check token symbol, address or tx hash on bloxy.info
* 🏦etherchain|chain [address] - check contract address on etherchain
* 🏦etherscan|scan [address] - check contract address on etherscan
* 🔎tx - Pick a transaction (tx) explorer from the list
* bitquery-tx|bitquerytx|query-tx|querytx [tx] - check transaction (tx) on bitquery
* blockchair-tx|blockchairtx [tx] - check transaction (tx) on blockchair.com
* etherchain-tx|etherchaintx|chain-tx|chaintx [tx] - check transaction (tx) on etherchain
* etherscan-tx|etherscantx|scan-tx|scantx [tx] - check transaction (tx) on etherscan
* 🔎validator - Pick a beacon validator explorer from the list
* 📡beaconchain|beaconcha|beaconcha.in [address] - check validator address or number on beaconscan
* 📡beaconscan|scan [address] - check validator address or number on BeaconScan
* 🏦bsc|bscscan [address] - check address on Binance Smart Chain
* 🏦bsc-tx|bsctx|bscscan-tx|bscscantx [tx] - check transaction (tx) on Binance Smart Chain
* 🏦xdai [address] - check address on xDai Chain
* 🏦xdai-tx|xdaitx [tx] - check transaction (tx) on xDai Chain
* 🤩awesome|lucky - Show random awesome site around ethereum
* 📕chainid - Show EVM network providers chain and network id table
* qrcode [text] - Generate QRCode with [text]
* help - list available skills
```

If you expect to use this tool frequently, install it via command:

`npm install -g staker`

## Contents

- [Eth2 Stats](#eth2-stats)
- [Validator](#validator)
- [Address](#address)
- [tx](#tx)
- [gas](#gas)
- [Other Tools](#other-tools)

## Eth2 Stats

```
* 🗞 stats - lastest Eth2 stake state
```

Get Eth2 stats via command

```sh
$ npx staker stats

1005666 ETH has been deposited for 31427 validators
[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 191.82%
```

## Validator

```
* 💰balance-validator - Show Validator's balance of [key]
* 🔎validator - Pick a beacon validator explorer from the list
* 📡beaconchain|beaconcha|beaconcha.in [address] - check validator address or number on beaconscan
* 📡beaconscan|scan [address] - check validator address or number on BeaconScan
```

Given a Eth2 validator address, you can get Eth2 validator balance

```sh
$ npx staker balance-validator [address or index]

| Index | Balance    |
|-------|------------|
| 12345 | 32.02 ETH  |
```

You can link to multiple beacon explorer via command:

```sh
npx staker validator 12345
pick address explorer from the list
❯ Random
  Beaconscan
  Beaconcha.in
```

Or pick the specific validator like [beaconscan](https://beaconscan.com/)

```sh
$ npx staker beaconscan [address or index]

Check [address or index] via BeaconScan
```

Or [beaconcha.in](https://www.beaconcha.in/)

```sh
$ npx staker beaconchain [address or index]

Check [address or index] via beaconcha.in
```

## Address

```
* 💰balance - Show current balance of [address]
* 🔎address|addr [address] - Pick address explorer from the list
* 🏦bitquery [address] - check address on explorer.bitquery.io
* 🏦blockchair [address] - check address on blockchair.com
* 🏦bloxy [address] - check token symbol, address or tx hash on bloxy.info
* 🏦etherchain|chain [address] - check contract address on etherchain
* 🏦etherscan|scan [address] - check contract address on etherscan
```

Use `staker balance [addr]` command, you can given a Eth address and get related account balance, including the stable coins (USDt, USDC, Dai...) and lending stable coins in [AAVE](https://aave.com/) and [Compound](https://compound.finance/).

```sh
$ npx staker balance [addr]

| Symbol | Balance   | Source |
|--------|-----------|--------|
| ETH    | 1         |        |
| USDt   | 8888      |        |
| Dai    | 123       |        |
| aUSDt  | 1234.56   | AAVE   |
| cUSDt  | 567.89    |Compound|
```

You can link to Eth Address or Contract from multiple explorer

```sh
npx staker address [addr]
```

Or search address in specific explorer like [Etherscan](https://etherscan.io/)

```sh
$ npx staker etherscan [addr]

(open browser to search [addr] on etherscan)
```

## Tx

Same as address, but use to search transaction (tx).

```
* 🔎tx - Pick a transaction (tx) explorer from the list
* bitquery-tx|bitquerytx|query-tx|querytx [tx] - check transaction (tx) on bitquery
* blockchair-tx|blockchairtx [tx] - check transaction (tx) on blockchair.com
* etherchain-tx|etherchaintx|chain-tx|chaintx [tx] - check transaction (tx) on etherchain
* etherscan-tx|etherscantx|scan-tx|scantx [tx] - check transaction (tx) on etherscan
```

## Gas

```
* 🔎gas - Pick a gas estimator from the list
* 🛢 gasfee - Show current on-chain gas fee
* 🛢 gasnow|now - Show current gas fee via gasnow
* 🛢 gaspriceoracle|oracle - Show current gas fee via Eth Gas Price Oracle
* 🛢 gasstation|station - Show current gas fee via Eth Gas Station
* 🛢 gastracker|tracker - Show current gas fee via Etherscan Gas Tracker
```

You can get gas fee estimator from multiple sources

```sh
npx staker gas
pick address explorer from the list
❯ Random
  Gas Fee
  Gas Now
  Gas Price Oracle
  GasStation
  Gas Tracker
```

Or check specific gas fee estimator like [gasnow](https://www.gasnow.org/)

```sh
$ npx staker gasnow

Current gas fee (report by gasnow) is H:70 M:50 L:48 gwei
```

## Other Tools

```
* 🤩awesome|lucky - Show random awesome site around ethereum
* lastblock|block - get the lastest Eth1 block number
* 📕chainid - Show EVM network providers chain and network id table
* qrcode [text] - Generate QRCode with [text]
* help - list available skills
```

Given any text (ex a Eth address) and get the QRCode

```sh
$ npx staker qrcode [addr]

(QRcode shows here)
```

## Configuable options

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
