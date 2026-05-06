import { create } from 'zustand';
import type { Language } from '@/lib/content';

export type AuthMode = 'login' | 'signup' | 'signup-demographics' | 'forgot' | 'check-email';

type AuthModalState = {
  isOpen: boolean;
  mode: AuthMode;
  prevMode: AuthMode;
  language: Language;
  open: (mode?: AuthMode, language?: Language) => void;
  close: () => void;
  setMode: (mode: AuthMode) => void;
  setLanguage: (language: Language) => void;
};

export const useAuthModal = create<AuthModalState>((set) => ({
  isOpen: false,
  mode: 'login',
  prevMode: 'login',
  language: 'es',
  open: (mode = 'login', language) =>
    set((s) => ({
      isOpen: true,
      mode,
      prevMode: mode,
      language: language ?? s.language,
    })),
  close: () => set({ isOpen: false }),
  setMode: (mode) =>
    set((s) => ({
      mode,
      prevMode: mode === 'check-email' ? s.mode : mode,
    })),
  setLanguage: (language) => set({ language }),
}));
