import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SignOut, UserCircle } from '@phosphor-icons/react'
import { Logo } from '../Logo'
import { useAuth } from '../../store/auth'

export function Topbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [menu, setMenu] = useState(false)
  const initials = user?.name?.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-ink-950/70 backdrop-blur-2xl">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <div className="lg:hidden"><Logo to="/app" /></div>
        <p className="hidden text-[13px] text-white/40 lg:block">Welcome back{user ? ', ' + user.name.split(' ')[0] : ''}</p>
        <div className="flex items-center gap-2">
          {user ? (
            <div className="relative">
              <button onClick={() => setMenu((m) => !m)} className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] pl-1 pr-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-pastel-lavender/70 to-pastel-sky/70 text-[11px] font-semibold text-ink-950">{initials}</span>
              </button>
              {menu && (
                <div className="glass-soft absolute right-0 top-12 z-20 w-48 p-1.5">
                  <button onClick={() => { signOut(); navigate('/') }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-[13px] text-pastel-blush">
                    <SignOut size={15} /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="pill-solid text-[13px]">Sign in</Link>
          )}
        </div>
      </div>
    </header>
  )
}
