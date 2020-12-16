# stakerwat.ch
Command line utility for Ethereum stakers.

[![npm version](https://badge.fury.io/js/staker.svg)](https://www.npmjs.com/package/staker)

The utility tool works as an interactive Eth/Eth2 Awesome List on your console. 

You can use `staker` command to check Eth1 address balance / transaction, check the gas fee before you make a deal.

If you are an Eth2 staker, you can use the command to check Eth2 deposit stats, open validator explorer or show its balance.

Most commands support multiple tools. You can use the default `address, validator, gas` command to explore tools you have rarely experienced.

If you think this tool is useful, please consider show your support with the [Gitcoin Grant](https://gitcoin.co/grants/1664/stakerwatch) along with other great projects.

By the way to avoid single point of failure, the command randomly pick a [free Ethereum Node](https://ethereumnodes.com/) to fetch the on-chain data instead of counting on [Infura](https://infura.io/). (You can specify a node if you want to)

## Contents

- [Usage](#usage)
- [Eth1](#eth1)
- [Eth2 Validator](#eth2-validator)
- [Address Explorer](#addres-explorer)
- [Gas Fee Monitor](#gas-fee)
- [Defi Explorer](#defi-explorer)
- [Side Chain](#side-chain)
- [Other Tools](#other-tools)

## Usage

Make sure [node.js](https://nodejs.org) is installed in your device.

Open terminal and type `staker help` to find all skills that `staker` command can do.

```
$ npx staker help

I have 35 skills:
* 🗞 stats - latest Eth2 stake state
* lastblock|block - get the latest Eth1 block number
* lastblock-eth2|lastblock-beacon|block-eth2|block-beacon - get the latest Eth2 block number
* 🛢 gasfee - Show current on-chain gas fee
* 🔎gas - Pick a gas estimator from the list
* 🛢 gasnow|now - Show current gas fee via gasnow
* 🛢 gaspriceoracle|oracle - Show current gas fee via Eth Gas Price Oracle
* 🛢 gasstation|station - Show current gas fee via Eth Gas Station
* 🛢 gastracker|tracker - Show current gas fee via Etherscan Gas Tracker
* 💰balance - Show [address] balance
* 💰balance-validator|balance-eth2 - Show Validator's balance of [key]
* 💰balance-xdai - Show address balance on xDai chain
* 🔎account|defi - Pick an account explorer from the list
* 🧩debank [address] - check DeFi balance on Debank
* 🧩zapper [address] - check DeFi balance on Zapper
* 🧩zerion [address] - check DeFi Balance on Zerion
* 🔎address|addr [address|tx] - Pick address explorer from the list
* 🏦anyblock [address|tx] - check address or tx on ANYblock
* 🏦bitquery [address|tx] - check address or tx on explorer.bitquery.io
* 🏦blockchair [address|tx] - check address or tx on blockchair.com
* 🏦bloxy [address|tx] - check token symbol, address or tx hash on bloxy.info
* 🏦etherchain|chain [address|tx] - check address or tx on etherchain
* 🏦etherscan|scan [address|tx] - check address or tx on Etherscan
* 🏦ethplorer [address|tx] - check address or tx on ethplorer
* 🏦tokenview [address|tx] - check address or tx on tokenview
* 🔎validator - Pick a beacon validator explorer from the list
* 📡beaconchain|beaconcha|beaconcha.in [address] - check validator address or number on beaconscan
* 📡beaconscan|scan [address] - check validator address or number on BeaconScan
* 🏦bsc|bscscan [address|tx] - check address or tx on Binance Smart Chain
* 🏦xdai [address|tx] - check address or tx on xDai Chain
* lastblock-xdai|lastblockxdai|block-xdai|blockxdai - get the latest xDai block number
* 🤩awesome|lucky - Show random awesome site around ethereum
* 📕chainid - Show EVM network providers chain and network id table
* qrcode [text] - Generate QRCode with [text]
* help - list available skills
```

If you expect to use this tool frequently, install it via command:

`npm install -g staker`

## Eth1

```
* lastblock|block - get the latest Eth1 block number
* 💰balance - Show [address] balance
```

Use `staker balance [addr]` command, you can given a Eth address and get related account balance on Eth1, Eth2(validator), xDai Chain.

Eth1 also shows the balance of stable coins (USDt, USDC, Dai...) and lending stable coins in [AAVE](https://aave.com/) and [Compound](https://compound.finance/).

xDai chain shows the balance of xDai, WETH and stable coins (USDt, USDC, Dai...).

Also support multiple validators balance by comma (without space).

```sh
$ npx staker balance [addr]

Account Balance
┌────────┬────────────┬────────┐
│ Symbol │ Balance    │ Source │
├────────┼────────────┼────────┤
│ ETH    │ 1          │        │
├────────┼────────────┼────────┤
│ USDT   │ 8888       │        │
├────────┼────────────┼────────┤
│ Dai    │ 123        │        │
├────────┼────────────┼────────┤
│ aUSDt  │ 1234.56    │AAVE    │
├────────┼────────────┼────────┤
│ cUSDt  │ 567.89     │Compound│
└────────┴────────────┴────────┘

(Eth2) Validator Balance
┌────────┬────────────┬────────┐
│ Symbol │ Balance    │ Index  │
├────────┼────────────┼────────┤
│ ETH    │ 32.02 ETH  │ 12345  │
├────────┼────────────┼────────┤
│ ETH    │ 32.01 ETH  │ 54321  │
└────────┴────────────┴────────┘

xDai Chain Balance
┌────────┬─────────────┬────────┐
│ Symbol │ Balance     │ Source │
├────────┼─────────────┼────────┤
│ xDai   │ 0.008437828 │        │
└────────┴─────────────┴────────┘
```

## Eth2 Validator

```
* 🗞 stats - latest Eth2 stake state
* lastblock-eth2|lastblock-beacon|block-eth2|block-beacon- get the latest Eth2 block number
* 💰balance-validator|balance-eth2 - Show Validator's balance of [key]
* 🔎validator - Pick a beacon validator explorer from the list
* 📡beaconchain|beaconcha|beaconcha.in [address] - check validator address or number on beaconscan
* 📡beaconscan|scan [address] - check validator address or number on BeaconScan
```


Get Eth2 stats via `staker stats` command

```sh
🤑 Reward rate: 15.26%
🌾 Participation rate: 98.94%
💃 Active Validator: 25,463
📦 Latest Epoch: 1147

👬 Queued Validator: 10,058
⏳ Wait time: 11 days, 4 hours

1,136,688 ETH has been deposited for 35,521 validators
[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 216.81%
```

Given a Eth2 validator address, you can get Eth2 validator balance

```sh
$ npx staker balance-validator [address or index]

(Eth2) Validator Balance
┌────────┬────────────┬────────┐
│ Symbol │ Balance    │ Index  │
├────────┼────────────┼────────┤
│ ETH    │ 32.02 ETH  │ 12345  │
└────────┴────────────┴────────┘
```

Also support multiple validators balance by comma (without space), ex

```sh
$ npx staker balance-validator 12345,23456
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

## Address Explorer

```
* 🔎address|addr [address|tx] - Pick address explorer from the list
* 🏦anyblock [address|tx] - check address or tx on ANYblock
* 🏦bitquery [address|tx] - check address or tx on explorer.bitquery.io
* 🏦blockchair [address|tx] - check address or tx on blockchair.com
* 🏦bloxy [address|tx] - check token symbol, address or tx hash on bloxy.info
* 🏦etherchain|chain [address|tx] - check address or tx on etherchain
* 🏦etherscan|scan [address|tx] - check address or tx on Etherscan
* 🏦ethplorer [address|tx] - check address or tx on ethplorer
* 🏦tokenview [address|tx] - check address or tx on tokenview
```

You can link to Eth Address or Contract from multiple explorer

```sh
npx staker address [addr]
```

Or search address in specific explorer like [Etherscan](https://etherscan.io/)

```sh
$ npx staker etherscan [addr]

Check [addr] via Etherscan
```

It will open browser to search [addr] on Etherscan.

These commands can be used to search transaction (tx) as well.

- [ANYblock](https://explorer.anyblock.tools/ethereum/ethereum/mainnet)
- [Bitquery](https://explorer.bitquery.io/ethereum) can check money flow
- [Blockchair](https://blockchair.com/ethereum) provides many explorers on other chain
- [Bloxy](https://bloxy.info/) Search Engine like interface
- [Etherchain](https://etherchain.org/) explorer made by Beaconcha.in team
- [Etherscan](https://etherscan.io/) De facto Eth1 explorer
- [Ethplorer](https://ethplorer.io/)
- [Tokenview](https://eth.tokenview.com/en)

## Gas Fee Monitor

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

- [Gasnow](https://www.gasnow.org/) - Data from SparkPool Miner
* [Gas Price Oracle](https://etherchain.org/tools/gasPriceOracle) From EtherChain team
* [Gas Station](https://ethgasstation.info/)
* [Ethereum Gas Tracker](https://etherscan.io/gastracker) From Etherscan team
* [ethgas.watch](https://ethgas.watch/) aggregated gas price feed from multiple data sources.

## Defi Explorer

Check Account on Defi Explorer

```
* 🔎account|defi - Pick an account explorer from the list
* 🧩debank [address] - check DeFi balance on Debank
* 🧩zapper [address] - check DeFi balance on Zapper
* 🧩zerion [address] - check DeFi Balance on Zerion
```

- [Debank](https://debank.com/)
- [Zapper](https://zapper.fi/)
- [Zerion](https://zerion.io/)

## Side Chain

xDai Chain

```
* 🏦xdai [address|tx] - check address or tx on xDai Chain
* 💰balance-xdai - Show address balance on xDai chain
* lastblock-xdai|lastblockxdai|block-xdai|blockxdai - get the latest xDai block number
```

- [Blockscout](https://blockscout.com/poa/xdai) xDai Chain explorer.

Binance Smart Chain

```
* 🏦bsc|bscscan [address|tx] - check address or tx on Binance Smart Chain
```

- [BscScan](https://bscscan.com/) Binance Smart Chain explorer.

## Other Tools

```
* 🤩awesome|lucky - Show random awesome site around ethereum
* 📕chainid - Show EVM network providers chain and network id table
* qrcode [text] - Generate QRCode with [text]
* help - list available skills
```

Given any text (ex a Eth address) and get the QRCode

```sh
$ npx staker qrcode [addr]

(QRcode shows here)
```

- [EVM Networks](https://chainid.network/) list appropriate Chain ID and Network ID to connect to the correct chain.

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
