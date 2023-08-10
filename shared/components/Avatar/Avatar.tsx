import styles from './Avatar.module.css';
import { Avatar as MuiAvatar } from '@mui/material';

interface Props {
  imagePath: string | null | undefined;
}

function Avatar({ imagePath }: Props): JSX.Element {
  return (
    <div className={styles.avatar}>
      {imagePath === null || imagePath === undefined ? (
        <MuiAvatar src='/images/placeholder.jpg' alt='avatar' />
      ) : (
        <MuiAvatar src={imagePath} alt='avatar' />
      )}
      <span className={styles.active} />
    </div>
  );
}
export default Avatar;
