---
name: ui
description: Use when building, updating, or refactoring any UI component. Covers component discovery, placement tiers, feature-based architecture, and deciding where components live (packages/ui vs app-level).
---

## Step 1: Discovery (Run Before Building)

Before creating ANY component, search for existing ones:

```bash
# Check shared cross-app components
find packages/ui/src/components -name "*.tsx"

# Check app-level shared components
find apps/web/components -name "*.tsx" 2>/dev/null
find apps/admin/components -name "*.tsx" 2>/dev/null
find apps/studio/components -name "*.tsx" 2>/dev/null

# Check feature components
find apps/web/app -name "*.tsx" | grep -v page | grep -v layout
```

## Component Placement Tiers

```
packages/ui/                         → Cross-app (web, admin, studio)
  └── components/ui/*.tsx            → Button, Card, Input, Badge, etc.

apps/{app}/components/               → App-level shared (2+ features in same app)
  └── Navbar.tsx, Sidebar.tsx, etc.

apps/{app}/app/{route}/              → Route-specific
  ├── page.tsx                       → Route page (composition only)
  ├── layout.tsx                     → Route layout
  └── _components/                   → Components used only by this route
```

**Rule of thumb:** Start route-local. Move to app-level when a second route needs it. Move to `packages/ui` only when a second app needs it.

## Feature-Based Architecture

Organize by feature inside each app:

```
apps/web/
  app/
    dashboard/
      page.tsx                  # Composition only
      layout.tsx
      _components/
        DashboardStats.tsx
        RecentActivity.tsx
  components/                   # App-wide shared
    Navbar.tsx
    Sidebar.tsx
  hooks/                        # App-wide hooks
    use-auth.ts
  stores/                       # App-wide Zustand stores
    user.store.ts
```

## What goes where

| Location | Contents |
|----------|----------|
| `packages/ui/src/components/ui/` | Primitive UI — no business logic, no API calls |
| `packages/ui/src/lib/utils.ts` | `cn()` and pure UI utilities |
| `apps/{app}/components/` | App-specific layout/shared components |
| `apps/{app}/app/{route}/_components/` | Route-specific components |
| `apps/{app}/stores/` | Zustand stores for this app |
| `packages/shared/src/` | Types, utils, constants used by 2+ apps |

## Adding a shadcn Component

```bash
pnpm --filter @repo/ui run ui -- add <component-name>
```

Then export it from `packages/ui/src/index.ts`.

## Zustand Stores

All shared state MUST use Zustand. No `React.createContext` for state.

```ts
// apps/web/stores/auth.store.ts
import { create } from 'zustand'

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
```

## Naming Conventions

- Components: `PascalCase.tsx`
- Hooks: `use-kebab-case.ts`
- Stores: `kebab-case.store.ts`
- Pages: `page.tsx`, Layouts: `layout.tsx`

## When to Extract vs Inline

**Extract when:**
- Component is used in 2+ places
- Component has its own state or effects
- Component exceeds ~50 lines

**Inline when:**
- One-off markup under 20 lines
- No state or side effects

## Accessibility

- All interactive elements must be keyboard accessible
- Use semantic HTML elements
- Include ARIA labels for icon-only buttons
