import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/my-app/',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})
