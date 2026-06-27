# Contributing

This is a single-maintainer platform today, but conventions are documented so
contributions (and AI-assisted changes) stay consistent.

## Workflow

1. Branch from `main`: `feature/<short-description>`.
2. Make focused commits using [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `docs:`).
3. Open a pull request. CI must pass (typecheck, lint, format, build) before merge.
4. Squash-merge into `main`.

## Coding standards

- TypeScript strict mode — no `any` without justification.
- No hardcoded content in components; content comes from Prisma models.
- Every new page follows the empty/loading/error state pattern established
  in `components/shared/empty-state.tsx`.
- Run `pnpm format` before committing.

## Database changes

Edit `prisma/schema.prisma`, then run `pnpm prisma:migrate` to generate a
migration. Never hand-edit generated migration SQL after it has been applied
to a shared environment.
