'use client';

import NextLink from 'next/link';
import { signOut } from 'next-auth/react';
import styles from './Menu.module.css';
import { type IRoute } from '../../interfaces';
import { useOnline } from '@/shared/states';
import { updateUser } from '../../services';

interface Props {
  options: IRoute;
  noBorder?: boolean;
}

function MenuItem({ options, noBorder }: Props): JSX.Element {
  const { href, icon: Icon, active, isLogout } = options;
  const sessionId = useOnline((state) => state.sessionId);
  const clearSession = useOnline((state) => state.clearSession);

  const handleClick = async (): Promise<void> => {
    if (isLogout === undefined || !isLogout) return;
    if (sessionId === null) return;
    const { successfulMessage } = await updateUser(sessionId, { online: false });
    if (successfulMessage !== null) {
      clearSession();
      await signOut();
    }
  };

  return (
    <li
      className={`${styles['menu-item']} ${
        active !== undefined && active ? styles['active-item'] : ''
      } ${noBorder !== undefined && noBorder ? styles['no-border'] : ''}`}
      onClick={() => {
        void handleClick();
      }}
    >
      <NextLink href={href}>
        <Icon />
      </NextLink>
    </li>
  );
}
export default MenuItem;
