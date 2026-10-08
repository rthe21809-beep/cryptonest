import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, ArrowDown, ArrowUp, Copy, Check } from '@phosphor-icons/react'
import { useCoins } from '../hooks/useCoins'
import { MOCK_HOLDINGS } from '../lib/mockData'
import { formatCurrency, formatPercent, shorten } from '../lib/format'
import { Card, SectionTitle, Stat } from '../components/ui/Card'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { cn } from '../lib/utils'

export default function Wallet() {
  const { coins } = useCoins(50)
  const [copied, setCopied] = useState(false)
  const address = '0x7A3f9C2eB14d5A8c0F6E2b93D1a4C7E8f0B5d2A1'

  const priceOf = useMemo(() => {
    const m = new Map(coins.map((c) => [c.id, c.current_price]))
    return (id: string) => m.get(id) ?? 0
  }, [coins])

  const rows = useMemo(
    () => MOCK_HOLDINGS.map((h) => {
      const price = priceOf(h.coinId) || h.avgBuyPrice
      const value = price * h.amount
      const cost = h.avgBuyPrice * h.amount
      return { ...h, price, value, cost, pnl: value - cost, pnlPct: cost ? ((value - cost) / cost) * 100 : 0 }
    }),
    [priceOf]
  )

  const total = rows.reduce((s, r) => s + r.value, 0)

  const copy = async () => {
    try { await navigator.clipboard.writeText(address); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* noop */ }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <Reveal>
        <div><p className="eyebrow mb-2">Wallet</p><h1 className="text-2xl font-light tracking-tight text-white sm:text-3xl">Your assets</h1></div>
      </Reveal>

      <Reveal delay={0.05}>
        <Card className="relative overflow-hidden">
          <p className="eyebrow">Total value</p>
          <p className="mt-2 text-4xl font-light tabular tracking-tight text-white">{formatCurrency(total)}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Button variant="amber" icon={<Plus size={14} weight="bold" />}>Deposit</Button>
            <Button variant="ghost" icon={<ArrowUp size={14} weight="bold" />}>Send</Button>
            <Button variant="ghost" icon={<ArrowDown size={14} weight="bold" />}>Receive</Button>
          </div>
          <button onClick={copy} className="mt-5 flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider text-white/35">Wallet address</p>
              <p className="mt-0.5 truncate font-mono text-[12.5px] text-white/75">{shorten(address, 10, 8)}</p>
            </div>
            {copied ? <Check size={16} className="text-pastel-mint" /> : <Copy size={16} className="text-white/40" />}
          </button>
        </Card>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat label="Assets held" value={rows.length} />
          <Stat label="Total invested" value={formatCurrency(rows.reduce((s, r) => s + r.cost, 0))} />
          <Stat label="Unrealised P/L" value={formatCurrency(total - rows.reduce((s, r) => s + r.cost, 0))} />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <Card>
          <SectionTitle eyebrow="Positions" title="All assets" />
          <div className="space-y-1">
            {rows.map((h) => (
              <Link key={h.coinId} to={'/app/coin/' + h.coinId} className="row-hover flex items-center justify-between gap-3 rounded-2xl px-2.5 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="h-9 w-9 shrink-0 rounded-2xl" style={{ background: h.color + '1f', border: '1px solid ' + h.color + '3d' }}} />
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] font-medium text-white/90">{h.name}</p>
                    <p className="text-[11px] tabular text-white/35">{h.amount} {h.symbol} @ {formatCurrency(h.avgBuyPrice)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[13.5px] tabular text-white/90">{formatCurrency(h.value)}</p>
                  <p className={cn('text-[11px] tabular font-medium', h.pnl >= 0 ? 'text-pastel-mint' : 'text-pastel-blush')}>{h.pnl >= 0 ? '+' : '−'}{formatCurrency(Math.abs(h.pnl))}</p>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </Reveal>
    </div>
  )
}
