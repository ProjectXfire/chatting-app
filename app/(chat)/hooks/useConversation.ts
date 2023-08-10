import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import type { IParams } from '@/shared/interfaces';

interface IHookReturn {
  isOpen: boolean;
  conversationId: string;
}

export function useConversation(): IHookReturn {
  const params = useParams() as IParams;

  const conversationId = useMemo(() => {
    if (params.conversationId === undefined) return '';
    return params.conversationId;
  }, [params.conversationId]);

  const isOpen = useMemo(() => Boolean(conversationId), [conversationId]);

  return {
    isOpen,
    conversationId
  };
}
