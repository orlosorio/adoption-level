import 'server-only';
import { unstable_cache as nextCache } from 'next/cache';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase/database.types';
import type { Locale } from '@/i18n/routing';

function createPublicClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false } },
  );
}

export interface DemographicOptionDef {
  id: string;
  slug: string;
  label: string;
  sortOrder: number;
}

export interface DemographicFieldDef {
  id: string;
  slug: string;
  fieldKind: string;
  sortOrder: number;
  label: string;
  placeholder: string | null;
  options: DemographicOptionDef[];
}

async function fetchFields(locale: Locale): Promise<DemographicFieldDef[]> {
  const supabase = createPublicClient();

  const { data: fields } = await supabase
    .from('demographic_fields')
    .select(
      `id, slug, field_kind, sort_order,
       demographic_field_translations!inner(label, placeholder, locale)`,
    )
    .eq('is_active', true)
    .eq('demographic_field_translations.locale', locale)
    .order('sort_order', { ascending: true });

  if (!fields?.length) return [];

  const fieldIds = fields.map((f) => f.id);

  const { data: options } = await supabase
    .from('demographic_options')
    .select(
      `id, field_id, slug, sort_order,
       demographic_option_translations!inner(label, locale)`,
    )
    .in('field_id', fieldIds)
    .eq('demographic_option_translations.locale', locale)
    .order('sort_order', { ascending: true });

  const optionsByField = new Map<string, DemographicOptionDef[]>();
  for (const o of options ?? []) {
    const tr = Array.isArray(o.demographic_option_translations)
      ? o.demographic_option_translations[0]
      : o.demographic_option_translations;
    const list = optionsByField.get(o.field_id) ?? [];
    list.push({
      id: o.id,
      slug: o.slug,
      label: tr?.label ?? o.slug,
      sortOrder: o.sort_order,
    });
    optionsByField.set(o.field_id, list);
  }

  return fields.map((f) => {
    const tr = Array.isArray(f.demographic_field_translations)
      ? f.demographic_field_translations[0]
      : f.demographic_field_translations;
    return {
      id: f.id,
      slug: f.slug,
      fieldKind: f.field_kind,
      sortOrder: f.sort_order,
      label: tr?.label ?? f.slug,
      placeholder: tr?.placeholder ?? null,
      options: optionsByField.get(f.id) ?? [],
    };
  });
}

export const getDemographicFields = nextCache(
  async (locale: Locale) => fetchFields(locale),
  ['demographic-fields'],
  { revalidate: 3600, tags: ['demographic-fields'] },
);
