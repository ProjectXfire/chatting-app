'use client';

import { useEffect } from 'react';
import { type IUser } from '@/app/(chat)/interfaces';
import { useOnline } from '@/shared/states';
import { pusherClient } from '@/shared/libs/pusher';

interface Props {
  session: IUser;
}

function Online({ session }: Props): JSX.Element {
  const add = useOnline((state) => state.add);
  const remove = useOnline((state) => state.remove);
  const setSessionId = useOnline((state) => state.setSessionId);

  const updateUserStatus = ({ id, online }: { id: string; online: boolean }): void => {
    console.log({ id, online });
    if (online) {
      add(id);
    } else {
      remove(id);
    }
  };

  useEffect(() => {
    setSessionId(session.id);
    pusherClient.subscribe('online');
    pusherClient.bind('user:status', updateUserStatus);
    return () => {
      pusherClient.unsubscribe('online');
      pusherClient.unbind('user:status', updateUserStatus);
    };
  }, []);

  return <></>;
}
export default Online;
