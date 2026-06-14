# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git workflow

When asked to commit, **only commit — never push**. The user pushes manually via GitHub Desktop.

## Commands

```bash
# Install dependencies (from repo root)
pnpm install

# Run all apps
pnpm run dev

# Run individual apps
pnpm run dev:web      # http://localhost:3000
pnpm run dev:admin    # http://localhost:3001
pnpm run dev:studio   # http://localhost:3002

# Build all
pnpm run build

# Lint all
pnpm run lint

# Type-check all
pnpm run type-check

# Format
pnpm run format

# Clean build outputs
pnpm run clean

# Add a shadcn component to packages/ui
pnpm --filter @repo/ui run ui -- add <component-name>
```

## Architecture

Turborepo + pnpm workspaces monorepo with three Next.js 15 apps sharing two packages.

### Apps

| App | Port | Role |
|-----|------|------|
| `web` | 3000 | Public marketing/landing site |
| `admin` | 3001 | Admin dashboard |
| `studio` | 3002 | Internal content studio |

### Packages

- `packages/ui` (`@repo/ui`) — shared shadcn/ui components, Tailwind base styles, `cn()` utility
- `packages/shared` (`@repo/shared`) — TypeScript types, constants, utils, `createApiClient()`

Import shared code as:
```typescript
import { Button, Card } from '@repo/ui';
import { createApiClient, ROUTES, type ApiResponse } from '@repo/shared';
```

### Rules

- Never import directly between apps
- All shared components go in `packages/ui/src/components/`
- All shared types/utils/api-client go in `packages/shared/src/`
- Always use `@repo/ui` and `@repo/shared` import paths — never relative paths across package boundaries
- Every new feature module goes in its own folder under `app/` in the relevant app
- Keep components in `packages/ui` purely presentational — no business logic
- Business logic and API calls belong in the app, not in shared packages

### Tailwind CSS v4

- Tailwind v4 — use `@import "tailwindcss"` in CSS, not `@tailwind` directives
- `@tailwindcss/oxide` must be a direct `devDependency` in each app's `package.json`
- PostCSS config in `postcss.config.mjs` per app
- CSS variables for theming defined in `packages/ui/src/styles/globals.css`

### Adding a new component to `@repo/ui`

1. Create file in `packages/ui/src/components/ui/<name>.tsx`
2. Export from `packages/ui/src/index.ts`
3. For shadcn components: `pnpm --filter @repo/ui run ui -- add <name>`

### Adding a new app

1. Copy `apps/web/` to `apps/your-app/`
2. Update `name` and port in `package.json`
3. Update `tsconfig.json` paths
4. Add a `dev:your-app` script to root `package.json`

### Path aliases

Each app has two sets of path aliases in `tsconfig.json`:
- `@/*` → local app root (e.g. `@/components/Navbar`)
- `@repo/ui` and `@repo/shared` → shared packages

---

## Skills

Skills are in `.claude/skills/`. Use the `Skill` tool to invoke them.

| Skill | When to use |
|-------|-------------|
| `ui` | Building or refactoring any UI component |
| `api-integration` | Integrating REST API endpoints |
| `unit-test-generator` | Writing tests for components or pages |
| `e2e` | Writing Playwright end-to-end tests |
| `security-audit` | Before any PR touching auth, forms, or API calls |
| `pii` | Any code handling personal data |
| `page-speed` | Performance optimisation |
| `adr-writer` | Documenting architectural decisions |
| `business-doc-writer` | Before committing business logic changes |
| `upgrade` | Auditing or upgrading dependencies |

---

## MCP Servers

Configured in `.mcp.json`:

| Server | Purpose |
|--------|---------|
| `context7` | Fetch current library/framework docs |
| `shadcn` | Add shadcn components |
| `figma` | Read Figma designs |
| `playwright` | Browser automation for e2e testing |
| `composio` | Third-party integrations |
| `clickup` | Task management |

---

## Hooks

`.claude/hooks/` contains three auto-running hooks:

| Hook | Trigger | Action |
|------|---------|--------|
| `post-edit-check.sh` | After file edits | Runs `pnpm lint` |
| `type-check.sh` | After file edits | Runs `pnpm type-check` |
| `commit-guard.sh` | Before commit | Validates conventional commit format |
