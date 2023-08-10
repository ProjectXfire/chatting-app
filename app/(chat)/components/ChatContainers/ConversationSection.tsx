import styles from './ChatContainers.module.css';
import { EmptyState } from '..';

function ConversationSection(): JSX.Element {
  return (
    <section className={styles['conversation-section']}>
      <EmptyState />
    </section>
  );
}
export default ConversationSection;
