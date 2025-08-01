
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { AuthProvider } from '@/hooks/use-auth';
import { CustomThemeProvider } from '@/hooks/use-custom-theme';
import { JobsProvider } from '@/hooks/use-jobs';
import { NotificationsProvider } from '@/hooks/use-notifications';
import NProgressProvider from '@/components/layout/nprogress-provider';

export const metadata: Metadata = {
  title: 'Career Compass Zambia (CCZ)',
  description: 'Your guide to the Zambian professional world.',
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
        <CustomThemeProvider>
          <NProgressProvider>
            <AuthProvider>
              <JobsProvider>
                <NotificationsProvider>
                  <div className="relative flex min-h-screen flex-col bg-background">
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                  </div>
                  <Toaster />
                </NotificationsProvider>
              </JobsProvider>
            </AuthProvider>
          </NProgressProvider>
        </CustomThemeProvider>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="bg-card text-card-foreground">
      <div className="container py-8 text-center text-muted-foreground">
        <div className="flex justify-center items-center mb-4">
          <span className="ml-2 text-lg font-bold">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Developed by MuzoInTech (MIT)
            </span>
          </span>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Career Compass Zambia (CCZ). All rights reserved.
        </p>
      </div>
    </footer>
  );
}
