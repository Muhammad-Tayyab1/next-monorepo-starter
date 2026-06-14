# Setup Guide

Step-by-step guide to clone and run `next-monorepo-starter` locally.

## Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| Node.js | 20+ | `node -v` |
| pnpm | 9+ | `pnpm -v` |

Install pnpm if missing:
```bash
npm install -g pnpm
```

---

## Step 1 — Clone

```bash
git clone https://github.com/Muhammad-Tayyab1/next-monorepo-starter.git my-project
cd my-project
```

---

## Step 2 — Install

```bash
pnpm install
```

---

## Step 3 — Environment (optional)

Copy `.env.example` to `.env.local` in any app that needs env vars:

```bash
cp .env.example apps/web/.env.local
cp .env.example apps/admin/.env.local
cp .env.example apps/studio/.env.local
```

Edit each file with your actual values.

---

## Step 4 — Run

```bash
pnpm run dev
```

Opens:
- http://localhost:3000 — Web
- http://localhost:3001 — Admin
- http://localhost:3002 — Studio

---

## Customising for your project

1. **Rename** — replace `@repo/` with `@your-org/` across all `package.json` files
2. **Add a component** — `pnpm --filter @repo/ui run ui -- add <name>`, then export from `packages/ui/src/index.ts`
3. **Add an app** — copy `apps/web/`, update name and port in `package.json`, add `dev:app` script to root
4. **Add shared types** — add to `packages/shared/src/types/`, export from `packages/shared/src/index.ts`
