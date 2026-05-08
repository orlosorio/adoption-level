import type { RoleId } from '@/lib/roles';

// Static role list — used by the sitemap and the role-selector entry screen.
// Slug format on the assessment routes is `role-${roleId}`.
export const VALID_ROLE_IDS: RoleId[] = [
  'ux-ui-design',
  'webflow-developer',
  'seo-specialist',
  'growth-marketing',
  'full-stack-developer',
  'product-designer',
  'social-media',
  'writers-editors',
  'paid-marketing',
  'data-analytics',
  'product-manager',
  'sales-bdr',
  'customer-success',
  'video-editor',
  'founder-executive',
  'hr-people-ops',
  'finance-accounting',
];
