# 0.13.3 2012/12/6

Feature
- [stats] show current network and queued validators info inspired by https://twitter.com/Eth2Bot

```
❯ staker stats
💃Active Validator: 25447
🌾Participation rate: 98.76%
📦Latest Epoch: #1143
👬Queued Validator: 10069
⏳Wait time: 11 days, 5 hours

1136528 ETH has been deposited for 35516 validators
[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 216.78%
```

Enhancement
- [balance-validator] add balance-eth2 as alias

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
