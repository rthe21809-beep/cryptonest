import { useMemo, useState } from 'react'
import { Star } from '@phosphor-icons/react'
import { useCoins } from '../hooks/useCoins'
import { searchCoins } from '../lib/api'
import { CoinRow } from '../components/CoinRow'
import { SearchBar } from '../components/SearchBar'
import { Card } from '../components/ui/Card'
import { Reveal } from '../components/ui/Reveal'
import { useWatchlist } from '../store/watchlist'
import { cn } from '../lib/utils'

type SortKey = 'market_cap' | 'price' | 'change'

export default function Markets() {
  const { coins, live, loading } = useCoins(100)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('market_cap')
  const [onlyWatchlist, setOnlyWatchlist] = useState(false)
  const watchlist = useWatchlist()

  const filtered = useMemo(() => {
    let list = searchCoins(coins, query)
    if (onlyWatchlist) list = list.filter((c) => watchlist.ids.includes(c.id))
    const sorted = [...list]
    if (sort === 'market_cap') sorted.sort((a, b) => a.market_cap_rank - b.market_cap_rank)
    if (sort === 'price') sorted.sort((a, b) => b.current_price - a.current_price)
    if (sort === 'change') sorted.sort((a, b) => (b.price_change_percentage_24h ?? 0) - (a.price_change_percentage_24h ?? 0))
    return sorted
  }, [coins, query, sort, onlyWatchlist, watchlist.ids])

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <Reveal>
        <div>
          <p className="eyebrow mb-2">Markets</p>
          <h1 className="text-2xl font-light tracking-tight text-white sm:text-3xl">Search every asset</h1>
          <p className="mt-2 text-[13.5px] text-white/45">{coins.length} coins · {live ? 'live from CoinGecko' : 'offline snapshot'}</p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="space-y-3">
          <SearchBar value={query} onChange={setQuery} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setOnlyWatchlist((v) => !v)} className={cn('pill text-[12.5px]', onlyWatchlist ? 'bg-amber-glow text-ink-950 font-semibold' : 'border border-white/12 bg-white/[0.05] text-white/60')}>
              <Star size={13} weight={onlyWatchlist ? 'fill' : 'regular'} /> Watchlist
            </button>
            {([{ key: 'market_cap', label: 'Market cap' }, { key: 'price', label: 'Price' }, { key: 'change', label: '24h change' }] as const).map((s) => (
              <button key={s.key} onClick={() => setSort(s.key)} className={cn('pill text-[12.5px]', sort === s.key ? 'bg-white text-ink-950 font-semibold' : 'border border-white/12 bg-white/[0.05] text-white/60')}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <Card className="p-2 sm:p-3">
        {loading && <div className="space-y-2 p-2">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton h-14 w-full" />)}</div>}
        {!loading && filtered.length === 0 && <div className="py-16 text-center"><p className="text-[14px] text-white/60">No assets match.</p></div>}
        {!loading && filtered.length > 0 && <div className="space-y-0.5">{filtered.map((c) => <CoinRow key={c.id} coin={c} />)}</div>}
      </Card>
    </div>
  )
}
