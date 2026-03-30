import type { RoleId } from "@/lib/roles";
import { ROLE_NAMES } from "@/lib/roles";

export const VALID_ROLE_IDS: RoleId[] = [
  "ux-ui-design",
  "webflow-developer",
  "seo-specialist",
  "growth-marketing",
  "full-stack-developer",
  "product-designer",
  "social-media",
  "writers-editors",
  "paid-marketing",
  "data-analytics",
];

export function isValidRoleId(id: string): id is RoleId {
  return VALID_ROLE_IDS.includes(id as RoleId);
}

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidUUID(str: string): boolean {
  return UUID_REGEX.test(str);
}

export const ROLE_META: Record<
  RoleId,
  { titleEn: string; titleEs: string; descEn: string; descEs: string }
> = Object.fromEntries(
  VALID_ROLE_IDS.map((id) => [
    id,
    {
      titleEn: `${ROLE_NAMES[id].en} AI Assessment | Accionables`,
      titleEs: `Assessment de IA para ${ROLE_NAMES[id].es} | Accionables`,
      descEn: `Discover your AI adoption level as a ${ROLE_NAMES[id].en}. 33 questions, confidence scale.`,
      descEs: `Descubre tu nivel de adopción de IA como ${ROLE_NAMES[id].es}. 33 preguntas, escala de confianza.`,
    },
  ]),
) as Record<
  RoleId,
  { titleEn: string; titleEs: string; descEn: string; descEs: string }
>;
