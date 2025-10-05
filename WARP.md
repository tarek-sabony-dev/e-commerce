# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview

- Framework/tooling: Next.js 15 (App Router) with TypeScript, Turbopack for dev/build, ESLint (flat config), Tailwind CSS v4 via PostCSS, next-themes for theming, Radix UI primitives and shadcn-style UI components.
- Source layout: code lives under src/. App entry points are under src/app/ (App Router).
- Path alias: tsconfig.json maps @/* to src/* for cleaner imports.

Common commands

This repository uses npm (package-lock.json present). Use these from the repo root:

- Install dependencies
  - npm install
- Start development server (Turbopack)
  - npm run dev
- Build (Turbopack)
  - npm run build
- Run production server (after build)
  - npm run start
- Lint the project
  - npm run lint
- Lint a single file (example, with autofix)
  - npx eslint src/components/navigation.tsx --fix
- Tests
  - No test runner or test scripts are configured in this repository at this time.

High-level architecture

- App Router (src/app)
  - src/app/layout.tsx is the root layout for all routes. It sets up:
    - Global fonts via next/font (Geist) and global styles via src/app/globals.css.
    - Theming with next-themes ThemeProvider (attribute="class", defaultTheme="system").
    - A sidebar layout using SidebarProvider and SidebarInset from local UI components.
    - A global header via src/components/site-header.tsx.
  - src/app/page.tsx is the default index route. Add new routes under src/app/<route>/page.tsx.

- Theming and styling
  - Tailwind CSS v4 is enabled through PostCSS (@tailwindcss/postcss in postcss.config.mjs). No standalone tailwind.config.* file is required in v4.
  - src/app/globals.css defines tokens using @theme inline and CSS variables, with a dark mode custom variant and utility layers. These power consistent colors, radii, and surfaces.
  - Utility: src/lib/utils.ts exports cn(...), a Tailwind utility class merger using clsx and tailwind-merge.

- UI components
  - Components live in src/components/. The ui/ subfolder includes reusable primitives (e.g., button, navigation-menu, sidebar, tooltip) built on top of Radix UI and styled with Tailwind.
  - Navigation (src/components/navigation.tsx) adapts between desktop (Radix NavigationMenu) and mobile (Sidebar-based) using the useIsMobile hook from src/hooks/use-mobile.ts.
  - next-themes integrates at the app root via ThemeProvider in src/components/theme-provider.tsx.

- Linting & config
  - ESLint uses a flat config (eslint.config.mjs) extending next/core-web-vitals and next/typescript, with common build artifacts ignored.
  - Next.js configuration (next.config.ts) uses defaults; no custom webpack or image/domain settings are specified.
  - TypeScript is strict with noEmit; imports can use @/* to reference src/*.

Notes for contributors

- Routes and pages: add under src/app/<route>/page.tsx; shared layout concerns belong in src/app/layout.tsx.
- Global styles/tokens: adjust in src/app/globals.css. Tailwind v4 features (e.g., @theme) are used extensively.
- UI system: prefer primitives in src/components/ui/ and shared utilities (e.g., cn) for consistency.
