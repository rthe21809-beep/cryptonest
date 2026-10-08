import type { Coin } from './types'
import { MOCK_COINS, mockSparkline } from './mockData'

const HOST = 'api.coingecko.com'
const BASE = 'https://' + HOST + '/api/v3'

async function fetchJson<T>(url: string, timeoutMs = 8000): Promise<T> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(url, { signal: ctrl.signal })
    if (!res.ok) throw new Error('HTTP ' + res.status)
    return (await res.json()) as T
  } finally { clearTimeout(timer) }
}

export async function getCoins(perPage = 50): Promise<{ coins: Coin[]; live: boolean }> {
  try {
    const url = BASE + '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=' + perPage + '&page=1&sparkline=true'
    const coins = await fetchJson<Coin[]>(url)
    if (!Array.isArray(coins) || coins.length === 0) throw new Error('empty')
    return { coins, live: true }
  } catch {
    const coins = MOCK_COINS.map((c) => ({ ...c, sparkline_in_7d: { price: mockSparkline(c.id, c.current_price) } }))
    return { coins, live: false }
  }
}

export async function getGlobal() {
  try {
    const raw = await fetchJson<any>(BASE + '/global')
    const d = raw.data
    return { marketCap: d.total_market_cap.usd, volume: d.total_volume.usd, btcDominance: d.market_cap_percentage.btc, change24h: d.market_cap_change_percentage_24h_usd }
  } catch {
    return { marketCap: 2420000000000, volume: 98400000000, btcDominance: 55.7, change24h: 1.42 }
  }
}

export function searchCoins(coins: Coin[], query: string): Coin[] {
  const q = query.trim().toLowerCase()
  if (!q) return coins
  return coins.filter((c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q))
}
