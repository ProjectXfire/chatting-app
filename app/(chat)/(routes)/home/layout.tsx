import { getCurrentSession } from '@/app/(auth)/services/session';
import { getUsers } from '../../services/user';
import { redirect } from 'next/navigation';
import {
  ChatContainer,
  UserSection,
  ConversationSection,
  SideOptionsSection
} from '../../components';

interface Props {
  children: React.ReactNode;
}

async function HomeLayout({ children }: Props): Promise<JSX.Element> {
  const session = await getCurrentSession();

  if (session === null) redirect('/');

  const users = await getUsers(session.id);

  return (
    <ChatContainer>
      <SideOptionsSection>
        <UserSection session={session} users={users} />
      </SideOptionsSection>
      <ConversationSection>{children}</ConversationSection>
    </ChatContainer>
  );
}
export default HomeLayout;
