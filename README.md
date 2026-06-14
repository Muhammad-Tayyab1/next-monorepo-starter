# next-monorepo-starter

A production-ready Next.js monorepo using Turborepo and pnpm workspaces. Clone, rename, build.

## Stack

| | |
|--|--|
| **Framework** | Next.js 15 (App Router) |
| **Monorepo** | Turborepo + pnpm workspaces |
| **Styling** | Tailwind CSS v4 |
| **Components** | shadcn/ui via `@repo/ui` |
| **Language** | TypeScript strict |
| **Node** | 20+ |

## Apps

| App | Port | Role |
|-----|------|------|
| `web` | 3000 | Public marketing/landing site |
| `admin` | 3001 | Admin dashboard |
| `studio` | 3002 | Internal content studio |

## Packages

| Package | Name | Contents |
|---------|------|----------|
| `packages/ui` | `@repo/ui` | shadcn components, Tailwind base, `cn()` |
| `packages/shared` | `@repo/shared` | Types, utils, constants, `createApiClient()` |

## Quick Start

```bash
git clone https://github.com/Muhammad-Tayyab1/next-monorepo-starter.git my-project
cd my-project
pnpm install
pnpm run dev
```

Open:
- **http://localhost:3000** — Web
- **http://localhost:3001** — Admin
- **http://localhost:3002** — Studio

## Scripts

```bash
pnpm run dev           # Start all 3 apps
pnpm run build         # Build all apps
pnpm run lint          # Lint all
pnpm run type-check    # TypeScript check all
pnpm run format        # Prettier format
pnpm run clean         # Remove build outputs
pnpm run dev:web       # Start web only
pnpm run dev:admin     # Start admin only
pnpm run dev:studio    # Start studio only
```

## Adding a shadcn Component

```bash
pnpm --filter @repo/ui run ui -- add button
```

## License

MIT
