import { type NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import prismaDb from '@/shared/libs/prismadb';
import { type IResponse } from '@/shared/interfaces';
import { type IMessage } from '@/app/(chat)/interfaces';

export async function GET(req: NextRequest): Promise<NextResponse<IResponse<IMessage[]>>> {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('conversationId');
    if (id === null)
      return NextResponse.json(
        { data: [], successfulMessage: null, errorMessage: 'Invalid id conversation' },
        { status: 400 }
      );
    const messages = await prismaDb.message.findMany({
      where: { conversationId: id },
      include: { sender: true, seen: true },
      orderBy: { createdAt: 'asc' }
    });
    return NextResponse.json(
      {
        data: messages,
        successfulMessage: 'Messages loaded successfully',
        errorMessage: null
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: [], successfulMessage: null, errorMessage: 'Error on get messages' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<IResponse<null>>> {
  try {
    const { message, image, conversationId, userId } = await req.json();
    const isUserIdValid = ObjectId.isValid(userId);
    if (!isUserIdValid)
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'Invalid user id' },
        { status: 401 }
      );
    const isConversationIdValid = ObjectId.isValid(conversationId);
    if (!isConversationIdValid)
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'Invalid conversation id' },
        { status: 400 }
      );
    const newMessage = await prismaDb.message.create({
      data: {
        body: message,
        image,
        sender: { connect: { id: userId } },
        seen: { connect: { id: userId } },
        conversation: { connect: { id: conversationId } }
      },
      include: { seen: true, sender: true }
    });
    await prismaDb.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
        messages: { connect: { id: newMessage.id } }
      },
      include: { users: true, messages: { include: { seen: true } } }
    });
    return NextResponse.json(
      {
        data: null,
        successfulMessage: 'Message created successfully',
        errorMessage: null
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: null, successfulMessage: null, errorMessage: 'Error on get messages' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest): Promise<NextResponse<IResponse<IMessage | null>>> {
  try {
    const { conversationId, userId } = await req.json();
    if (conversationId === undefined || userId === undefined)
      return NextResponse.json(
        { data: null, successfulMessage: null, errorMessage: 'Missing some params' },
        { status: 400 }
      );
    const messages = await prismaDb.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'desc' }
    });
    if (messages.length === 0)
      return NextResponse.json(
        { data: null, successfulMessage: 'No message found to update', errorMessage: null },
        { status: 200 }
      );
    const messageUpdated = await prismaDb.message.update({
      where: { id: messages[0].id },
      data: { seen: { connect: { id: userId } } },
      include: {
        seen: true,
        sender: true
      }
    });
    return NextResponse.json(
      {
        data: messageUpdated,
        successfulMessage: 'Message updated successfully',
        errorMessage: null
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: null, successfulMessage: null, errorMessage: 'Error on update messages' },
      { status: 500 }
    );
  }
}
