'use client';

import { useState } from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import styles from './AuthForm.module.css';
import { register, signInWithCredentials } from '@/app/(auth)/services';
import { type ICreateUserDto } from '../../dtos';
import { RegisterSchema } from '@/app/(auth)/schemas';
import { Button, TextField } from '@mui/material';

interface Props {
  action?: () => void;
}

function AuthRegister({ action }: Props): JSX.Element {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onRegister = async (data: ICreateUserDto): Promise<void> => {
    setIsLoading(true);
    const { successfulMessage, errorMessage } = await register(data);
    if (errorMessage !== null) {
      toast.error(errorMessage);
    }
    if (successfulMessage !== null) {
      toast.success(successfulMessage);
      const { errorMessage: errorOnLogin } = await signInWithCredentials({
        email: data.email,
        password: data.password
      });
      if (errorOnLogin !== null) {
        toast.error(errorOnLogin);
      } else {
        router.refresh();
      }
    }
    setIsLoading(false);
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={RegisterSchema}
      onSubmit={(data) => {
        void onRegister(data);
      }}
    >
      {({ handleSubmit, getFieldProps, errors, touched }) => (
        <Form className={styles['auth-form']} onSubmit={handleSubmit}>
          <TextField
            {...getFieldProps('name')}
            color='secondary'
            fullWidth
            label='Name'
            variant='outlined'
            disabled={isLoading}
            error={errors.name !== undefined && touched.name}
            helperText={
              errors.name !== undefined && touched.name !== undefined ? errors.name : undefined
            }
          />
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
            type='password'
            disabled={isLoading}
            error={errors.password !== undefined && touched.password}
            helperText={
              errors.password !== undefined && touched.password !== undefined
                ? errors.password
                : undefined
            }
          />
          <Button type='submit' variant='contained' color='secondary' disabled={isLoading}>
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
}
export default AuthRegister;
