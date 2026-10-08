import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { cn } from '../lib/utils'

export function SearchBar({ value, onChange, placeholder = 'Search coins…', className }: { value: string; onChange: (v: string) => void; placeholder?: string; className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <MagnifyingGlass size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35" />
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="field pl-10 pr-10" />
      {value && (
        <button onClick={() => onChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/40">
          <X size={13} weight="bold" />
        </button>
      )}
    </div>
  )
}
