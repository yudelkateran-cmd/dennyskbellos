import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/Dennyskbellos/', 
  build: {
    outDir: 'docs', // Esto creará la carpeta para GitHub
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})