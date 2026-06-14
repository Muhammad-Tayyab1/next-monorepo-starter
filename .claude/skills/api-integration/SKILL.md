---
name: api-integration
description: Use when integrating REST API endpoints. Defines conventions for consuming backend REST APIs using createApiClient from @repo/shared.
---

## Client Setup

Always use `createApiClient` from `@repo/shared`. Never use raw `fetch` directly in components or pages.

```typescript
import { createApiClient } from '@repo/shared'

// Server component or server action
const api = createApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL!,
})

// With auth token
const api = createApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL!,
  token: session.accessToken,
})
```

## Server Components (preferred for initial data)

Fetch data in server components to avoid client-side waterfalls:

```typescript
// app/dashboard/page.tsx
import { createApiClient } from '@repo/shared'
import type { ApiResponse, User } from '@repo/shared'

export default async function DashboardPage() {
  const api = createApiClient({ baseUrl: process.env.NEXT_PUBLIC_API_URL! })
  const { data: users } = await api.get<ApiResponse<User[]>>('/users')

  return <UserList users={users} />
}
```

## Client Components — use SWR

For client-side data fetching, wrap `createApiClient` with SWR:

```typescript
'use client'
import useSWR from 'swr'
import { createApiClient } from '@repo/shared'

const api = createApiClient({ baseUrl: process.env.NEXT_PUBLIC_API_URL! })

function useUsers() {
  return useSWR('/users', () => api.get<ApiResponse<User[]>>('/users'))
}
```

## Loading States

Always handle loading state explicitly:

```typescript
const { data, isLoading, error } = useSWR(...)

if (isLoading) return <Skeleton />
if (error) return <ErrorState message="Unable to load" onRetry={() => mutate()} />
```

## Mutations — Server Actions

Prefer Server Actions for mutations:

```typescript
'use server'
import { createApiClient } from '@repo/shared'
import { z } from 'zod'

const schema = z.object({ name: z.string().min(1) })

export async function createUser(formData: FormData) {
  const data = schema.parse(Object.fromEntries(formData))
  const api = createApiClient({ baseUrl: process.env.NEXT_PUBLIC_API_URL! })
  return api.post('/users', data)
}
```

## Error Handling

`createApiClient` throws on non-OK responses. Always catch:

```typescript
try {
  await api.post('/users', payload)
  toast.success('User created')
} catch (err) {
  const apiError = err as ApiError
  toast.error(apiError.message ?? 'Something went wrong')
}
```

## Authentication

Pass the token explicitly — never store it in module scope:

```typescript
// Get token from your auth provider/cookie
const token = await getToken()
const api = createApiClient({ baseUrl: process.env.NEXT_PUBLIC_API_URL!, token })
```
