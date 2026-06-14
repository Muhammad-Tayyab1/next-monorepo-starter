---
name: adr-writer
description: Create Architecture Decision Records for significant technical choices. Use for architectural decisions, technology choices, pattern changes, and non-trivial migrations.
---

## ADR Location

ADRs live in `docs/adr/` in the repo.

## File Naming

```
docs/adr/
  0001-use-zustand-for-state-management.md
  0002-use-swr-for-client-data-fetching.md
  0003-rest-over-graphql-for-api-layer.md
```

Format: `{4-digit-number}-{kebab-case-title}.md`

## ADR Template

```markdown
# {Number}. {Title}

Date: {YYYY-MM-DD}

## Status

{Proposed | Accepted | Deprecated | Superseded by [ADR-XXXX](link)}

## Context

{What is the issue that we're seeing that is motivating this decision or change?}

## Decision

{What is the change that we're proposing and/or doing?}

## Consequences

### Positive

- {Benefit 1}
- {Benefit 2}

### Negative

- {Drawback 1}
- {Drawback 2}

### Neutral

- {Neutral observation}

## Alternatives Considered

### {Alternative 1}

{Description and why it was rejected}

### {Alternative 2}

{Description and why it was rejected}
```

## Example ADR

```markdown
# 0001. Use Zustand for State Management

Date: 2025-03-15

## Status

Accepted

## Context

The apps need client-side state management for auth state and UI preferences across web, admin, and studio. We need a solution that is lightweight, TypeScript-friendly, and easy to test.

## Decision

We will use Zustand for client-side state management.

## Consequences

### Positive

- Minimal boilerplate compared to Redux
- Built-in TypeScript support
- Simple testing with direct store manipulation
- Small bundle size (~1KB)

### Negative

- Less ecosystem support than Redux
- Team needs to learn new patterns

### Neutral

- Different mental model from Redux for developers with Redux experience

## Alternatives Considered

### Redux Toolkit

More ecosystem support but significantly more boilerplate. Overkill for our use case.

### Jotai

Atomic approach is interesting but less intuitive for our team's existing mental models.
```

## Process

1. Before implementing, write the ADR in `Proposed` status
2. Discuss with the team (async in PR or sync in meeting)
3. Update status to `Accepted` after approval
4. Reference the ADR number in related PRs and commits
