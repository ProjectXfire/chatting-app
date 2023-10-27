'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './ChatContainers.module.css';
import { type IConversation } from '../../interfaces';
import { getConversation } from '../../services';
import { ConversationHeader, EmptyState, MessageInput, Messages } from '..';

interface Props {
  sessionId: string;
}

function Conversation({ sessionId }: Props): JSX.Element {
  const [conversation, setConversation] = useState<IConversation | null>(null);
  const searchParams = useSearchParams();

  const onGetConversation = async (): Promise<void> => {
    const id = searchParams.get('id');
    if (id === null) {
      setConversation(null);
      return;
    }
    const { data } = await getConversation(id);
    setConversation(data);
  };

  useEffect(() => {
    void onGetConversation();
  }, [searchParams]);

  return (
    <>
      {conversation !== null ? (
        <section className={styles['chat-conversation']}>
          <ConversationHeader conversation={conversation} sessionId={sessionId} />
          <Messages sessionId={sessionId} conversationId={conversation.id} />
          <MessageInput conversationId={conversation.id} userId={sessionId} />
        </section>
      ) : (
        <EmptyState />
      )}
    </>
  );
}
export default Conversation;
