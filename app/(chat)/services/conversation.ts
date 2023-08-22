import axios from 'axios';
import { type IResponse } from '@/shared/interfaces';
import { type IConversation } from '../interfaces';
import { handleErrorMessage } from '@/shared/helpers';

export async function getConversations(sessionId: string): Promise<IResponse<IConversation[]>> {
  try {
    const res = await axios.get<IResponse<IConversation[]>>(
      `${process.env.WEBSITE_URL ?? ''}/api/conversations?sessionId=${sessionId}`
    );
    const { data } = res.data;
    return {
      data,
      successfulMessage: 'Conversations loaded successfully',
      errorMessage: null
    };
  } catch (error) {
    const errorMessage = handleErrorMessage(error);
    return {
      data: [],
      successfulMessage: null,
      errorMessage
    };
  }
}

export async function startOrCreateConversation(
  userId: string,
  isGroup: boolean
): Promise<IResponse<IConversation | null>> {
  try {
    const res = await axios.post<IResponse<IConversation | null>>('/api/conversations', {
      userId,
      isGroup
    });
    const { data, errorMessage } = res.data;
    if (errorMessage !== null) throw new Error(errorMessage);
    return {
      data,
      successfulMessage: 'Conversation created',
      errorMessage: null
    };
  } catch (error) {
    const errorMessage = handleErrorMessage(error);
    return {
      data: null,
      successfulMessage: null,
      errorMessage
    };
  }
}

export async function getConversation(
  conversationId: string
): Promise<IResponse<IConversation | null>> {
  try {
    const res = await axios.get<IResponse<IConversation | null>>(
      `${process.env.WEBSITE_URL ?? ''}/api/conversations/${conversationId}`
    );
    const { data } = res.data;
    return {
      data,
      successfulMessage: 'Conversation loaded successfully',
      errorMessage: null
    };
  } catch (error) {
    const errorMessage = handleErrorMessage(error);
    return {
      data: null,
      successfulMessage: null,
      errorMessage
    };
  }
}
