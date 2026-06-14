---
name: upgrade
description: Use this skill when auditing or upgrading dependencies — including routine quarterly maintenance, responding to a security vulnerability, or evaluating a major version release of a critical package. Covers the audit process (pnpm outdated, pnpm audit), patch/minor/major categorization rules, when an ADR is required, the ADR template for major upgrades, critical dependency impact areas, post-upgrade checklist, and the expedited process for security fixes.
---

## When to Run

- Quarterly scheduled maintenance
- When a security vulnerability is reported
- When a new major version of a critical dependency is released

## Audit Process

### Step 1: Run Audit

```bash
# Check for outdated packages
pnpm outdated

# Check for security vulnerabilities
pnpm audit
```

### Step 2: Categorize Updates

| Category              | Action                  | ADR Required         |
| --------------------- | ----------------------- | -------------------- |
| Patch (x.x.1 → x.x.2) | Apply automatically     | No                   |
| Minor (x.1.x → x.2.x) | Apply automatically     | No                   |
| Major (1.x.x → 2.x.x) | Flag for human decision | Yes (if non-trivial) |
| Security              | Apply immediately       | No (unless major)    |

### Step 3: Apply Patch and Minor Updates

```bash
# Update all patch and minor versions
pnpm update

# Verify tests pass
pnpm test

# Verify build succeeds
pnpm build

# Verify e2e tests pass
pnpm e2e
```

### Step 4: Handle Major Updates

For each major version update:

1. Read the changelog and migration guide
2. Assess impact on the codebase
3. Create an ADR if the update involves:
   - Breaking API changes
   - Significant code migration
   - New patterns or deprecations
4. Present options to the developer:
   - Update now with migration effort
   - Defer with documented reason
   - Skip version (rare, needs justification)

## Major Update ADR Template

```markdown
# XXXX. Upgrade {Package} from v{X} to v{Y}

Date: {YYYY-MM-DD}

## Status

Proposed

## Context

{Package} v{Y} was released with the following changes:

- {Change 1}
- {Change 2}

Current version: v{X}
Target version: v{Y}

## Decision

{Upgrade now | Defer until {reason resolved} | Skip this version}

## Migration Impact

### Breaking Changes

- {Breaking change 1}: {files affected}
- {Breaking change 2}: {files affected}

### Migration Steps

1. {Step 1}
2. {Step 2}

### Estimated Effort

{Low | Medium | High}

## Consequences

### Positive

- {Benefit}

### Negative

- {Migration effort}

### Risks

- {Risk}
```

## Critical Dependencies

These packages require extra care during major upgrades:

| Package               | Impact Area      |
| --------------------- | ---------------- |
| next                  | Entire app       |
| react                 | All components   |
| typescript            | Type system      |
| tailwindcss           | All styling      |
| @tanstack/react-query | Data fetching    |
| zustand               | State management |
| playwright            | E2E tests        |

## Workspace Filter Reference

```bash
# Run commands per package
pnpm --filter web <command>
pnpm --filter admin <command>
pnpm --filter studio <command>
pnpm --filter @repo/ui <command>
pnpm --filter @repo/shared <command>
```

## Post-Upgrade Checklist

- [ ] All tests pass
- [ ] Build succeeds
- [ ] E2E tests pass
- [ ] No new TypeScript errors
- [ ] No new console warnings
- [ ] Lighthouse scores maintained
- [ ] Bundle size not significantly increased

## Security Updates

Security vulnerabilities bypass the normal review process:

1. Apply the fix immediately
2. Run full test suite
3. Deploy to staging for verification
4. Deploy to production
5. Document in tasks/lessons.md if the vulnerability revealed a pattern to avoid
