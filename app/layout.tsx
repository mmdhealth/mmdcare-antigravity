import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Sidebar } from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import "@/app/globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
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
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased flex",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar />
          <main className="flex-1 p-8 ml-64 overflow-y-auto h-screen bg-background/50">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
