'use client';

import styles from './Avatar.module.css';
import Avatar from './Avatar';

interface Props {
  title?: string | null;
  subtitle?: string;
  imagePath: string | null | undefined;
  isActive?: boolean;
}

function AvatarCard({ imagePath, isActive, title, subtitle }: Props): JSX.Element {
  return (
    <div className={styles['avatar-card']}>
      <Avatar imagePath={imagePath} isActive={isActive} />
      <div>
        <p>{title}</p>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
export default AvatarCard;
