# e-commerce

Elegant, minimal e-commerce starter built with Next.js (App Router), TypeScript, Drizzle ORM and NextAuth.

This repository is a production-oriented starter for an online shop. It includes server-side authentication using NextAuth, database models and helpers using Drizzle (for a serverless-friendly DB like Neon), a Tailwind CSS UI, and modular React components for product listings, cart and wishlist flows.

## Table of contents

- [Highlights](#highlights)
- [Tech stack](#tech-stack)
- [Authentication](#authentication)
- [Project structure](#project-structure)

## Highlights

- Next.js 16 with the App Router and React 19
- NextAuth for authentication with a Drizzle adapter
- Drizzle ORM + drizzle-kit for database modelling and migrations
- Designed components with Radix UI primitives and Tailwind CSS
- Local cart and wishlist state using Zustand

## Features

- Product catalog with product pages including images, descriptions, price, and variants
- Global search with suggestion UI (typeahead) for quick product discovery
- Cart flow with add/remove, quantity updates, and a cart sheet UI
- Wishlist flow with persistent wishlist state and item management
- User authentication (sign up / sign in) powered by NextAuth with DB-backed sessions
- Server actions and API routes for common ecommerce operations (cart, wishlist, product actions)
- Responsive, accessible UI components built with Radix primitives and Tailwind CSS
- Drizzle ORM models and migration-ready schema for a production-ready database layer
- Simple client-side state using Zustand and server-side operations for persistence
- Extensible component library (product cards, grids, image galleries, forms) to customize quickly

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Drizzle ORM + drizzle-kit
- NextAuth (@auth/drizzle-adapter)
- Neon / serverless-friendly databases (via `@neondatabase/serverless`)
- Zustand for client state (cart/wishlist)

Key dependencies are declared in `package.json` (Next, React, NextAuth, Drizzle, Zod, etc.).

## Authentication

Authentication is handled with NextAuth. The backend routes for NextAuth are present under `src/app/api/auth/[...nextauth]/route.ts`.

- The project uses the Drizzle adapter (`@auth/drizzle-adapter`) to persist users and sessions into the configured database.
- Configure provider credentials (OAuth client IDs/secrets) in environment variables. See NextAuth docs for supported providers and options.

## Project structure (important files)

- `app/` - Next.js App Router pages and layout
	- `app/actions/` - server actions for products, cart, wishlist
	- `app/api/` - API routes (including NextAuth)
	- `app/(routes)` - pages for shop, product, cart, user, wishlist, etc.
- `src/components/` - reusable UI and domain components (product cards, cart sheet, wishlist, nav, forms)
- `src/db/` - database connection and schema (`db.ts`, `schema.ts`)
- `src/lib/` - auth helpers, utilities
- `src/stores/` - client state (Zustand stores for cart & wishlist)
- `src/types/` - TypeScript types for product, cart, category
