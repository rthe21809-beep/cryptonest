import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Reveal({ children, delay = 0, y = 22, className, once = true }: { children: ReactNode; delay?: number; y?: number; className?: string; once?: boolean }) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={className}
      variants={{ hidden: { opacity: 0, y: reduce ? 0 : y }, show: { opacity: 1, y: 0, transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] } } }}
      initial="hidden" whileInView="show" viewport={{ once, margin: '-60px' }}>
      {children}
    </motion.div>
  )
}
