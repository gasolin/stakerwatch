
import _toLower from 'lodash/toLower'

import TOKEN_MAP from './coingecko_token_map.json'

export const getTokenIdList = (tokens = []) => {
  return tokens.length > 0
    ? tokens.map((symbol) =>
      TOKEN_MAP.find((entry) => entry.symbol === _toLower(symbol))
    )
    .filter((entry) => entry !== undefined)
    : []
}

export const getTokenPriceQueryUrl = (tokens) => {
  // console.log('tokens %O', TOKEN_MAP)
  const tokenIdMap = getTokenIdList(tokens)
  // console.log('tokenIdMap %O', tokenIdMap)
  const tokenNum = tokenIdMap.length
  const url = tokenNum > 0
    ? `https://api.coingecko.com/api/v3/simple/price?ids=${tokenNum === 1 ? tokenIdMap[0].id : tokenIdMap
        .map((token) => token.id)
        .join('%2C')}&vs_currencies=usd`
    : ''
  return [url, tokenIdMap]
}
