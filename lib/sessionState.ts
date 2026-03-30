import type { Language } from "@/lib/content";
import type { RoleId } from "@/lib/roles";

const STORAGE_KEY = "accionables_quiz_state";
const TWO_HOURS = 2 * 60 * 60 * 1000;

export interface PersistedQuizState {
  assessmentType: "general" | "role";
  roleId: RoleId | null;
  language: Language;
  currentQuestion: number;
  answers: number[];
  savedAt: number;
}

export function loadPersistedState(): PersistedQuizState | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const state = JSON.parse(raw) as PersistedQuizState;

    if (Date.now() - state.savedAt > TWO_HOURS) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return state;
  } catch {
    return null;
  }
}

export function savePersistedState(state: Omit<PersistedQuizState, "savedAt">) {
  try {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...state, savedAt: Date.now() }),
    );
  } catch {
    /* silent fail (private browsing) */
  }
}

export function clearPersistedState() {
  try {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* silent */
  }
}
