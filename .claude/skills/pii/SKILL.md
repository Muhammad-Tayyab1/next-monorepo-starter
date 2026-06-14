---
name: pii
description: When working with any code that handles or processes personal data — user profiles, emails, phone numbers, addresses, payment information, etc.
---

## PII Tiers

### Tier 1 — Never log

- Payment card data (PAN, CVV, expiry)
- Full physical address (street + city + zip combined)
- Date of birth
- Government ID numbers
- Auth tokens, session tokens, refresh tokens

### Tier 2 — Log with caution

- Email address — log only when needed for tracing. Use structured fields only, never string interpolation.
- Phone number — last 4 digits only if needed, never full number
- IP address — log as a named field, never embedded in message strings

### Tier 3 — Log freely

- First name in isolation
- User ID, record ID
- Non-sensitive display names

## Rules

### Logging

- Tier 1 fields never appear in logs under any circumstance.
- Tier 2 fields use structured format only.

```typescript
// Bad
console.log(`User ${email} logged in`)

// Good
console.log('User login', { userId })
```

### Storage

- Never store Tier 1 or Tier 2 fields in `localStorage`, `sessionStorage`, or any persisted Zustand state.
- Use secure, `httpOnly` cookies for auth tokens — never manage them manually in JS.

### URLs

- Never put any PII in query params or path segments.

### Forms

- Use appropriate input types and autocomplete attributes.

```typescript
<Input type="password" autoComplete="current-password" {...register('password')} />
<Input type="email" autoComplete="email" {...register('email')} />
```

### API Responses

- Only render PII that the authenticated user is authorized to see.
- Never expose other users' Tier 1 or Tier 2 fields in any client-rendered output.

### Code Review Flags

Flag any of these patterns:

- Tier 1 fields in any logging call
- Tier 2 fields outside of structured log format
- PII embedded in error messages shown to users
- Tier 1 or Tier 2 fields in `localStorage`, `sessionStorage`, or persisted Zustand state
- PII in URL parameters or path segments

## Pre-Feature Checklist

Before implementing any feature that handles PII:

1. Identify which tier each PII field belongs to
2. Document the data flow — where PII enters, where it's displayed, where it exits
3. Confirm no Tier 1 or Tier 2 fields are persisted client-side
