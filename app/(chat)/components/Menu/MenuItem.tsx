'use client';

import NextLink from 'next/link';
import styles from './Menu.module.css';
import { type IRoute } from '../../interfaces';

interface Props {
  options: IRoute;
  noBorder?: boolean;
}

function MenuItem({ options, noBorder }: Props): JSX.Element {
  const { href, icon: Icon, active, onClick } = options;

  const handleClick = (): void => {
    if (onClick !== undefined) onClick();
  };

  return (
    <li
      className={`${styles['menu-item']} ${
        active !== undefined && active ? styles['active-item'] : ''
      } ${noBorder !== undefined && noBorder ? styles['no-border'] : ''}`}
      onClick={handleClick}
    >
      <NextLink href={href}>
        <Icon />
      </NextLink>
    </li>
  );
}
export default MenuItem;
