import { useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, EyeSlash, Check } from '@phosphor-icons/react'
import { Logo } from '../components/Logo'
import { Button } from '../components/ui/Button'
import { useAuth } from '../store/auth'
import { cn } from '../lib/utils'

type Mode = 'signin' | 'signup'

export default function Auth() {
  const [mode, setMode] = useState<Mode>('signup')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const ref = params.get('ref') ?? undefined
  const from = (location.state as any)?.from ?? '/app'

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email.includes('@')) return setError('Enter a valid email address.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    if (mode === 'signup' && name.trim().length < 2) return setError('Tell us your name.')
    setBusy(true)
    await new Promise((r) => setTimeout(r, 550))
    if (mode === 'signup') signUp(name.trim(), email.trim(), ref)
    else signIn(email.trim())
    setBusy(false)
    navigate(from, { replace: true })
  }

  const isSignup = mode === 'signup'

  return (
    <div className="relative flex min-h-dvh items-center justify-center px-4 py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[460px] w-[460px] rounded-full bg-pine-700/35 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-pastel-lavender/[0.09] blur-[130px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}} className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo /></div>

        <div className="glass overflow-hidden p-7 sm:p-8">
          <div className="mb-6 flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
            {(['signup', 'signin'] as const).map((m) => (
              <button key={m} onClick={() => { setMode(m); setError(null) }}} className={cn('flex-1 rounded-full py-2 text-[12.5px] font-medium transition-all duration-300', mode === m ? 'bg-white text-ink-950' : 'text-white/50')}>
                {m === 'signup' ? 'Create account' : 'Sign in'}
              </button>
            ))}
          </div>

          <h1 className="text-xl font-light tracking-tight text-white">{isSignup ? 'Open your nest' : 'Welcome back'}</h1>
          <p className="mt-1.5 text-[13px] text-white/45">{isSignup ? 'Free forever. No card required.' : 'Pick up where you left off.'}</p>

          {ref && isSignup && (
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-glow/12 px-3 py-1.5 text-[11.5px] font-medium text-amber-glow">
              <Check size={12} weight="bold" /> Referral {ref} applied
            </p>
          )}

          <form onSubmit={submit} className="mt-6 space-y-3.5">
            {isSignup && (
              <div>
                <label className="mb-1.5 block text-[11.5px] uppercase tracking-wider text-white/40">Full name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada Lovelace" className="field" />
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-[11.5px] uppercase tracking-wider text-white/40">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="field" />
            </div>
            <div>
              <label className="mb-1.5 block text-[11.5px] uppercase tracking-wider text-white/40">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" className="field pr-11" />
                <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/35">
                  {showPw ? <EyeSlash size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <p className="rounded-xl border border-pastel-blush/25 bg-pastel-blush/10 px-3.5 py-2.5 text-[12.5px] text-pastel-blush">{error}</p>}
            <Button type="submit" variant="amber" className="w-full justify-center" disabled={busy}>
              {busy ? 'Working…' : (isSignup ? 'Create my nest' : 'Sign in')} <ArrowRight size={15} weight="bold" />
            </Button>
          </form>

          <p className="mt-5 text-center text-[11.5px] leading-relaxed text-white/35">Demo authentication — everything is stored locally in your browser.</p>
        </div>

        <p className="mt-6 text-center text-[12.5px] text-white/35"><Link to="/">Back to home</Link></p>
      </motion.div>
    </div>
  )
}
