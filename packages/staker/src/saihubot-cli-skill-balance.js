'use strict';

import React, {useEffect, useState} from 'react';
import {t} from 'saihubot-cli-adapter/dist/i18n';

import {getConfig, parseArg, toArray} from './utils';
import {i18nBalance} from './i18n';
import EthBalances from './eth/EthBalances';
import ValidatorBalances from './eth2/ValidatorBalances';
import XdaiBalances from './xdai/XdaiBalances';
import BscBalances from './bsc/BscBalances';
import MaticBalances from './matic/MaticBalances';
import ZksyncBalances from './zksync/ZksyncBalances';
import OptimismBalances from './optimism/OptimismBalances'
import TokensPrice from './components/TokensPrice';

// support multiple account balance by comma (without space)
// also shows validator balances
const Balances = ({addresses, fetch}) => {
  const [validator, setValidator] = useState('');
  const addrs = toArray(addresses);

  useEffect(() => {
    async function fetchValidators() {
      for (let i = 0; i < addrs.length; i++) {
        const json = await fetch(`https://beaconcha.in/api/v1/validator/eth1/${addrs[i]}`)
            .then((response) => response.json());
        const validators = toArray(json.data);
        if (validators && validators.length > 0) {
          const data = validators.length === 1 ?
            validators[0].validatorindex :
            validators.filter((data) => data.validatorindex !== 0).map((data) => data.validatorindex).join(',');
          setValidator(validator ? validator + ',' + data : data);
        }
      }
    }

    if (addresses) {
      fetchValidators();
    }
  }, [addresses, fetch]);

  return (<>
    <EthBalances addresses={addrs} fetch={fetch} />
    <ValidatorBalances validator={validator} fetch={fetch} />
    <BscBalances addresses={addrs} fetch={fetch} />
    <XdaiBalances addresses={addrs} fetch={fetch} />
    <MaticBalances addresses={addrs} fetch={fetch} />
    <ZksyncBalances addresses={addrs} fetch={fetch} />
    <OptimismBalances addresses={addrs} fetch={fetch} />
  </>);
};

/**
 * Get ETH and stable coins balance of [address].
 * Includes the stable token load in AAVE and Compound
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillGetBalance = {
  name: 'balance',
  help: '💰balance - Show [address] balance',
  requirements: {
    addons: ['fetch'],
  },
  rule: /(^balance )(.*)|^balance$/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ADDR', '');
      if (!addr) {
        robot.send(t('needAddr', {i18n: i18nBalance}));
        robot.render();
        return;
      }
    }
    const parsedAddr = addr || parseArg(msg[2]);
    robot.sendComponent(<Balances addresses={parsedAddr} fetch={robot.addons.fetch} />);
    robot.render();
  },
};

/**
 * Get ETH and stable coins balance of [address] on Ethereum Network.
 * Includes the stable token load in AAVE and Compound
 *
 * can pass the address, or pre-define the
 * SAIHUBOT_ADDR environment variable
 */
export const skillGetEthBalance = {
  name: 'balance-eth',
  help: '💰balance-eth - Show [address] balance on Ethereum Network',
  requirements: {
    addons: ['fetch'],
  },
  rule: /(^balance-?eth )(.*)|^balance-?eth$/i,
  action: function(robot, msg) {
    let addr = '';
    if (msg[2] === undefined) {
      addr = getConfig('ADDR', '');
      if (!addr) {
        robot.send(t('needAddr', {i18n: i18nBalance}));
        robot.render();
        return;
      }
    }
    const parsedAddr = addr || parseArg(msg[2]);
    const addrs = toArray(parsedAddr);
    robot.sendComponent(<EthBalances addresses={addrs} fetch={robot.addons.fetch} />);
    robot.render();
  },
};

export const skillGetTokensPrice = {
  name: 'price',
  help: '💰price - Show token price by symbol',
  requirements: {
    addons: ['fetch'],
  },
  rule: /(^price )(.*)/i,
  action: function(robot, msg) {
    const parsedToken = parseArg(msg[2]);
    const tokens = toArray(parsedToken);
    robot.sendComponent(<TokensPrice tokens={tokens} fetch={robot.addons.fetch} />);
    robot.render();
  }
}

const skills = [skillGetBalance, skillGetEthBalance, skillGetTokensPrice];
export {skills};
