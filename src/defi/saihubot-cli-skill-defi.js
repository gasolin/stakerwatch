/* eslint-disable require-jsdoc */
'use strict';

import React, {useEffect, useState} from 'react';
// import { DeFiSDK } from 'defi-sdk';
// const ethers = require('ethers');
const BN = require('bignumber.js');
// https://etherscan.io/address/0x06fe76b2f432fdfecaef1a7d4f6c3d41b5861672#readContract
// const DeFiSdkAbi = require('./defi-sdk-abi');
// import {CONTRACT_ADDRESS} from './abi';
import {t} from 'saihubot-cli-adapter/dist/i18n';
import {Text} from 'ink';

import {getConfig, singleAddr} from '../utils';
import {i18nAddr, i18nBalance} from '../i18n';
import {getDefiBalances} from '../helpers/ethRpc';

function getNormalizedNumber(number, decimals) {
  return new BN(number).dividedBy(
      new BN(10).pow(decimals)
  );
}

const BalanceDefi = ({address}) => {
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(true);
  if (!address) return null;
  // const ethereumNode = new ethers.providers.JsonRpcProvider(getNodeURL());
  // const defiSdk = new ethers.Contract(CONTRACT_ADDRESS, DeFiSdkAbi, ethereumNode);

  useEffect(() => {
    async function fetching() {
      // const defiSdk = new DeFiSDK(getNodeURL());
      // const protocols = await defiSdk.getProtocolNames();
      // const adapters = await defiSdk.getTokenAdapterNames()
      const protocols = [
        'Aave',
        'Aave V2',
        // 'Aave V2 • Variable Debt',
        // 'Aave V2 • Stable Debt',
        // 'Aave • Staking',
        // 'Aave • Uniswap Market',
      ];
      // const balanceOnProtocls = await defiSdk.getProtocolBalances(address, protocols);
      // const balances = await defiSdk.getAccountBalances(// getProtocolBalances(
      //     address
      // protocols,
      // );
      // const msg = JSON.stringify(assets);
      // console.log('>>>> ', JSON.stringify(balances));
      // const tokenJson = await ethFetch(fetch, rpcDefiBalance(address));
      const balanceOnProtocls = await getDefiBalances(address);
      console.log('>>> ', balanceOnProtocls);
      // balanceOnProtocls.map((protocol) => {
      //   protocol.adapterBalances.map((protocolBalances) => {
      //     // Each adapter could either be an Asset or Debt on the protocol
      //     protocolBalances.balances.forEach((balance) => {
      //       const position = {
      //         'Token': balance.base.metadata.name,
      //         'Balance': getNormalizedNumber(balance.base.amount.toString(), balance.base.metadata.decimals).toString(),
      //       };

      //       // If asset is a derivative then there will be underlying assets
      //       if (balance.underlying.length > 0) {
      //         const underlying = [];
      //         balance.underlying.forEach((asset) => {
      //           underlying.push({
      //             'Component': asset.metadata.name,
      //             'Amount': getNormalizedNumber(
      //                 asset.amount.toString(), asset.metadata.decimals
      //             ).toString(),
      //           });
      //         });
      //         position['Underlying'] = underlying;
      //       }
      //       console.log('Position:', position);
      //     });
      //   });
      // });
      // const msg = balances.map((entry) => entry.metadata.name).join('\n');
      // .filter(asset => asset.balances)
      // .map(asset => {
      //   asset.balances.map(entry => entry.base.metadata.symbol + ': ' + entry.base.balance / 10**entry.base.metadata.decimals)
      // }).join('\n');
      // setBalance(msg);
      setLoading(false);
    }
    fetching();
  }, [address]);

  if (loading) {
    return (<Text>{t('query', {i18n: i18nBalance})}</Text>);
  }

  return (
    <Text>{balance}</Text>
  );
};

/**
 * Show balance in Defi projects.
 */
export const skillGetDefiBalance = {
  name: 'balance-defi',
  help: '💰balance-defi - Show balance in Defi projects',
  requirements: {
    addons: ['fetch'],
  },
  rule: /^balance-defi$|^(balance-defi )(.*)$/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ADDR', '');
      if (addr === '') {
        robot.send(t('needAddr', {i18n: i18nAddr}));
        robot.render();
        return;
      }
    }
    const data = singleAddr(addr || msg[2]);
    robot.sendComponent(<BalanceDefi address={data} />);
  },
};

const skills = [skillGetDefiBalance];

export {skills};
