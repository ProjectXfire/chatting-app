'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import styles from './List.module.css';
import { type IMessage, type IConversation } from '../../interfaces';
import { maxString } from '@/shared/helpers';
import { ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Avatar } from '@/shared/components';

interface Props {
  sessionId?: string;
  conversation: IConversation;
}

function ConversationItem({ conversation, sessionId }: Props): JSX.Element {
  const router = useRouter();

  const otherUser = useMemo(() => {
    const user = conversation.users?.filter((user) => user.id !== sessionId)[0];
    if (user === undefined) {
      return null;
    }
    return user;
  }, []);

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
    if (lastMessage.image === null || lastMessage.image === undefined) return 'Sent an image';
    return lastMessage.body;
  }, []);

  const openConversation = async (id: string): Promise<void> => {
    router.push(`/conversations/${id}`);
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
          <Avatar imagePath={otherUser?.image} />
        </ListItemAvatar>
        <ListItemText
          primary={conversation.name ?? otherUser?.name}
          secondary={
            <span className={hasSeen ? styles['no-seen'] : ''}>
              {maxString(lastMessageText ?? '', 22)}
            </span>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
export default ConversationItem;
