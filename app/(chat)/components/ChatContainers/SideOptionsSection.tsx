import styles from './ChatContainers.module.css';

interface Props {
  children: React.ReactNode;
}

function SideOptionsSection({ children }: Props): JSX.Element {
  return <section className={styles['side-options-section']}>{children}</section>;
}
export default SideOptionsSection;
