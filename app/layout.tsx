import './globals.css';
import type { Metadata } from 'next';
import { Itim } from 'next/font/google';
import { Modal, Providers, ToasterProvider } from '@/shared/components';

const inter = Itim({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Chatting App',
  description: 'Chatting app'
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang='en'>
      <Providers>
        <body className={inter.className}>
          <Modal />
          <ToasterProvider />
          {children}
        </body>
      </Providers>
    </html>
  );
}
