'use client';

import styles from './ChatSettings.module.css';
import { type IConversation } from '../../interfaces';
import { useModal, useRightSidebar } from '@/shared/states';
import { Box, Button, Fab, Typography } from '@mui/material';
import { Delete, Close, CheckCircle, GroupAdd } from '@mui/icons-material';
import { Avatar } from '@/shared/components';
import { AddMembers, DeleteConversation } from '..';

interface Props {
  conversation: IConversation;
  sessionId: string;
}

function ChatSettings({ conversation, sessionId }: Props): JSX.Element {
  const { close } = useRightSidebar();
  const { open, setComponent } = useModal();

  const onOpenDeleteModal = (): void => {
    open();
    setComponent(
      <DeleteConversation conversationId={conversation.id} sessionId={sessionId} onSubmit={close} />
    );
  };

  const onOpenAddMembersModal = (): void => {
    open();
    setComponent(<AddMembers sessionId={sessionId} conversationId={conversation.id} />);
  };

  return (
    <div className={styles['chat-settings-container']}>
      <div className={styles['chat-settings-close']}>
        <Fab size='small' color='secondary' onClick={close}>
          <Close />
        </Fab>
      </div>
      <header className={styles['chat-settings-header']}>
        <Typography variant='h4' textAlign='center'>
          {conversation.name ?? 'My Chat'}
        </Typography>
        <Typography variant='h5' textAlign='center'>
          {conversation.users?.length} members
        </Typography>
      </header>
      <div className={styles['chat-settings-members']}>
        {conversation.users?.map((user) => (
          <div className={styles['chat-settings-member']} key={user.id}>
            <Avatar imagePath={user.image} noActiveIcon />
            <Typography variant='body1'>{user.name}</Typography>
            <Box sx={{ flex: 1 }} />
            <CheckCircle color='success' />
          </div>
        ))}
      </div>
      <Box sx={{ flex: 1 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {conversation.isGroup && (
          <Button
            type='button'
            variant='contained'
            color='secondary'
            startIcon={<GroupAdd />}
            onClick={onOpenAddMembersModal}
          >
            Add members
          </Button>
        )}
        <Button
          type='button'
          variant='contained'
          color='error'
          startIcon={<Delete />}
          onClick={onOpenDeleteModal}
        >
          Delete
        </Button>
      </Box>
    </div>
  );
}
export default ChatSettings;
