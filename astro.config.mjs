// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://sathindudezoysa.github.io',
  base: '/portfolio',
  devToolbar: {
    enabled: false
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser',
    },
  },
});
