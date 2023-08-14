import axios from 'axios';
import { type IUser } from '../interfaces';
import { type IResponse } from '@/shared/interfaces';

export async function getUsers(session: IUser): Promise<IUser[]> {
  try {
    const res = await axios.post<IResponse<IUser[]>>(`${process.env.WEBSITE_URL ?? ''}/api/users`, {
      email: session.email
    });
    const { data } = res.data;
    return data;
  } catch (error) {
    return [];
  }
}
