import { NavLink } from 'react-router-dom'
import { SquaresFour, ChartLineUp, Wallet, UsersThree, UserCircle } from '@phosphor-icons/react'
import { cn } from '../../lib/utils'

const items = [
  { to: '/app', label: 'Home', icon: SquaresFour, end: true },
  { to: '/app/markets', label: 'Markets', icon: ChartLineUp },
  { to: '/app/wallet', label: 'Wallet', icon: Wallet },
  { to: '/app/referrals', label: 'Invite', icon: UsersThree },
  { to: '/app/profile', label: 'You', icon: UserCircle }
]

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-ink-950/85 px-2 pt-1.5 pb-2 backdrop-blur-2xl lg:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-between">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) => cn('flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2', isActive ? 'text-white' : 'text-white/40')}>
            <Icon size={20} weight="duotone" />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
