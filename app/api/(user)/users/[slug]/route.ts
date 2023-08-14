import { type NextRequest, NextResponse } from 'next/server';
import prismaDb from '@/shared/libs/prismadb';
import { type IResponse } from '@/shared/interfaces';
import { type IUser } from '@/app/(chat)/interfaces';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse<IResponse<IUser | null>>> {
  try {
    const email = params.slug;
    if (email === undefined)
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'Invalid email param' },
        { status: 400 }
      );
    const currentUser = await prismaDb.user.findUnique({
      where: { email },
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
      { data: currentUser, successfulMessage: 'User loaded successfully', errorMessage: null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: null, successfulMessage: null, errorMessage: 'Error on get user' },
      { status: 500 }
    );
  }
}
