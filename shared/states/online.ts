import { create } from 'zustand';
import { type IOnline } from '../interfaces';

export const useOnline = create<IOnline>((set, get) => ({
  sessionId: null,
  members: {},
  setSessionId: (id) => {
    set({ sessionId: id });
  },
  clearSession: () => {
    set({ sessionId: null });
  },
  add: (id) => {
    set((state) => ({ members: { [id]: id } }));
  },
  remove: (id) => {
    const currentMembers = { ...get().members };
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete currentMembers[id];
    set({ members: currentMembers });
  }
}));
