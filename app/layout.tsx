import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProviderComp from "@/providers/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learnup",
  description: "Learnup is a platform for learning and teaching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProviderComp attribute="class" defaultTheme="dark">
          {children}
          <Toaster richColors />
        </ThemeProviderComp>
      </body>
    </html>
  );
}
