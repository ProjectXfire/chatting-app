import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Chat, ExitToApp, Group } from '@mui/icons-material';
import { type IRoute } from '../interfaces';

interface IHookReturn {
  routes: IRoute[];
}

export function useRoutes(): IHookReturn {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: Chat,
        active: pathname === '/conversations'
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
        isLogout: true
      }
    ],
    [pathname]
  );

  return {
    routes
  };
}
