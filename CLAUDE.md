# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack restaurant booking and ordering app for "FORUM" (Skolkovo). React frontend + Express backend, monorepo structure with shared types.

## Commands

```bash
npm run dev          # Dev server (Express + Vite middleware, single process)
npm run dev:client   # Frontend only (Vite dev server on port 5000)
npm run build        # Production build (Vite → dist/public/, esbuild → dist/index.cjs)
npm start            # Production server from dist/index.cjs
npm run check        # TypeScript type checking
npm run db:push      # Push Drizzle schema migrations to PostgreSQL
```

No test framework is configured yet.

## Architecture

```
client/src/          # React 19 frontend (Vite, Tailwind CSS 4, wouter routing)
server/              # Express 5 backend
shared/              # Shared Zod schemas (used by both client and server)
script/              # Build orchestration (esbuild for server)
migrations/          # Drizzle ORM migrations
```

**Frontend** uses wouter for routing, @tanstack/react-query for server state, react-hook-form + zod for forms, framer-motion for animations, and shadcn/ui (Radix + Tailwind) for the component library. Cart state lives in React Context with localStorage persistence (`client/src/store/cart-context.tsx`). Menu data is defined statically in `client/src/data/menu.ts`.

**Backend** has two API routes (`POST /api/booking`, `POST /api/order`) in `server/routes.ts`. Orders and bookings send Telegram notifications via `server/telegram.ts`. Storage is currently in-memory (`server/storage.ts`). Passport is installed but not actively integrated.

**Shared schemas** in `shared/schema.ts` define Zod validation for booking and order request payloads, used on both sides.

In development, Express loads Vite as middleware (`server/vite.ts`) so everything runs on one port. In production, Express serves static files from `dist/public/` (`server/static.ts`).

## Path Aliases

- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `client/src/assets/*` (Vite only)

Defined in both `tsconfig.json` and `vite.config.ts`.

## Environment Variables

Required for production: `DATABASE_URL`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `SESSION_SECRET`, `PORT` (default 5000, prod uses 9013).

## Key Patterns

- Zod schemas in `shared/` are the single source of truth for request validation
- shadcn/ui components live in `client/src/components/ui/` — generated via CLI, customized with Tailwind
- The build script (`script/build.ts`) bundles allowlisted server dependencies with esbuild and externalizes the rest
- Drizzle ORM is configured (`drizzle.config.ts`) with PostgreSQL but DB tables are not yet actively used
