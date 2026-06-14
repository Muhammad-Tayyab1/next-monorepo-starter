---
name: business-doc-writer
description: Extract business requirements from the current session and write a structured feature document to docs/features/ before any commit or push. Triggers on: "commit", "push", "create PR", or any autonomous commit Claude Code makes. Never write code-level detail — business intent only.
---

## Purpose

Before code is committed, produce a human-readable business document that captures _what_ was built and _why_. This exists so that stakeholders and future developers can understand business intent without reading code or git history.

---

## When This Skill Fires

Fires **only when the commit contains business logic** — a change that affects what users can see, do, or experience.

**Fires for:**
- New pages, forms, user-facing components, or behavioural changes
- Any CRUD operation exposed to the user

**Skip for:**
- Updating Claude skills, CLAUDE.md, CI/CD config, linting rules, or build tooling
- Dependency upgrades with no user-visible behaviour change
- Refactors that change code structure but not product behaviour

---

## Step 1 — Determine the Doc File Path

Derive the filename from the current branch name:

```
Branch:   feat/user-profile-edit
Filename: docs/features/user-profile-edit.md

Branch:   fix/product-price-display
Filename: docs/features/fix-product-price-display.md
```

Never overwrite an existing doc without reading it first and merging new context.

---

## Step 2 — Extract Business Context

Scan the session for business-layer statements — what the developer said about intent, user behaviour, rules, or outcomes. Never infer — if it wasn't said, write "Not stated."

**Include:** what was built, who benefits, what problem it solves, business rules, data touched, edge cases mentioned.

**Exclude:** library names, file paths, component names, function signatures.

---

## Step 3 — Write the Document

```markdown
---
feature: { human-readable feature name }
branch: { current branch name }
date: { YYYY-MM-DD }
status: draft
confidence: high | medium | low
---

# {Feature Name}

> ⚠️ Low business context — developer should review and expand before merge.
> _(Remove this line if confidence is medium or high)_

## What Was Built

{1–3 sentences. What exists now that didn't before, or what behaviour changed.}

## Why

{1–3 sentences. What problem does this solve?}

## Who It Affects

{Which user roles: user, admin, guest, etc.}

## Business Rules

{Bullet list of explicit rules or constraints. Write "None stated." if none mentioned.}

## Data Touched

| Entity | Operation |
| ------ | --------- |
|        |           |

## User-Facing Behaviour

{What does the user see or experience? Plain language, no component names.}

## Open Questions

{Unresolved business decisions. Write "None." if none.}
```

---

## Step 4 — Write and Stage

1. Create `docs/features/` if it doesn't exist.
2. If the file exists, merge — do not overwrite.
3. Stage the file: `git add docs/features/{filename}.md`
4. Include in the same commit as the code.

---

## Example — High Confidence

Developer said: _"Add a filter so users can search products by category. Only published products should appear."_

```markdown
---
feature: Product Category Filter
branch: feat/product-category-filter
date: 2025-10-14
status: draft
confidence: high
---

# Product Category Filter

## What Was Built

Users can filter product search results by category.

## Why

Not stated by developer.

## Who It Affects

Users browsing products.

## Business Rules

- Only published products appear in search results.
- Category filter can be applied alongside other filters.

## Data Touched

| Entity  | Operation |
| ------- | --------- |
| Product | Read      |

## User-Facing Behaviour

Users select a category when searching. Results show only products in that category.

## Open Questions

- Why was this built? What user problem does it solve?
- What categories are available — static list or dynamic?
- What happens when no products exist in the selected category?
```

---

## Example — Low Confidence

Developer said: _"Fix the bug"_ (working on `fix/admin-dashboard-count`)

```markdown
---
feature: Admin Dashboard Count Fix
branch: fix/admin-dashboard-count
date: 2025-10-14
status: draft
confidence: low
---

# Admin Dashboard Count Fix

> ⚠️ Low business context — developer should review and expand before merge.

## What Was Built

An incorrect count display in the admin dashboard was corrected.

## Why

Not stated by developer.

## Who It Affects

Admin users.

## Business Rules

None stated.

## Data Touched

| Entity | Operation |
| ------ | --------- |
| User   | Read      |

## User-Facing Behaviour

Admin users should now see correct counts on the dashboard.

## Open Questions

- What was showing the wrong count?
- Was any data affected or display only?
```
