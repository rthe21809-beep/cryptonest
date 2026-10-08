import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: number, duration = 1600, start = true) {
  const [value, setValue] = useState(0)
  const raf = useRef<number>()

  useEffect(() => {
    if (!start) return
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setValue(target * eased)
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [target, duration, start])

  return value
}
