import type { Metadata } from 'next';
import '@repo/ui/src/styles/globals.css';

export const metadata: Metadata = {
  title: 'Web — next-monorepo-starter',
  description: 'Public marketing site',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
