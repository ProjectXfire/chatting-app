'use client';

import { useRouter } from 'next/navigation';
import { type IUser } from '../../interfaces';
import { useRoutes } from '../../hooks';
import { startOrCreateConversation } from '../../services';
import { Box, Drawer, List } from '@mui/material';
import { useSidebar } from '@/shared/states';
import { Avatar } from '@/shared/components';
import { DesktopMenu, ListHeader, MenuContainer, MobileMenu, UserItem } from '..';

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
    if (data !== null) router.push(`/conversations/${userId}`);
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
      <MenuContainer
        MenuOptions={<DesktopMenu routes={routes} />}
        Avatar={<Avatar imagePath={session.image} />}
      >
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
      </MenuContainer>
    </>
  );
}
export default UserSection;
