import { useMemo } from 'react'
import { cn } from '../../lib/utils'

interface SparklineProps { data: number[]; positive?: boolean; width?: number; height?: number; className?: string }

export function Sparkline({ data, positive = true, width = 120, height = 36, className }: SparklineProps) {
  const { path, area } = useMemo(() => {
    if (!data || data.length < 2) return { path: '', area: '' }
    const min = Math.min(...data), max = Math.max(...data)
    const range = max - min || 1
    const stepX = width / (data.length - 1)
    const pts = data.map((v, i) => [i * stepX, height - ((v - min) / range) * (height - 4) - 2] as const)
    const d = pts.map(([x, y], i) => (i === 0 ? 'M' : 'L') + x.toFixed(2) + ',' + y.toFixed(2)).join(' ')
    return { path: d, area: d + ' L' + width + ',' + height + ' L0,' + height + ' Z' }
  }, [data, width, height])

  if (!path) return <div style={{ width, height }} className={cn('rounded-md bg-white/[0.04]', className)} />
  const color = positive ? '#A8E6CF' : '#FFAAA5'
  const id = 'spark-' + (positive ? 'up' : 'down')

  return (
    <svg width={width} height={height} viewBox={'0 0 ' + width + ' ' + height'} className={className} preserveAspectRatio="none">
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.28" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient></defs>
      <path d={area} fill={'url(#' + id + ')'} />
      <path d={path} fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
