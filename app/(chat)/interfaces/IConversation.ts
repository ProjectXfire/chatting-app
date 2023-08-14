import { type IUser } from '.';
import { type IMessage } from './IMessage';

export interface IConversation {
  id: string;
  name?: string | null;
  createdAt: string | Date;
  lastMessageAt: string | Date;
  isGroup: boolean;
  messages?: IMessage[];
  users?: IUser[];
  messagesIds: string[];
  userIds: string[];
}
