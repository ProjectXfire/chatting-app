import { redirect } from 'next/navigation';
import { getCurrentSession } from '@/app/(auth)/services/session';
import { getConversation, getMessages } from '@/app/(chat)/services';
import { type IParams } from '@/shared/interfaces';
import { ConversationHeader, EmptyState, MessageInput, Messages } from '@/app/(chat)/components';

interface Props {
  params: IParams;
}

async function UserConversationPage({ params }: Props): Promise<JSX.Element> {
  const { conversationId } = params;

  if (conversationId === undefined) redirect('/conversations');

  const session = await getCurrentSession();

  if (session === null) redirect('/');

  const { data: conversation } = await getConversation(conversationId);
  const { data: messages } = await getMessages(conversationId);

  if (conversation === null) return <EmptyState />;

  return (
    <section>
      <ConversationHeader conversation={conversation} sessionId={session.id} />
      <Messages
        initialMessages={messages}
        sessionId={session.id}
        conversationId={conversation.id}
      />
      <MessageInput conversationId={conversation.id} userId={session.id} />
    </section>
  );
}
export default UserConversationPage;
