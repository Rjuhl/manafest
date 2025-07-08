import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
   resolve: {
    alias: {
      '@component': path.resolve(__dirname, './src/components'),
      '@page': path.resolve(__dirname, './src/pages'),
      '@util': path.resolve(__dirname, './src/utils'),
      '@context': path.resolve(__dirname, './src/contexts'),
      '@interface': path.resolve(__dirname, './src/interfaces'),
      '@hook': path.resolve(__dirname, './src/hooks'),
      '@route': path.resolve(__dirname, './src/routes')
    }
  },
  esbuild: {
    jsx: 'automatic'
  }
})
