import { getServerSession, type Session } from 'next-auth';
import authOptions from '@/shared/libs/authOptions';
import { type IUser } from '@/app/(chat)/interfaces';
import prismaDb from '@/shared/libs/prismadb';

type CurrentUser = null | IUser;

async function getSession(): Promise<Session | null> {
  return await getServerSession(authOptions);
}

export async function getCurrentSession(): Promise<IUser | null> {
  try {
    const session = await getSession();
    if (session === null || session.user === undefined) return null;
    if (session.user.email === null) return null;
    let currentUser: CurrentUser = null;
    currentUser = await prismaDb.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        imageCode: true,
        conversations: true,
        messages: true,
        seenMessages: true
      }
    });
    return currentUser;
  } catch (error) {
    return null;
  }
}
