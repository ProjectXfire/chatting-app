import { getServerSession, type Session } from 'next-auth';
import axios from 'axios';
import authOptions from '@/shared/libs/authOptions';
import { type IUser } from '@/app/(chat)/interfaces';
import { type IResponse } from '@/shared/interfaces';

async function getSession(): Promise<Session | null> {
  return await getServerSession(authOptions);
}

export async function getCurrentSession(): Promise<IUser | null> {
  try {
    const session = await getSession();
    if (session === null || session.user === undefined) return null;
    if (session.user.email === null || session.user.email === undefined) return null;
    const res = await axios.get<IResponse<IUser | null>>(
      `${process.env.WEBSITE_URL ?? ''}/api/users/${session.user.email}`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
}
