import { type NextRequest, NextResponse } from 'next/server';
import prismaDb from '@/shared/libs/prismadb';
import { type IResponse } from '@/shared/interfaces';
import { type IConversation } from '@/app/(chat)/interfaces';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse<IResponse<IConversation[]>>> {
  try {
    const sessionId = params.slug;
    if (sessionId === undefined)
      return NextResponse.json(
        { data: [], successfulMessage: null, errorMessage: 'Invalid email param' },
        { status: 400 }
      );
    const conversations = await prismaDb.conversation.findMany({
      orderBy: { lastMessageAt: 'desc' },
      where: { userIds: { has: sessionId } },
      include: { users: true, messages: { include: { sender: true, seen: true } } }
    });
    return NextResponse.json(
      { data: conversations, successfulMessage: 'User loaded successfully', errorMessage: null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: [], successfulMessage: null, errorMessage: 'Error on get user' },
      { status: 500 }
    );
  }
}
