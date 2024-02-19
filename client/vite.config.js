import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // add proxy to resolve cors problem on local machine
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      }
    }
  }
});
