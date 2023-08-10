import { getCurrentSession } from '@/app/(auth)/services/session';
import { redirect } from 'next/navigation';
import { ChatContainer, UserSection, ConversationSection } from '../../components';

async function HomePage(): Promise<JSX.Element> {
  const session = await getCurrentSession();

  if (session === null) redirect('/');

  return (
    <ChatContainer>
      <UserSection user={session} />
      <ConversationSection />
    </ChatContainer>
  );
}
export default HomePage;
