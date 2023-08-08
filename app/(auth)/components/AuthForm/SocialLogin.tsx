'use client';

import { GitHub, Google } from '@mui/icons-material';
import { Button } from '@mui/material';
import styles from './AuthForm.module.css';

function SocialLogin(): JSX.Element {
  return (
    <div className={styles['auth-social']}>
      <Button color='secondary' fullWidth variant='outlined' startIcon={<GitHub />}>
        Github
      </Button>
      <Button
        color='secondary'
        fullWidth
        variant='outlined'
        startIcon={<Google fontSize='large' />}
      >
        Google
      </Button>
    </div>
  );
}
export default SocialLogin;
