import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Stitch UI - Community Management",
  description: "Community management platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body className="bg-surface text-primary antialiased font-sans pb-20 md:pb-0">
        <main className="w-full relative min-h-screen max-w-md mx-auto md:max-w-full bg-surface shadow-sm overflow-hidden">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
