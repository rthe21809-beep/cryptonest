import { Link } from 'react-router-dom'
import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/[0.07] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <Logo to="/" />
        <p className="text-[12px] text-white/35">© {year} CryptoNest. All rights reserved.</p>
        <p className="text-[12px] text-white/30">Not financial advice · Demo project</p>
      </div>
    </footer>
  )
}
