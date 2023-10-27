'use client';

import { useRouter } from 'next/navigation';
import styles from './ChatContainers.module.css';
import { type IUser } from '../../interfaces';
import { useRoutes } from '../../hooks';
import { startOrCreateConversation } from '../../services';
import { Box, Drawer, List } from '@mui/material';
import { useSidebar } from '@/shared/states';
import { ListHeader, MobileMenu, UserItem } from '..';

interface Props {
  session: IUser;
  users: IUser[];
}

function UserSection({ session, users }: Props): JSX.Element {
  const { routes } = useRoutes();
  const router = useRouter();
  const { isOpen, close } = useSidebar();

  const startSingleConversation = async (userId: string): Promise<void> => {
    const { data } = await startOrCreateConversation({
      userId,
      sessionId: session.id,
      isGroup: false
    });
    if (data !== null) {
      router.push(`/conversations?id=${data.id}`);
    }
    close();
  };

  return (
    <>
      <Drawer open={isOpen} onClose={close}>
        <Box
          sx={{
            width: { xs: '100%', sm: 300 },
            height: '100vh',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <List sx={{ maxHeight: 'calc(100vh - 45px)', overflowY: 'auto' }} disablePadding>
            <ListHeader title='People' />
            {users.map((u) => (
              <UserItem
                key={u.id}
                user={u}
                onSubmit={(userId) => {
                  void startSingleConversation(userId);
                }}
              />
            ))}
          </List>
          <MobileMenu routes={routes} session={session} />
        </Box>
      </Drawer>
      <section className={styles['chat-list']}>
        <ListHeader title='People' />
        <List sx={{ maxHeight: 'calc(100vh - 60px)', overflowY: 'auto' }} disablePadding>
          {users.map((u) => (
            <UserItem
              key={u.id}
              user={u}
              onSubmit={(userId) => {
                void startSingleConversation(userId);
              }}
            />
          ))}
        </List>
      </section>
    </>
  );
}
export default UserSection;
