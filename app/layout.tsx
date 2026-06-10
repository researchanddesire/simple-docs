import type { Metadata } from 'next';
import { Open_Sans, Space_Mono } from 'next/font/google';
import { Provider } from '@/components/provider';
import './global.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-rd-body',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-rd-heading',
});

export const metadata: Metadata = {
  title: {
    default: 'Research & Desire Docs',
    template: '%s | Research & Desire Docs',
  },
  description: 'Product and contributor documentation for Research & Desire.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[radial-gradient(circle_at_top,#efe6db_0%,#fffdf8_28%,#f5f0e7_100%)] text-fd-foreground">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
