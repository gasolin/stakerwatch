# stakerwatch
Command line Utillity for Ethereum stakers.

# Usage

Make sure `node` is installed in your device.

Open terminal and type 

### Get staking stats

```sh
$ npx staker stats

101151 ETH has been deposited for 3160 validators
[▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░] 19.29%
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

### Check Address or Contract

```sh
$ npx staker etherscan [addr]

(open browser to search [addr] on etherscan)
```

# Config options

## Show result in different languages

Currently support `en`(english) and `zh_TW` (Traditional Chinese)

Set the `SAIHUBOT_LANG` environment variable

```
export SAIHUBOT_LANG=zh_TW
```

Then run the command.
