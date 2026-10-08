import { NavLink } from 'react-router-dom'
import { SquaresFour, ChartLineUp, Wallet, UsersThree, Sparkle, UserCircle, Info } from '@phosphor-icons/react'
import { cn } from '../../lib/utils'
import { Logo } from '../Logo'

const links = [
  { to: '/app', label: 'Dashboard', icon: SquaresFour, end: true },
  { to: '/app/markets', label: 'Markets', icon: ChartLineUp },
  { to: '/app/wallet', label: 'Wallet', icon: Wallet },
  { to: '/app/referrals', label: 'Referrals', icon: UsersThree },
  { to: '/app/pricing', label: 'Plans', icon: Sparkle },
  { to: '/app/profile', label: 'Profile', icon: UserCircle },
  { to: '/app/about', label: 'About', icon: Info }
]

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-[240px] shrink-0 flex-col border-r border-white/[0.07] px-4 py-6 lg:flex">
      <div className="px-2"><Logo /></div>
      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) => cn('flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[13.5px] transition-all duration-300', isActive ? 'bg-white/[0.09] text-white' : 'text-white/50 hover:bg-white/[0.05] hover:text-white/85')}>
            <Icon size={18} weight="duotone" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
