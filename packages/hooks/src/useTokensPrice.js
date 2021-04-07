import React, { useState, useEffect, useCallback, useRef } from 'react'
import _toLower from 'lodash/toLower'
import isDeepEqual from 'fast-deep-equal/react';

import TOKEN_MAP from './coingecko_token_map.json'

export const useTokensPrice = (tokens = [], fetch) => {
  const [tokenPrices, setTokenPrices] = useState([])
  const tokensRef = useRef(tokens);

  if (!isDeepEqual(tokensRef.current, tokens)) {
    tokensRef.current = tokens
  }

  const coingGeckoSimplePriceAPI = useCallback(() => {
    // console.log('tokens %O', TOKEN_MAP)
    const tokenIdMap = tokens
      .map((symbol) =>
        TOKEN_MAP.find((entry) => entry.symbol === _toLower(symbol))
      )
      .filter((entry) => entry !== undefined)
    // console.log('tokenIdMap %O', tokenIdMap)
    return tokenIdMap.length > 0
      ? `https://api.coingecko.com/api/v3/simple/price?ids=${tokenIdMap
          .map((token) => token.id)
          .join('%2C')}&vs_currencies=usd`
      : ''
  }, [tokensRef.current])

  useEffect(() => {
    async function getPrices() {
      const API = coingGeckoSimplePriceAPI(tokens)
      if (API) {
        const data = await fetch(API, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const result = data.json()
        // console.log('json %O', result)
        setTokenPrices(result)
      }
    }

    if (Array.isArray(tokens) && tokens.length > 0) {
      getPrices()
    }
  }, [coingGeckoSimplePriceAPI, tokensRef.current])

  return [tokenPrices]
}

export default useTokensPrice
