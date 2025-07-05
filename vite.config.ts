import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   resolve: {
    alias: {
      '@route': path.resolve(__dirname, 'src/routes'),
      '@page': path.resolve(__dirname, 'src/pages'),
      '@component': path.resolve(__dirname, 'src/components'),
      '@context': path.resolve(__dirname, 'src/contexts'),
      '@interface': path.resolve(__dirname, 'src/interfaces'),
      '@asset': path.resolve(__dirname, 'src/assets')
    }
  },
})
