'use strict';

import React from 'react';
import {View, Text} from 'ink';
import {useTokensPrice} from 'staker-hooks';
import _toUpper from 'lodash/toUpper';

export const TokensPrice = ({tokens, fetch}) => {
  const [tokenPrices, tokenIdMap] = useTokensPrice(tokens, fetch);
  return <View>
    {(Object.keys(tokenPrices)).map(key =>
      <Text key={key}>{`${(tokenIdMap[key]).toUpperCase()}: ${tokenPrices[key].usd}`}</Text>
    )}
  </View>
}

export default TokensPrice
