// Quiz-level copy keyed by slug. Sourced from the existing constants in
// lib/content.ts, lib/companyAssessment.ts, lib/roles.ts. The DB only stores
// in-quiz content (questions, tier labels, band copy); titles/subtitles/intro
// for the entry page and runner header live here.

import type { Language } from '@/lib/content';
import { ROLE_NAMES, type RoleId } from '@/lib/roles';

export interface QuizCopy {
  title: string;
  subtitle: string | null;
  intro: string | null;
}

const STATIC: Record<string, Record<Language, QuizCopy>> = {
  general: {
    es: {
      title: 'Self-Assessment de Adopción de IA',
      subtitle: 'Descubre exactamente dónde estás — y qué hace ya el top 3% de profesionales.',
      intro: '15 preguntas rápidas · ~2 minutos.',
    },
    en: {
      title: 'AI Adoption Self-Assessment',
      subtitle:
        'Find out exactly where you stand — and what the top 3% of professionals are already doing.',
      intro: '15 quick-tap questions · ~2 minutes.',
    },
  },
  company: {
    es: {
      title: 'Evaluación Empresarial de IA',
      subtitle: 'AI Company Readiness · 7 Dimensiones',
      intro: '35 preguntas · ~4 min · Escala de confianza',
    },
    en: {
      title: 'Company AI Readiness Assessment',
      subtitle: 'AI Company Readiness · 7 Dimensions',
      intro: '35 questions · ~4 min · Confidence scale',
    },
  },
};

export function getQuizCopy(slug: string, locale: Language): QuizCopy {
  if (STATIC[slug]) return STATIC[slug]![locale];

  const rolePrefix = 'role-';
  if (slug.startsWith(rolePrefix)) {
    const roleId = slug.slice(rolePrefix.length) as RoleId;
    const name = ROLE_NAMES[roleId]?.[locale] ?? roleId;
    return {
      title: locale === 'es' ? `Assessment de IA para ${name}` : `${name} AI Assessment`,
      subtitle: name,
      intro:
        locale === 'es'
          ? '33 preguntas · ~4 min · Escala de confianza'
          : '33 questions · ~4 min · Confidence scale',
    };
  }

  return { title: slug, subtitle: null, intro: null };
}
