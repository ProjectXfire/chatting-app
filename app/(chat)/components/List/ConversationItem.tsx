'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import styles from './List.module.css';
import { type IMessage, type IConversation } from '../../interfaces';
import { useOnline, useSidebar } from '@/shared/states';
import { useOtherUser } from '../../hooks';
import { maxString } from '@/shared/helpers';
import { ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Avatar } from '@/shared/components';

interface Props {
  sessionId: string;
  conversation: IConversation;
}

function ConversationItem({ conversation, sessionId }: Props): JSX.Element {
  const router = useRouter();
  const { close } = useSidebar();
  const { otherUser } = useOtherUser(conversation, sessionId);
  const onlineUsers = useOnline((state) => state.members);

  const lastMessage = useMemo<IMessage | undefined>(() => {
    const messages = conversation.messages ?? [];
    return messages[messages.length - 1];
  }, [conversation.messages]);

  const hasSeen = useMemo(() => {
    if (lastMessage === undefined) return false;
    const seenArray = lastMessage.seen ?? [];
    return seenArray.filter((user) => user.id === sessionId).length !== 0;
  }, [lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage === undefined) return 'Started a conversation';
    if (lastMessage.image !== null && lastMessage.image !== undefined) return 'Sent an image';
    return lastMessage.body;
  }, [lastMessage]);

  const isOnline = useMemo(() => {
    if (otherUser === null) return false;
    const firstCheck = onlineUsers[otherUser.id];
    if (firstCheck === undefined) {
      return Boolean(otherUser.online);
    }
    return Boolean(firstCheck);
  }, [onlineUsers]);

  const openConversation = async (id: string): Promise<void> => {
    router.push(`/conversations?id=${id}`);
    close();
  };

  return (
    <ListItem
      disablePadding
      secondaryAction={
        lastMessage?.createdAt !== undefined ? (
          <Typography color='info.main' variant='body2'>
            {format(new Date(lastMessage?.createdAt), 'p')}
          </Typography>
        ) : (
          <></>
        )
      }
    >
      <ListItemButton
        key={conversation.id}
        onClick={() => {
          void openConversation(conversation.id);
        }}
      >
        <ListItemAvatar>
          {conversation.isGroup ? (
            <Avatar multipleImage={conversation.users} />
          ) : (
            <Avatar imagePath={otherUser?.image} isActive={isOnline} />
          )}
        </ListItemAvatar>
        <ListItemText
          primary={conversation.name ?? otherUser?.name}
          secondary={
            <span className={hasSeen ? '' : styles['no-seen']}>
              {maxString(lastMessageText ?? '', 19)}
            </span>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
export default ConversationItem;
