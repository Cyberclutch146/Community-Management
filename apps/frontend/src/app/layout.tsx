import type { Metadata } from "next";
import "./globals.css";
import SideNav from "@/components/SideNav";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Kindred Relief Network",
  description: "Human-centered outreach and disaster relief platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col md:flex-row pb-24 md:pb-0">
        <SideNav />
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 w-full relative">
            {children}
          </main>
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
