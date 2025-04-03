import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      },
      input: {
        main: './index.html'
      }
    },
    // Exclude audio files from processing
    assetsInclude: ['**/*.mp3', '**/*.wav', '**/*.ogg'],
    // Copy audio files directly without processing
    copyPublicDir: true
  }
})
