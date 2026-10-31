import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        // This tells the Service Worker to cache everything: HTML, JS, CSS, Images
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        // If the user goes offline and refreshes, serve the cached index.html
        navigateFallback: '/index.html',
      },
    }),
  ],
  build: { 
    target: 'es2022', 
    sourcemap: false,
  },
});