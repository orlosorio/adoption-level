import { create } from 'zustand';

export type AuthMode = 'login' | 'signup' | 'signup-demographics' | 'forgot' | 'check-email';

type AuthModalState = {
  isOpen: boolean;
  mode: AuthMode;
  prevMode: AuthMode;
  open: (mode?: AuthMode) => void;
  close: () => void;
  setMode: (mode: AuthMode) => void;
};

export const useAuthModal = create<AuthModalState>((set) => ({
  isOpen: false,
  mode: 'login',
  prevMode: 'login',
  open: (mode = 'login') => set({ isOpen: true, mode, prevMode: mode }),
  close: () => set({ isOpen: false }),
  setMode: (mode) =>
    set((s) => ({
      mode,
      prevMode: mode === 'check-email' ? s.mode : mode,
    })),
}));
