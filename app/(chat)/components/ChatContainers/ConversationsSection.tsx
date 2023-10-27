'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ChatContainers.module.css';
import { pusherClient } from '@/shared/libs/pusher';
import { type IMessage, type IConversation, type IUser } from '../../interfaces';
import { useRoutes } from '../../hooks';
import { useSidebar } from '@/shared/states';
import { useModal } from '@/shared/states/modal';
import { GroupAdd } from '@mui/icons-material';
import { Box, Drawer, List } from '@mui/material';
import { ConversationItem, CreateConversation, ListHeader, MobileMenu } from '..';

interface Props {
  user: IUser;
  conversations: IConversation[];
}

function ConversationsSection({ user, conversations }: Props): JSX.Element {
  const router = useRouter();
  const { routes } = useRoutes();
  const [items, setItems] = useState<IConversation[]>(conversations);
  const { open, setComponent } = useModal();
  const { isOpen, close } = useSidebar();

  const newPusherConversation = (pusherConversation: IConversation): void => {
    const isInList = items.find((i) => i.id === pusherConversation.id);
    if (isInList === undefined) setItems((cv) => [...cv, pusherConversation]);
  };

  const pusherLastMessage = ({
    conversationId,
    messages
  }: {
    conversationId: string;
    messages: IMessage[];
  }): void => {
    setItems((cv) =>
      cv.map((conversation) => {
        if (conversation.id === conversationId) return { ...conversation, messages };
        return conversation;
      })
    );
  };

  const deletePusherConversation = (conversationId: string): void => {
    setItems((cv) => cv.filter((i) => i.id !== conversationId));
    router.replace('/conversations');
  };

  useEffect(() => {
    pusherClient.subscribe(user.id);
    pusherClient.bind('conversation:new', newPusherConversation);
    pusherClient.bind('conversation:lastseen', pusherLastMessage);
    pusherClient.bind('conversation:delete', deletePusherConversation);
    return () => {
      pusherClient.unsubscribe(user.id);
      pusherClient.unbind('conversation:new', newPusherConversation);
      pusherClient.unbind('conversation:lastseen', pusherLastMessage);
      pusherClient.unbind('conversation:delete', deletePusherConversation);
    };
  }, []);

  return (
    <>
      <Drawer open={isOpen} onClose={close}>
        <Box
          sx={{
            width: { xs: '100%', sm: 300 },
            height: '100vh',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <ListHeader
            title='Messages'
            Icon={<GroupAdd />}
            iconAction={() => {
              setComponent(<CreateConversation user={user} />);
              open();
            }}
          />
          <List sx={{ maxHeight: 'calc(100vh - 105px)', overflowY: 'auto' }} disablePadding>
            {items.map((i) => (
              <ConversationItem key={i.id} conversation={i} sessionId={user.id} />
            ))}
          </List>
          <MobileMenu routes={routes} session={user} />
        </Box>
      </Drawer>
      <section className={styles['chat-list']}>
        <ListHeader
          title='Messages'
          Icon={<GroupAdd />}
          iconAction={() => {
            setComponent(<CreateConversation user={user} />);
            open();
          }}
        />
        <List sx={{ maxHeight: 'calc(100vh - 60px)', overflowY: 'auto' }} disablePadding>
          {items.map((i) => (
            <ConversationItem key={i.id} conversation={i} sessionId={user.id} />
          ))}
        </List>
      </section>
    </>
  );
}
export default ConversationsSection;
