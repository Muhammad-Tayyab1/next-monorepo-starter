import type { Metadata } from 'next';
import '@repo/ui/src/styles/globals.css';

export const metadata: Metadata = {
  title: 'Admin — next-monorepo-starter',
  description: 'Admin dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
