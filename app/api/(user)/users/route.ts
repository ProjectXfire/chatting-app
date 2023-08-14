import { type NextRequest, NextResponse } from 'next/server';
import prismaDb from '@/shared/libs/prismadb';
import { type IResponse } from '@/shared/interfaces';
import { type IUser } from '@/app/(chat)/interfaces';

export async function POST(req: NextRequest): Promise<NextResponse<IResponse<IUser[]>>> {
  try {
    const { email } = await req.json();
    if (email === null || email === undefined)
      return NextResponse.json(
        { data: [], successfulMessage: null, errorMessage: 'Unauthorized' },
        { status: 400 }
      );
    const users = await prismaDb.user.findMany({
      orderBy: { createdAt: 'asc' },
      where: { NOT: { email } },
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
      { data: users, successfulMessage: 'Users loaded successfully', errorMessage: null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: [], successfulMessage: null, errorMessage: 'Error on get users' },
      { status: 500 }
    );
  }
}
