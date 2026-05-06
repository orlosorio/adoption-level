import type { Language } from '@/lib/content';

const STORAGE_KEY = 'accionables_quiz_state';
const TWO_HOURS = 2 * 60 * 60 * 1000;

export interface PersistedQuizState {
  quizSlug: string;
  language: Language;
  currentQuestion: number;
  answers: number[];
  savedAt: number;
  savedAttemptId?: string;
}

// localStorage instead of sessionStorage so the email-confirm tab (which is
// a fresh tab) can still read state the original tab wrote.
export function loadPersistedState(): PersistedQuizState | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const state = JSON.parse(raw) as PersistedQuizState;

    if (Date.now() - state.savedAt > TWO_HOURS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return state;
  } catch {
    return null;
  }
}

export function savePersistedState(state: Omit<PersistedQuizState, 'savedAt'>) {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, savedAt: Date.now() }));
  } catch {
    /* silent fail (private browsing) */
  }
}

export function clearPersistedState() {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* silent */
  }
}

export function persistSavedAttemptId(attemptId: string) {
  try {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem(STORAGE_KEY);
    const base = raw
      ? (JSON.parse(raw) as PersistedQuizState)
      : ({ savedAt: Date.now() } as PersistedQuizState);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...base, savedAttemptId: attemptId, savedAt: Date.now() }),
    );
  } catch {
    /* silent */
  }
}

export function loadSavedAttemptId(): string | null {
  return loadPersistedState()?.savedAttemptId ?? null;
}
