import React, { useState, useEffect, useCallback, useRef } from 'react'
import isDeepEqual from 'fast-deep-equal/react';

import {getTokenPriceQueryUrl} from './tokensPrice'

export const useTokensPrice = (tokens = [], fetch) => {
  const [tokenPrices, setTokenPrices] = useState([])
  const [tokenMap, setTokenMap] = useState('[]')
  const tokensRef = useRef(tokens);

  if (!isDeepEqual(tokensRef.current, tokens)) {
    tokensRef.current = tokens
  }

  // return [url, tokenIdMap]
  const getSimplePriceAPI = useCallback(() => {
    return getTokenPriceQueryUrl(tokensRef.current)
  }, [tokensRef.current])

  useEffect(() => {
    async function getPrices() {
      const [url, tokenIdMap] = getSimplePriceAPI(tokens)
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
