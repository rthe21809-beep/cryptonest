import { useState } from 'react'
import { Check, Sparkle } from '@phosphor-icons/react'
import type { Plan } from '../lib/types'
import { Card } from '../components/ui/Card'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { useAuth } from '../store/auth'
import { cn } from '../lib/utils'

const PLANS: Plan[] = [
  { id: 'free', name: 'Nest', tagline: 'Everything you need to start.', priceMonthly: 0, priceYearly: 0, accent: 'from-pastel-mint/20', features: ['Live prices for 10,000+ assets', 'Portfolio tracking (up to 10 assets)', 'Candlestick charts & sparklines', 'Referral programme', 'Installable PWA'] },
  { id: 'pro', name: 'Pro', tagline: 'For people who check daily.', priceMonthly: 12, priceYearly: 110, accent: 'from-pastel-lavender/25', highlight: true, features: ['Everything in Nest', 'Unlimited portfolio assets', 'Price alerts & notifications', 'CSV / tax export', 'Advanced candles', 'Instant referral payouts'] },
  { id: 'desk', name: 'Desk', tagline: 'For teams and small funds.', priceMonthly: 49, priceYearly: 470, accent: 'from-pastel-peach/20', features: ['Everything in Pro', 'Multi-wallet aggregation', 'Team seats (up to 5)', 'API access & webhooks', 'Custom dashboards', 'Dedicated support'] }
]

export default function Pricing() {
  const [yearly, setYearly] = useState(false)
  const { user, setPlan } = useAuth()

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Reveal>
        <div className="text-center">
          <p className="eyebrow mb-2">Plans</p>
          <h1 className="text-2xl font-light tracking-tight text-white sm:text-3xl">Pick your nest</h1>
          <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-relaxed text-white/45">Start free. Upgrade the moment you want alerts, exports or a team around you.</p>
          <div className="mt-6 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
            {(['monthly', 'yearly'] as const).map((mode) => (
              <button key={mode} onClick={() => setYearly(mode === 'yearly')} className={cn('rounded-full px-4 py-1.5 text-[12.5px] capitalize transition-all duration-300', (mode === 'yearly') === yearly ? 'bg-white text-ink-950 font-semibold' : 'text-white/55')}>{mode}</button>
            ))}
          </div>
        </div>
      </Reveal>

      <RevealGroup className="grid gap-4 lg:grid-cols-3" stagger={0.08}>
        {PLANS.map((p) => {
          const price = yearly ? p.priceYearly : p.priceMonthly
          const isCurrent = user?.plan === p.id
          return (
            <RevealItem key={p.id}>
              <div className={cn('glass relative flex h-full flex-col overflow-hidden p-6 transition-all duration-500', p.highlight ? 'border-amber-glow/25 shadow-glow' : 'hover:border-white/16')}>
                {p.highlight && <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-amber-glow/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-glow"><Sparkle size={10} weight="fill" /> Popular</span>}
                <div className={cn('mb-5 h-10 w-10 rounded-2xl bg-gradient-to-br to-transparent', p.accent)} />
                <h3 className="text-lg font-medium tracking-tight text-white/95">{p.name}</h3>
                <p className="mt-1 text-[12.5px] text-white/45">{p.tagline}</p>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-4xl font-light tabular tracking-tight text-white">${price}</span>
                  <span className="text-[12.5px] text-white/40">/{yearly ? 'year' : 'month'}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-white/60"><Check size={14} weight="bold" className="mt-0.5 shrink-0 text-pastel-mint" /><span>{f}</span></li>
                  ))}
                </ul>
                <Button variant={p.highlight ? 'amber' : isCurrent ? 'subtle' : 'ghost'} className="mt-7 w-full justify-center" disabled={isCurrent} onClick={() => setPlan(p.id)}>
                  {isCurrent ? 'Current plan' : p.id === 'free' ? 'Get started' : 'Choose ' + p.name}
                </Button>
              </div>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </div>
  )
}
