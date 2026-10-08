export function formatCurrency(value: number, opts: { compact?: boolean; max?: number } = {}) {
  if (!Number.isFinite(value)) return '—'
  const abs = Math.abs(value)
  let max = opts.max
  if (max === undefined) {
    if (abs < 0.01) max = 6
    else if (abs < 1) max = 4
    else if (abs < 1000) max = 2
    else max = 0
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
    notation: opts.compact ? 'compact' : 'standard',
    maximumFractionDigits: max
  }).format(value)
}

export function formatPercent(value: number, digits = 2) {
  if (!Number.isFinite(value)) return '—'
  return (value > 0 ? '+' : '') + value.toFixed(digits) + '%'
}

export function priceTight(value: number) {
  if (!Number.isFinite(value)) return '—'
  if (value >= 1) return formatCurrency(value, { max: 2 })
  if (value >= 0.01) return formatCurrency(value, { max: 4 })
  if (value >= 0.0001) return formatCurrency(value, { max: 6 })
  return '$' + value.toExponential(2)
}

export function timeAgo(ts: number) {
  const diff = Math.floor((Date.now() - ts) / 1000)
  if (diff < 5) return 'just now'
  if (diff < 60) return diff + 's ago'
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago'
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago'
  return Math.floor(diff / 86400) + 'd ago'
}
