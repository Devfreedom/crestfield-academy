# Crestfield Academy — Agent Instructions

## Tech Stack & Architecture
- **Framework & Router:** Next.js `16.4.6` using the **App Router** (`src/app/`). Do not create `pages/` routes.
  - `next.config.ts` enables `cacheComponents: true`, `partialPrefetching: true`, `poweredByHeader: false`, and strict CSP/security headers.
  - `images.remotePatterns` is `[]` — all images must be local files in `public/`.
  - Read `node_modules/next/dist/docs/` before making Next.js API changes (see `AGENTS.md`).
- **TypeScript:** Strict mode enabled (`"strict": true` in `tsconfig.json`, `typescript ^5`). Use `@/*` for `./src/*` imports.
- **Styling:** **Tailwind CSS v4** (`tailwindcss 4.3.3` + `@tailwindcss/turbopack 4.3.3`, imported via `@import "tailwindcss";` in `src/app/globals.css`), paired with `clsx` and `tailwind-merge`. Do not use CSS Modules (`*.module.css`).
- **ORM / Database Client:** **None** currently installed. Application data and demo auth/account flows live in `src/lib/data.ts`, `src/lib/accounts.ts`, and `src/lib/auth.ts`.
- **Package Manager:** **npm** (use `npm install`, `npm run dev`, `npm run build`, `npm run lint`; `package-lock.json` is the lockfile).

## Safety Rules
- **Never overwrite `.env` files:** Do not overwrite, truncate, or delete `.env`, `.env.local`, `.env.*.local`, or any environment file.
- **Never run destructive database resets:** Even if a database or ORM is added later, never run destructive reset/drop commands (e.g. `prisma migrate reset`, `drizzle-kit push --force`, `DROP DATABASE`, or wiping persisted user/seed stores) without explicit user confirmation.

## Project Conventions
- Follow all design, font, table, fee-sync, and account-flow conventions in `AGENTS.md`.

## Git Auto-Commit Policy
- After completing 1 or 2 meaningful edits (a working feature, bug fix, or component update), automatically stage and commit changes locally.
- Before running `git add`, check `git status` and ensure `.env*` or secret files are never staged.
- Run `git add` on the modified files and commit with a clear Conventional Commit message (e.g., `feat: add login form validation` or `fix: resolve navbar hydration mismatch`).
- NEVER run `git push`, `git reset --hard`, or force-push commands automatically; leave pushing to the user.
