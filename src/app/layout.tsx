import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Compass } from 'lucide-react';
import { AuthProvider } from '@/hooks/use-auth';

export const metadata: Metadata = {
  title: 'Career Compass',
  description: 'Your guide to the professional world.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="bg-white dark:bg-card">
      <div className="container py-8 text-center text-muted-foreground">
        <div className="flex justify-center items-center mb-4">
          <Compass className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold text-foreground">
            Career Compass
          </span>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Career Compass. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
