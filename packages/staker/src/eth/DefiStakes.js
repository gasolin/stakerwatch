import React, {useEffect, useState} from 'react';
import {t} from 'saihubot-cli-adapter/dist/i18n';
import {Text} from 'ink';

import {ethFetch, rpcDefiGetBalances} from '../helpers/ethRpc';
import {i18nBalance} from '../i18n';

export const DefiStakes = ({address, fetch}) => {
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(true);
  if (!address) return null;

  useEffect(() => {
    async function fetching() {
      const balanceOnProtocls = await ethFetch(fetch, rpcDefiGetBalances(address))
      // console.log('>>> ', balanceOnProtocls);
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

export default DefiStakes
