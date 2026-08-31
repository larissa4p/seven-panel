import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Seven Panel',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full bg-gray-50 text-gray-900" suppressHydrationWarning>{children}</body>
    </html>
  );
}
