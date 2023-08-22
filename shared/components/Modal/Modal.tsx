'use client';

import { useModal } from '@/shared/states/modal';
import { Dialog } from '@mui/material';

function Modal(): JSX.Element {
  const { close, isOpen, Component } = useModal();

  const handleClose = (): void => {
    close();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      {Component}
    </Dialog>
  );
}
export default Modal;
