import { type NextRequest, NextResponse } from 'next/server';
import prismaDb from '@/shared/libs/prismadb';
import { pusherServer } from '@/shared/libs/pusher';
import { type IResponse } from '@/shared/interfaces';
import { type IUser } from '@/app/(chat)/interfaces';

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse<IResponse<IUser | null>>> {
  try {
    const email = params.userId;
    if (email === undefined)
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'Invalid email param' },
        { status: 400 }
      );
    const currentUser = await prismaDb.user.update({
      where: { email },
      data: { online: true },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        imageCode: true,
        conversations: true,
        messages: true,
        seenMessages: true,
        online: true
      }
    });
    await pusherServer.trigger('online', 'user:status', { online: true, id: currentUser.id });
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse<IResponse<null>>> {
  try {
    const { userId } = params;
    if (userId === undefined) {
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'Invalid user id' },
        { status: 200 }
      );
    }
    const { name, image, imageCode, online } = await req.json();
    if (
      name === undefined &&
      image === undefined &&
      imageCode === undefined &&
      online === undefined
    )
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'Nothing to update' },
        { status: 200 }
      );
    if (typeof online === 'boolean') {
      await prismaDb.user.update({ where: { id: userId }, data: { online } });
      await pusherServer.trigger('online', 'user:status', { online, id: userId });
      return NextResponse.json(
        { data: null, successfulMessage: 'User updated', errorMessage: null },
        { status: 200 }
      );
    }
    await prismaDb.user.update({ where: { id: userId }, data: { image, imageCode, name } });
    return NextResponse.json(
      { data: null, successfulMessage: 'User updated', errorMessage: null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: null, successfulMessage: null, errorMessage: 'Error on update user' },
      { status: 500 }
    );
  }
}
