// @ts-check

import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Minificação agressiva
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.logs em produção
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
        },
      },
      // Code splitting
      rollupOptions: {
        output: {
          manualChunks: {
            // Separar vendor chunks
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
    },
  },

  integrations: [
    react({
      // React em modo de produção otimizado
      experimentalReactChildren: true,
    }),
  ],

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  build: {
    inlineStylesheets: 'auto', // Inline CSS crítico
  },

  compressHTML: true, // Compressão HTML

  // Prefetch automático para melhor navegação
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: false,
  },
});