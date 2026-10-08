import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface WatchlistState {
  ids: string[]
  toggle: (id: string) => void
  has: (id: string) => boolean
  clear: () => void
}

export const useWatchlist = create<WatchlistState>()(
  persist(
    (set, get) => ({
      ids: ['bitcoin', 'ethereum', 'solana'],
      toggle: (id) => {
        const ids = get().ids
        set({ ids: ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id] })
      },
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] })
    }),
    { name: 'cryptonest:watchlist', storage: createJSONStorage(() => localStorage) }
  )
)
