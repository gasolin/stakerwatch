# 0.21 2012/12/24

Feature
- [balance] show Wrapped ETH in balance

Enhancement
- show `fetching gas...` while fetching gas data
- add beaconcha education in awesome link
- expose source to let staker can be used as a library

Refactor
- abstract fetchGas addon
- move gas skills into separate file

# 0.20 2012/12/17

Feature
- [balance-xdai] Show balance of address on xDai chain

Enhancement
- update README
- [awesome] add scaffold eth and ethgas.watch link

# 0.19 2012/12/16

Feature
- [balance] show WETH and stable coins(USDC, USDT, Dai) balance on xDai chain.
- merge addr/tx search in the same explorer command

Enhancement
- [balance] show 4 digits of stable coins

Fix
- [gas] fix random picker

# 0.18 2012/12/15

Feature
- [balance] show xDai balance on xDai chain.
- [lastblock-xdai] support showing latest xdai block number

Fix
- [stats] calc daily activated validators numbers

# 0.17 2012/12/14

Feature
- [anyblock][anyblock-tx] support anyblock explorer

# 0.16 2012/12/13

Feature
- [tokenview][tokenview-tx] support tokenview explorer
- [ethplorer][ethplorer-tx] support ethplorer explorer

Fix
- [lastblock-eth2] fix descriptions

# 0.15 2012/12/12

Feature
- [balance] show (Eth2) Validator balance that deposit from this address

```sh
$ npx staker balance [addr]

Account Balance
| Symbol | Balance   | Source |
|--------|-----------|--------|
| ETH    | 1         |        |
| USDt   | 8888      |        |
| Dai    | 123       |        |
| aUSDt  | 1234.56   |AAVE    |
| cUSDt  | 567.89    |Compound|

(Eth2) Validator Balance
| Symbol | Balance   | Index  |
|-------|------------|--------|
| ETH   | 32.02 ETH  | 12345  |
| ETH   | 32.01 ETH  | 54321  |
```

- [balance] support multiple address

staker balance-eth2 [addr1],[addr2]

- [balance-eth2] support multiple validators index

staker balance-eth2 12345,23456


# 0.14 2012/12/11

Fix
- open browser on Windows

Refactor
- update deps
- [balance][balance-eth2] refactor skills

# 0.13.5 2012/12/8

Feature
- [stats] show current network and queued validators info inspired by https://twitter.com/Eth2Bot

```
❯ staker stats
🤑 Reward rate: 15.26%
🌾 Participation rate: 98.94%
💃 Active Validator: 25,463
📦 Latest Epoch: 1147

👬 Queued Validator: 10,058
⏳ Wait time: 11 days, 4 hours

1,136,688 ETH has been deposited for 35,521 validators
[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 216.81%
```

Enhancement
- [balance-validator] add balance-eth2 as alias

Fix
- nit: lastest -> latest

# 0.12 2012/12/5

Feature
- `lastblock-eth2` skill to show beaconchain last block, slot, and the proposer
- Update readme as awesome list
- Create Gitcoin Grant https://gitcoin.co/grants/1664/stakerwatch

Enhancement
- change beacon explorer icon to 📡

# 0.11.1 2012/12/3

Feature
- add `etherchain`, `etherchain-tx` skills and `gaspriceoracle` skill

Enhancement
- [beaconchain][etherchaintx][bitquerytx][gastracker][gasstation][gasnow][gaspriceoracle][address][etherchain][etherscan][etherscantx] simplify the regex

Fix
- [xdai-tx][bsc-tx][blockchair] fix the skill and simplify the regex

# 0.10.0 2012/12/1

Feature
- add `chainid` skill to show the table of EVM compatible chains (that can be used in metamask custom network)
- add `balance-validator` skill to show validator's balance

# 0.9.4 2020/11/31

Break Change
- [beaconscan][beaconchain] switch from medalla testnet to mainnet

Enhancement
- [validator] can pass the validator index or address, or pre-define the SAIHUBOT_VALIDATOR environment variable
- [stats] shorten the progress bar to 20 chars to better fit the twitter post size

Fix
- fix skill rule [gas][tx][validator]
- fix skill text [Zapper]

# 0.8.2 2020/11/28

Feature
- add Binance Smart Chain address and tx skill
- add xDai chain address and tx skill
- (rewrite) get ETH and stable coins balance of [address]
- list stable token loan on Compound and AAVE

Enhancement
- Progressively shows ETH balance and the rest.

# 0.7.2 2020/11/26

Feature
- add `account` skill to pick from account explorers (or defi dashboard) list. The default option is randomly open the given address with an account explorer.
- add Defi Balance skills `debank`, `zapper`, `zerion`

Enhancement
- Applied more emojis

Fix
- fix the gas picker

# 0.6.1 2020/11/23

Feature
- add tx query skills `bitquery-tx`, `blockchair-tx`, `etherscan-tx`
- add `address` skill to pick from address explorers list. The default option is randomly open the given address with an address explorer.
- add `gas` skill to pick from gas fee estimators. The default option is fetching gas fee from a random gas estimator.
- add `tx` skill to pick from supported transaction explorers.
- Add `validator` skill to picke from supported beacon validator explorers.

Enhancement
- Group address, beacon validator, gas skills in category
- add Emoji 🗞, 💰, 🔎, 🤩 to spotlight some recommend skills

# 0.5.0 2020/11/21

Feature
- Register the domain http://stakerwat.ch/
- Open @stakerwatch Twitter account https://twitter.com/stakerwatch
- Show balance as table in the `balance` skill
- Show address's USDt balance in the `balance` skill

Enhancement
- not pack src/ to reduce the package size

# 0.4.0 2020/11/20

Feature
- Add `bloxy`, `blockchair`, `bitquery` command to get address related information
- Add `awesome/lucky` command to randomly pick a useful tool

# 0.3.1 2020/11/19

Feature
- Add `beaconscan`, `beaconchain` command to search validator info
- Support pre-define Ethereum Address via SAIHUBOT_ETH_ADDR
- Support pre-define validator address via SAIHUBOT_ETH_VALIDATOR

# 0.2.1 2020/11/19

Enhancement
- reduce download size by
  - move i18n and addon.exec to saihu 0.34
  - delegate qrcode generation via saihu qrcode

# 0.1.0 2020/11/18

Initial version to ask for feedback

Support skills
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

- i18n support (en, zh_TW)
- random pick ethereum nodes
- add npm badge
- add Contribution section
