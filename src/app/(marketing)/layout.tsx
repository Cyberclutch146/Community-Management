import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import '../globals.css';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import { MarketingNav } from '@/components/MarketingNav';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300','400','600'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300','400','500'],
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
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,0..1,20..48&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[#FAF8F4] text-[#1A1713]">
        <AuthProvider>
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="w-full max-w-6xl px-2 pt-2 pointer-events-auto">
            <MarketingNav />
          </div>
        </div>
        <main className="flex-grow pt-24">
          {children}
        </main>

        <footer className="bg-[#faf6f0] dark:bg-stone-950 font-['DM_Sans'] text-sm leading-relaxed w-full border-t border-stone-200/50 flat no shadows mt-auto">
          <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <Link className="font-['Cormorant_Garamond'] text-[22px] font-semibold tracking-tight text-[#1A1713]" href="/">
                Kindred Relief Network
              </Link>
              <p className="text-[#9A8F82]">
                © 2024 Kindred Relief Network. Rooted in community, grown through care.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link className="text-[#9A8F82] hover:text-[#3D4A2E] underline underline-offset-4 transition-all" href="#">Privacy Policy</Link>
              <Link className="text-[#9A8F82] hover:text-[#3D4A2E] underline underline-offset-4 transition-all" href="#">Terms of Service</Link>
              <Link className="text-[#9A8F82] hover:text-[#3D4A2E] underline underline-offset-4 transition-all" href="#">Annual Report</Link>
              <Link className="text-[#9A8F82] hover:text-[#3D4A2E] underline underline-offset-4 transition-all" href="#">Contact Us</Link>
            </div>
          </div>
        </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
