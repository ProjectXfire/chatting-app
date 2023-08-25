import { create } from 'zustand';
import { type ISidebar } from '../interfaces';

export const useSidebar = create<ISidebar>((set) => ({
  isOpen: false,
  open: () => {
    set({ isOpen: true });
  },
  close: () => {
    set({ isOpen: false });
  }
}));

export const useRightSidebar = create<ISidebar>((set) => ({
  isOpen: false,
  open: () => {
    set({ isOpen: true });
  },
  close: () => {
    set({ isOpen: false });
  }
}));
