import type { Language } from '@/lib/content';

const KEY = 'accionables_preferred_language';

export function loadPreferredLanguage(): Language | null {
  try {
    if (typeof window === 'undefined') return null;
    const v = localStorage.getItem(KEY);
    return v === 'en' || v === 'es' ? v : null;
  } catch {
    return null;
  }
}

export function savePreferredLanguage(lang: Language): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEY, lang);
  } catch {
    /* silent */
  }
}
