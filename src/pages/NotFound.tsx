import { Link } from 'react-router-dom'
import { House } from '@phosphor-icons/react'
import { Logo } from '../components/Logo'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <Logo to="/" className="mb-10" />
      <h1 className="display text-[64px] text-white sm:text-[96px]">404</h1>
      <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-white/45">This nest is empty. The page you were looking for does not exist.</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/" className="pill-solid inline-flex px-5 py-2.5 text-[14px]"><House size={15} weight="duotone" /> Go home</Link>
        <Link to="/app" className="pill-ghost px-5 py-2.5 text-[14px]">Open dashboard</Link>
      </div>
    </div>
  )
}
