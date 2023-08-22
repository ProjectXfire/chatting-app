import axios from 'axios';
import { type IResponse } from '@/shared/interfaces';
import { type IUploadImage, type IMessage } from '../interfaces';
import { handleErrorMessage } from '@/shared/helpers';

export async function getMessages(conversationId: string): Promise<IResponse<IMessage[]>> {
  try {
    const res = await axios.get<IResponse<IMessage[]>>(
      `${process.env.WEBSITE_URL ?? ''}/api/messages?conversationId=${conversationId}`
    );
    const { data } = res.data;
    return {
      data,
      successfulMessage: 'Messages loaded successfully',
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

export async function createMessage(
  conversationId: string,
  userId: string,
  payload: { image?: string; message?: string }
): Promise<IResponse<any>> {
  try {
    const res = await axios.post<IResponse<null>>('/api/messages', {
      ...payload,
      conversationId,
      userId
    });
    const { successfulMessage } = res.data;
    return {
      data: null,
      successfulMessage,
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

export async function uploadImage(imageFile: File): Promise<IResponse<IUploadImage | null>> {
  try {
    const formData = new FormData();
    formData.append('files', imageFile);
    const res = await axios.post<IUploadImage[]>(
      `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_URL ?? ''}/cloudinary/upload?folder=chatting`,
      formData
    );
    if (res.data.length === 0)
      return {
        data: null,
        successfulMessage: null,
        errorMessage: 'Error on save image'
      };
    return {
      data: res.data[0],
      errorMessage: null,
      successfulMessage: 'Image uploaded successfully'
    };
  } catch (error) {
    return {
      data: null,
      successfulMessage: null,
      errorMessage: 'Error on save image'
    };
  }
}

export async function updateLastSeenMessage(
  conversationId: string,
  userId: string
): Promise<IResponse<any>> {
  try {
    await axios.patch('/api/messages', { conversationId, userId });
    return {
      data: null,
      successfulMessage: 'Seens messages updated',
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
