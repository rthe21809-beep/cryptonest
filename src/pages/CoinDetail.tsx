import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Star, TrendUp, TrendDown } from '@phosphor-icons/react'
import { useCoins } from '../hooks/useCoins'
import { Sparkline } from '../components/charts/Sparkline'
import { Card, Stat } from '../components/ui/Card'
import { Reveal } from '../components/ui/Reveal'
import { formatCurrency, formatPercent, formatNumber, priceTight } from '../lib/format'
import { useWatchlist } from '../store/watchlist'
import { cn } from '../lib/utils'

export default function CoinDetail() {
  const { id } = useParams<{ id: string }>()
  const { coins } = useCoins(100)
  const { has, toggle } = useWatchlist()
  const coin = useMemo(() => coins.find((c) => c.id === id), [coins, id])
  const starred = id ? has(id) : false
  const up = (coin?.price_change_percentage_24h ?? 0) >= 0

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <Reveal>
        <Link to="/app/markets" className="inline-flex items-center gap-2 text-[13px] text-white/45">
          <ArrowLeft size={14} weight="bold" /> Back to markets
        </Link>
      </Reveal>

      <Reveal delay={0.04}>
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] text-[15px] font-semibold uppercase text-white/70">{coin?.symbol.slice(0, 3) ?? '—'}</span>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-light tracking-tight text-white sm:text-3xl">{coin?.name ?? id}</h1>
                <button onClick={() => id && toggle(id)} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                  <Star size={14} weight={starred ? 'fill' : 'regular'} className={starred ? 'text-amber-glow' : 'text-white/40'} />
                </button>
              </div>
              <p className="mt-1 text-[12.5px] uppercase tracking-wide text-white/40">{coin?.symbol} · Rank #{coin?.market_cap_rank ?? '—'}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-light tabular tracking-tight text-white sm:text-4xl">{coin ? priceTight(coin.current_price) : '—'}</p>
            <p className={cn('mt-1 inline-flex items-center gap-1.5 text-[14px] font-medium tabular', up ? 'text-pastel-mint' : 'text-pastel-blush')}>
              {up ? <TrendUp size={15} weight="bold" /> : <TrendDown size={15} weight="bold" />}
              {formatPercent(coin?.price_change_percentage_24h ?? 0)} <span className="text-white/30">24h</span>
            </p>
          </div>
        </div>
      </Reveal>

      {coin?.sparkline_in_7d?.price?.length ? (
        <Reveal delay={0.06}>
          <div className="opacity-70">
            <Sparkline data={coin.sparkline_in_7d.price} positive={up} width={900} height={54} className="w-full" />
          </div>
        </Reveal>
      ) : null}

      <Reveal delay={0.1}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Market cap" value={coin ? formatCurrency(coin.market_cap, { compact: true }) : '—'} />
          <Stat label="Volume 24h" value={coin ? formatCurrency(coin.total_volume, { compact: true }) : '—'} />
          <Stat label="Circulating" value={coin ? formatNumber(coin.circulating_supply, true) : '—'} />
          <Stat label="24h change" value={formatPercent(coin?.price_change_percentage_24h ?? 0)} delta={coin?.price_change_percentage_24h ?? 0} />
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <Card>
          <p className="eyebrow mb-3">About</p>
          <p className="text-[13.5px] leading-relaxed text-white/55">
            {coin?.name} is currently trading at {coin ? priceTight(coin.current_price) : '—'} with a 24-hour change of {formatPercent(coin?.price_change_percentage_24h ?? 0)}.
          </p>
        </Card>
      </Reveal>
    </div>
  )
}
