import { type IConversation } from './IConversation';
import { type IMessage } from './IMessage';

export interface IUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  imageCode?: string | null;
  conversations?: IConversation[];
  seenMessages?: IMessage[];
  messages?: IMessage[];
}
