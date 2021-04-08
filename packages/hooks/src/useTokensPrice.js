import React, { useState, useEffect, useCallback, useRef } from 'react'
import _toLower from 'lodash/toLower'
import isDeepEqual from 'fast-deep-equal/react';

import TOKEN_MAP from './coingecko_token_map.json'

export const useTokensPrice = (tokens = [], fetch) => {
  const [tokenPrices, setTokenPrices] = useState([])
  const [tokenMap, setTokenMap] = useState('[]')
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
    const tokenNum = tokenIdMap.length
    const url = tokenNum > 0
      ? `https://api.coingecko.com/api/v3/simple/price?ids=${tokenNum === 1 ? tokenIdMap[0].id : tokenIdMap
          .map((token) => token.id)
          .join('%2C')}&vs_currencies=usd`
      : ''
    return [url, tokenIdMap]
  }, [tokensRef.current])

  useEffect(() => {
    async function getPrices() {
      const [url, tokenIdMap] = coingGeckoSimplePriceAPI(tokens)
      if (url) {
        const data = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const result = await data.json()
        const symbolToIdMap = {}
        tokenIdMap.map(entry => symbolToIdMap[entry.id] = entry.symbol)
        // console.log('json %O', result)
        setTokenPrices(result)
        setTokenMap(JSON.stringify(symbolToIdMap))
      }
    }

    if (Array.isArray(tokens) && tokens.length > 0) {
      getPrices()
    }
  }, [coingGeckoSimplePriceAPI, tokensRef.current])

  return [tokenPrices, JSON.parse(tokenMap)]
}

export default useTokensPrice
