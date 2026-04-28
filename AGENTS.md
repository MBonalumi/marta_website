# Marta Website - Agent Guidelines

## Overview
Astro 6.0.4 static site with React components and Tailwind CSS v4. TypeScript strict mode enabled.

## Build & Commands

### Development
```bash
npm run dev           # Start Astro dev server
```

### Production
```bash
npm run build         # Build static site
npm run preview       # Preview production build locally
```

### Testing & Linting
**No automated test or lint frameworks configured.** No Jest, Vitest, ESLint, or Prettier present in this project. Manual testing required.

## Code Style

### Imports
- TypeScript/ES modules only (`"type": "module"` in package.json)
- React: `import React, { useState, useEffect } from 'react'`
- Tailwind: Use `@import "tailwindcss"` in global styles
- Astro: Use `---` frontmatter for imports

### File Extensions
- `.astro` - Astro components (layouts, sections, page templates)
- `.tsx` - React components (e.g., ContactForm)
- `.css` - Styles (Tailwind CSS v4 with `@import "tailwindcss"`)
- `.md` - Markdown content

### Naming Conventions
- **Components:** PascalCase (e.g., `ContactForm.tsx`, `Header.astro`)
- **Sections:** PascalCase with semantic names (e.g., `Hero.astro`, `Services.astro`)
- **CSS variables:** `--color-brand-*` format (e.g., `--color-brand-sage`)
- **JS/TS:** camelCase for variables/functions, PascalCase for types/classes

### TypeScript
- Strict mode enabled via `extends: "astro/tsconfigs/strict"`
- Use explicit type annotations for component props
- React components: `const Component: React.FC = () => {}`
- JSX uses `react-jsx` runtime (no `import React` required in JSX-only files)

### Astro Best Practices
- Use semantic HTML5 elements (`<section>`, `<header>`, `<footer>`, `<main>`)
- Inline `<style>` tags for component-specific animations/overrides
- Use Tailwind utility classes for styling
- Relative imports for components: `import Component from '@/components/Component.astro'`

### React/JSX
- Functional components only
- `React.FC` type annotation for components
- Hooks: `useState`, `useEffect`, `useRef`
- Lucide React icons: `import { IconName } from 'lucide-react'`

### Styling (Tailwind CSS v4)
- Use CSS variables for brand colors:
  - `--color-brand-sage: #8DAA91`
  - `--color-brand-sage-light: #c1cdbc`
  - `--color-brand-sage-dark: #415941`
  - `--color-brand-beige: #F5F1E9`
  - `--color-brand-charcoal: #333333`
  - `--color-brand-accent: #D4A373`
- Use `text-brand-*` and `bg-brand-*` utilities
- Font families defined in `global.css`:
  - Serif: `--font-serif: "Playfair Display"`
  - Sans: `--font-sans: "Inter"`

### Error Handling
- No centralized error handling configured
- Client-side errors: Use `useEffect` with try/catch for data fetching
- Form submissions: Client-side validation before mailto/link navigation

### SEO & Performance
- Refer to `.memory/resources/SEO_PLAN.md` for marketing/SEO strategy
- Refer to `.memory/resources/SEO_IMPLEMENTATION.md` for technical SEO
- Sitemap configured via `@astrojs/sitemap`
- Images: Use WebP format where available
- Lazy loading: Add `loading="lazy"` to below-fold images

## File Structure
```
src/
├── components/      # Reusable components (React .tsx, Astro .astro)
├── layouts/         # Astro layouts (e.g., Layout.astro)
├── pages/           # Astro pages (e.g., index.astro)
├── sections/        # Page sections (Hero, Services, Contact, etc.)
└── styles/          # Global styles (global.css)
```

## Memory System (.memory/)
**Always start here for project context:**

1. **`.memory/MEMORY.md`** - Index of all resources
2. **`.memory/resources/`** - Reference documents:
   - `SEO_PLAN.md` - Marketing strategy, keywords, content plan
   - `SEO_IMPLEMENTATION.md` - Technical SEO, meta tags, structured data
3. **`.memory/transcripts/`** - Conversation history (access only if needed)

**Priority:** Resources > Transcripts. Only reference transcripts when documented resources don't contain needed context.

## Deployment
- Production site: `https://martadegani.it`
- Sitemap auto-generated via `@astrojs/sitemap`
- No CDN configured (static files served directly)

## Dependencies
- Astro 6.0.4
- React 19.2.4
- Tailwind CSS 4.2.1
- Lucide React 0.577.0
- @astrojs/sitemap

## Recommended VSCode Extensions
- Astro Build (astro-build.astro-vscode)
