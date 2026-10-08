import type { Coin, Holding } from './types'
import { seededRandom } from './utils'

export const MOCK_COINS: Coin[] = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', image: '', current_price: 68420.15, market_cap: 1348000000000, market_cap_rank: 1, total_volume: 32800000000, price_change_percentage_24h: 1.84, circulating_supply: 19700000 },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum', image: '', current_price: 3542.8, market_cap: 425000000000, market_cap_rank: 2, total_volume: 16200000000, price_change_percentage_24h: -0.72, circulating_supply: 120200000 },
  { id: 'tether', symbol: 'usdt', name: 'Tether', image: '', current_price: 1.0, market_cap: 112000000000, market_cap_rank: 3, total_volume: 48000000000, price_change_percentage_24h: 0.01, circulating_supply: 112000000000 },
  { id: 'solana', symbol: 'sol', name: 'Solana', image: '', current_price: 168.44, market_cap: 78000000000, market_cap_rank: 4, total_volume: 3400000000, price_change_percentage_24h: 4.21, circulating_supply: 465000000 },
  { id: 'cardano', symbol: 'ada', name: 'Cardano', image: '', current_price: 0.4521, market_cap: 16000000000, market_cap_rank: 5, total_volume: 420000000, price_change_percentage_24h: -1.33, circulating_supply: 35400000000 },
  { id: 'ripple', symbol: 'xrp', name: 'XRP', image: '', current_price: 0.6187, market_cap: 34000000000, market_cap_rank: 6, total_volume: 1200000000, price_change_percentage_24h: 2.05, circulating_supply: 55000000000 },
  { id: 'polkadot', symbol: 'dot', name: 'Polkadot', image: '', current_price: 7.12, market_cap: 9800000000, market_cap_rank: 7, total_volume: 280000000, price_change_percentage_24h: -2.44, circulating_supply: 1380000000 },
  { id: 'chainlink', symbol: 'link', name: 'Chainlink', image: '', current_price: 17.83, market_cap: 10500000000, market_cap_rank: 8, total_volume: 510000000, price_change_percentage_24h: 3.12, circulating_supply: 587000000 }
]

export function mockSparkline(seed: string, base: number, drift = 0.06, points = 168): number[] {
  const rand = seededRandom(seed)
  const out: number[] = []
  for (let i = 0; i < points; i++) {
    const wave = Math.sin((i / points) * Math.PI * 3) * drift * 0.4
    const noise = (rand() - 0.5) * drift * 0.5
    out.push(Number((base * (1 + wave + noise)).toFixed(8)))
  }
  return out
}

export const MOCK_HOLDINGS: Holding[] = [
  { coinId: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', amount: 0.42, avgBuyPrice: 51200, color: '#F5B544' },
  { coinId: 'ethereum', symbol: 'ETH', name: 'Ethereum', amount: 6.8, avgBuyPrice: 2840, color: '#C7B9FF' },
  { coinId: 'solana', symbol: 'SOL', name: 'Solana', amount: 118, avgBuyPrice: 121.4, color: '#A8E6CF' },
  { coinId: 'chainlink', symbol: 'LINK', name: 'Chainlink', amount: 340, avgBuyPrice: 14.2, color: '#A8D8EA' }
]
