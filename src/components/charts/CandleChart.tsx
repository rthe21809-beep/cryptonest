import { useEffect, useRef } from 'react'
import { createChart, ColorType, type IChartApi, type ISeriesApi } from 'lightweight-charts'
import type { Candle } from '../../lib/types'
import { cn } from '../../lib/utils'

export function CandleChart({ candles, height = 380, className }: { candles: Candle[]; height?: number; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const chart = createChart(containerRef.current, {
      height,
      layout: { background: { type: ColorType.Solid, color: 'transparent' }, textColor: 'rgba(255,255,255,0.45)', fontSize: 11 },
      grid: { vertLines: { color: 'rgba(255,255,255,0.035)' }, horzLines: { color: 'rgba(255,255,255,0.035)' } },
      rightPriceScale: { borderColor: 'rgba(255,255,255,0.07)' },
      timeScale: { borderColor: 'rgba(255,255,255,0.07)', timeVisible: true, secondsVisible: false }
    })
    const series = chart.addCandlestickSeries({
      upColor: '#A8E6CF', downColor: '#FFAAA5',
      borderUpColor: '#A8E6CF', borderDownColor: '#FFAAA5',
      wickUpColor: 'rgba(168,230,207,0.7)', wickDownColor: 'rgba(255,170,165,0.7)'
    })
    chartRef.current = chart; seriesRef.current = series
    const ro = new ResizeObserver(() => { if (containerRef.current) chart.applyOptions({ width: containerRef.current.clientWidth }) })
    ro.observe(containerRef.current)
    chart.applyOptions({ width: containerRef.current.clientWidth })
    return () => { ro.disconnect(); chart.remove(); chartRef.current = null; seriesRef.current = null }
  }, [height])

  useEffect(() => {
    if (!seriesRef.current || candles.length === 0) return
    seriesRef.current.setData([...candles].sort((a, b) => a.time - b.time) as any)
    chartRef.current?.timeScale().fitContent()
  }, [candles])

  return <div ref={containerRef} className={cn('w-full', className)} style={{ height }} />
}
