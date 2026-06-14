import type { Metadata } from 'next';
import '@repo/ui/src/styles/globals.css';

export const metadata: Metadata = {
  title: 'Studio — next-monorepo-starter',
  description: 'Internal content studio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
