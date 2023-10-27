import { getCurrentSession } from '@/app/(auth)/services/session';
import { getUsers } from '../../services/user';
import { redirect } from 'next/navigation';
import { UserSection, EmptyState, ChatBody } from '../../components';

async function HomePage(): Promise<JSX.Element> {
  const session = await getCurrentSession();

  if (session === null) redirect('/');

  const users = await getUsers(session.id);

  return (
    <ChatBody>
      <UserSection session={session} users={users} />
      <EmptyState />
    </ChatBody>
  );
}
export default HomePage;
