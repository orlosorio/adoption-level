export type DimensionId =
  | 'strategy-leadership'
  | 'culture-change'
  | 'tools-infrastructure'
  | 'skills-training'
  | 'data-knowledge'
  | 'governance-risk'
  | 'impact-roi';

export interface CompanyQuestion {
  level: 0 | 1 | 2 | 3 | 4;
  levelLabel: { es: string; en: string };
  statement: { es: string; en: string };
  dimension: DimensionId;
}

export const DIMENSION_NAMES: Record<DimensionId, { es: string; en: string }> = {
  'strategy-leadership': { en: 'Strategy & Leadership', es: 'Estrategia y Liderazgo' },
  'culture-change': { en: 'Culture & Change Readiness', es: 'Cultura y Preparación al Cambio' },
  'tools-infrastructure': { en: 'Tools & Infrastructure', es: 'Herramientas e Infraestructura' },
  'skills-training': { en: 'Skills & Training', es: 'Habilidades y Capacitación' },
  'data-knowledge': { en: 'Data & Knowledge Management', es: 'Datos y Gestión del Conocimiento' },
  'governance-risk': { en: 'Governance & Risk', es: 'Gobernanza y Riesgo' },
  'impact-roi': { en: 'Impact & ROI Measurement', es: 'Impacto y Medición de ROI' },
};

export const DIMENSION_ORDER: DimensionId[] = [
  'strategy-leadership',
  'culture-change',
  'tools-infrastructure',
  'skills-training',
  'data-knowledge',
  'governance-risk',
  'impact-roi',
];

export const COMPANY_QUESTIONS: CompanyQuestion[] = [
  // ── Strategy & Leadership ──────────────────────────────────────────
  {
    level: 0,
    levelLabel: { en: 'Level 1 — Explorer', es: 'Nivel 1 — Explorador' },
    statement: {
      en: 'Our leadership team has a documented AI strategy with specific goals and timelines.',
      es: 'Nuestro equipo directivo tiene una estrategia de IA documentada con objetivos y plazos específicos.',
    },
    dimension: 'strategy-leadership',
  },
  {
    level: 0,
    levelLabel: { en: 'Level 1 — Explorer', es: 'Nivel 1 — Explorador' },
    statement: {
      en: 'We have allocated a dedicated budget for AI tools, training, and implementation.',
      es: 'Hemos asignado un presupuesto dedicado para herramientas de IA, capacitación e implementación.',
    },
    dimension: 'strategy-leadership',
  },
  {
    level: 1,
    levelLabel: { en: 'Level 2 — Learner', es: 'Nivel 2 — Aprendiz' },
    statement: {
      en: 'A specific person or team is accountable for driving AI adoption across the organization.',
      es: 'Una persona o equipo específico es responsable de impulsar la adopción de IA en toda la organización.',
    },
    dimension: 'strategy-leadership',
  },
  {
    level: 1,
    levelLabel: { en: 'Level 2 — Learner', es: 'Nivel 2 — Aprendiz' },
    statement: {
      en: 'Our leadership regularly communicates AI priorities and progress to the wider organization.',
      es: 'Nuestro liderazgo comunica regularmente las prioridades y avances de IA a toda la organización.',
    },
    dimension: 'strategy-leadership',
  },
  {
    level: 2,
    levelLabel: { en: 'Level 3 — Practitioner', es: 'Nivel 3 — Practicante' },
    statement: {
      en: 'We have identified which business processes and roles will be most impacted by AI in the next 12 months.',
      es: 'Hemos identificado qué procesos de negocio y roles serán más impactados por la IA en los próximos 12 meses.',
    },
    dimension: 'strategy-leadership',
  },

  // ── Culture & Change Readiness ─────────────────────────────────────
  {
    level: 0,
    levelLabel: { en: 'Level 1 — Explorer', es: 'Nivel 1 — Explorador' },
    statement: {
      en: 'Team members feel encouraged — not threatened — to experiment with AI tools in their daily work.',
      es: 'Los miembros del equipo se sienten animados — no amenazados — a experimentar con herramientas de IA en su trabajo diario.',
    },
    dimension: 'culture-change',
  },
  {
    level: 0,
    levelLabel: { en: 'Level 1 — Explorer', es: 'Nivel 1 — Explorador' },
    statement: {
      en: 'We have a regular forum for sharing AI experiments, wins, and lessons learned.',
      es: 'Tenemos un foro regular para compartir experimentos de IA, logros y lecciones aprendidas.',
    },
    dimension: 'culture-change',
  },
  {
    level: 1,
    levelLabel: { en: 'Level 2 — Learner', es: 'Nivel 2 — Aprendiz' },
    statement: {
      en: 'Employees across departments — not just technical teams — are actively using AI tools.',
      es: 'Empleados de todos los departamentos — no solo equipos técnicos — están usando activamente herramientas de IA.',
    },
    dimension: 'culture-change',
  },
  {
    level: 2,
    levelLabel: { en: 'Level 3 — Practitioner', es: 'Nivel 3 — Practicante' },
    statement: {
      en: 'Our hiring and performance evaluation criteria reflect AI competencies.',
      es: 'Nuestros criterios de contratación y evaluación de desempeño reflejan competencias en IA.',
    },
    dimension: 'culture-change',
  },
  {
    level: 2,
    levelLabel: { en: 'Level 3 — Practitioner', es: 'Nivel 3 — Practicante' },
    statement: {
      en: 'When AI tools produce imperfect results, teams iterate and improve rather than abandon the approach.',
      es: 'Cuando las herramientas de IA producen resultados imperfectos, los equipos iteran y mejoran en lugar de abandonar el enfoque.',
    },
    dimension: 'culture-change',
  },

  // ── Tools & Infrastructure ─────────────────────────────────────────
  {
    level: 0,
    levelLabel: { en: 'Level 1 — Explorer', es: 'Nivel 1 — Explorador' },
    statement: {
      en: 'We have standardized on specific AI tools and platforms with enterprise licenses — not just individual free tiers.',
      es: 'Hemos estandarizado herramientas y plataformas de IA específicas con licencias empresariales — no solo planes gratuitos individuales.',
    },
    dimension: 'tools-infrastructure',
  },
  {
    level: 1,
    levelLabel: { en: 'Level 2 — Learner', es: 'Nivel 2 — Aprendiz' },
    statement: {
      en: 'AI tools are integrated into our existing workflows rather than used as standalone apps.',
      es: 'Las herramientas de IA están integradas en nuestros flujos de trabajo existentes en lugar de usarse como aplicaciones independientes.',
    },
    dimension: 'tools-infrastructure',
  },
  {
    level: 2,
    levelLabel: { en: 'Level 3 — Practitioner', es: 'Nivel 3 — Practicante' },
    statement: {
      en: "We have internal templates, prompts, or custom tools that encode our company's best practices.",
      es: 'Tenemos plantillas internas, prompts o herramientas personalizadas que codifican las mejores prácticas de nuestra empresa.',
    },
    dimension: 'tools-infrastructure',
  },
  {
    level: 3,
    levelLabel: { en: 'Level 4 — Advanced', es: 'Nivel 4 — Avanzado' },
    statement: {
      en: 'Our technical infrastructure — APIs, data pipelines, cloud services — can support AI-powered automation.',
      es: 'Nuestra infraestructura técnica — APIs, pipelines de datos, servicios en la nube — puede soportar automatización impulsada por IA.',
    },
    dimension: 'tools-infrastructure',
  },
  {
    level: 3,
    levelLabel: { en: 'Level 4 — Advanced', es: 'Nivel 4 — Avanzado' },
    statement: {
      en: 'We regularly evaluate and update our AI toolstack based on team feedback and market developments.',
      es: 'Evaluamos y actualizamos regularmente nuestro stack de herramientas de IA basándonos en feedback del equipo y desarrollos del mercado.',
    },
    dimension: 'tools-infrastructure',
  },

  // ── Skills & Training ──────────────────────────────────────────────
  {
    level: 0,
    levelLabel: { en: 'Level 1 — Explorer', es: 'Nivel 1 — Explorador' },
    statement: {
      en: 'We have conducted an AI skills assessment of our team to understand current capability levels.',
      es: 'Hemos realizado una evaluación de habilidades de IA de nuestro equipo para entender los niveles de capacidad actuales.',
    },
    dimension: 'skills-training',
  },
  {
    level: 1,
    levelLabel: { en: 'Level 2 — Learner', es: 'Nivel 2 — Aprendiz' },
    statement: {
      en: 'We provide structured AI training with role-specific learning paths.',
      es: 'Proporcionamos capacitación estructurada en IA con rutas de aprendizaje específicas por rol.',
    },
    dimension: 'skills-training',
  },
  {
    level: 1,
    levelLabel: { en: 'Level 2 — Learner', es: 'Nivel 2 — Aprendiz' },
    statement: {
      en: 'Team members have dedicated time — not just permission — to learn and experiment with AI.',
      es: 'Los miembros del equipo tienen tiempo dedicado — no solo permiso — para aprender y experimentar con IA.',
    },
    dimension: 'skills-training',
  },
  {
    level: 2,
    levelLabel: { en: 'Level 3 — Practitioner', es: 'Nivel 3 — Practicante' },
    statement: {
      en: 'We have internal AI champions or power users who support their peers across departments.',
      es: 'Tenemos campeones internos de IA o usuarios avanzados que apoyan a sus colegas en todos los departamentos.',
    },
    dimension: 'skills-training',
  },
  {
    level: 3,
    levelLabel: { en: 'Level 4 — Advanced', es: 'Nivel 4 — Avanzado' },
    statement: {
      en: 'Our onboarding process for new hires includes AI tools training and expected proficiency standards.',
      es: 'Nuestro proceso de onboarding para nuevos empleados incluye capacitación en herramientas de IA y estándares de competencia esperados.',
    },
    dimension: 'skills-training',
  },

  // ── Data & Knowledge Management ────────────────────────────────────
  {
    level: 0,
    levelLabel: { en: 'Level 1 — Explorer', es: 'Nivel 1 — Explorador' },
    statement: {
      en: 'Our internal knowledge — processes, playbooks, client info — is documented and digitally accessible.',
      es: 'Nuestro conocimiento interno — procesos, playbooks, información de clientes — está documentado y es digitalmente accesible.',
    },
    dimension: 'data-knowledge',
  },
  {
    level: 1,
    levelLabel: { en: 'Level 2 — Learner', es: 'Nivel 2 — Aprendiz' },
    statement: {
      en: 'Our data is organized, labeled, and clean enough to be useful inputs for AI tools.',
      es: 'Nuestros datos están organizados, etiquetados y lo suficientemente limpios para ser insumos útiles para herramientas de IA.',
    },
    dimension: 'data-knowledge',
  },
  {
    level: 1,
    levelLabel: { en: 'Level 2 — Learner', es: 'Nivel 2 — Aprendiz' },
    statement: {
      en: 'We have clear guidelines about what company data can and cannot be used with external AI tools.',
      es: 'Tenemos directrices claras sobre qué datos de la empresa pueden y no pueden usarse con herramientas de IA externas.',
    },
    dimension: 'data-knowledge',
  },
  {
    level: 2,
    levelLabel: { en: 'Level 3 — Practitioner', es: 'Nivel 3 — Practicante' },
    statement: {
      en: 'We actively use company-specific context — brand voice, past work — to customize AI outputs.',
      es: 'Usamos activamente contexto específico de la empresa — voz de marca, trabajo previo — para personalizar los resultados de IA.',
    },
    dimension: 'data-knowledge',
  },
  {
    level: 3,
    levelLabel: { en: 'Level 4 — Advanced', es: 'Nivel 4 — Avanzado' },
    statement: {
      en: 'We have systems for capturing and reusing successful AI outputs — prompt libraries, template repositories.',
      es: 'Tenemos sistemas para capturar y reutilizar resultados exitosos de IA — bibliotecas de prompts, repositorios de plantillas.',
    },
    dimension: 'data-knowledge',
  },

  // ── Governance & Risk ──────────────────────────────────────────────
  {
    level: 0,
    levelLabel: { en: 'Level 1 — Explorer', es: 'Nivel 1 — Explorador' },
    statement: {
      en: 'We have an AI usage policy that covers acceptable use, data privacy, and quality review requirements.',
      es: 'Tenemos una política de uso de IA que cubre uso aceptable, privacidad de datos y requisitos de revisión de calidad.',
    },
    dimension: 'governance-risk',
  },
  {
    level: 1,
    levelLabel: { en: 'Level 2 — Learner', es: 'Nivel 2 — Aprendiz' },
    statement: {
      en: 'AI-generated outputs go through a defined human review process before reaching clients or going public.',
      es: 'Los resultados generados por IA pasan por un proceso definido de revisión humana antes de llegar a clientes o hacerse públicos.',
    },
    dimension: 'governance-risk',
  },
  {
    level: 2,
    levelLabel: { en: 'Level 3 — Practitioner', es: 'Nivel 3 — Practicante' },
    statement: {
      en: 'We have addressed IP considerations related to AI-generated work — contracts, ownership, disclosure.',
      es: 'Hemos abordado consideraciones de propiedad intelectual relacionadas con trabajo generado por IA — contratos, propiedad, divulgación.',
    },
    dimension: 'governance-risk',
  },
  {
    level: 2,
    levelLabel: { en: 'Level 3 — Practitioner', es: 'Nivel 3 — Practicante' },
    statement: {
      en: 'Team members understand AI limitations — hallucinations, bias, confidentiality — and how to mitigate them.',
      es: 'Los miembros del equipo entienden las limitaciones de la IA — alucinaciones, sesgo, confidencialidad — y cómo mitigarlas.',
    },
    dimension: 'governance-risk',
  },
  {
    level: 3,
    levelLabel: { en: 'Level 4 — Advanced', es: 'Nivel 4 — Avanzado' },
    statement: {
      en: 'We track and can audit which outputs were AI-assisted for quality assurance and transparency.',
      es: 'Rastreamos y podemos auditar qué resultados fueron asistidos por IA para aseguramiento de calidad y transparencia.',
    },
    dimension: 'governance-risk',
  },

  // ── Impact & ROI Measurement ───────────────────────────────────────
  {
    level: 0,
    levelLabel: { en: 'Level 1 — Explorer', es: 'Nivel 1 — Explorador' },
    statement: {
      en: 'We track specific productivity metrics that show the impact of AI adoption.',
      es: 'Rastreamos métricas de productividad específicas que muestran el impacto de la adopción de IA.',
    },
    dimension: 'impact-roi',
  },
  {
    level: 1,
    levelLabel: { en: 'Level 2 — Learner', es: 'Nivel 2 — Aprendiz' },
    statement: {
      en: 'We can attribute revenue growth or cost savings to specific AI initiatives.',
      es: 'Podemos atribuir crecimiento de ingresos o ahorro de costos a iniciativas específicas de IA.',
    },
    dimension: 'impact-roi',
  },
  {
    level: 2,
    levelLabel: { en: 'Level 3 — Practitioner', es: 'Nivel 3 — Practicante' },
    statement: {
      en: 'We measure the quality of AI-assisted work — not just quantity or speed.',
      es: 'Medimos la calidad del trabajo asistido por IA — no solo la cantidad o velocidad.',
    },
    dimension: 'impact-roi',
  },
  {
    level: 3,
    levelLabel: { en: 'Level 4 — Advanced', es: 'Nivel 4 — Avanzado' },
    statement: {
      en: 'We have a process for identifying new AI use cases based on ROI potential and strategic priority.',
      es: 'Tenemos un proceso para identificar nuevos casos de uso de IA basados en potencial de ROI y prioridad estratégica.',
    },
    dimension: 'impact-roi',
  },
  {
    level: 4,
    levelLabel: { en: 'Level 5 — Catalyst', es: 'Nivel 5 — Catalizador' },
    statement: {
      en: 'Learnings from AI experiments — successes and failures — are documented and inform future decisions.',
      es: 'Los aprendizajes de experimentos de IA — éxitos y fracasos — están documentados e informan decisiones futuras.',
    },
    dimension: 'impact-roi',
  },
];
