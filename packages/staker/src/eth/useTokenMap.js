/* eslint-disable require-jsdoc */
import React, {useEffect, useState} from 'react';

export const useTokenMap = (fetch) => {
  const [tokenMap, setTokenMap] = useState([]);

  useEffect(() => {
    async function fetchTokenMap() {
      if (tokenMap.length === 0) {
        const json = await fetch('http://tokenlist.zerion.eth.link')
            .then((response) => response.json());
        if (json.tokens) {
          setTokenMap(json.tokens);
        } else {
          setTokenMap([]);
        }
      }
    }
    fetchTokenMap();
  }, []);

  return [tokenMap];
};

export default useTokenMap;
