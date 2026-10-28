import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile({
      removeViteModuleLoader: true,
      useRecommendedBuildConfig: false,
    }),
  ],
  build: { 
    target: 'es2022', 
    sourcemap: false,
  },
});