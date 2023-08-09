import { signIn } from 'next-auth/react';
import axios from 'axios';
import { type IUser } from '@/app/(chat)/interfaces';
import { type IResponse } from '@/shared/interfaces';
import { type ILoginUserDto, type ICreateUserDto } from '../dtos';
import { handleErrorMessage } from '@/shared/helpers';

export async function register(payload: ICreateUserDto): Promise<IResponse<null>> {
  try {
    const res = await axios.post<IResponse<IUser>>('/api/register', payload);
    const { errorMessage, successfulMessage } = res.data;
    return {
      data: null,
      successfulMessage,
      errorMessage
    };
  } catch (error) {
    const errorMessage = handleErrorMessage(error);
    return {
      data: null,
      successfulMessage: null,
      errorMessage
    };
  }
}

export async function signInWithCredentials(payload: ILoginUserDto): Promise<IResponse<null>> {
  try {
    const res = await signIn('credentials', { ...payload, redirect: false });
    if (res === undefined) throw new Error('Invalid credentials');
    if (res.error !== null) throw new Error(res.error);
    return {
      data: null,
      successfulMessage: 'Successful login',
      errorMessage: null
    };
  } catch (error) {
    const errorMessage = handleErrorMessage(error);
    return {
      data: null,
      successfulMessage: null,
      errorMessage
    };
  }
}

export async function signInWithGoogle(): Promise<IResponse<null>> {
  try {
    await signIn('google', { redirect: false });
    return {
      data: null,
      successfulMessage: 'Successful login',
      errorMessage: null
    };
  } catch (error) {
    const errorMessage = handleErrorMessage(error);
    return {
      data: null,
      successfulMessage: null,
      errorMessage
    };
  }
}

export async function signInWithGithub(): Promise<IResponse<null>> {
  try {
    await signIn('github', { redirect: false });
    return {
      data: null,
      successfulMessage: 'Successful login',
      errorMessage: null
    };
  } catch (error) {
    const errorMessage = handleErrorMessage(error);
    return {
      data: null,
      successfulMessage: null,
      errorMessage
    };
  }
}
