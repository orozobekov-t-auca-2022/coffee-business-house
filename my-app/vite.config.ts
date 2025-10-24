import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/coffee-house/',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})
