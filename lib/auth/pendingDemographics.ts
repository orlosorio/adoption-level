// Demographics collected during the signup-demographics step are staged in
// localStorage because signUp() does not produce a session when email
// confirmation is required — RLS would reject any direct write. Once the
// confirmation link runs the auth callback and the user has a session, the
// flush helper below upserts the staged values into public.user_demographics.

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase/database.types';

const KEY = 'accionables_pending_demographics';

export type PendingDemographics = Record<string, string>; // field_id → option_id

export function savePendingDemographics(values: PendingDemographics) {
  try {
    if (typeof window === 'undefined') return;
    if (Object.keys(values).length === 0) {
      localStorage.removeItem(KEY);
      return;
    }
    localStorage.setItem(KEY, JSON.stringify(values));
  } catch {
    /* silent */
  }
}

export function loadPendingDemographics(): PendingDemographics | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PendingDemographics;
  } catch {
    return null;
  }
}

export function clearPendingDemographics() {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(KEY);
  } catch {
    /* silent */
  }
}

export async function flushPendingDemographics(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<void> {
  const staged = loadPendingDemographics();
  if (!staged) return;
  const rows = Object.entries(staged).map(([field_id, option_id]) => ({
    user_id: userId,
    field_id,
    option_id,
  }));
  if (rows.length === 0) {
    clearPendingDemographics();
    return;
  }
  const { error } = await supabase
    .from('user_demographics')
    .upsert(rows, { onConflict: 'user_id,field_id' });
  if (!error) clearPendingDemographics();
}
