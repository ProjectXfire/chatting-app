import { redirect } from 'next/navigation';
import { Container } from '@mui/material';
import { getCurrentSession } from '../services/session';
import { AuthForm } from '../components';
import { Center } from '@/shared/components';

export default async function Home(): Promise<JSX.Element> {
  const session = await getCurrentSession();

  if (session !== null) redirect('/home');

  return (
    <Container>
      <Center>
        <AuthForm />
      </Center>
    </Container>
  );
}
