import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

export function Card({ children, className, as: As = 'div' }: { children: ReactNode; className?: string; as?: any }) {
  return <As className={cn('glass p-5 sm:p-6', className)}>{children}</As>
}

export function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="eyebrow mb-1.5">{eyebrow}</p>}
        <h2 className="text-lg font-medium tracking-tight text-white/90">{title}</h2>
      </div>
      {action}
    </div>
  )
}

export function Stat({ label, value, delta, className }: { label: string; value: ReactNode; delta?: number; className?: string }) {
  const up = (delta ?? 0) >= 0
  return (
    <div className={cn('stat-tile', className)}>
      <p className="text-[11px] uppercase tracking-wider text-white/40">{label}</p>
      <p className="mt-2 text-xl font-medium tabular tracking-tight text-white/95">{value}</p>
      {delta !== undefined && <p className={cn('mt-1 text-xs tabular font-medium', up ? 'text-pastel-mint' : 'text-pastel-blush')}>{up ? '▲' : '▼'} {Math.abs(delta).toFixed(2)}%}</p>}
    </div>
  )
}
