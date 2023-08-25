'use client';

import { type IUser } from '../../interfaces';
import { ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { Avatar } from '@/shared/components';

interface Props {
  user: IUser;
  onSubmit: (userId: string) => void;
}

function UserItem({ user, onSubmit }: Props): JSX.Element {
  return (
    <ListItemButton
      key={user.id}
      onClick={() => {
        onSubmit(user.id);
      }}
    >
      <ListItemAvatar>
        <Avatar imagePath={user.image} />
      </ListItemAvatar>
      <ListItemText primary={user.name} />
    </ListItemButton>
  );
}
export default UserItem;
