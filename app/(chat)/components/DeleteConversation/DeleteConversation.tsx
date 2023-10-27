'use client';

import { useState } from 'react';
import { useModal } from '@/shared/states';
import styles from './DeleteConversation.module.css';
import { deleteConversation } from '../../services';
import { Button, Fab, Typography } from '@mui/material';
import { Close, Error } from '@mui/icons-material';
import toast from 'react-hot-toast';

interface Props {
  conversationId: string;
  sessionId: string;
  onSubmit: () => void;
}

function DeleteConversation({ conversationId, sessionId, onSubmit }: Props): JSX.Element {
  const { close } = useModal();
  const [loading, setLoading] = useState(false);

  const onDelete = async (): Promise<void> => {
    setLoading(true);
    const { successfulMessage, errorMessage } = await deleteConversation(conversationId, sessionId);
    if (successfulMessage !== null) {
      toast.success(successfulMessage);
    } else {
      toast.error(errorMessage);
    }
    onSubmit();
    close();
    setLoading(false);
  };

  return (
    <div className={styles['delete-conversation']}>
      <div className={styles['delete-close']}>
        <Fab
          size='small'
          color='secondary'
          onClick={() => {
            if (!loading) close();
          }}
        >
          <Close />
        </Fab>
      </div>
      <div className={styles['delete-conversation__text']}>
        <Error fontSize='large' color='error' />
        <div>
          <Typography sx={{ color: 'var(--secondary)', fontWeight: 'bold' }} variant='h5'>
            Delete conversation
          </Typography>
          <Typography sx={{ color: 'var(--white)' }}>
            Are you sure you want to delete this conversation? This action cannot be undone.
          </Typography>
        </div>
      </div>
      <div className={styles['delete-conversation__actions']}>
        <Button type='button' variant='outlined' disabled={loading} onClick={close}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          type='button'
          variant='contained'
          onClick={() => {
            void onDelete();
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
export default DeleteConversation;
