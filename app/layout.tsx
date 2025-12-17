import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "MMDCare Platform",
  description: "Care provider dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased flex", nunito.variable)}>
        <Sidebar />
        <main className="flex-1 md:pl-64 transition-all duration-200 w-full bg-background">
          <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
