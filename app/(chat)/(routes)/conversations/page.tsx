import { redirect } from 'next/navigation';
import { getCurrentSession } from '@/app/(auth)/services/session';
import { getConversations } from '../../services';
import { Conversation, ChatBody, ConversationsSection } from '../../components';

async function UserConversationsPage(): Promise<JSX.Element> {
  const session = await getCurrentSession();

  if (session === null) redirect('/');

  const { data } = await getConversations(session.id);

  return (
    <ChatBody>
      <ConversationsSection user={session} conversations={data} />
      <Conversation sessionId={session.id} />
    </ChatBody>
  );
}
export default UserConversationsPage;
