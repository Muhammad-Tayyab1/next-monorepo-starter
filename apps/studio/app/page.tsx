import { Button } from '@repo/ui';
import { Card, CardHeader, CardTitle, CardContent } from '@repo/ui';

export default function StudioHome() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Studio</h1>
          <Button size="sm">New Entry</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle>Recent Drafts</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No drafts yet.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Published</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No published entries yet.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
