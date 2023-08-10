import styles from './Menu.module.css';
import { type IRoute } from '../../interfaces';
import { MenuItem } from '..';

interface Props {
  routes: IRoute[];
}

function DesktopMenu({ routes }: Props): JSX.Element {
  return (
    <ul className={styles['desktop-menu']}>
      {routes.map((opt) => (
        <MenuItem key={opt.label} options={opt} />
      ))}
    </ul>
  );
}
export default DesktopMenu;
