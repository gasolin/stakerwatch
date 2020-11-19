# 0.2.1 2020/11/19

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
