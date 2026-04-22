import type { Metadata } from 'next';
import { Literata, Nunito_Sans } from 'next/font/google';
import '../globals.css';
import { MobileHeader, MobileBottomNav } from '@/components/Navigation';
import { AuthProvider } from '@/context/AuthContext';
import NavbarTop from '@/components/Navbar_top';

const literata = Literata({
  variable: '--font-literata',
  subsets: ['latin'],
  display: 'swap',
});

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Home - Outreach & Relief',
  description: 'Kindred Relief Network - Local Response Team',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${literata.variable} ${nunitoSans.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,0..1,20..48&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-background text-on-background font-body antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col md:flex-col"
      >
        <AuthProvider>
          <div className="hidden md:block">
            <NavbarTop/>
          </div>
          <div className="flex-1 flex flex-col min-w-0">
            <div className="md:hidden">
              <MobileHeader />
            </div>
            {children}
          </div>
          <div className="md:hidden">
            <MobileBottomNav />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
