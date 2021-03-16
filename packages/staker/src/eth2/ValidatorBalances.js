'use strict';

import React, {useEffect, useState} from 'react';
import { Text } from 'ink';
import Table from 'ink-table';
import { t } from 'saihubot-cli-adapter/dist/i18n';

import {parseArg, toArray} from '../utils';
import {i18nValidator} from '../i18n';

// support multiple validators balance by comma (without space)
export const ValidatorBalances = ({validator, fetch}) => {
  const [balance, setBalance] = useState([]);
  if (!validator) return null;

  let validators = toArray(parseArg(validator));
  const isOverflow = validators.length > 100;
  const data = [];
  useEffect(() => {
    if (isOverflow) {
      validators = validators.slice(0, 100);
    }

    async function fetchValidatorBalance() {
      fetch(`https://beaconcha.in/api/v1/validator/${validators.join(',')}`)
        .then(response => response.json())
        .then(json => {
          const arrData = toArray(json.data);
          json.data && Object.values(arrData).map(validator => {
            validator.balance && data.push({
              Symbol: 'ETH',
              Balance: `${Number(validator.balance)/10**9}`,
              Index: validator.validatorindex,
            });
          });
          setBalance(data);
        });
      }
    validator && fetchValidatorBalance();
  }, [validator, fetch]);

  return balance.length > 0
    ? (<>
      <Text>{t('validatorBalance', {i18n: i18nValidator})}</Text>
      <Text>{isOverflow ? '(Only shows the first 100 validators)' : ''}</Text>
      <Table data={balance} />
      <Text> </Text>
    </>)
    : (<Text>{validators} {t('query', {i18n: i18nValidator})}</Text>);
}

export default ValidatorBalances;
