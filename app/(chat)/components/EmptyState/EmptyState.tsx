'use client';

import { Fab, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import styles from './EmptyState.module.css';
import { useSidebar } from '@/shared/states';

function EmptyState(): JSX.Element {
  const { open } = useSidebar();

  return (
    <div className={styles['empty-state']}>
      <Typography textAlign='center' variant='h5'>
        Select a chat or start a new conversation
      </Typography>
      <Fab sx={{ position: 'absolute', bottom: 10, right: 10 }} color='secondary' onClick={open}>
        <Menu />
      </Fab>
    </div>
  );
}
export default EmptyState;
