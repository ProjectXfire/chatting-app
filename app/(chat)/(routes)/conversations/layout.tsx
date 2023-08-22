import { redirect } from 'next/navigation';
import { getCurrentSession } from '@/app/(auth)/services/session';
import {
  ChatContainer,
  ConversationSection,
  ConversationsSection,
  SideOptionsSection
} from '../../components';
import { getConversations } from '../../services/conversation';
import { Modal } from '@/shared/components';

interface Props {
  children: React.ReactNode;
}

async function ConversationsLayout({ children }: Props): Promise<JSX.Element> {
  const session = await getCurrentSession();

  if (session === null) redirect('/');

  const { data } = await getConversations(session.id);

  return (
    <ChatContainer>
      <Modal />
      <SideOptionsSection>
        <ConversationsSection conversations={data} user={session} />
      </SideOptionsSection>
      <ConversationSection>{children}</ConversationSection>
    </ChatContainer>
  );
}
export default ConversationsLayout;
