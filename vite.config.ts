import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'CryptoNest',
        short_name: 'CryptoNest',
        theme_color: '#0B1220',
        background_color: '#0B1220',
        display: 'standalone',
        start_url: '/',
        icons: [{ src: '/icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' }]
      }
    })
  ],
  build: { target: 'es2020' }
})
