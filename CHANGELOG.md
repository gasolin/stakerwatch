# 0.6.0 2020/11/22

Enhancement
- Order address, beacon validator, gas skills in category

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
