import * as Yup from 'yup';

export const RegisterSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Must be an email').required('Email is required'),
  password: Yup.string().required('Password is required')
});

export const LoginSchema = Yup.object({
  email: Yup.string().email('Must be an email').required('Email is required'),
  password: Yup.string().required('Password is required')
});
