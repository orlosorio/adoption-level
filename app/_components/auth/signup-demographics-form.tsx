'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { UI } from '@/lib/content';
import glass from '@/app/assessment/_components/glass.module.css';
import { useAuthModal } from '@/lib/auth/auth-modal-store';
import { clearPendingDemographics, savePendingDemographics } from '@/lib/auth/pendingDemographics';
import styles from './auth-modal.module.css';

interface FieldOption {
  id: string;
  label: string;
}

interface FieldDef {
  id: string;
  slug: string;
  label: string;
  placeholder: string | null;
  options: FieldOption[];
}

export default function SignupDemographicsForm() {
  const language = useAuthModal((s) => s.language);
  const setMode = useAuthModal((s) => s.setMode);
  const copy = UI.auth[language].signupDemographics;

  const [fields, setFields] = useState<FieldDef[] | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();
    (async () => {
      const { data: rawFields } = await supabase
        .from('demographic_fields')
        .select(
          `id, slug, sort_order,
           demographic_field_translations!inner(label, placeholder, locale)`,
        )
        .eq('is_active', true)
        .eq('demographic_field_translations.locale', language)
        .order('sort_order', { ascending: true });

      if (!rawFields?.length) {
        if (!cancelled) setFields([]);
        return;
      }

      const fieldIds = rawFields.map((f) => f.id);
      const { data: rawOptions } = await supabase
        .from('demographic_options')
        .select(
          `id, field_id, slug, sort_order,
           demographic_option_translations!inner(label, locale)`,
        )
        .in('field_id', fieldIds)
        .eq('demographic_option_translations.locale', language)
        .order('sort_order', { ascending: true });

      const optionsByField = new Map<string, FieldOption[]>();
      for (const o of rawOptions ?? []) {
        const tr = Array.isArray(o.demographic_option_translations)
          ? o.demographic_option_translations[0]
          : o.demographic_option_translations;
        const list = optionsByField.get(o.field_id) ?? [];
        list.push({ id: o.id, label: tr?.label ?? o.slug });
        optionsByField.set(o.field_id, list);
      }

      if (cancelled) return;
      setFields(
        rawFields.map((f) => {
          const tr = Array.isArray(f.demographic_field_translations)
            ? f.demographic_field_translations[0]
            : f.demographic_field_translations;
          return {
            id: f.id,
            slug: f.slug,
            label: tr?.label ?? f.slug,
            placeholder: tr?.placeholder ?? null,
            options: optionsByField.get(f.id) ?? [],
          };
        }),
      );
    })();
    return () => {
      cancelled = true;
    };
  }, [language]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!fields) return;
    setSubmitting(true);

    // Email confirmation is on, so signUp didn't yield a session. Stash the
    // values; lib/auth/use-user.ts flushes them once the callback authenticates.
    const staged: Record<string, string> = {};
    for (const f of fields) {
      const v = values[f.id];
      if (v) staged[f.id] = v;
    }
    savePendingDemographics(staged);

    setSubmitting(false);
    setMode('check-email');
  }

  function handleSkip() {
    clearPendingDemographics();
    setMode('check-email');
  }

  return (
    <>
      <h2 className={styles.title}>{copy.title}</h2>
      <p className={styles.subtitle}>{copy.subtitle}</p>
      {fields === null ? (
        <p className={styles.subtitle}>{copy.loading}</p>
      ) : (
        <form className={styles.form} onSubmit={handleSave} noValidate>
          {fields.map((f) => (
            <div key={f.id} className={styles.field}>
              <label className={styles.label} htmlFor={`demo-${f.slug}`}>
                {f.label}
              </label>
              <select
                id={`demo-${f.slug}`}
                className={glass.input}
                value={values[f.id] ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                disabled={submitting}
              >
                <option value="">{f.placeholder ?? copy.emptyOption}</option>
                {f.options.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button type="submit" className={glass.cta} disabled={submitting}>
            <span className={glass.ctaLabel}>{submitting ? copy.saving : copy.save}</span>
          </button>
          <button
            type="button"
            className={styles.link}
            onClick={handleSkip}
            disabled={submitting}
            style={{ marginTop: 8, textAlign: 'center' }}
          >
            {copy.skip}
          </button>
        </form>
      )}
    </>
  );
}
