export interface IModal {
  setComponent: (Body: React.ReactNode) => void;
  Component: React.ReactNode;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}
