import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppShell } from './components/layout/AppShell'
import { ProtectedRoute } from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Markets from './pages/Markets'
import CoinDetail from './pages/CoinDetail'
import Wallet from './pages/Wallet'
import Referrals from './pages/Referrals'
import Pricing from './pages/Pricing'
import Profile from './pages/Profile'
import About from './pages/About'
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname.split('/')[1] || '/'}>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/app" element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="markets" element={<Markets />} />
          <Route path="coin/:id" element={<CoinDetail />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="referrals" element={<Referrals />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}
