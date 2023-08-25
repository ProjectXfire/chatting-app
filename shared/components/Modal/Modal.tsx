'use client';

import { useModal } from '@/shared/states/modal';
import { Dialog } from '@mui/material';

function Modal(): JSX.Element {
  const { isOpen, Component } = useModal();

  return <Dialog open={isOpen}>{Component}</Dialog>;
}
export default Modal;
