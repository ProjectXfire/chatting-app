'use client';

import { useState } from 'react';
import styles from './AuthForm.module.css';
import { AuthRegister, AuthLogin, FormHeader, SocialLogin } from '..';
import { Button, Divider, Typography } from '@mui/material';

type TVariant = 'LOGIN' | 'REGISTER';

function AuthForm(): JSX.Element {
  const [variant, setVariant] = useState<TVariant>('LOGIN');

  const formSelectedText =
    variant === 'LOGIN' ? 'Already have an account? Click here' : 'Login here';
  const formTitle = variant === 'LOGIN' ? 'Sign into your account' : 'Create a new account';

  const toggleVariant = (): void => {
    const variantChanged = variant === 'LOGIN' ? 'REGISTER' : 'LOGIN';
    setVariant(variantChanged);
  };

  return (
    <section className={styles['auth-form-container']}>
      <FormHeader imageUrl='/images/logo.png' title={formTitle} />
      {variant === 'LOGIN' ? <AuthLogin /> : <AuthRegister />}
      <Button onClick={toggleVariant}>{formSelectedText}</Button>
      <Divider>
        <Typography color='secondary.main'>Or continue with</Typography>
      </Divider>
      <SocialLogin />
    </section>
  );
}
export default AuthForm;
