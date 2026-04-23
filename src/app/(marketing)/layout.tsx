import Link from 'next/link';
import { MarketingNav } from '@/components/MarketingNav';

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MarketingNav />
      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-[var(--color-surface-bright-base)] dark:bg-stone-950 font-['Nunito_Sans'] text-sm leading-relaxed w-full border-t border-stone-200/50 mt-auto">
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
    </>
  );
}
