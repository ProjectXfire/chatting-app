'use client';

import { useEffect, useRef, useState } from 'react';
import { find } from 'lodash';
import styles from './Messages.module.css';
import { type IMessage } from '../../interfaces';
import { getMessages, updateLastSeenMessage } from '../../services';
import { MessageBox } from '..';
import { pusherClient } from '@/shared/libs/pusher';

interface Props {
  sessionId: string;
  conversationId: string;
}

function Messages({ sessionId, conversationId }: Props): JSX.Element {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const onGetMessages = async (): Promise<void> => {
    const { data } = await getMessages(conversationId);
    setMessages(data);
  };

  const onUpdateLastSeenMessage = async (): Promise<void> => {
    await updateLastSeenMessage(conversationId, sessionId);
  };

  const messageHandler = (message: IMessage): void => {
    setMessages((cv) => {
      if (find(cv, { id: message.id }) !== undefined) return cv;
      return [...cv, message];
    });
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    void onGetMessages();
  });

  useEffect(() => {
    void onUpdateLastSeenMessage();
  }, []);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    pusherClient.bind('message:new', messageHandler);
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('message:new', messageHandler);
    };
  }, [conversationId]);

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
