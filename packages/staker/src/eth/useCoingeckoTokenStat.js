import React, {useEffect, useState} from 'react';

// [{"id":"ethereum","symbol":"eth","name":"Ethereum","image":"https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880","current_price":1248.17,"market_cap":142299677539,"market_cap_rank":2,"fully_diluted_valuation":null,"total_volume":33860992555,"high_24h":1264.87,"low_24h":1192.53,"price_change_24h":49.11,"price_change_percentage_24h":4.09584,"market_cap_change_24h":5189159992,"market_cap_change_percentage_24h":3.78465,"circulating_supply":114303036.5615,"total_supply":null,"max_supply":null,"ath":1448.18,"ath_change_percentage":-14.16172,"ath_date":"2018-01-13T00:00:00.000Z","atl":0.432979,"atl_change_percentage":287002.62209,"atl_date":"2015-10-20T00:00:00.000Z","roi":{"times":44.26530028035656,"currency":"btc","percentage":4426.530028035657},"last_updated":"2021-01-18T14:12:07.634Z"}]
export const useCoingeckoTokenStat = (fetch, token = 'ethereum') => {
  const [tokenInfo, setTokenInfo] = useState({});

  useEffect(() => {
    async function getTokenStat() {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${token}`;
      fetch(url).then(response => response.json()).then(json => {
        setTokenInfo(json)
      });
    }
    getTokenStat();
  }, [fetch]);

  return [tokenInfo]
}

export default useCoingeckoTokenStat;
