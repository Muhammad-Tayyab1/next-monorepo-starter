'use client';

import { Button } from '@repo/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
      <Button onClick={reset} className="mt-6">
        Try again
      </Button>
    </main>
  );
}
