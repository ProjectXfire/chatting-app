import { useMemo } from 'react';
import { type IUser, type IConversation } from '../interfaces';

export function useOtherUser(
  conversation: IConversation,
  sessionId: string
): { otherUser: IUser | null } {
  const otherUser = useMemo(() => {
    const user = conversation.users?.filter((user) => user.id !== sessionId)[0];
    if (user === undefined) {
      return null;
    }
    return user;
  }, [conversation]);

  return {
    otherUser
  };
}
