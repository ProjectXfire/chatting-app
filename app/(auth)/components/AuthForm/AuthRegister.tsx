'use client';

import { Form, Formik } from 'formik';
import styles from './AuthForm.module.css';
import { RegisterSchema } from '@/app/(auth)/schemas';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

function AuthRegister(): JSX.Element {
  const [isLoading] = useState(false);

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={RegisterSchema}
      onSubmit={(data) => {
        console.log(data);
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
