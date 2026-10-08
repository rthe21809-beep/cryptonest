import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ArrowRight, ShieldCheck, Lightning } from '@phosphor-icons/react'
import { Logo } from '../components/Logo'
import { Footer } from '../components/Footer'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { useCountUp } from '../hooks/useCountUp'
import { useCoins } from '../hooks/useCoins'
import { priceTight, formatPercent } from '../lib/format'
import { Sparkline } from '../components/charts/Sparkline'
import { cn } from '../lib/utils'

function HeroStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const n = useCountUp(value, 1800)
  return (
    <div>
      <p className="text-2xl font-light tabular tracking-tight text-white sm:text-3xl">
        {value >= 1000 ? Math.round(n).toLocaleString() : n.toFixed(1)}<span className="text-amber-glow">{suffix}</span>
      </p>
      <p className="mt-1 text-[11px] uppercase tracking-wider text-white/40">{label}</p>
    </div>
  )
}

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { coins } = useCoins(6)

  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', { yPercent: 118, opacity: 0, duration: 1.15, ease: 'expo.out', stagger: 0.11, delay: 0.15 })
      gsap.from('.hero-fade', { opacity: 0, y: 18, duration: 0.9, ease: 'power3.out', stagger: 0.09, delay: 0.62 })
      gsap.from('.hero-card', { opacity: 0, y: 34, scale: 0.97, duration: 1, ease: 'expo.out', delay: 0.5 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const top = coins.slice(0, 4)

  return (
    <div className="relative min-h-dvh">
      <section ref={heroRef} className="px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="glass relative mx-auto max-w-7xl overflow-hidden rounded-[28px] sm:rounded-[40px]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-pine-700/40 blur-[110px]" />
            <div className="absolute -right-20 top-10 h-[360px] w-[360px] rounded-full bg-pastel-lavender/[0.09] blur-[120px]" />
            <div className="absolute bottom-0 left-1/3 h-[300px] w-[520px] rounded-full bg-amber-glow/[0.07] blur-[130px]" />
          </div>
          <nav className="relative z-20 flex items-center justify-between gap-4 px-5 py-5 sm:px-8 sm:py-6">
            <Logo />
            <div className="hidden items-center gap-1 md:flex">
              <Link to="/app/markets" className="nav-link">Markets</Link>
              <Link to="/app/wallet" className="nav-link">Wallet</Link>
              <Link to="/app/pricing" className="nav-link">Plans</Link>
            </div>
            <Link to="/auth" className="pill-solid text-[13px]">Get started</Link>
          </nav>
          <div className="relative z-10 grid gap-10 px-5 pb-10 pt-4 sm:px-8 sm:pb-14 lg:grid-cols-[1.35fr_1fr] lg:gap-8 lg:pt-8">
            <div>
              <p className="hero-fade eyebrow mb-6">Calm crypto, done properly</p>
              <h1 className="display text-[52px] leading-[0.9] sm:text-[76px] lg:text-[92px]">
                <span className="block overflow-hidden"><span className="hero-line block text-white">Your crypto,</span></span>
                <span className="block overflow-hidden"><span className="hero-line block display-fade">beautifully</span></span>
                <span className="block overflow-hidden"><span className="hero-line block text-white">organised.</span></span>
              </h1>
              <p className="hero-fade mt-7 max-w-md text-[15px] leading-relaxed text-white/55">Track live prices, hold a wallet that actually makes sense, and earn from every friend you bring.</p>
              <div className="hero-fade mt-8 flex flex-wrap items-center gap-3">
                <Link to="/auth" className="pill-amber px-5 py-3 text-[14px]">Open your nest <ArrowRight size={15} weight="bold" /></Link>
                <Link to="/app/markets" className="pill-ghost px-5 py-3 text-[14px]">Browse markets</Link>
              </div>
              <div className="hero-fade mt-10 flex items-center gap-7">
                <HeroStat value={4200} suffix="+" label="Assets tracked" />
                <div className="h-9 w-px bg-white/10" />
                <HeroStat value={128} suffix="K" label="Nests opened" />
              </div>
            </div>
            <div className="hero-card relative">
              <div className="glass-soft relative overflow-hidden p-5">
                <div className="flex items-start justify-between">
                  <div><p className="eyebrow">Live market</p><p className="mt-1 text-lg font-medium tracking-tight text-white/95">Top movers today</p></div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/50"><Lightning size={14} weight="duotone" /></span>
                </div>
                <div className="mt-5 space-y-1">
                  {top.map((c) => {
                    const up = (c.price_change_percentage_24h ?? 0) >= 0
                    return (
                      <Link key={c.id} to={'/app/coin/' + c.id} className="flex items-center justify-between gap-3 rounded-2xl px-2.5 py-2.5 transition hover:bg-white/[0.06]">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[10px] font-semibold uppercase text-white/65">{c.symbol.slice(0, 3)}</span>
                          <div className="min-w-0"><p className="truncate text-[13px] font-medium text-white/90">{c.name}</p></div>
                        </div>
                        <div className="text-right">
                          <p className="text-[13px] tabular text-white/90">{priceTight(c.current_price)}</p>
                          <p className={cn('text-[11px] tabular font-medium', up ? 'text-pastel-mint' : 'text-pastel-blush')}>{formatPercent(c.price_change_percentage_24h ?? 0)}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
                  <span className="flex items-center gap-2 text-[12px] text-white/45"><ShieldCheck size={15} weight="duotone" className="text-pastel-mint" />Non-custodial</span>
                  <Link to="/app/markets" className="text-[12px] font-medium text-amber-glow">View all →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <p className="eyebrow mb-3">Everything in one place</p>
          <h2 className="display max-w-2xl text-[34px] text-white sm:text-[46px]">Built for people who want clarity, not chaos.</h2>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Live prices & candles', body: 'Real-time markets with candlestick charts, 7-day sparklines and search across thousands of assets.', accent: 'from-pastel-mint/20' },
            { title: 'A wallet that adds up', body: 'See allocation, cost basis and profit/loss per holding.', accent: 'from-pastel-lavender/20' },
            { title: 'Referrals that pay', body: 'Share your code, track every signup, watch rewards land.', accent: 'from-pastel-peach/20' },
            { title: 'Plans for every scale', body: 'Start free forever. Upgrade when you need alerts and exports.', accent: 'from-pastel-sky/20' },
            { title: 'Install it anywhere', body: 'A full PWA — add it to your home screen, offline included.', accent: 'from-pastel-blush/20' },
            { title: 'Motion that means something', body: 'Every transition is intentional. Smooth, quiet, never in the way.', accent: 'from-amber-glow/20' }
          ].map((f) => (
            <RevealItem key={f.title}>
              <div className="glass group h-full p-6 transition-all duration-500 hover:border-white/16">
                <div className={cn('mb-5 h-10 w-10 rounded-2xl bg-gradient-to-br to-transparent', f.accent)} />
                <h3 className="text-[15px] font-medium text-white/90">{f.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/50">{f.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden p-8 text-center sm:p-16">
            <h2 className="display mx-auto max-w-2xl text-[34px] text-white sm:text-[48px]">Ready to build your nest?</h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/50">Free to start. No card. Takes about eleven seconds.</p>
            <Link to="/auth" className="pill-amber mt-8 inline-flex px-6 py-3.5 text-[15px]">Create your account <ArrowRight size={16} weight="bold" /></Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  )
}
