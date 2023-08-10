import { Typography } from '@mui/material';
import styles from './EmptyState.module.css';

function EmptyState(): JSX.Element {
  return (
    <div className={styles['empty-state']}>
      <Typography textAlign='center' variant='h5'>
        Select a chat or start a new conversation
      </Typography>
    </div>
  );
}
export default EmptyState;
