'use client';

import { useModal } from '@/shared/states/modal';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface Props {
  title: string;
  submitText?: string;
  children: React.ReactNode;
  onSave: () => void;
}

function Modal({ title, children, onSave, submitText = 'Save' }: Props): JSX.Element {
  const { close, isOpen } = useModal();

  const handleClose = (): void => {
    close();
  };

  const handleSave = (): void => {
    onSave();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button color='error' variant='outlined' onClick={handleClose}>
          Cancel
        </Button>
        <Button color='success' variant='outlined' onClick={handleSave}>
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default Modal;
