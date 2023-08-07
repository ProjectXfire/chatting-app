import './globals.css';
import type { Metadata } from 'next';
import { Itim } from 'next/font/google';
import { Providers } from '@/shared/components';

const inter = Itim({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Chatting App',
  description: 'Chatting app'
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang='en'>
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
