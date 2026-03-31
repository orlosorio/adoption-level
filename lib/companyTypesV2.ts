import type { Language } from "@/lib/content";

export interface CompanyTypeV2 {
  id: string;
  icon: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  desc: Record<Language, string>;
}

export const COMPANY_TYPES_V2: CompanyTypeV2[] = [
  {
    id: "corporate",
    icon: "🏢",
    title: { en: "Corporate", es: "Corporativo" },
    subtitle: { en: "Large company", es: "Empresa grande" },
    desc: {
      en: "500+ employees, established brands, LATAM or global",
      es: "500+ empleados, marcas establecidas, LATAM o global",
    },
  },
  {
    id: "smb",
    icon: "🏬",
    title: { en: "SMB", es: "Pyme" },
    subtitle: { en: "Small or medium", es: "Pequeña o mediana" },
    desc: {
      en: "10–500 employees, stable and profitable, local or regional",
      es: "10–500 empleados, estable y rentable, local o regional",
    },
  },
  {
    id: "startup",
    icon: "🚀",
    title: { en: "Startup", es: "Startup" },
    subtitle: { en: "Early-stage", es: "Etapa temprana" },
    desc: {
      en: "Under 50 people, still finding product-market fit",
      es: "Menos de 50 personas, todavía buscando product-market fit",
    },
  },
  {
    id: "scaleup",
    icon: "📈",
    title: { en: "Scale-up", es: "Scale-up" },
    subtitle: { en: "Growing fast", es: "Crecimiento acelerado" },
    desc: {
      en: "Series A–C, 50–500 people, proven model, expanding markets",
      es: "Serie A–C, 50–500 personas, modelo probado, expansión",
    },
  },
  {
    id: "freelance",
    icon: "🧑‍💻",
    title: { en: "Freelance / Agency", es: "Freelance / Agencia" },
    subtitle: { en: "Independent", es: "Independiente" },
    desc: {
      en: "Solo or micro agency, own clients",
      es: "Solo o microagencia, clientes propios",
    },
  },
  {
    id: "public-ngo",
    icon: "🏛️",
    title: { en: "Public / NGO", es: "Público / ONG" },
    subtitle: { en: "Government or nonprofit", es: "Gobierno o sin fines de lucro" },
    desc: {
      en: "Public sector, academic institution, or NGO",
      es: "Sector público, institución académica u ONG",
    },
  },
];
