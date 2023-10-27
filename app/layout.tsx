import './globals.css';
import type { Metadata } from 'next';
import { Itim } from 'next/font/google';
import { Modal, Providers, ToasterProvider } from '@/shared/components';
import { getCurrentSession } from './(auth)/services/session';
import { Online } from './(auth)/components';
import { ChatContainer } from './(chat)/components';

const inter = Itim({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Chatting App',
  description: 'Chatting app'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await getCurrentSession();

  return (
    <html lang='en'>
      <Providers>
        <body className={inter.className}>
          <Modal />
          <ToasterProvider />
          {session !== null ? (
            <>
              <Online session={session} />
              <ChatContainer session={session}>{children}</ChatContainer>
            </>
          ) : (
            children
          )}
        </body>
      </Providers>
    </html>
  );
}
