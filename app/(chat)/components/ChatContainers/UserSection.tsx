'use client';

import styles from './ChatContainers.module.css';
import { useRoutes } from '../../hooks';
import { type IUser } from '../../interfaces';
import { DesktopMenu, MobileMenu, UserConversations } from '..';
import { Avatar, Sidebar } from '@/shared/components';

interface Props {
  user: IUser;
}

function UserSection({ user }: Props): JSX.Element {
  const { routes } = useRoutes();

  return (
    <>
      <Sidebar>
        <div className={styles['user-section__mb-options']}>
          <div style={{ position: 'absolute', width: '300px' }}>
            <UserConversations />
            <MobileMenu routes={routes} />
          </div>
        </div>
      </Sidebar>
      <div className={styles['user-section']}>
        <div className={styles['user-section__options']}>
          <DesktopMenu routes={routes} />
          <Avatar imagePath={user.image} />
        </div>
        <div className={styles['user-section__chats']}>
          <UserConversations />
        </div>
      </div>
    </>
  );
}
export default UserSection;
