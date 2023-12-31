import styles from './ChatContainers.module.css';

interface Props {
  children: React.ReactNode;
}

function ChatBody({ children }: Props): JSX.Element {
  return <section className={styles['chat-body']}>{children}</section>;
}
export default ChatBody;
