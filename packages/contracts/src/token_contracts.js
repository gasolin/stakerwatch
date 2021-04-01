import { CHAIN_ETHEREUM, CHAIN_XDAI, CHAIN_BSC, CHAIN_MATIC } from 'staker-freenodes'
import { ETH_TOKEN_CONTRACTS } from './eth_tokens'
import { BSC_TOKEN_CONTRACTS } from './bsc_tokens'

// https://blockscout.com/poa/xdai/bridged-tokens
export const XDAI_TOKEN_CONTRACTS = [
  {
    address: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
  },
  {
    address: '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1',
    name: 'Wrapped Ether',
    symbol: 'WETH',
    decimals: 18,
  },
  {
    address: '0x4ECaBa5870353805a9F068101A40E0f32ed605C6',
    name: 'Tether USD',
    symbol: 'USDT',
    decimals: 6,
  },
  {
    address: '0x44fA8E6f47987339850636F88629646662444217',
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    decimals: 18,
  },
  {
    address: '0x4Bd5a011E3Dd015106A6f1326a5ba3378610Cb3b',
    name: 'Circles',
    symbol: 'CRC',
    decimals: 18,
  },
  {
    address: '0x8e5bBbb09Ed1ebdE8674Cda39A0c169401db4252',
    name: 'Wrapped BTC',
    symbol: 'WBTC',
    decimals: 8,
  },
  {
    address: '0x82dFe19164729949fD66Da1a37BC70dD6c4746ce',
    name: 'BAO',
    symbol: 'BAO',
    decimals: 18,
  },
  {
    address: '0xD057604A14982FE8D88c5fC25Aac3267eA142a08',
    name: 'HOPR',
    symbol: 'HOPR',
    decimals: 18,
  },
  {
    address: '0xb7D311E2Eb55F2f68a9440da38e7989210b9A05e',
    name: 'STAKE',
    symbol: 'STAKE',
    decimals: 18,
  },
  {
    address: '0xE2e73A1c69ecF83F464EFCE6A5be353a37cA09b2',
    name: 'Chainlink',
    symbol: 'LINK',
    decimals: 18,
  },
]

// https://docs.matic.network/docs/develop/network-details/mapped-tokens
export const MATIC_TOKEN_CONTRACTS = [
  {
    address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    name: 'WETH',
    symbol: 'WETH',
    decimals: 18,
  },
  {
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    name: 'USDC',
    symbol: 'USDC',
    decimals: 6,
  },
  {
    address: '0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c',
    name: 'Compound',
    symbol: 'COMP',
    decimals: 18,
  },
  {
    address: '0x313d009888329C9d1cf4f75CA3f32566335bd604',
    name: 'Lend',
    symbol: 'LEND',
    decimals: 18,
  },
  {
    address: '0xDA537104D6A5edd53c6fBba9A898708E465260b6',
    name: 'YFI',
    symbol: 'YFI',
    decimals: 18,
  },
  {
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    name: 'USDT',
    symbol: 'USDT',
    decimals: 6,
  },
  {
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    name: 'DAI',
    symbol: 'DAI',
    decimals: 18,
  },
  {
    address: '0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7',
    name: 'BUSD',
    symbol: 'BUSD',
    decimals: 18,
  },
  {
    address: '0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4',
    name: 'MANA',
    symbol: 'MANA',
    decimals: 18,
  },
  {
    address: '0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4',
    name: 'WBTC',
    symbol: 'WBTC',
    decimals: 8,
  },
  {
    address: '0x71B821aa52a49F32EEd535fCA6Eb5aa130085978',
    name: '0xBTC',
    symbol: '0xBTC',
    decimals: 8,
  },
  {
    address: '0x578360AdF0BbB2F10ec9cEC7EF89Ef495511ED5f',
    name: 'KIWI',
    symbol: 'KIWI',
    decimals: 8,
  },
  {
    address: '0x556f501CF8a43216Df5bc9cC57Eb04D4FFAA9e6D',
    name: 'DUST',
    symbol: 'DUST',
    decimals: 8,
  },
  {
    address: '0x556f501CF8a43216Df5bc9cC57Eb04D4FFAA9e6D',
    name: 'DUST',
    symbol: 'DUST',
    decimals: 8,
  },
];

export const TOKEN_CONTRACTS = {
  [CHAIN_ETHEREUM]: ETH_TOKEN_CONTRACTS,
  [CHAIN_XDAI]: XDAI_TOKEN_CONTRACTS,
  [CHAIN_BSC]: BSC_TOKEN_CONTRACTS,
  [CHAIN_MATIC]: MATIC_TOKEN_CONTRACTS,
}
