'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/lib/auth/use-user';
import glass from '@/app/assessment/_components/glass.module.css';
import styles from '@/app/_components/auth/auth-modal.module.css';

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

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export default function ProfileDemographicsForm() {
  const locale = useLocale();
  const t = useTranslations('profile');
  const { user } = useUser();

  const [fields, setFields] = useState<FieldDef[] | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [save, setSave] = useState<SaveState>('idle');

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
        .eq('demographic_field_translations.locale', locale)
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
        .eq('demographic_option_translations.locale', locale)
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

      const built: FieldDef[] = rawFields.map((f) => {
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
      });

      // Pre-fill from existing user_demographics rows.
      const { data: existing } = await supabase
        .from('user_demographics')
        .select('field_id, option_id');
      const initial: Record<string, string> = {};
      for (const row of existing ?? []) {
        if (row.option_id) initial[row.field_id] = row.option_id;
      }

      if (cancelled) return;
      setFields(built);
      setValues(initial);
    })();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!fields || !user) return;
    setSave('saving');

    const supabase = createClient();
    const rows = fields
      .filter((f) => values[f.id])
      .map((f) => ({
        user_id: user.id,
        field_id: f.id,
        option_id: values[f.id]!,
      }));

    const fieldIdsToClear = fields.filter((f) => !values[f.id]).map((f) => f.id);

    if (rows.length > 0) {
      const { error } = await supabase
        .from('user_demographics')
        .upsert(rows, { onConflict: 'user_id,field_id' });
      if (error) {
        setSave('error');
        return;
      }
    }
    if (fieldIdsToClear.length > 0) {
      const { error } = await supabase
        .from('user_demographics')
        .delete()
        .in('field_id', fieldIdsToClear)
        .eq('user_id', user.id);
      if (error) {
        setSave('error');
        return;
      }
    }
    setSave('saved');
  }

  return (
    <main className="relative z-10 flex flex-1 items-center justify-center">
      <div className="w-full max-w-[440px] rounded-[20px] border border-white/70 bg-white/95 p-7 shadow-[0_24px_64px_rgba(15,22,56,0.18)]">
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
        {fields === null ? (
          <p className={styles.subtitle}>{t('loading')}</p>
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
                  onChange={(e) => {
                    setValues((v) => ({ ...v, [f.id]: e.target.value }));
                    setSave('idle');
                  }}
                  disabled={save === 'saving'}
                >
                  <option value="">{f.placeholder ?? t('emptyOption')}</option>
                  {f.options.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            {save === 'error' && <div className={styles.error}>{t('error')}</div>}
            <button type="submit" className={glass.cta} disabled={save === 'saving'}>
              <span className={glass.ctaLabel}>
                {save === 'saving' ? t('saving') : save === 'saved' ? t('saved') : t('save')}
              </span>
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
