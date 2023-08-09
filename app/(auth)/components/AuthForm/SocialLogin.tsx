'use client';

import toast from 'react-hot-toast';
import styles from './AuthForm.module.css';
import { signInWithGithub, signInWithGoogle } from '@/app/(auth)/services';
import { GitHub, Google } from '@mui/icons-material';
import { Button } from '@mui/material';

function SocialLogin(): JSX.Element {
  const githubSignIn = async (): Promise<void> => {
    const { errorMessage } = await signInWithGithub();
    if (errorMessage !== null) toast.error(errorMessage);
  };

  const googleSignIn = async (): Promise<void> => {
    const { errorMessage } = await signInWithGoogle();
    if (errorMessage !== null) toast.error(errorMessage);
  };

  return (
    <div className={styles['auth-social']}>
      <Button
        type='button'
        color='secondary'
        fullWidth
        variant='outlined'
        startIcon={<GitHub fontSize='large' />}
        onClick={() => {
          void githubSignIn();
        }}
      >
        Github
      </Button>
      <Button
        type='button'
        color='secondary'
        fullWidth
        variant='outlined'
        startIcon={<Google fontSize='large' />}
        onClick={() => {
          void googleSignIn();
        }}
      >
        Google
      </Button>
    </div>
  );
}
export default SocialLogin;
