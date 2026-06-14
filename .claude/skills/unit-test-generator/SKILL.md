---
name: unit-test-generator
description: Write unit tests for components and pages using Jest and React Testing Library. Use when creating or updating any component or page in the apps/ directory.
---

## Scope

- Write tests for components and pages in `apps/web`, `apps/admin`, `apps/studio`
- Do NOT write tests for `packages/` directory
- Focus on unit tests — interactions, rendering, and props

## Automatic Test Generation

**CRITICAL**: Whenever you build or update a component or page, you MUST write/update tests for it. This is not optional.

## Test Location

All tests live in a `__tests__/` directory alongside the code they test.

```
apps/web/app/dashboard/
  _components/
    DashboardStats.tsx
    __tests__/
      DashboardStats.test.tsx
```

## Setup

Each app needs Jest + React Testing Library. Add to the app's `package.json`:

```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0",
    "ts-jest": "^29.0.0"
  }
}
```

`jest.config.ts` per app:
```ts
import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  moduleNameMapper: {
    '^@repo/ui(.*)$': '<rootDir>/../../../packages/ui/src$1',
    '^@repo/shared(.*)$': '<rootDir>/../../../packages/shared/src$1',
  },
  setupFilesAfterFramework: ['@testing-library/jest-dom'],
}

export default config
```

## Test Structure

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../Button'

describe('Button', () => {
  it('renders with label', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Click</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

## Running Tests

```bash
# All apps
pnpm test

# Specific app
pnpm --filter web test
pnpm --filter admin test
pnpm --filter studio test

# Watch mode
pnpm --filter web test -- --watch

# Coverage
pnpm --filter web test -- --coverage
```

## Coverage Target

- Minimum: 80% for new code
- Critical flows (auth, forms): 95%

## Test Checklist

Before marking any component complete:

- [ ] `__tests__/` directory created alongside the component
- [ ] All props tested
- [ ] User interactions tested
- [ ] Edge cases covered (empty state, loading, error)
- [ ] Tests pass: `pnpm test`
