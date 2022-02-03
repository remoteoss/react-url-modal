import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
console.log(__dirname);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^react-url-modal$/,
        replacement: __dirname + '/../dist/react-url-modal.esm.js',
      },
      {
        find: /^react-url-modal\/Modal$/,
        replacement: __dirname + '/../dist/Modal/index.js',
      },
    ],
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
});
