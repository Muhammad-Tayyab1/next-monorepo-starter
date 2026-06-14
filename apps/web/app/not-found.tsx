import Link from 'next/link';
import { Button } from '@repo/ui';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
      <p className="mt-4 text-xl font-medium">Page not found</p>
      <p className="mt-2 text-muted-foreground">
        The page you're looking for doesn't exist.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Go home</Link>
      </Button>
    </main>
  );
}
