'use client';

import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { flushPendingDemographics } from '@/lib/auth/pendingDemographics';

type State = { user: User | null; isLoading: boolean };

export function useUser(): State {
  const [state, setState] = useState<State>({ user: null, isLoading: true });

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setState({ user: data.user, isLoading: false });
      if (data.user) void flushPendingDemographics(supabase, data.user.id);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({ user: session?.user ?? null, isLoading: false });
      if (session?.user) void flushPendingDemographics(supabase, session.user.id);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
