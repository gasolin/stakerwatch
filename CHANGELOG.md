# 0.51 2022/3/17

Refactor
- update packages
- distill DEFAULT_WELCOME_MESSAGES

# 0.50 2022/1/7

Enhancement
- [freenode] use polyscan explorer for polygon

Refactor
- update packages

# 0.49.1 2021/11/14

Break Change
- deprecate staker-hook (prefer useDapp)
- remove gasnow command

Feature
- [network] support search via chain name (ex: network BSC) or chainId (ex: network 56)

Refactor
- update packages

# 0.48 2021/5/15

Feature
- [explorer] add okexchain explorer
- [awesome] add chainlist, Defi Llama, and Ethereum milestones

# 0.47 2021/4/16

Fix
- [hook] useTokensPrice
- [hook] import url with jsonRPCProvider

# 0.46 2021/4/15

Feature
- [awesome] add TheMerge and l2beat
- [contract] add bridge contracts from https://github.com/krzkaczor/l2beat

Refactor
- update eth-scan eth/xdai/bsc/matic contract address
- not generate doc by default

# 0.44 2021/4/8

Feature
- [staker] add `price` skill to get tokens price
- [hooks] add useTokensPrice hook to get prices from CoinGecko

Enhancement
- [hooks] useEthscanBalance & useEthscanTokensBalance will update after addresses change

Fix
- [staker] add links
- [staker][freenodes] update npm keywords

Refactor
- update dependency packages
- update eth-scan eth/xdai contract address

# 0.43 2021/3/27

Feature
- [staker] add heco address/tx explorer
- [freenodes] add CHAIN_ID_MAP
- [contracts] add pancakeSwap BSC_TOKEN_CONTRACTS

Fix
- show chain id as numeric

Refactor
- replace addrTxSearch with getExplorerLink

# 0.42.3 2021/3/24

Break Change
- [freenodes][gas estimators] update mapping name and add (plain) name prop
- [freenodes][defi explorers] add defi explorers mapping

Refactor
- [staker] reuse from staker-freenodes

# 0.41.3 2021/3/23

Feature
- [balance-optimism] show optimism balance
- [contracts] add eth token contracts from 1inch
- [contracts] add ETHSCAN_CONTRACT and CHAIN_BASETOKEN
- [hooks] distill react hooks for fetching balances

Refactor
- [staker] reuse from staker-contracts

# 0.40.1  2021/3/19

Feature
- [staker] add optimism address/tx explorer
- [freenodes] add BSC_NODES, MATIC_NODES, ZKSYNC_NODES, OPTIMISM_NODES, EXPLORER_L2_OPTIMISM
- [balance-matic] show balance on matic chain
- [contracts] add `staker-contrats` package

Enhancements
- update `getRandomItem` to quicker get value from an array with single entry

Refactor
- deploy eth-scan contract to MATIC 0xd570a3C50D157A58625e33C69F1542a5e5594b46
- move token definitions into `staker-contracts`

# 0.39.4 2021/3/17

Feature
- Web (simplified) version http://stakerwat.ch/
  - Display Ethereum, xDai, ZkSync balance in one dashboard (plus AAVE borrow/debt)
- Separate nodes, chain explorers and gas estimators definition to separate package `staker-freenodes`

Refactor
- deploy eth-scan contract to BSC 0xeC7fb246a68Af0AA1828429B3A7C307e68680407
- Use ethscan to display BSC token balance
- update eslint, eth-scan package dependency
- move the main source to master branch
- Multi repo structure

# 0.38 2021/3/09

Feature
- [check] add address validation skill

Enhancement
- track WBTC, BAO, STAKE, HOPR, LINK on Xdai

# 0.37 2021/3/07

Enhancement
- Track BUSD and WBNB for BSC

Fix
- remove https://web3.1inch.exchange/

Refactor
- Use ethscan to display xdai token balance
- move useEthscanBalance/useEthscanTokensBalance to helpers
- Update packages

# 0.36 2021/2/18

Enhancement
- [network] show hex value of chainId

Fix
- [network] only shows http rpc

# 0.35 2021/2/12

Feature
* [balance-bsc] support show Binance Smart Chain balance

Fix
- [network] https://github.com/ethereum-lists/chains/issues/156

Refactor
* distill jsonRpcFetch
* add descriptions in awesome list

# 0.34 2021/2/3

* ⛓ nodes - list free accessible ethereum nodes
* update dependency packages

# 0.33 2021/2/1

Breaking Change
- rename matics to matic

Enhancement
- add https://main-light.eth.linkpool.io as new node
- add dao explore in awesome list
- add network command usage on ethereum, matic, xdai, bsc

Fix
- [defi] fix specify address

# 0.32 2021/1/27

Enhancement
- not cache returned nodes
- add eth2_tooling in awesome list
- add zerion in free node list

Refactor
- remove ascii-bar dep
- update eth-scan

# 0.31 2021/1/19

Feature
- [stats] show Trapped ETH amount and the percentage of circulating supply

Enhancement
- add more awesome links
- show xdai balances then load the rest token balances

Refactor
- get EthBalance with hooks
- move token list into xdai/token
- move ethRpc into helpers/
- i18n table with formatData method in helpers/format

# 0.30 2021/1/13

Feature
- [balance-zksync][zksync] support show balance on zkSync

Enhancement
- add keywords on npm and github

Fix
- [validator] fix randon pick
- [bsc][matics][xdai][defi][explorers] show the first pre-defined address
- [Beaconchain][Beaconscan] show the first pre-defined validator

# 0.29 2021/1/12

Feature
- [matics] add matics block explorer

Enhancement
- [lastblock] can search as `block-eth`
- [stats] add stats-eth2 alias
- [Readme] shorten the help list

Refactor
- move eth, eth2, xdai, bsc skills into related folders

Fix
- [eth][xdai][bsc] fix explorers missing isAddr check

# 0.28 2021/1/9

Breaking Change
- [network] replace `chainid` skill with `network|config` skill

Feature
- [config] allow search and show related network config

Fix
- [gas] fix random pick

# 0.27 2021/1/8

Enhancement
- [gas] compact report message
- [gasTracker][gasstation] fix output message
- [balance-xdai] add Circle UBI balance

# 0.26 2021/1/6

Feature
- Show balances of all 1inch tradable tokens from https://tokenlists.org/token-list?url=tokens.1inch.eth

Enhancement
- [balance-xdai] Show token name

# 0.25 2021/1/5

Feature
- add 💸 fees.wtf fees analytics

Enhancement
- Change gas estimators' emoji from 🛢 to ⛽

# 0.24 2021/1/3

Feature
- search difi balance via DappRadar

Fix
- [balance] hide query message after loading balance

Refactor
- move skillsValidator to saihubot-cli-skill-eth2
- update package deps
- move xdai json rpc to saihubot-cli-skill-xdai
- move bsc explorer to saihubot-cli-skill-bsc
- move eth json rpc to ethRpc

# 0.23 2020/12/28

Feature
- [balance-eth] add skill to only query balance on Eth1

Enhancement
- [balance-eth][balance-eth2][balance-xdai] complete the i18n support
- [balance-eth][balance-xdai] add Address column to identify the balance in which address
- update README

Fix
- [balance-eth2][balance-xdai] fix missing import


# 0.22 2020/12/27

BreakChange
- [balance][address] use SAIHUBOT_ADDR instead of SAIHUBOT_ETH_ADDR

Enhancement
- reorganize skills orders in help
- [stats] update Eth2 deposit stats as
💰 Deposited ETH: 2,058,626 (for 64,332 🧑‍🌾)
[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 392.65%
- add 🗂 for block emoji
- [lastblock-beacon] support block-eth2 and block-validator

Fix
- [balance] Fix predefined multi addresses
- [balance][balance-xdai] Fix query xDai message
- [README] fix docs link

Refactor
- abstract ethRpc.js and parseArg,toArray in utils
- put xdai related skills in saihubot-cli-skill-xdai.js
- move i18nAddr to i18n.js
- move skillGasFee to saihubot-cli-skill-ethgas
- move balance-validator to saihubot-cli-skill-eth2

# 0.21 2020/12/24

Feature
- [balance] show Wrapped ETH in balance

Enhancement
- show `fetching gas...` while fetching gas data
- add beaconcha education in awesome link
- expose source to let staker can be used as a library

Refactor
- abstract fetchGas addon
- move gas skills into separate file

# 0.20 2020/12/17

Feature
- [balance-xdai] Show balance of address on xDai chain

Enhancement
- update README
- [awesome] add scaffold eth and ethgas.watch link

# 0.19 2020/12/16

Feature
- [balance] show WETH and stable coins(USDC, USDT, Dai) balance on xDai chain.
- merge addr/tx search in the same explorer command

Enhancement
- [balance] show 4 digits of stable coins

Fix
- [gas] fix random picker

# 0.18 2020/12/15

Feature
- [balance] show xDai balance on xDai chain.
- [lastblock-xdai] support showing latest xdai block number

Fix
- [stats] calc daily activated validators numbers

# 0.17 2020/12/14

Feature
- [anyblock][anyblock-tx] support anyblock explorer

# 0.16 2020/12/13

Feature
- [tokenview][tokenview-tx] support tokenview explorer
- [ethplorer][ethplorer-tx] support ethplorer explorer

Fix
- [lastblock-eth2] fix descriptions

# 0.15 2020/12/12

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


# 0.14 2020/12/11

Fix
- open browser on Windows

Refactor
- update deps
- [balance][balance-eth2] refactor skills

# 0.13.5 2020/12/8

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

# 0.12 2020/12/5

Feature
- `lastblock-eth2` skill to show beaconchain last block, slot, and the proposer
- Update readme as awesome list
- Create Gitcoin Grant https://gitcoin.co/grants/1664/stakerwatch

Enhancement
- change beacon explorer icon to 📡

# 0.11.1 2020/12/3

Feature
- add `etherchain`, `etherchain-tx` skills and `gaspriceoracle` skill

Enhancement
- [beaconchain][etherchaintx][bitquerytx][gastracker][gasstation][gasnow][gaspriceoracle][address][etherchain][etherscan][etherscantx] simplify the regex

Fix
- [xdai-tx][bsc-tx][blockchair] fix the skill and simplify the regex

# 0.10.0 2020/12/1

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
