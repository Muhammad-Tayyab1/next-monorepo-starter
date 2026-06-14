---
name: e2e
description: Write end-to-end tests using Playwright. Use for critical user flows across web, admin, and studio apps.
---

## Test Location

- E2E tests live in `e2e/` at the app level: `apps/web/e2e/`, `apps/admin/e2e/`, `apps/studio/e2e/`
- File naming: `{feature}.spec.ts`

## Setup

Add Playwright to an app:

```bash
pnpm --filter web add -D @playwright/test
npx playwright install
```

`playwright.config.ts` per app:
```ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
  },
})
```

## Test Structure

```typescript
import { test, expect } from '@playwright/test'

test.describe('Auth', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('user can log in with valid credentials', async ({ page }) => {
    await page.fill('[name="email"]', 'user@example.com')
    await page.fill('[name="password"]', 'password123')
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('h1')).toContainText('Dashboard')
  })

  test('shows error on invalid credentials', async ({ page }) => {
    await page.fill('[name="email"]', 'bad@example.com')
    await page.fill('[name="password"]', 'wrong')
    await page.click('button[type="submit"]')

    await expect(page.locator('[role="alert"]')).toBeVisible()
  })
})
```

## Test Isolation

- Each test must be independent
- Use `test.beforeEach` for common navigation
- Never rely on state from other tests
- Use fixtures for authenticated sessions

## Running Tests

```bash
# Run all e2e tests for an app
pnpm --filter web e2e

# Run specific test file
pnpm --filter web e2e -- e2e/auth.spec.ts

# Headed mode for debugging
pnpm --filter web e2e -- --headed

# UI mode
pnpm --filter web e2e -- --ui
```

## What to Test

- Authentication flows (login, logout, protected routes)
- Core CRUD operations in admin/studio
- Navigation and routing
- Form validation error states
- Responsive behaviour on key breakpoints
