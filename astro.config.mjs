// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages deployment config
  // For the default github.io site, base must match the repo name
  // When switching to martadegani.it: remove `base` and set site to 'https://martadegani.it'
  // site: 'https://mbonalumi.github.io',
  // base: '/marta_website',
  site: 'https://martadegani.it',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});