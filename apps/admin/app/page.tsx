import { Button } from '@repo/ui';
import { Card, CardHeader, CardTitle, CardContent } from '@repo/ui';

export default function AdminHome() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" size="sm">Sign out</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Users', 'Products', 'Notifications'].map((item) => (
            <Card key={item}>
              <CardHeader><CardTitle>{item}</CardTitle></CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">—</p>
                <p className="text-sm text-muted-foreground">total records</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
