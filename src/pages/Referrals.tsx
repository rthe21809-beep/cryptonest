import { useState } from 'react'
import { Copy, Check, UsersThree, Gift } from '@phosphor-icons/react'
import { useAuth } from '../store/auth'
import { Card, SectionTitle, Stat } from '../components/ui/Card'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { formatCurrency, timeAgo } from '../lib/format'

const MOCK_REFERRALS = [
  { id: 'r1', name: 'Maya R.', at: Date.now() - 21600000, earned: 25, status: 'active' },
  { id: 'r2', name: 'Tomas K.', at: Date.now() - 108000000, earned: 25, status: 'active' },
  { id: 'r3', name: 'Priya S.', at: Date.now() - 266400000, earned: 10, status: 'pending' }
]

export default function Referrals() {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)
  const code = user?.referralCode ?? 'NEST-DEMO'
  const host = 'cryptonest.pages.dev'
  const link = 'https:' + '//' + host + '/auth?ref=' + code
  const totalEarned = MOCK_REFERRALS.reduce((s, r) => s + r.earned, 0)

  const copy = async (text: string) => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* noop */ }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <Reveal>
        <div>
          <p className="eyebrow mb-2">Referrals</p>
          <h1 className="text-2xl font-light tracking-tight text-white sm:text-3xl">Invite & earn</h1>
          <p className="mt-2 max-w-lg text-[13.5px] leading-relaxed text-white/45">Earn 25 USDT for every friend who opens a nest and completes a first deposit.</p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <Card>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="eyebrow">Your referral code</p>
              <p className="mt-2 font-mono text-2xl tracking-tight text-white">{code}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button variant="amber" onClick={() => copy(link)} icon={copied ? <Check size={14} weight="bold" /> : <Copy size={14} />}>{copied ? 'Copied' : 'Copy invite link'}</Button>
              </div>
              <p className="mt-4 truncate rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-[11.5px] text-white/50">{link}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Total earned" value={formatCurrency(totalEarned)} />
              <Stat label="Active" value={MOCK_REFERRALS.filter((r) => r.status === 'active').length} />
            </div>
          </div>
        </Card>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: UsersThree, title: '1. Share your code', body: 'Send your link to anyone curious about crypto.' },
            { icon: Gift, title: '2. They sign up', body: 'They open a nest and complete a first deposit.' },
            { icon: Check, title: '3. You get paid', body: '25 USDT lands in your wallet within 24 hours.' }
          ].map((s) => (
            <div key={s.title} className="glass-soft p-5">
              <s.icon size={20} weight="duotone" className="text-amber-glow" />
              <p className="mt-3 text-[13.5px] font-medium text-white/90">{s.title}</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-white/45">{s.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <Card>
          <SectionTitle eyebrow="History" title="Your referrals" />
          <div className="space-y-1">
            {MOCK_REFERRALS.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-3 rounded-2xl px-2.5 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pastel-lavender/60 to-pastel-sky/60 text-[11px] font-semibold text-ink-950">{r.name.split(' ').map((n) => n[0]).join('')}</span>
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] text-white/90">{r.name}</p>
                    <p className="text-[11px] text-white/35">Joined {timeAgo(r.at)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[13px] tabular font-medium text-pastel-mint">+{formatCurrency(r.earned)}</p>
                  <p className={r.status === 'active' ? 'text-[11px] text-white/35' : 'text-[11px] text-amber-glow'}>{r.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>
    </div>
  )
}
