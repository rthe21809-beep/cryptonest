import { Link } from 'react-router-dom'
import { Star } from '@phosphor-icons/react'
import type { Coin } from '../lib/types'
import { priceTight, formatCurrency, formatPercent } from '../lib/format'
import { Sparkline } from './charts/Sparkline'
import { useWatchlist } from '../store/watchlist'
import { cn } from '../lib/utils'

export function CoinRow({ coin }: { coin: Coin }) {
  const { has, toggle } = useWatchlist()
  const change = coin.price_change_percentage_24h ?? 0
  const up = change >= 0
  const starred = has(coin.id)
  const spark = coin.sparkline_in_7d?.price ?? []

  return (
    <Link to={'/app/coin/' + coin.id} className="row-hover group flex items-center justify-between gap-3 rounded-2xl px-3 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <button onClick={(e) => { e.preventDefault(); toggle(coin.id) }} className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-full sm:flex">
          <Star size={14} weight={starred ? 'fill' : 'regular'} className={cn(starred ? 'text-amber-glow' : 'text-white/25')} />
        </button>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[11px] font-semibold uppercase text-white/70">{coin.symbol.slice(0, 3)}</div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white/90">{coin.name}</p>
          <p className="text-[11px] uppercase tracking-wide text-white/35">{coin.symbol} · #{coin.market_cap_rank || '—'}</p>
        </div>
      </div>
      {spark.length > 1 && <div className="hidden sm:block"><Sparkline data={spark} positive={up} width={110} height={32} /></div>}
      <div className="hidden text-right sm:block">
        <p className="text-sm tabular text-white/85">{formatCurrency(coin.market_cap, { compact: true })}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium tabular text-white/95">{priceTight(coin.current_price)}</p>
        <p className={cn('text-[12px] font-medium tabular', up ? 'text-pastel-mint' : 'text-pastel-blush')}>{formatPercent(change)}</p>
      </div>
    </Link>
  )
}
