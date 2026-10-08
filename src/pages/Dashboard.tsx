import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, TrendUp, Wallet as WalletIcon, UsersThree, Lightning } from '@phosphor-icons/react'
import { useCoins, useGlobal } from '../hooks/useCoins'
import { useAuth } from '../store/auth'
import { MOCK_HOLDINGS } from '../lib/mockData'
import { formatCurrency, formatPercent, timeAgo } from '../lib/format'
import { Card, SectionTitle, Stat } from '../components/ui/Card'
import { Sparkline } from '../components/charts/Sparkline'
import { Reveal } from '../components/ui/Reveal'
import { cn } from '../lib/utils'

const ACTIVITY = [
  { id: 'a1', t: 'Bought', a: 'BTC', v: 3421, pos: false, at: Date.now() - 2520000 },
  { id: 'a2', t: 'Staking reward', a: 'SOL', v: 202.13, pos: true, at: Date.now() - 18000000 },
  { id: 'a3', t: 'Sold', a: 'ETH', v: 2834.24, pos: false, at: Date.now() - 93600000 },
  { id: 'a4', t: 'Deposited', a: 'USDT', v: 2500, pos: true, at: Date.now() - 187200000 }
]

export default function Dashboard() {
  const { user } = useAuth()
  const { coins, live, updatedAt } = useCoins(50)
  const global = useGlobal()

  const priceOf = useMemo(() => {
    const m = new Map(coins.map((c) => [c.id, c]))
    return (id: string) => m.get(id)?.current_price ?? 0
  }, [coins])

  const portfolio = useMemo(() => {
    const rows = MOCK_HOLDINGS.map((h) => {
      const price = priceOf(h.coinId) || h.avgBuyPrice
      const value = price * h.amount
      const cost = h.avgBuyPrice * h.amount
      return { ...h, price, value, cost, pnl: value - cost, pnlPct: cost ? ((value - cost) / cost) * 100 : 0 }
    })
    const total = rows.reduce((s, r) => s + r.value, 0)
    const cost = rows.reduce((s, r) => s + r.cost, 0)
    return { rows, total, cost, pnl: total - cost, pnlPct: cost ? ((total - cost) / cost) * 100 : 0 }
  }, [priceOf])

  const allocation = useMemo(() => {
    const total = portfolio.total || 1
    return portfolio.rows.map((r) => ({ ...r, pct: (r.value / total) * 100 }))
  }, [portfolio])

  const movers = useMemo(
    () => [...coins].sort((a, b) => (b.price_change_percentage_24h ?? 0) - (a.price_change_percentage_24h ?? 0)).slice(0, 5),
    [coins]
  )

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Overview</p>
            <h1 className="text-2xl font-light tracking-tight text-white sm:text-3xl">{user ? user.name.split(' ')[0] + '’s nest' : 'Your nest'}</h1>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-white/40">
            <span className={cn('h-1.5 w-1.5 rounded-full', live ? 'bg-pastel-mint' : 'bg-amber-glow')} />
            {live ? 'Live prices' : 'Offline data'}
            {updatedAt > 0 && <span className="text-white/25">· {timeAgo(updatedAt)}</span>}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <Card className="relative overflow-hidden">
          <div className="relative grid gap-6 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Total balance</p>
              <p className="mt-2 text-4xl font-light tabular tracking-tight text-white sm:text-5xl">{formatCurrency(portfolio.total)}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-medium tabular', portfolio.pnl >= 0 ? 'bg-pastel-mint/12 text-pastel-mint' : 'bg-pastel-blush/12 text-pastel-blush')}>
                  <ArrowUpRight size={13} weight="bold" />
                  {formatCurrency(Math.abs(portfolio.pnl))} ({formatPercent(portfolio.pnlPct)})
                </span>
                <span className="text-[12px] text-white/35">all time</span>
              </div>
              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat label="Invested" value={formatCurrency(portfolio.cost, { compact: true })} />
                <Stat label="Holdings" value={portfolio.rows.length} />
                <Stat label="24h mkt" value={global ? formatPercent(global.change24h) : '—'} />
                <Stat label="BTC dom." value={global ? global.btcDominance.toFixed(1) + '%' : '—'} />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[12px] text-white/45">Portfolio (7d, modelled on BTC)</p>
                <TrendUp size={15} className="text-pastel-mint" />
              </div>
              {coins[0]?.sparkline_in_7d?.price?.length ? (
                <Sparkline data={coins[0].sparkline_in_7d.price} positive={portfolio.pnl >= 0} width={480} height={160} className="w-full" />
              ) : <div className="skeleton h-40 w-full" />}
            </div>
          </div>
        </Card>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { to: '/app/wallet', icon: WalletIcon, title: 'Wallet', body: portfolio.rows.length + ' assets held' },
            { to: '/app/markets', icon: Lightning, title: 'Markets', body: coins.length + ' assets tracked' },
            { to: '/app/referrals', icon: UsersThree, title: 'Referrals', body: 'Earn 25 USDT per signup' }
          ].map((q) => (
            <Link key={q.to} to={q.to} className="glass-soft group flex items-center gap-4 p-4 transition-all duration-300 hover:border-white/16">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/70">
                <q.icon size={18} weight="duotone" />
              </span>
              <div className="min-w-0">
                <p className="text-[13.5px] font-medium text-white/90">{q.title}</p>
                <p className="truncate text-[12px] text-white/40">{q.body}</p>
              </div>
              <ArrowUpRight size={15} className="ml-auto text-white/25" />
            </Link>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal delay={0.1}>
          <Card>
            <SectionTitle eyebrow="Allocation" title="Your holdings" action={<Link to="/app/wallet" className="text-[12px] font-medium text-amber-glow">Manage →</Link>} />
            <div className="mb-5 flex h-2.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
              {allocation.map((a) => (
                <div key={a.coinId} style={{ width: a.pct + '%', background: a.color }}} className="h-full" />
              ))}
            </div>
            <div className="space-y-1">
              {allocation.map((h) => (
                <Link key={h.coinId} to={'/app/coin/' + h.coinId} className="row-hover flex items-center justify-between gap-3 rounded-2xl px-2.5 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="h-8 w-8 shrink-0 rounded-full" style={{ background: h.color + '22', border: '1px solid ' + h.color + '44' }}} />
                    <div className="min-w-0">
                      <p className="truncate text-[13.5px] font-medium text-white/90">{h.name}</p>
                      <p className="text-[11px] tabular text-white/35">{h.amount} {h.symbol} · {h.pct.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[13.5px] tabular text-white/90">{formatCurrency(h.value)}</p>
                    <p className={cn('text-[11px] tabular font-medium', h.pnl >= 0 ? 'text-pastel-mint' : 'text-pastel-blush')}>{formatPercent(h.pnlPct)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.12}>
            <Card>
              <SectionTitle eyebrow="24h" title="Top movers" />
              <div className="space-y-1">
                {movers.map((c) => {
                  const up = (c.price_change_percentage_24h ?? 0) >= 0
                  return (
                    <Link key={c.id} to={'/app/coin/' + c.id} className="row-hover flex items-center justify-between gap-3 rounded-2xl px-2.5 py-2.5">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[9px] font-semibold uppercase text-white/60">{c.symbol.slice(0, 3)}</span>
                        <p className="truncate text-[13px] text-white/85">{c.name}</p>
                      </div>
                      <p className={cn('text-[12.5px] tabular font-medium', up ? 'text-pastel-mint' : 'text-pastel-blush')}>{formatPercent(c.price_change_percentage_24h ?? 0)}</p>
                    </Link>
                  )
                })}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.14}>
            <Card>
              <SectionTitle eyebrow="Recent" title="Activity" />
              <div className="space-y-1">
                {ACTIVITY.map((a) => (
                  <div key={a.id} className="flex items-center justify-between gap-3 rounded-2xl px-2.5 py-2.5">
                    <div className="min-w-0">
                      <p className="text-[13px] text-white/85">{a.t} <span className="text-white/50">{a.a}</span></p>
                      <p className="text-[11px] text-white/35">{timeAgo(a.at)}</p>
                    </div>
                    <p className={cn('text-[13px] tabular font-medium', a.pos ? 'text-pastel-mint' : 'text-pastel-blush')}>{a.pos ? '+' : '−'}{formatCurrency(a.v)}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
