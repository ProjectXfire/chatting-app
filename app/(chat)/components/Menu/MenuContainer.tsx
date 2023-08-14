import styles from './Menu.module.css';

interface Props {
  MenuOptions: React.ReactNode;
  Avatar: React.ReactNode;
  children: React.ReactNode;
}

function MenuContainer({ Avatar, MenuOptions, children }: Props): JSX.Element {
  return (
    <>
      <div className={styles.menu}>
        {MenuOptions}
        {Avatar}
      </div>
      <div className={styles.list}>{children}</div>
    </>
  );
}
export default MenuContainer;
