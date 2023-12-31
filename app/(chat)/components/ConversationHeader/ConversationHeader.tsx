'use client';

import { useMemo } from 'react';
import styles from './ConversationHeader.module.css';
import { type IConversation } from '../../interfaces';
import { useOtherUser } from '../../hooks';
import { useRightSidebar, useSidebar } from '@/shared/states';
import { MoreHoriz, KeyboardArrowLeft } from '@mui/icons-material';
import { Drawer, IconButton } from '@mui/material';
import { Avatar, AvatarCard } from '@/shared/components';
import { ChatSettings } from '..';

interface Props {
  conversation: IConversation;
  sessionId: string;
}

function ConversationHeader({ conversation, sessionId }: Props): JSX.Element {
  const { otherUser } = useOtherUser(conversation, sessionId);
  const { open } = useSidebar();
  const { isOpen, open: openChatMenu, close } = useRightSidebar();

  const statusText = useMemo(() => {
    if (conversation.users === undefined) return 'No members';
    if (conversation.isGroup) return `${conversation.users.length} members`;
    return 'Active';
  }, []);

  const onOpenRightMenu = (): void => {
    openChatMenu();
  };

  return (
    <header className={styles['conversation-header-container']}>
      <nav className={styles['conversation-header']}>
        <div className={styles['conversation-header__user']}>
          <IconButton type='button' size='large' color='primary' onClick={open}>
            <KeyboardArrowLeft />
          </IconButton>
          <AvatarCard title={conversation.name ?? otherUser?.name} subtitle={statusText}>
            {conversation.isGroup ? (
              <Avatar multipleImage={conversation.users} />
            ) : (
              <Avatar imagePath={otherUser?.image} />
            )}
          </AvatarCard>
        </div>
        <IconButton type='button' size='large' color='primary' onClick={onOpenRightMenu}>
          <MoreHoriz />
        </IconButton>
      </nav>
      <Drawer open={isOpen} anchor='right' onClose={close}>
        <ChatSettings conversation={conversation} sessionId={sessionId} />
      </Drawer>
    </header>
  );
}
export default ConversationHeader;
