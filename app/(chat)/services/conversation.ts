import axios from 'axios';
import { type IResponse } from '@/shared/interfaces';
import { type IConversation } from '../interfaces';
import { type ICreateConversationDto } from '../dtos';
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
  payload: ICreateConversationDto
): Promise<IResponse<IConversation | null>> {
  const { isGroup, members, name, sessionId, userId } = payload;
  try {
    const res = await axios.post<IResponse<IConversation | null>>('/api/conversations', {
      userId,
      isGroup,
      sessionId,
      name,
      members
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

export async function AddMembersToConversation(
  conversationId: string,
  membersIds: string[]
): Promise<IResponse<null>> {
  try {
    await axios.patch(`/api/conversations/${conversationId}`, { membersIds });
    return {
      data: null,
      successfulMessage: 'New members successfully added',
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

export async function deleteConversation(
  conversationId: string,
  sessionId: string
): Promise<IResponse<null>> {
  try {
    const res = await axios.delete<IResponse<null>>(
      `/api/conversations/${conversationId}?userId=${sessionId}`
    );
    return {
      data: null,
      successfulMessage: res.data.successfulMessage,
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
