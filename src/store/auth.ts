import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User } from '../lib/types'
import { uid } from '../lib/utils'

interface AuthState {
  user: User | null
  hydrated: boolean
  signIn: (email: string, name?: string) => User
  signUp: (name: string, email: string, referredBy?: string) => User
  signOut: () => void
  update: (patch: Partial<User>) => void
  setPlan: (plan: User['plan']) => void
}

function makeReferralCode(name: string) {
  const base = name.replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase() || 'NEST'
  return base + '-' + Math.random().toString(36).slice(2, 6).toUpperCase()
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      hydrated: false,
      signIn: (email, name) => {
        const existing = get().user
        const user: User = existing && existing.email === email ? existing : {
          id: uid('usr'),
          name: name || email.split('@')[0],
          email,
          avatarSeed: email,
          referralCode: makeReferralCode(name || email),
          plan: 'free',
          joinedAt: Date.now()
        }
        set({ user })
        return user
      },
      signUp: (name, email) => {
        const user: User = {
          id: uid('usr'),
          name, email,
          avatarSeed: email + name,
          referralCode: makeReferralCode(name),
          plan: 'free',
          joinedAt: Date.now()
        }
        set({ user })
        return user
      },
      signOut: () => set({ user: null }),
      update: (patch) => {
        const u = get().user
        if (!u) return
        set({ user: { ...u, ...patch } })
      },
      setPlan: (plan) => {
        const u = get().user
        if (!u) return
        set({ user: { ...u, plan } })
      }
    }),
    {
      name: 'cryptonest:auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ user: s.user }) as any,
      onRehydrateStorage: () => (state) => {
        if (state) useAuth.setState({ hydrated: true })
      }
    }
  )
)
