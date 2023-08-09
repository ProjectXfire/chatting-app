'use client';

import { useState } from 'react';
import { Form, Formik } from 'formik';
import styles from './AuthForm.module.css';
import { LoginSchema } from '@/app/(auth)/schemas';
import { signInWithCredentials } from '@/app/(auth)/services';
import { type ILoginUserDto } from '../../dtos';
import { Button, TextField } from '@mui/material';
import toast from 'react-hot-toast';

function AuthLogin(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async (data: ILoginUserDto): Promise<void> => {
    setIsLoading(true);
    const { errorMessage, successfulMessage } = await signInWithCredentials(data);
    if (errorMessage !== null) toast.error(errorMessage);
    if (successfulMessage !== null) toast.success(successfulMessage);
    setIsLoading(false);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(data) => {
        void onLogin(data);
      }}
    >
      {({ handleSubmit, getFieldProps, errors, touched }) => (
        <Form className={styles['auth-form']} onSubmit={handleSubmit}>
          <TextField
            {...getFieldProps('email')}
            color='secondary'
            fullWidth
            label='Email'
            variant='outlined'
            disabled={isLoading}
            error={errors.email !== undefined && touched.email}
            helperText={
              errors.email !== undefined && touched.email !== undefined ? errors.email : undefined
            }
          />
          <TextField
            {...getFieldProps('password')}
            color='secondary'
            fullWidth
            label='Password'
            variant='outlined'
            disabled={isLoading}
            type='password'
            error={errors.password !== undefined && touched.password}
            helperText={
              errors.password !== undefined && touched.password !== undefined
                ? errors.password
                : undefined
            }
          />
          <Button type='submit' variant='contained' color='secondary' disabled={isLoading}>
            Sign In
          </Button>
        </Form>
      )}
    </Formik>
  );
}
export default AuthLogin;
