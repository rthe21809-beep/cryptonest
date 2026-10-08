import { useCallback, useEffect, useRef, useState } from 'react'
import { getCoins, getGlobal } from '../lib/api'
import type { Coin } from '../lib/types'

export function useCoins(perPage = 50, intervalMs = 60000) {
  const [coins, setCoins] = useState<Coin[]>([])
  const [live, setLive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [updatedAt, setUpdatedAt] = useState(0)
  const mounted = useRef(true)

  const load = useCallback(async () => {
    try {
      const { coins: c, live: l } = await getCoins(perPage)
      if (!mounted.current) return
      setCoins(c); setLive(l); setUpdatedAt(Date.now())
    } catch { /* noop */ } finally { if (mounted.current) setLoading(false) }
  }, [perPage])

  useEffect(() => {
    mounted.current = true
    load()
    const id = setInterval(() => { if (document.visibilityState === 'visible') load() }, intervalMs)
    return () => { mounted.current = false; clearInterval(id) }
  }, [load, intervalMs])

  return { coins, live, loading, updatedAt, refresh: load }
}

export function useGlobal() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getGlobal>>>(null)
  useEffect(() => {
    let cancelled = false
    getGlobal().then((d) => !cancelled && setData(d))
    return () => { cancelled = true }
  }, [])
  return data
}
