import type { Metadata } from 'next';
import { Literata, Nunito_Sans } from 'next/font/google';
import '../globals.css';
import Link from 'next/link';

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
        <nav className="bg-[#faf6f0] dark:bg-stone-900 font-['Nunito_Sans'] font-medium tracking-tight docked full-width top-0 border-b border-stone-200/50 shadow-[0_4px_20px_rgba(46,50,48,0.06)] z-50 sticky">
          <div className="flex justify-between items-center w-full px-6 md:px-12 h-20 max-w-7xl mx-auto">
            <Link className="font-headline text-2xl font-bold text-[#4a7c59] dark:text-emerald-500" href="/">
              Kindred Relief Network
            </Link>
            <div className="hidden md:flex space-x-8 items-center">
              <Link className="text-[#4a7c59] dark:text-emerald-400 font-bold border-b-2 border-[#4a7c59] dark:border-emerald-500 pb-1" href="#">Our Mission</Link>
              <Link className="text-stone-600 dark:text-stone-400 hover:text-[#4a7c59] dark:hover:text-emerald-300 transition-colors duration-200" href="#">Programs</Link>
              <Link className="text-stone-600 dark:text-stone-400 hover:text-[#4a7c59] dark:hover:text-emerald-300 transition-colors duration-200" href="#">Get Involved</Link>
              <Link className="text-stone-600 dark:text-stone-400 hover:text-[#4a7c59] dark:hover:text-emerald-300 transition-colors duration-200" href="#">Impact</Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/feed" className="text-stone-600 dark:text-stone-400 hover:text-[#4a7c59] dark:hover:text-emerald-300 transition-colors duration-200 font-medium">
                Login
              </Link>
              <Link href="/feed" className="bg-[#4a7c59] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-opacity-90 active:scale-95 transition-transform duration-150 ease-in-out shadow-sm">
                Donate Now
              </Link>
            </div>
            <button className="md:hidden text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>menu</span>
            </button>
          </div>
        </nav>
        
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
      </body>
    </html>
  );
}
