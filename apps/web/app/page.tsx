import { Button } from '@repo/ui';
import { Card, CardHeader, CardTitle, CardContent } from '@repo/ui';

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">next-monorepo-starter</h1>
        <p className="text-muted-foreground text-lg">
          A production-ready Next.js monorepo with Turborepo, Tailwind v4, and shared packages.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader><CardTitle>Web</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">Public marketing site — port 3000</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Admin</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">Admin dashboard — port 3001</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Studio</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">Content studio — port 3002</p></CardContent>
          </Card>
        </div>
        <div className="flex gap-4 justify-center">
          <Button>Get Started</Button>
          <Button variant="outline">View Docs</Button>
        </div>
      </div>
    </main>
  );
}
