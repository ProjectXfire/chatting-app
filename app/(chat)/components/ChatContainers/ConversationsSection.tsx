'use client';

import { useRoutes } from '../../hooks';
import { type IConversation, type IUser } from '../../interfaces';
import { useSidebar } from '@/shared/states';
import { useModal } from '@/shared/states/modal';
import { GroupAdd } from '@mui/icons-material';
import { Box, Drawer, IconButton, List } from '@mui/material';
import {
  ConversationItem,
  CreateConversation,
  DesktopMenu,
  ListHeader,
  MenuContainer,
  MobileMenu,
  ProfileSettings
} from '..';
import { Avatar } from '@/shared/components';

interface Props {
  user: IUser;
  conversations: IConversation[];
}

function ConversationsSection({ user, conversations }: Props): JSX.Element {
  const { routes } = useRoutes();
  const { open, setComponent } = useModal();
  const { isOpen, close } = useSidebar();

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
          <ListHeader
            title='Messages'
            Icon={<GroupAdd />}
            iconAction={() => {
              open();
            }}
          />
          <List sx={{ maxHeight: 'calc(100vh - 105px)', overflowY: 'auto' }} disablePadding>
            {conversations.map((i) => (
              <ConversationItem key={i.id} conversation={i} sessionId={user.id} />
            ))}
          </List>
          <MobileMenu routes={routes} session={user} />
        </Box>
      </Drawer>
      <MenuContainer
        MenuOptions={<DesktopMenu routes={routes} />}
        Avatar={
          <IconButton
            type='button'
            onClick={() => {
              setComponent(<ProfileSettings session={user} />);
              open();
            }}
          >
            <Avatar imagePath={user.image} />
          </IconButton>
        }
      >
        <ListHeader
          title='Messages'
          Icon={<GroupAdd />}
          iconAction={() => {
            setComponent(<CreateConversation user={user} />);
            open();
          }}
        />
        <List sx={{ maxHeight: 'calc(100vh - 60px)', overflowY: 'auto' }} disablePadding>
          {conversations.map((i) => (
            <ConversationItem key={i.id} conversation={i} sessionId={user.id} />
          ))}
        </List>
      </MenuContainer>
    </>
  );
}
export default ConversationsSection;
