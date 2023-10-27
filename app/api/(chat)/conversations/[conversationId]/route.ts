import { type NextRequest, NextResponse } from 'next/server';
import prismaDb from '@/shared/libs/prismadb';
import { pusherServer } from '@/shared/libs/pusher';
import { type IResponse } from '@/shared/interfaces';
import { type IConversation } from '@/app/(chat)/interfaces';

export async function GET(
  req: NextRequest,
  { params }: { params: { conversationId: string } }
): Promise<NextResponse<IResponse<IConversation | null>>> {
  try {
    const id = params.conversationId;
    if (id === undefined)
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'Invalid id conversation' },
        { status: 400 }
      );
    const conversation = await prismaDb.conversation.findUnique({
      where: { id },
      include: { users: true, messages: true }
    });
    return NextResponse.json(
      {
        data: conversation,
        successfulMessage: 'Conversation successfully loaded',
        errorMessage: null
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: null, successfulMessage: null, errorMessage: 'Error on get conversation' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { conversationId: string } }
): Promise<NextResponse<IResponse<null>>> {
  try {
    const id = params.conversationId;
    if (id === undefined)
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'Invalid id conversation' },
        { status: 400 }
      );
    const { membersIds, name } = (await req.json()) as { membersIds?: string[]; name?: string };
    const conversation = await prismaDb.conversation.findUnique({ where: { id } });

    if (conversation === null)
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'No conversation found' },
        { status: 400 }
      );
    if (name !== undefined) {
      await prismaDb.conversation.update({
        where: { id },
        data: { name }
      });
    }
    if (membersIds !== undefined) {
      const onlyNewMembers = membersIds.filter(
        (newIdMember) => !conversation.userIds.some((userId) => userId === newIdMember)
      );
      await prismaDb.conversation.update({
        where: { id },
        data: { userIds: { push: onlyNewMembers } }
      });
    }
    return NextResponse.json(
      {
        data: null,
        successfulMessage: 'Conversation successfully updated',
        errorMessage: null
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: null, successfulMessage: null, errorMessage: 'Error on update conversation' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { conversationId: string } }
): Promise<NextResponse<IResponse<null>>> {
  try {
    const { conversationId } = params;
    if (conversationId === undefined)
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'Invalid id conversation' },
        { status: 400 }
      );
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (userId === null)
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'No authorized' },
        { status: 401 }
      );
    const existingConversation = await prismaDb.conversation.findUnique({
      where: { id: conversationId },
      include: { users: true }
    });
    if (existingConversation === null)
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'No conversation found' },
        { status: 400 }
      );
    await prismaDb.conversation.deleteMany({
      where: { id: conversationId, userIds: { hasSome: [userId] } }
    });

    // eslint-disable-next-line @typescript-eslint/promise-function-async
    const promises = existingConversation.users.map((user) => {
      return updateConversationIds(user.id, conversationId, user.conversationIds);
    });
    await Promise.all(promises);

    existingConversation.users.forEach((user) => {
      void pusherServer.trigger(user.id, 'conversation:delete', conversationId);
    });
    return NextResponse.json(
      {
        data: null,
        successfulMessage: 'Conversation successfully deleted',
        errorMessage: null
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: null, successfulMessage: null, errorMessage: 'Error on delete conversation' },
      { status: 500 }
    );
  }
}

async function updateConversationIds(
  userId: string,
  conversationId: string,
  conversationIds: string[]
): Promise<void> {
  await prismaDb.user.update({
    where: { id: userId },
    data: {
      conversationIds: { set: conversationIds.filter((cId) => cId !== conversationId) }
    }
  });
}
