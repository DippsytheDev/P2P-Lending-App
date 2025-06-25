// filepath: /Users/akindedipo/Desktop/p2p-lending-app/vite.config.ts
import { defineConfig } from 'vite';
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Ensure .tsx files are resolved
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
