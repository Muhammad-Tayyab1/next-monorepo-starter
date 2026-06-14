# Code Standards

## Package imports

Always use workspace package aliases — never relative paths across package boundaries.

```ts
// Wrong
import { Button } from '../../../packages/ui/src/components/ui/button'

// Correct
import { Button } from '@repo/ui'
import { someUtil } from '@repo/shared'
```

Within `packages/ui`, use relative paths (not `@/`) to avoid resolution issues with `transpilePackages`.

---

## Component placement

Three tiers — never skip:

1. **`packages/ui/src/components/ui/`** — purely presentational, no business logic, no API calls
2. **`apps/*/app/<feature>/components/`** — business logic, API calls, store access
3. **`apps/*/app/<feature>/page.tsx`** — layout and composition only

---

## File naming

- React components: `PascalCase.tsx`
- Hooks: `use-kebab-case.ts`
- Stores: `kebab-case.store.ts`
- Utils/constants: `kebab-case.ts`
- Pages: `page.tsx` (Next.js App Router convention)
- Layouts: `layout.tsx`

---

## State management

Zustand only — no React Context for state. One store per feature, kept in the app that owns it.

```ts
// stores/auth.store.ts
import { create } from 'zustand'

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
```

Never put stores in `packages/shared`.

---

## Forms

React Hook Form + Zod for every form. No uncontrolled forms.

```ts
const schema = z.object({
  email: z.string().email(),
})

const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) })
```

---

## Types

All shared domain types go in `packages/shared/src/types/` — one file per domain.
`index.ts` files in `types/`, `utils/`, `constants/` are re-exports only — never define values there.

---

## REST API

Use `createApiClient()` from `@repo/shared` for all API calls.

```ts
import { createApiClient } from '@repo/shared'

const api = createApiClient({ baseUrl: process.env.NEXT_PUBLIC_API_URL!, token })
const user = await api.get<User>('/users/me')
```

Never construct fetch calls directly in components — use `createApiClient` or a hook that wraps it.

---

## Branch naming

```
feat/<short-description>
fix/<short-description>
chore/<short-description>
docs/<short-description>
```

---

## No `console.log`

No `console.log` in committed code. Use the browser DevTools during development only.

---

## Tailwind v4

No `tailwind.config.js`. All design tokens live in `packages/ui/src/styles/globals.css` via CSS custom properties.
Do not use `@apply` in shared CSS — use direct CSS custom property references.
App layouts import: `import '@repo/ui/src/styles/globals.css'`.
