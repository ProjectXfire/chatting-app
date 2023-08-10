import styles from './Menu.module.css';
import { type IRoute } from '../../interfaces';
import { MenuItem } from '..';

interface Props {
  routes: IRoute[];
}

function MobileMenu({ routes }: Props): JSX.Element {
  return (
    <ul className={styles['mobile-menu']}>
      {routes.map((opt) => (
        <MenuItem key={opt.label} options={opt} noBorder />
      ))}
    </ul>
  );
}
export default MobileMenu;
