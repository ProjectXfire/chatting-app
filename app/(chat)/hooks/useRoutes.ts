import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Chat, ExitToApp, Group } from '@mui/icons-material';
import { signOut } from 'next-auth/react';
import { type IRoute } from '../interfaces';
import { useConversation } from './useConversation';

interface IHookReturn {
  routes: IRoute[];
}

export function useRoutes(): IHookReturn {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: Chat,
        active: pathname === '/conversations' || Boolean(conversationId)
      },
      {
        label: 'Home',
        href: '/home',
        icon: Group,
        active: pathname === '/home'
      },
      {
        label: 'Logout',
        href: '#',
        icon: ExitToApp,
        onClick: () => {
          void signOut();
        }
      }
    ],
    [pathname, conversationId]
  );

  return {
    routes
  };
}
