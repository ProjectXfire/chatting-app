import { Container } from '@mui/material';
import { AuthForm } from './components';
import { Center } from '@/shared/components';

export default function Home(): JSX.Element {
  return (
    <Container>
      <Center>
        <AuthForm />
      </Center>
    </Container>
  );
}
