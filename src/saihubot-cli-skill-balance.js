import React, {useEffect, useState} from 'react';
import { getEtherBalances, getTokensBalances } from '@mycrypto/eth-scan';
import { Text } from 'ink';
import Table from 'ink-table';
import { t } from 'saihubot-cli-adapter/dist/i18n';

import {getConfig, getNodeURL} from './utils';
import {i18nValidator} from './i18n';

export const contractMap = {
  "0x4Fabb145d64652a948d72533023f6E7A623C7C53": {
    "name": "Binance USD",
    "logo": "busd.svg",
    "erc20": true,
    "symbol": "BUSD",
    "decimals": 18
  },
  "0x6B175474E89094C44Da98b954EedeAC495271d0F": {
    "name": "Dai Stablecoin",
    "logo": "dai.svg",
    "erc20": true,
    "symbol": "DAI",
    "decimals": 18
  },
  "0x8E870D67F660D95d5be530380D0eC0bd388289E1": {
    "name": "PAX Stablecoin",
    "logo": "pax.svg",
    "erc20": true,
    "symbol": "PAX",
    "decimals": 18
  },
  "0x0000000000085d4780B73119b644AE5ecd22b376": {
    "name": "TrueUSD",
    "logo": "tusd.png",
    "erc20": true,
    "symbol": "TUSD",
    "decimals": 18
  },
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": {
    "name": "USD Coin",
    "logo": "usdc.png",
    "erc20": true,
    "symbol": "USDC",
    "decimals": 6
  },
  "0xdAC17F958D2ee523a2206206994597C13D831ec7": {
    "name": "Tether USD",
    "logo": "tether_usd.png",
    "erc20": true,
    "symbol": "USDT",
    "decimals": 6
  },
  "0x39AA39c021dfbaE8faC545936693aC917d5E7563": {
    "name": "Compound USD Coin",
    "logo": "ctoken-usdc.svg",
    "erc20": true,
    "symbol":"cUSDC",
    "decimals": 8,
    "source": "Compound"
  },
  "0xf650C3d88D12dB855b8bf7D11Be6C55A4e07dCC9": {
    "name": "Compound Tether",
    "logo": "ctoken-usdt.svg",
    "erc20": true,
    "symbol":"cUSDT",
    "decimals": 8,
    "source": "Compound"
  },
  "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643": {
    "name": "Compound Dai",
    "logo": "ctoken-dai.svg",
    "erc20": true,
    "symbol":"cDAI",
    "decimals": 8,
    "source": "Compound"
  },
  "0x6Ee0f7BB50a54AB5253dA0667B0Dc2ee526C30a8": {
    "name": "Aave Interest bearing BUSD",
    "erc20": true,
    "symbol":"aBUSD",
    "decimals": 18,
    "source": "AAVE"
  },
  "0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d": {
    "name": "Aave Interest bearing DAI",
    "erc20": true,
    "symbol":"aDAI",
    "decimals": 18,
    "source": "AAVE"
  },
  "0x4DA9b813057D04BAef4e5800E36083717b4a0341": {
    "name": "Aave Interest bearing TUSD",
    "erc20": true,
    "symbol":"aTUSD",
    "decimals": 18,
    "source": "AAVE"
  },
  "0x9bA00D6856a4eDF4665BcA2C2309936572473B7E": {
    "name": "Aave Interest bearing USDC",
    "erc20": true,
    "symbol":"aUSDC",
    "decimals": 6,
    "source": "AAVE"
  },
  "0x71fc860F7D3A592A4a98740e39dB31d25db65ae8": {
    "name": "Aave Interest bearing USDT",
    "erc20": true,
    "symbol":"aUSDT",
    "decimals": 6,
    "source": "AAVE"
  }
}

const balanceI18n = {
  'en': {
    query: 'Query current balance...',
    token: 'Symbol',
    balance: 'Balance',
    source: 'Source',
    needAddr: 'Please pass the address or define SAIHUBOT_ETH_ADDR first',
  },
  'zh_TW': {
    query: '查詢餘額中...',
    token: '幣種',
    balance: '餘額',
    source: '來源',
    needAddr: '請傳入地址或是預先定義 SAIHUBOT_ETH_ADDR 參數',
  },
  props: ['balance', 'usdt']
};

const Balances = ({address}) => {
  const [balance, setBalance] = useState([]);
  useEffect(() => {
    async function fetchEthBalance() {
      const ethBalances = await getEtherBalances(getNodeURL(), [address]);
      Object.values(ethBalances).map(val => {
        if (val === 0n) return;
        setBalance([{
          [t('token', {i18n:balanceI18n})]: 'ETH',
          [t('balance', {i18n: balanceI18n})]: (Number(val) / 10**18).toFixed(8),
          [t('source', {i18n: balanceI18n})]: '',
        }]);
      });
    }
    address && fetchEthBalance();

    async function fetchTokenBalance() {
      const tokenBalances = await getTokensBalances(getNodeURL(), [address], Object.keys(contractMap));
        Object.keys(tokenBalances).map(addr =>
          Object.entries(tokenBalances[addr]).map(([key, val]) => {
            if (val === 0n) return;
            const token = contractMap[key];
            setBalance([...balance, {
              Symbol: token.symbol,
              Balance: (Number(val) / 10**token.decimals).toFixed(2),
              [t('source', {i18n: balanceI18n})]: token.source || '',
            }]);
          })
        );
    }
    address && fetchTokenBalance();
  }, [address]);

  return balance.length > 0
    ? (<Table data={balance} />)
    : (<Text>{t('query', {i18n: balanceI18n})}</Text>);
}

/**
 * Get ETH and stable coins balance of [address].
 * Includes the stable token load in AAVE and Compound
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ETH_ADDR environment variable
 */
export const skillGetBlance = {
  name: 'balance',
  help: '💰balance - Show current balance of [address]',
  requirements: {
    addons: ['fetch'],
  },
  rule: /(^balance )(.*)|^balance$/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ETH_ADDR', '');
      if (addr.trim() === '') {
        robot.send(t('needAddr', {i18n: balanceI18n}));
        robot.render();
        return;
      }
    }
    const parsedAddr = addr.trim() || msg[2];
    robot.sendComponent(<Balances address={parsedAddr} />);
    robot.render();
  },
}

/**
 * Get Validator's balance of [key].
 *
 * can pass the validator key, or pre-define the
 * SAIHUBOT_VALIDATOR environment variable
 */
export const skillGetValidatorBlance = {
  name: 'balance-validator',
  help: '💰balance-validator|balance-eth2 - Show Validator\'s balance of [key]',
  requirements: {
    addons: ['fetch'],
  },
  rule: /(^balance-(validator|eth2) )(.*)|^balance-(validator|eth2)$/i,
  action: function(robot, msg) {
    let validator = '';
    if (msg[3] === undefined) {
      validator = getConfig('VALIDATOR', '');
      if (validator === '') {
        robot.send(t('needAddr', {i18n: i18nValidator}));
        robot.render();
        return;
      }
    }

    robot.send(t('query', {i18n: i18nValidator}));
    robot.render();

    const data = validator || msg[3];
    robot.addons.fetch(`https://beaconcha.in/api/v1/validator/${data}`)
      .then(response => response.json())
      .then(json => {
        const data = [];
        if(json.data && json.data.balance) {
          data.push({
            Index: json.data.validatorindex,
            Balance: `${Number(json.data.balance)/10**9} ETH`
          })
          robot.sendComponent(<Table data={data} />);
          robot.render();
        }
      });
  }
}
const skills = [skillGetBlance, skillGetValidatorBlance];
export {skills};
