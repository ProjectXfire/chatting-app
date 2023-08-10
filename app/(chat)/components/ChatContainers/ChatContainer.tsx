import styles from './ChatContainers.module.css';

interface Props {
  children: React.ReactNode;
}

function ChatContainer({ children }: Props): JSX.Element {
  return <section className={styles['chat-container']}>{children}</section>;
}
export default ChatContainer;
