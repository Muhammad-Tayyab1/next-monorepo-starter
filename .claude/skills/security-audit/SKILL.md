---
name: security-audit
description: Run a security audit on frontend code. Use when adding or modifying auth flows, forms that accept user input, API integrations, or any code handling sensitive data. Also invoke before raising a PR on any of these areas.
---

## Scope

This skill covers frontend-specific OWASP Top 10 checks for the Next.js/React stack.
PII handling (logging, Sentry scrubbing, analytics) is covered by the `pii` skill — do not duplicate those checks here.

---

## Checklist

Work through every section relevant to the code being audited. Skip sections that do not apply. Flag every issue found — do not silently fix without reporting.

---

### A01 — Broken Access Control

- [ ] Every protected page checks auth state server-side — no client-only guards
- [ ] Admin app routes (`apps/admin`) are never accessible without a valid admin role claim in the auth token
- [ ] Studio app routes (`apps/studio`) are never accessible without valid studio role
- [ ] No role or permission logic is derived from client-side state alone (Zustand, localStorage, cookies readable by JS)
- [ ] Unauthenticated users are redirected before any sensitive data is rendered

---

### A02 — Cryptographic Failures

- [ ] No sensitive data (tokens, session identifiers) stored in localStorage — use httpOnly cookies only
- [ ] No auth tokens passed in URL query parameters
- [ ] No sensitive values hardcoded in component props, default values, or constants

---

### A03 — Injection (XSS)

- [ ] No use of `dangerouslySetInnerHTML` — if unavoidable, content must be explicitly sanitized with DOMPurify before use
- [ ] No user-supplied input rendered directly into the DOM without going through React's rendering (which escapes by default)
- [ ] URL parameters used in page rendering are validated and not reflected directly into `<script>` blocks or inline event handlers

---

### A05 — Security Misconfiguration

- [ ] No `.env` values exposed to the browser unless explicitly intended (only `NEXT_PUBLIC_` prefixed vars are safe to expose)
- [ ] No API keys, secrets, or credentials in any client-side code, component, or config file
- [ ] `next.config.js` does not disable security headers — Content-Security-Policy, X-Frame-Options, X-Content-Type-Options must be set
- [ ] No `console.log` calls in production code paths — remove or replace with structured logger before PR

---

### A07 — Authentication Failures

- [ ] Session validation happens server-side on every protected route — not inferred from a cookie value readable by JS
- [ ] Token expiry is handled — expired sessions redirect to login, not silently fail or expose partial data
- [ ] Password reset flows use a secure, server-side mechanism — no custom implementations that bypass standard auth patterns

---

### Forms & Input Validation

- [ ] All form inputs are validated with React Hook Form + Zod schemas before submission
- [ ] Validation runs on the frontend as UX — backend validation is the security boundary, never assume frontend validation is sufficient
- [ ] File upload inputs (if any) restrict accepted MIME types and validate server-side
- [ ] No open redirect — redirect targets after login/logout are validated against an allowlist, not taken from query params directly

---

### REST API Calls

- [ ] API URLs are never built dynamically from unvalidated user input
- [ ] All endpoints use typed constants from `@repo/shared` — no hardcoded URL strings
- [ ] Auth tokens are passed via `createApiClient` — never manually set in fetch headers from raw string values

---

### Dependencies

- [ ] Any new package added in this PR is from a known, maintained source
- [ ] No package is being pulled in that duplicates a capability already in the stack
- [ ] Run `pnpm audit` — flag any high or critical severity findings for human decision before merging

---

## How to Report

At the end of the audit, produce a summary in this format:

**Security Audit — [feature or PR name]**

| Check                      | Status            | Notes          |
| -------------------------- | ----------------- | -------------- |
| A01 Access Control         | Pass / Fail / N/A | Detail if fail |
| A02 Cryptographic Failures | Pass / Fail / N/A |                |
| A03 XSS                    | Pass / Fail / N/A |                |
| A05 Misconfiguration       | Pass / Fail / N/A |                |
| A07 Auth Failures          | Pass / Fail / N/A |                |
| Forms & Input              | Pass / Fail / N/A |                |
| REST API Calls             | Pass / Fail / N/A |                |
| Dependencies               | Pass / Fail / N/A |                |

Any Fail must be resolved before the PR is raised. Flag it to the developer explicitly — do not silently fix without explaining what was wrong and why.
