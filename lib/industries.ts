import type { Language } from "@/lib/content";

export interface Industry {
  id: string;
  label: Record<Language, string>;
}

export const INDUSTRIES: Industry[] = [
  { id: "saas-software", label: { en: "SaaS / Software", es: "SaaS / Software" } },
  { id: "fintech", label: { en: "Fintech / Financial Services", es: "Fintech / Servicios financieros" } },
  { id: "ecommerce", label: { en: "E-commerce / Retail", es: "E-commerce / Retail" } },
  { id: "agency-marketing", label: { en: "Agency / Marketing Services", es: "Agencia / Servicios de marketing" } },
  { id: "media-content", label: { en: "Media / Content / Publishing", es: "Medios / Contenido / Editorial" } },
  { id: "healthtech", label: { en: "Healthtech / Healthcare", es: "Healthtech / Salud" } },
  { id: "edtech-education", label: { en: "Edtech / Education", es: "Edtech / Educación" } },
  { id: "real-estate", label: { en: "Real Estate / Proptech", es: "Bienes Raíces / Proptech" } },
  { id: "logistics-transport", label: { en: "Logistics / Transportation", es: "Logística / Transporte" } },
  { id: "food-beverage", label: { en: "Food & Beverage", es: "Alimentos y Bebidas" } },
  { id: "manufacturing", label: { en: "Manufacturing / Industry", es: "Manufactura / Industria" } },
  { id: "energy", label: { en: "Energy / Utilities", es: "Energía / Servicios públicos" } },
  { id: "consulting", label: { en: "Consulting / Professional Services", es: "Consultoría / Servicios profesionales" } },
  { id: "legal", label: { en: "Legal / Law", es: "Legal / Derecho" } },
  { id: "hr-recruiting", label: { en: "HR / Recruiting", es: "Recursos Humanos / Reclutamiento" } },
  { id: "travel-tourism", label: { en: "Travel / Tourism / Hospitality", es: "Viajes / Turismo / Hospitalidad" } },
  { id: "nonprofit-ngo", label: { en: "Nonprofit / NGO", es: "Sin fines de lucro / ONG" } },
  { id: "government-public", label: { en: "Government / Public Sector", es: "Gobierno / Sector público" } },
  { id: "other", label: { en: "Other", es: "Otro" } },
];
