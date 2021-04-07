'use strict';

import React from 'react';
import {Text} from 'ink';
import {useTokensPrice} from 'staker-hooks'

export const TokensPrice = ({tokens, fetch}) => {
  const [tokenPrices] = useTokensPrice(tokens, fetch);
  return <Text>{JSON.stringify(tokenPrices)}</Text>
}

export default TokensPrice
