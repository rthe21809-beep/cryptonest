import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'

export function Logo({ to = '/', compact = false, className }: { to?: string; compact?: boolean; className?: string }) {
  return (
    <Link to={to} className={cn('group inline-flex items-center gap-2.5', className)}>
      <span className="relative flex h-8 w-8 items-center justify-center">
        <svg viewBox="0 0 32 32" className="relative h-8 w-8">
          <defs><linearGradient id="logoG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A8E6CF" /><stop offset="100%" stopColor="#A8D8EA" />
          </linearGradient></defs>
          <rect width="32" height="32" rx="9" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" />
          <path d="M16 6.5 24 11v10l-8 4.5L8 21V11z" fill="none" stroke="url(#logoG)" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="16" cy="16" r="3" fill="#F5B544" />
        </svg>
      </span>
      {!compact && <span className="text-[15px] font-medium tracking-tight text-white/90">Crypto<span className="text-white/55">Nest</span></span>}
    </Link>
  )
}
