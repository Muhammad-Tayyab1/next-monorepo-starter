#!/usr/bin/env bash
# Hook: commit-guard
# Validates commit message format follows conventional commits convention.
# Runs before committing.

COMMIT_MSG="$1"

# Conventional commit pattern: type(scope): description
PATTERN="^(feat|fix|docs|style|refactor|perf|test|build|ci|chore)(\(.+\))?: .+"

if ! echo "$COMMIT_MSG" | grep -qE "$PATTERN"; then
  echo "ERROR: Commit message does not follow conventional commits format."
  echo "Expected: <type>(<scope>): <description>"
  echo "Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore"
  echo "Got: $COMMIT_MSG"
  exit 1
fi
