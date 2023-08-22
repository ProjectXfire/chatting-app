import { NextResponse, type NextRequest } from 'next/server';
import prismaDb from '@/shared/libs/prismadb';
import { getCurrentSession } from '@/app/(auth)/services/session';
import { type IResponse } from '@/shared/interfaces';
import { type IConversation } from '@/app/(chat)/interfaces';
import { type ICreateConversationDto } from '@/app/(chat)/dtos';

export async function GET(req: NextRequest): Promise<NextResponse<IResponse<IConversation[]>>> {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');
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

export async function POST(
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse<IResponse<IConversation | null>>> {
  try {
    const currentSession = await getCurrentSession();
    if (currentSession === null)
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'Unauthorized' },
        { status: 401 }
      );
    const body = await req.json();
    const { userId, isGroup, members, name } = body as ICreateConversationDto;
    if (isGroup === undefined)
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'Must specify if is a group or not' },
        { status: 400 }
      );

    if (isGroup) {
      if (members === undefined || members.length < 2 || name === undefined || name.length < 1)
        return NextResponse.json(
          { data: null, successfulMessage: null, errorMessage: 'Invalid data' },
          { status: 400 }
        );
      const newGroupConversation = await prismaDb.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [...members.map((m) => ({ id: m.value })), { id: currentSession.id }]
          }
        },
        include: { users: true }
      });
      return NextResponse.json(
        {
          data: newGroupConversation,
          successfulMessage: 'Conversation created successfully',
          errorMessage: null
        },
        { status: 201 }
      );
    }

    if (userId === undefined)
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'Invalid data' },
        { status: 400 }
      );
    const existingConversations = await prismaDb.conversation.findMany({
      where: {
        OR: [
          { userIds: { equals: [currentSession.id, userId] } },
          { userIds: { equals: [userId, currentSession.id] } }
        ]
      }
    });
    if (existingConversations.length === 1)
      return NextResponse.json(
        {
          data: existingConversations[0],
          successfulMessage: 'Conversation loaded successfully',
          errorMessage: null
        },
        { status: 200 }
      );

    const newSingleConversation = await prismaDb.conversation.create({
      data: { users: { connect: [{ id: currentSession.id }, { id: userId }] }, isGroup },
      include: { users: true }
    });
    return NextResponse.json(
      {
        data: newSingleConversation,
        successfulMessage: 'Conversation created successfully',
        errorMessage: null
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        successfulMessage: null,
        errorMessage: 'Error on create or load the conversation'
      },
      { status: 500 }
    );
  }
}
