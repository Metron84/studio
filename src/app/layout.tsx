import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TreeBackground } from '@/components/tree-background';
import { Inter, Crimson_Text } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';

const fontBody = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
});

const fontHeadline = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'Mr. Melo',
  description:
    'Guidance and resources from Mr. Melo for personal and professional growth.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'font-body antialiased',
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        <TreeBackground />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
