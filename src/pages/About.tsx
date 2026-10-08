import { Link } from 'react-router-dom'
import { ShieldCheck, Leaf, Users, Code } from '@phosphor-icons/react'
import { Card } from '../components/ui/Card'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Logo } from '../components/Logo'

const VALUES = [
  { icon: Leaf, title: 'Calm by default', body: 'No flashing tickers, no gamified pressure. Just clear numbers and honest framing.' },
  { icon: ShieldCheck, title: 'Non-custodial', body: 'We never hold your keys. Your wallet stays yours.' },
  { icon: Users, title: 'Built for people', body: 'Every screen was designed for someone who is not a trader but deserves good tools.' },
  { icon: Code, title: 'Open by nature', body: 'A Vite + React + TypeScript PWA with Framer Motion and GSAP.' }
]

export default function About() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Reveal>
        <div className="glass relative overflow-hidden p-8 sm:p-12">
          <div className="relative">
            <Logo to="/" className="mb-6" />
            <h1 className="display text-[34px] text-white sm:text-[44px]">About CryptoNest</h1>
            <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-white/55">
              CryptoNest started from a simple frustration: every crypto app wanted to feel like a casino. We wanted the opposite — a quiet, well-organised place to see what you own and what it is worth.
            </p>
            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-white/55">
              This is a demonstration build. Prices come live from the public CoinGecko API, authentication and wallet balances are stored locally in your browser, and the whole thing installs as a PWA. Nothing here is financial advice.
            </p>
          </div>
        </div>
      </Reveal>

      <RevealGroup className="grid gap-4 sm:grid-cols-2">
        {VALUES.map((v) => (
          <RevealItem key={v.title}>
            <Card className="h-full">
              <v.icon size={22} weight="duotone" className="text-amber-glow" />
              <h3 className="mt-4 text-[14.5px] font-medium text-white/90">{v.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/50">{v.body}</p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <Card>
          <h2 className="text-[15px] font-medium text-white/90">Legal</h2>
          <div className="mt-4 space-y-4 text-[13px] leading-relaxed text-white/50">
            <div><p className="mb-1 text-[12px] font-medium uppercase tracking-wider text-white/40">Terms of use</p><p>By using CryptoNest you agree that this is a demonstration product provided as is, without warranty of any kind.</p></div>
            <div><p className="mb-1 text-[12px] font-medium uppercase tracking-wider text-white/40">Privacy</p><p>We do not transmit personal data to any server. Your account lives in your browser.</p></div>
            <div><p className="mb-1 text-[12px] font-medium uppercase tracking-wider text-white/40">Risk disclaimer</p><p>Cryptocurrency is volatile and you can lose money. Nothing on this platform constitutes financial advice.</p></div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 border-t border-white/[0.07] pt-5">
            <Link to="/app/pricing" className="pill-ghost text-[13px]">See plans</Link>
            <Link to="/auth" className="pill-solid text-[13px]">Create an account</Link>
          </div>
        </Card>
      </Reveal>
    </div>
  )
}
