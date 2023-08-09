import { type NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { type IUser } from '@/app/(chat)/interfaces';
import { type IResponse } from '@/shared/interfaces';
import prismadb from '@/shared/libs/prismadb';

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<IResponse<IUser | null>>> {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    if (!(Boolean(name) && Boolean(email) && Boolean(password)))
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'Missing data' },
        { status: 400 }
      );
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser: IUser = await prismadb.user.create({
      data: { name, email, hashedPassword },
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
    return NextResponse.json(
      {
        data: newUser,
        successfulMessage: 'User successfully registered',
        errorMessage: null
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002')
        return NextResponse.json(
          { data: null, successfulMessage: null, errorMessage: 'Email is already registered' },
          { status: 400 }
        );
    }
    return NextResponse.json(
      { data: null, successfulMessage: null, errorMessage: 'Error on register' },
      { status: 500 }
    );
  }
}
