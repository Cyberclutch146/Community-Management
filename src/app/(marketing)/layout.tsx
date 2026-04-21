import type { Metadata } from 'next';
import { Literata, Nunito_Sans } from 'next/font/google';
import '../globals.css';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import { MarketingNav } from '@/components/MarketingNav';

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
  title: 'Kindred Relief Network - Outreach & Relief',
  description: 'Rooted in community, grown through care.',
};

export default function MarketingLayout({
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
      <body className="antialiased min-h-screen flex flex-col font-body bg-background text-on-background">
        <AuthProvider>
        <MarketingNav />
        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-[#faf6f0] dark:bg-stone-950 font-['Nunito_Sans'] text-sm leading-relaxed w-full border-t border-stone-200/50 flat no shadows mt-auto">
          <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <Link className="font-headline text-lg font-semibold text-[#4a7c59] dark:text-emerald-500" href="/">
                  Kindred Relief Network
              </Link>
              <p className="text-stone-500 dark:text-stone-400">
                  © 2024 Kindred Relief Network. Rooted in community, grown through care.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link className="text-stone-500 dark:text-stone-400 hover:text-[#4a7c59] dark:hover:text-emerald-400 underline underline-offset-4 transition-all" href="#">Privacy Policy</Link>
              <Link className="text-stone-500 dark:text-stone-400 hover:text-[#4a7c59] dark:hover:text-emerald-400 underline underline-offset-4 transition-all" href="#">Terms of Service</Link>
              <Link className="text-stone-500 dark:text-stone-400 hover:text-[#4a7c59] dark:hover:text-emerald-400 underline underline-offset-4 transition-all" href="#">Annual Report</Link>
              <Link className="text-stone-500 dark:text-stone-400 hover:text-[#4a7c59] dark:hover:text-emerald-400 underline underline-offset-4 transition-all" href="#">Contact Us</Link>
            </div>
          </div>
        </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
