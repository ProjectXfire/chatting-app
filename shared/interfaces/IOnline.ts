export interface IOnline {
  sessionId: string | null;
  members: Record<string, string>;
  add: (id: string) => void;
  remove: (id: string) => void;
  setSessionId: (id: string) => void;
  clearSession: () => void;
}
