import axios from 'axios';
import { type IResponse } from '@/shared/interfaces';
import { type IUploadImage } from '../interfaces';

interface IImages {
  secure_url: string;
  public_id: string;
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

export async function removeImage(images: IImages[]): Promise<IResponse<null>> {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_URL ?? ''}/cloudinary/delete`,
      images
    );
    return {
      data: null,
      successfulMessage: 'Image successfully deleted',
      errorMessage: null
    };
  } catch (error) {
    return {
      data: null,
      successfulMessage: null,
      errorMessage: 'Error on delete image'
    };
  }
}
