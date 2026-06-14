# Security Rules

These rules apply continuously during implementation. The `security-audit` skill runs a full OWASP checklist before PRs.

---

## Environment variables

Never hardcode secrets, tokens, API keys, or credentials anywhere in source code.

All client-side env vars must be prefixed `NEXT_PUBLIC_` and must not contain secrets — they are visible in the browser bundle. Server-side secrets must never be prefixed `NEXT_PUBLIC_`.

Never commit `.env` or `.env.local` files. Only `.env.example` with placeholder values is allowed.

---

## Authentication tokens

Never store JWT tokens or session tokens in `localStorage` — use `httpOnly` cookies or a secure auth library. Never log tokens, never include them in error messages, never pass them as URL query parameters.

---

## REST API calls

Never construct API URLs dynamically from unvalidated user input. Always use typed endpoints from `API_ENDPOINTS` constants in `@repo/shared`.

```ts
// Wrong
const url = `/users/${userInput}`

// Correct
import { API_ENDPOINTS } from '@repo/shared'
const url = `${API_ENDPOINTS.USERS}/${userId}` // userId validated by Zod
```

---

## User input

Validate all user inputs on the client with Zod before submission. Never pass raw, unvalidated form values to an API.

Never render user-supplied content as raw HTML. If HTML rendering is genuinely required, use a sanitiser library (e.g. DOMPurify) — never trust unescaped user content.

---

## Next.js specifics

Avoid any pattern that executes arbitrary strings as code. Server Actions and Route Handlers must validate all inputs with Zod before processing.

---

## Code review flags

Raise immediately when spotted:

- Any `NEXT_PUBLIC_` env var containing a secret or private key
- Token or credential stored in `localStorage` or `sessionStorage`
- API URL built dynamically from user input without validation
- User-supplied content rendered as raw HTML without sanitisation
- Hardcoded API keys, tokens, or URLs with credentials
- Form submission without Zod validation
