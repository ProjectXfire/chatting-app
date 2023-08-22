'use client';

import { useRoutes } from '../../hooks';
import { type IUser } from '../../interfaces';
import { SIDEBAR_WIDTH } from '@/shared/helpers';
import { Box, Drawer, List } from '@mui/material';
import { useSidebar } from '@/shared/states';
import { Avatar } from '@/shared/components';
import { DesktopMenu, ListHeader, MenuContainer, MobileMenu, UserItem } from '..';

interface Props {
  user: IUser;
  users: IUser[];
}

function UserSection({ user, users }: Props): JSX.Element {
  const { routes } = useRoutes();
  const { isOpen, close } = useSidebar();

  return (
    <>
      <Drawer open={isOpen} onClose={close}>
        <Box sx={{ width: SIDEBAR_WIDTH, position: 'relative' }}>
          <Box sx={{ width: SIDEBAR_WIDTH, position: 'absolute' }}>
            <List sx={{ maxHeight: 'calc(100vh - 60px)', overflowY: 'auto' }} disablePadding>
              {users.map((u) => (
                <UserItem key={u.id} user={u} />
              ))}
            </List>
            <MobileMenu routes={routes} />
          </Box>
        </Box>
      </Drawer>
      <MenuContainer
        MenuOptions={<DesktopMenu routes={routes} />}
        Avatar={<Avatar imagePath={user.image} />}
      >
        <ListHeader title='People' />
        <List sx={{ maxHeight: 'calc(100vh - 60px)', overflowY: 'auto' }} disablePadding>
          {users.map((u) => (
            <UserItem key={u.id} user={u} />
          ))}
        </List>
      </MenuContainer>
    </>
  );
}
export default UserSection;
