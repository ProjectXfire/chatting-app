import { useRouter } from 'next/navigation';
import { type IUser } from '../../interfaces';
import { startOrCreateConversation } from '../../services';
import { ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { Avatar } from '@/shared/components';

interface Props {
  user: IUser;
}

function UserItem({ user }: Props): JSX.Element {
  const router = useRouter();

  const startSingleConversation = async (id: string): Promise<void> => {
    const { data } = await startOrCreateConversation(id, false);
    if (data !== null) router.push(`/conversations/${data.id}`);
  };

  return (
    <ListItemButton
      key={user.id}
      onClick={() => {
        void startSingleConversation(user.id);
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