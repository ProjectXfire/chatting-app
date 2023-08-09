import bcrypt from 'bcrypt';
import { type AuthOptions } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prismadb from '@/shared/libs/prismadb';

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismadb) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ''
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials, req) {
        if (credentials === undefined) throw new Error('Invalid credentials');
        if (credentials.email === '' || credentials.password === '')
          throw new Error('Invalid credentials');
        const user = await prismadb.user.findUnique({ where: { email: credentials.email } });
        if (user === null) throw new Error('Invalid credentials');
        if (user.hashedPassword === null) throw new Error('Invalid credentials');
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!isCorrectPassword) throw new Error('Invalid credentials');
        return user;
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default authOptions;
