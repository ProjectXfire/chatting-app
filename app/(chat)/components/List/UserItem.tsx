'use client';

import { type IUser } from '../../interfaces';
import { ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { Avatar } from '@/shared/components';
import { useOnline } from '@/shared/states';
import { useMemo } from 'react';

interface Props {
  user: IUser;
  onSubmit: (userId: string) => void;
}

function UserItem({ user, onSubmit }: Props): JSX.Element {
  const onlineUsers = useOnline((state) => state.members);
  const isOnline = useMemo(() => {
    const firstCheck = onlineUsers[user.id];
    if (firstCheck === undefined) {
      return Boolean(user.online);
    }
    return Boolean(firstCheck);
  }, [onlineUsers]);

  return (
    <ListItemButton
      key={user.id}
      onClick={() => {
        onSubmit(user.id);
      }}
    >
      <ListItemAvatar>
        <Avatar imagePath={user.image} isActive={isOnline} />
      </ListItemAvatar>
      <ListItemText primary={user.name} />
    </ListItemButton>
  );
}
export default UserItem;
