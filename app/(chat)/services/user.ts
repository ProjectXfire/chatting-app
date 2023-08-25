import axios from 'axios';
import { type IUser } from '../interfaces';
import { type IResponse } from '@/shared/interfaces';
import { type IUpdateUserDto } from '../dtos';
import { removeImage, uploadImage } from '.';
import { handleErrorMessage } from '@/shared/helpers';

export async function getUsers(sessionId: string): Promise<IUser[]> {
  try {
    const res = await axios.post<IResponse<IUser[]>>(`${process.env.WEBSITE_URL ?? ''}/api/users`, {
      id: sessionId
    });
    const { data } = res.data;
    return data;
  } catch (error) {
    return [];
  }
}

export async function updateUser(
  sessionId: string,
  payload: IUpdateUserDto
): Promise<IResponse<null>> {
  try {
    const { name, image, imageCode } = payload;
    if (typeof imageCode === 'string') {
      await removeImage([{ public_id: imageCode, secure_url: 'image' }]);
    }
    if (image === undefined || image == null) {
      return {
        data: null,
        successfulMessage: null,
        errorMessage: 'Missing image file'
      };
    }
    const resImage = await uploadImage(image);
    const { data, errorMessage } = resImage;
    if (data === null)
      return {
        data: null,
        successfulMessage: null,
        errorMessage
      };
    const resUser = await axios.patch<IResponse<null>>(`/api/users/${sessionId}`, {
      name,
      image: data.secure_url,
      imageCode: data.public_id
    });
    const { successfulMessage } = resUser.data;
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
