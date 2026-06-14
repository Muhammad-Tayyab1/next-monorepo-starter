#!/usr/bin/env bash
# Hook: type-check
# Runs TypeScript type check after every file edit.
# Catches type errors immediately so Claude never builds on broken types.

pnpm type-check 2>&1
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo "ERROR: TypeScript type check failed. Fix type errors before proceeding."
  exit 1
fi

echo "Type check passed."
