import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

type Variant = 'solid' | 'ghost' | 'amber' | 'subtle'
const variants: Record<Variant, string> = {
  solid: 'bg-white text-ink-950 hover:bg-white/90',
  ghost: 'border border-white/12 bg-white/[0.05] text-white/75 hover:bg-white/[0.1]',
  amber: 'bg-amber-glow text-ink-950 font-semibold hover:brightness-105 shadow-glow',
  subtle: 'bg-white/[0.06] text-white/80 hover:bg-white/[0.11]'
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant; children: ReactNode; icon?: ReactNode }

export function Button({ variant = 'solid', className, children, icon, ...rest }: Props) {
  return (
    <button className={cn('inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 active:scale-[0.97] disabled:opacity-40', variants[variant], className)} {...rest}>
      {icon}{children}
    </button>
  )
}

export function LinkButton({ to, variant = 'solid', className, children, icon }: { to: string; variant?: Variant; className?: string; children: ReactNode; icon?: ReactNode }) {
  return (
    <Link to={to} className={cn('inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 active:scale-[0.97]', variants[variant], className)}>
      {icon}{children}
    </Link>
  )
}
