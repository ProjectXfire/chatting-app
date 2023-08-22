import { type IUser } from '.';
import { type IConversation } from './IConversation';

export interface IMessage {
  id: string;
  body?: string | null;
  image?: string | null;
  createdAt: string | Date;
  seen?: IUser[];
  seenIds: string[];
  conversation?: IConversation;
  conversationId: string;
  sender?: IUser;
  senderId: string;
}

export interface IUploadImage {
  public_id: string;
  secure_url: string;
}
