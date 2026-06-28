# Ashish.sbs Platform

A content-first personal operating system: ventures, projects, lab notes,
principles, resources and services, all CMS-driven. No production content is
hardcoded — see `PERSONAL_OPERATING_SYSTEM.md` (private) and the platform
specification volumes for the philosophy and requirements this implements.

## Stack

- Next.js (App Router) + TypeScript (strict)
- Tailwind CSS v4
- Prisma + PostgreSQL (Supabase)
- React Hook Form + Zod
- Deployed on Vercel

## Getting started

```bash
pnpm install
cp .env.example .env        # fill in DATABASE_URL and Supabase keys
pnpm prisma:generate
pnpm dev
```

Open http://localhost:3000.

## Scripts

| Script                | Purpose                        |
| --------------------- | ------------------------------ |
| `pnpm dev`            | Start the dev server           |
| `pnpm build`          | Production build               |
| `pnpm lint`           | ESLint                         |
| `pnpm typecheck`      | `tsc --noEmit`                 |
| `pnpm format`         | Prettier write                 |
| `pnpm prisma:migrate` | Create/apply a local migration |
| `pnpm prisma:studio`  | Browse the database            |

## Project structure

```
app/(public)/   public-facing routes (one folder per PRD page spec)
app/admin/      CMS (founder/editor only)
app/api/        route handlers
components/     shared UI (ui/, layout/, shared/)
features/       feature-scoped components + logic
lib/            prisma client, env validation, content queries, schemas
prisma/         schema.prisma — single source of truth for content models
```

## Database

Schema lives in `prisma/schema.prisma`. Every public page renders one or
more content objects from it — no hardcoded content in components. Apply
schema changes via `pnpm prisma:migrate` locally, then commit the generated
migration.

## Deployment

Vercel project tracks `main`. Production env vars are configured in the
Vercel dashboard; never commit `.env`.
