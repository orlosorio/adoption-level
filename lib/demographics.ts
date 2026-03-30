export interface DemographicOption {
  value: string;
  es: string;
  en: string;
}

export const COUNTRIES: DemographicOption[] = [
  { value: "mx", es: "México", en: "Mexico" },
  { value: "co", es: "Colombia", en: "Colombia" },
  { value: "ar", es: "Argentina", en: "Argentina" },
  { value: "cl", es: "Chile", en: "Chile" },
  { value: "pe", es: "Perú", en: "Peru" },
  { value: "ec", es: "Ecuador", en: "Ecuador" },
  { value: "uy", es: "Uruguay", en: "Uruguay" },
  { value: "cr", es: "Costa Rica", en: "Costa Rica" },
  { value: "pa", es: "Panamá", en: "Panama" },
  { value: "do", es: "República Dominicana", en: "Dominican Republic" },
  { value: "gt", es: "Guatemala", en: "Guatemala" },
  { value: "bo", es: "Bolivia", en: "Bolivia" },
  { value: "py", es: "Paraguay", en: "Paraguay" },
  { value: "sv", es: "El Salvador", en: "El Salvador" },
  { value: "hn", es: "Honduras", en: "Honduras" },
  { value: "ni", es: "Nicaragua", en: "Nicaragua" },
  { value: "ve", es: "Venezuela", en: "Venezuela" },
  { value: "cu", es: "Cuba", en: "Cuba" },
  { value: "br", es: "Brasil", en: "Brazil" },
  { value: "us", es: "Estados Unidos", en: "United States" },
  { value: "ca", es: "Canadá", en: "Canada" },
  { value: "es", es: "España", en: "Spain" },
  { value: "gb", es: "Reino Unido", en: "United Kingdom" },
  { value: "de", es: "Alemania", en: "Germany" },
  { value: "fr", es: "Francia", en: "France" },
  { value: "other", es: "Otro", en: "Other" },
];

export const COMPANY_TYPES: DemographicOption[] = [
  { value: "startup", es: "Startup", en: "Startup" },
  { value: "agency", es: "Agencia", en: "Agency" },
  { value: "freelance", es: "Freelance / Independiente", en: "Freelance / Independent" },
  { value: "corporate", es: "Corporativo / Empresa grande", en: "Corporate / Enterprise" },
  { value: "government", es: "Gobierno", en: "Government" },
  { value: "nonprofit", es: "ONG / Sin fines de lucro", en: "Non-profit" },
  { value: "education", es: "Educación", en: "Education" },
  { value: "other", es: "Otro", en: "Other" },
];

export const AGE_RANGES: DemographicOption[] = [
  { value: "18-24", es: "18–24 años", en: "18–24" },
  { value: "25-34", es: "25–34 años", en: "25–34" },
  { value: "35-44", es: "35–44 años", en: "35–44" },
  { value: "45-54", es: "45–54 años", en: "45–54" },
  { value: "55+", es: "55+ años", en: "55+" },
];
