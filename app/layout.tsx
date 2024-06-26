import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeProviderComp from '@/providers/theme-provider';
import { Toaster } from 'sonner';
import Navbar from '@/components/layouts/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trells',
  description: 'Trells is a alternative and open source version of Trello.',
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
          <Navbar />
          {children}
          <Toaster richColors />
        </ThemeProviderComp>
      </body>
    </html>
  );
}
