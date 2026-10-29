import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: { 
    target: 'es2022', 
    sourcemap: false,
    minify: 'esbuild', // Ensures the JS is highly compressed
    cssMinify: true,   // Compresses the CSS
  },
});