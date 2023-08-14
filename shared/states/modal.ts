import { create } from 'zustand';
import { type IModal } from '../interfaces';

export const useModal = create<IModal>((set) => ({
  isOpen: false,
  open: () => {
    set({ isOpen: true });
  },
  close: () => {
    set({ isOpen: false });
  }
}));
