export type RoleId =
  | 'ux-ui-design'
  | 'webflow-developer'
  | 'seo-specialist'
  | 'growth-marketing'
  | 'full-stack-developer'
  | 'product-designer'
  | 'social-media'
  | 'writers-editors'
  | 'paid-marketing'
  | 'data-analytics'
  | 'product-manager'
  | 'sales-bdr'
  | 'customer-success'
  | 'video-editor'
  | 'founder-executive'
  | 'hr-people-ops'
  | 'finance-accounting';

export const ROLE_NAMES: Record<RoleId, { es: string; en: string }> = {
  'ux-ui-design': { es: 'Diseño UX/UI', en: 'UX/UI Design' },
  'webflow-developer': { es: 'Desarrollador Webflow/Framer', en: 'Webflow/Framer Developer' },
  'seo-specialist': { es: 'Especialista en SEO', en: 'SEO Specialist' },
  'growth-marketing': { es: 'Marketing de Crecimiento', en: 'Growth Marketing' },
  'full-stack-developer': { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
  'product-designer': { es: 'Diseñador de Producto', en: 'Product Designer' },
  'social-media': { es: 'Redes Sociales', en: 'Social Media' },
  'writers-editors': { es: 'Escritores y Editores', en: 'Writers & Editors' },
  'paid-marketing': { es: 'Marketing de Performance', en: 'Paid / Performance Marketing' },
  'data-analytics': { es: 'Datos y Analytics', en: 'Data & Analytics' },
  'product-manager': { es: 'Product Manager', en: 'Product Manager' },
  'sales-bdr': { es: 'Ventas & BDR', en: 'Sales & BDR' },
  'customer-success': { es: 'Customer Success', en: 'Customer Success' },
  'video-editor': { es: 'Editor de Video', en: 'Video Editor' },
  'founder-executive': { es: 'Fundador & Ejecutivo', en: 'Founder & Executive' },
  'hr-people-ops': { es: 'RR.HH. & People Ops', en: 'HR & People Ops' },
  'finance-accounting': { es: 'Finanzas y Contabilidad', en: 'Finance & Accounting' },
};
