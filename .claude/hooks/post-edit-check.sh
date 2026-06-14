#!/usr/bin/env bash
# Hook: post-edit-check
# Runs lint and import validation after every file edit.
# Ensures code style and import correctness are caught before Claude moves to the next task.

pnpm lint 2>&1
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo "ERROR: Lint check failed. Fix lint errors before proceeding."
  exit 1
fi

echo "Lint and import check passed."
