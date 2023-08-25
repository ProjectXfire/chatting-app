import styles from './Menu.module.css';
import { type IUser, type IRoute } from '../../interfaces';
import { useModal } from '@/shared/states';
import { MenuItem, ProfileSettings } from '..';
import { Avatar } from '@/shared/components';

interface Props {
  routes: IRoute[];
  session: IUser;
}

function MobileMenu({ routes, session }: Props): JSX.Element {
  const { open, setComponent } = useModal();

  const onOpenProfileModal = (): void => {
    open();
    setComponent(<ProfileSettings session={session} />);
  };

  return (
    <ul className={styles['mobile-menu']}>
      {routes.map((opt) => (
        <MenuItem key={opt.label} options={opt} noBorder />
      ))}
      <li className={styles['menu-item']} onClick={onOpenProfileModal}>
        <Avatar imagePath={session.image} noActiveIcon />
      </li>
    </ul>
  );
}
export default MobileMenu;
