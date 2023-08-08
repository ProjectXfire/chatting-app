import styles from './Center.module.css';

interface Props {
  children: React.ReactNode;
}

function Center({ children }: Props): JSX.Element {
  return (
    <div className={styles.center}>
      <div className={styles['center-item']} />
      <div className={styles['center-content']}>{children}</div>
      <div className={styles['center-item']} />
    </div>
  );
}
export default Center;
