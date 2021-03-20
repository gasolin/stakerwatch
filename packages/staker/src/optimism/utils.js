import {L2_OPTIMISM, getNodeURL} from 'staker-freenodes'

import {jsonRpcFetch} from '../helpers/jsonRpc';

export const optimismFetch = (fetch, body) =>
  jsonRpcFetch(fetch, getNodeURL(L2_OPTIMISM), body);
