'use client';

import { useSidebar } from '@/shared/states';
import { Drawer } from '@mui/material';

type TPosition = 'left' | 'top' | 'right' | 'bottom' | undefined;

interface Props {
  position?: TPosition;
  children: React.ReactNode;
}

function Sidebar({ position = 'left', children }: Props): JSX.Element {
  const { isOpen, close } = useSidebar();

  return (
    <Drawer open={isOpen} onClose={close} anchor={position}>
      {children}
    </Drawer>
  );
}
export default Sidebar;
