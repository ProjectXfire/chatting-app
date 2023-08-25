'use client';

import styles from './Avatar.module.css';

interface Props {
  title?: string | null;
  subtitle?: string;
  children: React.ReactNode;
}

function AvatarCard({ title, subtitle, children }: Props): JSX.Element {
  return (
    <div className={styles['avatar-card']}>
      {children}
      <div>
        <p>{title}</p>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
export default AvatarCard;
