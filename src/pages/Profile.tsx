import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PencilSimple, SignOut, Check, ShieldCheck } from '@phosphor-icons/react'
import { useAuth } from '../store/auth'
import { Card, SectionTitle } from '../components/ui/Card'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { timeAgo } from '../lib/format'

export default function Profile() {
  const { user, update, signOut } = useAuth()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user?.name ?? '')

  if (!user) return null
  const initials = user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Reveal>
        <div><p className="eyebrow mb-2">Account</p><h1 className="text-2xl font-light tracking-tight text-white sm:text-3xl">Profile & settings</h1></div>
      </Reveal>

      <Reveal delay={0.05}>
        <Card>
          <div className="flex flex-wrap items-center gap-5">
            <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-pastel-lavender/70 to-pastel-sky/70 text-lg font-semibold text-ink-950">{initials}</span>
            <div className="min-w-0 flex-1">
              {editing ? <input value={name} onChange={(e) => setName(e.target.value)} className="field max-w-xs" autoFocus /> : <p className="text-lg font-medium tracking-tight text-white/95">{user.name}</p>}
              <p className="mt-0.5 truncate text-[13px] text-white/45">{user.email}</p>
              <p className="mt-1 text-[11.5px] text-white/30">Member since {timeAgo(user.joinedAt)}</p>
            </div>
            {editing ? (
              <Button variant="amber" icon={<Check size={14} weight="bold" />} onClick={() => { update({ name: name.trim() || user.name }); setEditing(false) }}>Save</Button>
            ) : (
              <Button variant="ghost" icon={<PencilSimple size={14} />} onClick={() => setEditing(true)}>Edit</Button>
            )}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[{ label: 'Plan', value: user.plan.charAt(0).toUpperCase() + user.plan.slice(1) }, { label: 'Referral code', value: user.referralCode }, { label: '2FA', value: 'Enabled' }, { label: 'Status', value: 'Active' }].map((s) => (
              <div key={s.label} className="glass-soft p-3.5">
                <p className="text-[10.5px] uppercase tracking-wider text-white/35">{s.label}</p>
                <p className="mt-1.5 truncate text-[13.5px] font-medium text-white/90">{s.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>

      <Reveal delay={0.1}>
        <Card>
          <SectionTitle eyebrow="Security" title="Account safety" />
          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5">
            <ShieldCheck size={18} weight="duotone" className="text-pastel-mint" />
            <div className="flex-1">
              <p className="text-[13.5px] text-white/85">Two-factor authentication</p>
              <p className="text-[11.5px] text-white/35">Your account is protected with TOTP</p>
            </div>
          </div>
        </Card>
      </Reveal>

      <Reveal delay={0.12}>
        <Card>
          <SectionTitle eyebrow="Session" title="Sign out" />
          <p className="mb-4 text-[13px] leading-relaxed text-white/45">This clears your local session.</p>
          <Button variant="ghost" icon={<SignOut size={15} />} className="border-pastel-blush/25 text-pastel-blush" onClick={() => { signOut(); navigate('/') }}>Sign out of CryptoNest</Button>
        </Card>
      </Reveal>
    </div>
  )
}
