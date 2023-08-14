import styles from './ChatContainers.module.css';

interface Props {
  children: React.ReactNode;
}

function ConversationSection({ children }: Props): JSX.Element {
  return <section className={styles['conversation-section']}>{children}</section>;
}
export default ConversationSection;
