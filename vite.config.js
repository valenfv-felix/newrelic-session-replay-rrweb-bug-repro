import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/newrelic-session-replay-rrweb-bug-repro/',
  build: {
    outDir: 'docs',
  },
})

