import styles from './List.module.css';
import { IconButton, Typography } from '@mui/material';

interface Props {
  title: string;
  Icon?: React.ReactNode;
  iconAction?: () => void;
}

function ListHeader({ title, Icon, iconAction }: Props): JSX.Element {
  return (
    <div className={styles['list-header']}>
      <Typography variant='h5'>{title}</Typography>
      {Icon !== undefined && (
        <IconButton
          type='button'
          onClick={() => {
            if (iconAction !== undefined) iconAction();
          }}
        >
          {Icon}
        </IconButton>
      )}
    </div>
  );
}
export default ListHeader;
