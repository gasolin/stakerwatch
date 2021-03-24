import { CHAIN_ETHEREUM, CHAIN_BSC } from './chains'

export const DEFI_DAPPRADAR = 'dappradar'
export const DEFI_DEBANK = 'debank'
export const DEFI_ZAPPER = 'zapper'
export const DEFI_ZERION = 'zerion'

export const DEFI_EXPLORER_ETHEREUM = {
  [DEFI_DAPPRADAR]: {
    name: 'DappRadar',
    url: (target) => `https://dappradar.com/hub/wallet/${target}`,
  },
  [DEFI_DEBANK]: {
    name: "Debank",
    url: (target) => `https://debank.com/portfolio/${target}`,
  },
  [DEFI_ZAPPER]: {
    name: 'Zapper',
    url: (target) => `https://zapper.fi/dashboard?address=${target}`,
  },
  [DEFI_ZERION]: {
    name: 'Zerion',
    url: (target) => `https://app.zerion.io/${target}/overview`,
  }
}

export const DEFI_EXPLORER_BSC = {

}

export const DEFI_EXPLORER_MAP = {
  [CHAIN_ETHEREUM]: DEFI_EXPLORER_ETHEREUM,
  [CHAIN_BSC]: DEFI_EXPLORER_BSC,
}

export default {
  DEFI_EXPLORER_MAP,
  DEFI_EXPLORER_ETHEREUM,
  DEFI_DAPPRADAR,
  DEFI_DEBANK,
  DEFI_ZAPPER,
  DEFI_ZERION,
}
