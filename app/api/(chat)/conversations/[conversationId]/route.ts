import { type NextRequest, NextResponse } from 'next/server';
import prismaDb from '@/shared/libs/prismadb';
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
        successfulMessage: 'Conversation loaded successfully',
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
