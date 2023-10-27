'use client';

import styles from './ChatContainers.module.css';
import { type IUser } from '../../interfaces';
import { useModal } from '@/shared/states';
import { useRoutes } from '../../hooks';
import { IconButton } from '@mui/material';
import { Avatar } from '@/shared/components';
import { DesktopMenu, ProfileSettings } from '..';

interface Props {
  children: React.ReactNode;
  session: IUser;
}

function ChatContainer({ children, session }: Props): JSX.Element {
  const { routes } = useRoutes();
  const { open, setComponent } = useModal();

  return (
    <section className={styles['chat-container']}>
      <div className={styles['chat-static-sidebar']}>
        <DesktopMenu routes={routes} />
        <div style={{ flex: 1 }} />
        <IconButton
          type='button'
          onClick={() => {
            setComponent(<ProfileSettings session={session} />);
            open();
          }}
        >
          <Avatar imagePath={session?.image} noActiveIcon />
        </IconButton>
      </div>
      {children}
    </section>
  );
}
export default ChatContainer;
