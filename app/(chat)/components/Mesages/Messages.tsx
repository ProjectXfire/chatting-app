'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Messages.module.css';
import { type IMessage } from '../../interfaces';
import { updateLastSeenMessage } from '../../services';
import { MessageBox } from '..';

interface Props {
  initialMessages: IMessage[];
  sessionId: string;
  conversationId: string;
}

function Messages({ initialMessages, sessionId, conversationId }: Props): JSX.Element {
  const [messages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const onUpdateLastSeenMessage = async (): Promise<void> => {
    await updateLastSeenMessage(conversationId, sessionId);
  };

  useEffect(() => {
    void onUpdateLastSeenMessage();
  }, []);

  return (
    <section className={styles['messages-container']}>
      {messages.map((msg, i) => (
        <MessageBox
          key={msg.id}
          message={msg}
          pos={sessionId === msg.sender?.id ? 'right' : 'left'}
          isLast={i === messages.length - 1}
          sessionId={sessionId}
        />
      ))}
      <div ref={bottomRef} />
    </section>
  );
}
export default Messages;
