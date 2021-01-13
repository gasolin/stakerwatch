# stakerwat.ch
Command line utility for Ethereum stakers.

[![npm version](https://badge.fury.io/js/staker.svg)](https://www.npmjs.com/package/staker)

The utility tool works as an interactive Eth/Eth2 Awesome List on your console. 

You can use `staker` command to check Eth1 address balance / transaction, check the gas fee before you make a deal.

If you are an Eth2 staker, you can use the command to check Eth2 deposit stats, open validator explorer or show its balance.

Most commands support multiple tools. You can use the default `address, validator, gas` command to explore tools you have rarely experienced.

To avoid single point of failure, the command randomly pick a [free Ethereum Node](https://ethereumnodes.com/) to fetch the on-chain data instead of counting on [Infura](https://infura.io/). (You can specify a node if you want to)

If you think this tool is useful, please consider support with the [Gitcoin Grant](https://gitcoin.co/grants/1664/stakerwatch) along with other great projects.

## Contents

- [Usage](#usage)
- [Eth1](#eth1)
- [Eth2 Validator](#eth2-validator)
- [Address Explorer](#addres-explorer)
- [Gas Fee Monitor](#gas-fee)
- [Fees Analytics](#fees-analytics)
- [Defi Explorer](#defi-explorer)
- [Side Chain](#side-chain)
- [Other Tools](#other-tools)

## Usage

Make sure [node.js](https://nodejs.org) is installed in your device.

Open terminal and type `npx staker help` to find all skills that `staker` command can do.

```
$ npx staker help

I have 41 skills:
* 💰balance - Show [address] balance
...
* 🔎address|addr [address|tx] - Pick address explorer from the list
* 🔎validator - Pick a beacon validator explorer from the list
* 🗞 stats - latest Eth2 stake state
* 🔎account|defi - Pick an account explorer from the list
* 🔎gas - Pick a gas estimator from the list
* 💸feeswtf [address] - Check total fees consumption on fees.wtf
* ⛓ network|config|network [chain] - find MetaMask network config data (chain providers url and network id)
...
* 🤩awesome|lucky - Show random awesome site around ethereum
* qrcode [text] - Generate QRCode with [text]
* help - list available skills
```

If you expect to use this tool frequently, install it via command:

`npm install -g staker`

## Eth1

```
* 🗂 lastblock|block|block-eth - get the latest Eth1 block number
* 💰balance - Show [address] balance
* 💰balance-eth - Show [address] balance on Ethereum Network
```

Use `staker balance [addr]` command, you can given a Eth address and get related account balance on Eth1, Eth2(validator), xDai Chain.

Eth1 also shows the balance of tokens tradable on [1inch](https://tokenlists.org/token-list?url=tokens.1inch.eth).

xDai chain shows the balance of xDai, WETH and stable coins (USDt, USDC, Dai...).

zkSync (L2) shows all balances.

Also support multiple validators balance by comma (without space).

```sh
$ npx staker balance [addr]

Account Balance
┌──────────┬────────┬────────────┬───────────────────────────┐
│ Address  │ Symbol │ Balance    │ Source                    │
├──────────┼────────┼────────────┼───────────────────────────┤
│ 0x1234.. │ ETH    │ 1          │                           │
├──────────┼────────┼────────────┼───────────────────────────┤
│ 0x1234.. │ USDT   │ 8888       │ TetherUSD                 │
├──────────┼────────┼────────────┼───────────────────────────┤
│ 0x1234.. │ Dai    │ 123        │ DaiStablecoin             │
├──────────┼────────┼────────────┼───────────────────────────┤
│ 0x1234.. │ aUSDt  │ 1234.56    │ AaveInterestbearingUSDT   │
├──────────┼────────┼────────────┼───────────────────────────┤
│ 0x1234.. │ cUSDt  │ 567.89     │ CompoundUSDT              │
└──────────┴────────┴────────────┴───────────────────────────┘

(Eth2) Validator Balance
┌────────┬────────────┬────────┐
│ Symbol │ Balance    │ Index  │
├────────┼────────────┼────────┤
│ ETH    │ 32.02 ETH  │ 12345  │
├────────┼────────────┼────────┤
│ ETH    │ 32.01 ETH  │ 54321  │
└────────┴────────────┴────────┘

xDai Chain Balance
┌──────────┬────────┬─────────────┬────────┐
│ Address  │ Symbol │ Balance     │ Source │
├──────────┼────────┼─────────────┼────────┤
│ 0x1234.. │ xDai   │ 0.008437828 │        │
├──────────┼────────┼─────────────┼────────┤
│ 0x1234.. │ USDT   │ 8888        │        │
├──────────┼────────┼─────────────┼────────┤
│ 0x1234.. │ USDC   │ 123         │        │
└──────────┴────────┴─────────────┴────────┘

zkSync Balance
┌──────────┬────────┬─────────────┬────────┐
│ Address  │ Symbol │ Balance     │ Source │
├──────────┼────────┼─────────────┼────────┤
│ 0x1234.. │ USDt   │ 0.01        │        │
└──────────┴────────┴─────────────┴────────┘
```

Can only query the balance on Ethereum Network with `balance-eth` skill

```sh
$ staker balance-eth [addr]

Account Balance
┌──────────┬────────┬────────────┬───────────────────────────┐
│ Address  │ Symbol │ Balance    │ Source                    │
├──────────┼────────┼────────────┼───────────────────────────┤
│ 0x1234.. │ ETH    │ 1          │                           │
├──────────┼────────┼────────────┼───────────────────────────┤
│ 0x1234.. │ USDT   │ 8888       │ TetherUSD                 │
├──────────┼────────┼────────────┼───────────────────────────┤
│ 0x1234.. │ Dai    │ 123        │ DaiStablecoin             │
├──────────┼────────┼────────────┼───────────────────────────┤
│ 0x1234.. │ aUSDt  │ 1234.56    │ AaveInterestbearingUSDT   │
├──────────┼────────┼────────────┼───────────────────────────┤
│ 0x1234.. │ cUSDt  │ 567.89     │ CompoundUSDT              │
└──────────┴────────┴────────────┴───────────────────────────┘

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
🤑 Reward Rate: 12.00%
🌾 Participation Rate: 98.74%
💃 Active Validators: 44,017
📦 Latest Epoch: 5791

👬 Queued Validators: 20,315
⏳ Wait time: 15 days, 1 hour

💰 Deposited ETH: 2,058,626 (for 64,332 🧑‍🌾)
[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 392.65%
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

(Eth2) Validator Balance
┌────────┬────────────┬────────┐
│ Symbol │ Balance    │ Index  │
├────────┼────────────┼────────┤
│ ETH    │ 32.02 ETH  │ 12345  │
├────────┼────────────┼────────┤
│ ETH    │ 32.01 ETH  │ 23456  │
└────────┴────────────┴────────┘

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
* ⛽ gasfee - Show current on-chain gas fee
* ⛽ gasnow|now - Show current gas fee via gasnow
* ⛽ gaspriceoracle|oracle - Show current gas fee via Eth Gas Price Oracle
* ⛽ gasstation|station - Show current gas fee via Eth Gas Station
* ⛽ gastracker|tracker - Show current gas fee via Etherscan Gas Tracker
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

## Fees Analytics

* 💸feeswtf [address] - Check total fees consumption on fees.wtf

- [Fees.wtf](https://fees.wtf/)

## Defi Explorer

Check Account on Defi Explorer

```
* 🔎account|defi - Pick an account explorer from the list
* 🧩dappradar [address] - check DeFi balance on DappRadar
* 🧩debank [address] - check DeFi balance on Debank
* 🧩zapper [address] - check DeFi balance on Zapper
* 🧩zerion [address] - check DeFi Balance on Zerion
```

- [DappRadar](https://dappradar.com/hub/wallet)
- [Debank](https://debank.com/)
- [Zapper](https://zapper.fi/)
- [Zerion](https://zerion.io/)

## Side Chain

### config / chainid

```
* ⛓ network|config|network [chain] - find MetaMask network config data (chain providers url and network id)
```

If you are using Metamask for EVM compatible chain like Huobi eco chain, BSC chain... Can use `npx staker network` command to find and fill the Network data of RPC, Chainid, symbol.

ex: search network config for matic chain

```

npx staker network matic

┌──────────────────────┬───────────────────────────────────┬─────────┬────────┐
│ name                 │ rpc                               │ chainId │ symbol │
├──────────────────────┼───────────────────────────────────┼─────────┼────────┤
│ Matic Mainnet        │ https://rpc-mainnet.matic.network │ 137     │ MATIC  │
├──────────────────────┼───────────────────────────────────┼─────────┼────────┤
│ Matic Testnet Mumbai │ https://rpc-mumbai.matic.today    │ 80001   │ tMATIC │
└──────────────────────┴───────────────────────────────────┴─────────┴────────┘
```

Will list all network config if not pass the param.

#### Binance Smart Chain

```
* 🏦bsc|bscscan [address|tx] - check address or tx on Binance Smart Chain
```

- [BscScan Block explorer](https://bscscan.com/) Binance Smart Chain explorer.

#### Matics

```
* 🏦matics [address|tx] - check address or tx on Matics
```

- [Matic Block explorer](https://explorer-mainnet.maticvigil.com/)

#### xDai Chain

```
* 🏦xdai [address|tx] - check address or tx on xDai Chain
* 💰balance-xdai - Show address balance on xDai chain
* lastblock-xdai|lastblockxdai|block-xdai|blockxdai - get the latest xDai block number
```

```sh
$ npx staker balance-xdai [address]

xDai Chain Balance
┌──────────┬────────┬─────────────┬────────┐
│ Address  │ Symbol │ Balance     │ Source │
├──────────┼────────┼─────────────┼────────┤
│ 0x1234.. │ xDai   │ 0.008437828 │        │
├──────────┼────────┼─────────────┼────────┤
│ 0x1234.. │ USDT   │ 8888        │        │
├──────────┼────────┼─────────────┼────────┤
│ 0x1234.. │ USDC   │ 123         │        │
└──────────┴────────┴─────────────┴────────┘

```

- [Blockscout](https://blockscout.com/poa/xdai) xDai Chain explorer.

#### zkSYnc

```
* 💰balance-zksync - Show address balance on ZkSync
* 🏦zksync [address|tx] - check address or tx on zkSync
```

```
npm balance-zksync [addr]

zkSync Balance
┌──────────┬────────┬─────────────┬────────┐
│ Address  │ Symbol │ Balance     │ Source │
├──────────┼────────┼─────────────┼────────┤
│ 0x1234.. │ USDt   │ 0.01        │        │
└──────────┴────────┴─────────────┴────────┘
```

- [zkscan explorer](https://zkscan.io/explorer/)

## Other Tools

```
* 🤩awesome|lucky - Show random awesome site around ethereum
* qrcode [text] - Generate QRCode with [text]
* help - list available skills
```

- [EVM Networks](https://chainid.network/) list appropriate Chain ID and Network ID to connect to the correct chain.

### qrcode

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

do `export SAIHUBOT_ADDR=0x.....,0x.....` and you can use balance command without pass the address

```sh
npx staker balance

The Address has 1 ETH
```

### Pre-define Validator Address

do `export SAIHUBOT_VALIDATOR=12345` and you can use `beaconchain` or `beaconscan` command without pass the address

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

Check [Document](https://gasolin.github.io/stakerwatch/docs/)

## Contribution

There are plenty ways to contribute to stakerwatch.

Share your creative Usage on social media.

Translate skills to your languages.

Report bug, add your ideas to https://github.com/gasolin/stakerwatch/issues

Send patch to https://github.com/gasolin/stakerwatch/pulls
