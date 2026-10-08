export interface Coin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  price_change_percentage_24h: number | null
  circulating_supply: number
  sparkline_in_7d?: { price: number[] }
  ath?: number
  atl?: number
}

export interface Candle { time: number; open: number; high: number; low: number; close: number }

export interface Holding { coinId: string; symbol: string; name: string; amount: number; avgBuyPrice: number; color: string }

export interface ActivityItem {
  id: string
  type: 'buy' | 'sell' | 'deposit' | 'withdraw' | 'reward' | 'referral'
  asset: string
  amount: number
  value: number
  at: number
}

export interface User {
  id: string
  name: string
  email: string
  avatarSeed: string
  referralCode: string
  plan: 'free' | 'pro' | 'desk'
  joinedAt: number
}

export interface Plan {
  id: 'free' | 'pro' | 'desk'
  name: string
  tagline: string
  priceMonthly: number
  priceYearly: number
  accent: string
  features: string[]
  highlight?: boolean
}
