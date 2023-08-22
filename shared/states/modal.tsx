import { create } from 'zustand';
import { type IModal } from '../interfaces';

export const useModal = create<IModal>((set) => ({
  Component: <></>,
  setComponent: (body) => {
    set({ Component: body });
  },
  isOpen: false,
  open: () => {
    set({ isOpen: true });
  },
  close: () => {
    set({ isOpen: false });
  }
}));
