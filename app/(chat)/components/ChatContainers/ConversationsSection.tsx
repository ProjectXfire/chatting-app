'use client';

import { useRoutes } from '../../hooks';
import { type IConversation, type IUser } from '../../interfaces';
import { useModal } from '@/shared/states/modal';
import { SIDEBAR_WIDTH } from '@/shared/helpers';
import { ConversationItem, DesktopMenu, ListHeader, MenuContainer, MobileMenu } from '..';
import { GroupAdd } from '@mui/icons-material';
import { Box, List } from '@mui/material';
import { Avatar, Modal, Sidebar } from '@/shared/components';

interface Props {
  user: IUser;
  conversations: IConversation[];
}

function ConversationsSection({ user, conversations }: Props): JSX.Element {
  const { routes } = useRoutes();
  const { open } = useModal();

  return (
    <>
      <Modal title='Add a new group conversation' onSave={() => {}}>
        Conversation
      </Modal>
      <Sidebar>
        <Box sx={{ width: SIDEBAR_WIDTH, position: 'relative' }}>
          <Box sx={{ width: SIDEBAR_WIDTH, position: 'absolute' }}>
            <List sx={{ maxHeight: 'calc(100vh - 60px)', overflowY: 'auto' }} disablePadding>
              {conversations.map((i) => (
                <ConversationItem key={i.id} conversation={i} sessionId={user.id} />
              ))}
            </List>
            <MobileMenu routes={routes} />
          </Box>
        </Box>
      </Sidebar>
      <MenuContainer
        MenuOptions={<DesktopMenu routes={routes} />}
        Avatar={<Avatar imagePath={user.image} />}
      >
        <ListHeader
          title='Messages'
          Icon={<GroupAdd />}
          iconAction={() => {
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
