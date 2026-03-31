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

export interface RoleQuestion {
  level: 0 | 1 | 2 | 3 | 4;
  levelLabel: { es: string; en: string };
  statement: { es: string; en: string };
  isNew?: boolean;
}

export interface RoleAssessment {
  roleId: RoleId;
  roleName: { es: string; en: string };
  questions: RoleQuestion[];
}

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

export const ROLE_ASSESSMENTS: Record<RoleId, RoleAssessment> = {
  'ux-ui-design': {
    roleId: 'ux-ui-design',
    roleName: { es: 'Diseño UX/UI', en: 'UX/UI Design' },
    questions: [
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para generar inspiración de UI, moodboards o imágenes de referencia (Midjourney, DALL-E, Adobe Firefly).', en: 'I have used AI to generate UI inspiration, mood boards, or reference images (Midjourney, DALL-E, Adobe Firefly).' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He pedido a un chatbot de IA que me ayude a escribir copy de UX, microcopy o etiquetas de botones para un diseño.', en: 'I have asked an AI chatbot to help me write UX copy, microcopy, or button labels for a design.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso herramientas de IA integradas en Figma (Figma AI, Relume o similares) al menos de vez en cuando.', en: 'I use AI tools integrated into Figma (Figma AI, Relume, or similar) at least occasionally.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He generado una paleta de colores, combinación tipográfica o conjunto de design tokens usando IA.', en: 'I have generated a color palette, typography pairing, or design token set using AI.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Entiendo la diferencia entre IA generativa para imágenes y IA para generación de código en flujos de trabajo de diseño.', en: 'I understand the difference between generative AI for images and AI for code generation in design workflows.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para resumir transcripciones de investigación de usuarios o notas de entrevistas.', en: 'I have used AI to summarize user research transcripts or interview notes.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA regularmente para generar variantes de componentes, sets de iconos o assets de ilustración que luego refino en Figma.', en: 'I use AI regularly to generate component variants, icon sets, or illustration assets I then refine in Figma.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado Relume, Framer AI u otra herramienta similar para estructurar un layout completo o sitemap desde un prompt.', en: 'I have used Relume, Framer AI, or a similar tool to scaffold a full page layout or sitemap from a prompt.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Genero wireframes de primer borrador o pantallas de baja fidelidad usando IA antes de pasar al diseño de alta fidelidad.', en: 'I generate first-draft wireframes or low-fidelity screens using AI before moving into high-fidelity design.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para escribir e iterar en UX writing — estados vacíos, flujos de onboarding, tooltips — más rápido que manualmente.', en: 'I use AI to write and iterate on UX writing — error states, onboarding flows, tooltips — faster than manually.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado IA para analizar heatmaps, grabaciones de sesiones o resultados de encuestas y extraer insights relevantes para el diseño.', en: 'I have used AI to analyze heatmaps, session recordings, or survey results and extract design-relevant insights.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Mantengo un conjunto de prompts específicos de diseño que reutilizo para tareas recurrentes (descripciones de componentes, revisiones de accesibilidad).', en: 'I maintain a saved set of design-specific prompts I reuse for recurring tasks (component descriptions, accessibility checks).' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He producido una landing page o feature de producto de media fidelidad usando herramientas de IA (v0, Framer AI, Gamma, Claude Artifacts u otras) sin necesitar un desarrollador o diseñador para comenzar desde cero.', en: 'I have produced a mid-fidelity landing page or product feature using AI tools (v0, Framer AI, Gamma, Claude Artifacts, or similar) without needing a developer or designer to start from scratch.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar texto alternativo accesible, etiquetas ARIA o listas de verificación de accesibilidad para mis diseños.', en: 'I use AI to generate accessible alt text, ARIA labels, or accessibility audit checklists for my designs.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He creado prototipos interactivos o especificaciones de diseño con herramientas asistidas por IA que van directamente a los desarrolladores.', en: 'I have created interactive prototypes or design specs using AI-assisted tools that go directly to developers.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para producir documentación de diseño, descripciones de componentes o lineamientos de sistemas de diseño automáticamente.', en: 'I use AI to produce design documentation, component descriptions, or design system guidelines automatically.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He usado IA para hacer análisis competitivo de UI — alimentando capturas de pantalla de competidores y obteniendo feedback estructurado.', en: 'I have used AI to run competitive UI analysis — feeding competitor screenshots and getting structured feedback.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar e iterar en conceptos de motion design o especificaciones de micro-interacciones.', en: 'I use AI to generate and iterate on motion design concepts or micro-interaction specifications.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He conectado herramientas de IA a mi flujo de trabajo de diseño mediante plugins de Figma, APIs o automatizaciones (Zapier, Make).', en: 'I have connected AI tools to my design workflow via Figma plugins, APIs, or automation (Zapier, Make).' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He producido una landing page o feature de UI de alta fidelidad y lista para producción usando IA (Cursor, Webflow AI, Framer AI o generación de código) que se publicó o fue entregada a un cliente sin retrabajos significativos.', en: 'I have produced a high-fidelity, production-ready landing page or UI feature using AI (Cursor, Webflow AI, Framer AI, or code generation) that went live or was delivered to a client without significant rework.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Colaboro con compañeros de equipo usando GitHub — creando ramas, abriendo pull requests, revisando diffs y resolviendo conflictos de merge — con IA ayudándome a entender o escribir el código involucrado.', en: 'I collaborate with teammates using GitHub — creating branches, opening pull requests, reviewing diffs, and resolving merge conflicts — with AI helping me understand or write the code involved.' }, isNew: true,
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Genero código front-end listo para producción (HTML/CSS, componentes React) directamente desde mis diseños de Figma usando IA.', en: 'I generate production-ready front-end code (HTML/CSS, React components) directly from my Figma designs using AI.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido o personalizado una herramienta de sistema de diseño potenciada por IA que garantiza consistencia en todo el equipo.', en: 'I have built or customized an AI-powered design system tool that enforces consistency across a team.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para ejecutar análisis de pruebas de usabilidad — sintetizando hallazgos de múltiples sesiones en insights accionables automáticamente.', en: 'I use AI to run usability testing analysis — synthesizing findings from multiple sessions into actionable insights automatically.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He automatizado tareas de diseño repetitivas (redimensionamiento, exportación, generación de variantes) usando scripts o plugins de IA.', en: 'I have automated repetitive design tasks (resizing, exporting, variant generation) using AI scripts or plugins.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Integro herramientas de investigación con IA (Maze AI, UserTesting AI) en mi proceso de diseño para reducir el tiempo de ciclo de investigación.', en: 'I integrate AI research tools (Maze AI, UserTesting AI) into my design process to reduce research cycle time.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Mi equipo sigue un proceso de diseño asistido por IA que yo ayudé a definir y mantener.', en: 'My team follows a documented AI-assisted design process that I helped define and maintain.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He construido herramientas de IA personalizadas o plugins de Figma que mi equipo usa diariamente en producción.', en: 'I have built custom AI tools or Figma plugins that my team uses daily in production.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He diseñado experiencias de producto nativas de IA — interfaces donde la IA es una feature central, no solo una ayuda al flujo de trabajo.', en: 'I have designed AI-native product experiences — interfaces where AI is a core feature, not just a workflow aid.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Uso IA para medir y predecir el impacto del diseño — resultados de A/B tests, predicciones de conversión o puntuación de engagement.', en: 'I use AI to measure and predict design impact — A/B test outcomes, conversion predictions, or engagement scoring.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Oriento a otros diseñadores en prácticas de diseño asistido por IA y he documentado el playbook de IA de nuestro equipo.', en: 'I mentor other designers on AI-assisted design practices and have documented our team\'s AI design playbook.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He contribuido a herramientas de diseño con IA, escrito sobre IA en diseño o presentado sobre este tema.', en: 'I have contributed to or evaluated AI design tools, written about AI in design, or presented on this topic.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Hago seguimiento del impacto de negocio medible (velocidad, calidad, costo) de la adopción de IA en mi práctica de diseño con datos reales.', en: 'I track the measurable business impact (speed, quality, cost) of AI adoption in my design practice with real data.' },
      },
    ],
  },
  'webflow-developer': {
    roleId: 'webflow-developer',
    roleName: { es: 'Desarrollador Webflow/Framer', en: 'Webflow/Framer Developer' },
    questions: [
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para generar ideas de componentes de Webflow, conceptos de layout o dirección visual desde un prompt de texto.', en: 'I have used AI to generate Webflow component ideas, layout concepts, or visual direction from a text prompt.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso chatbots de IA (Claude, ChatGPT) para ayudarme a escribir o depurar CSS o JavaScript personalizados dentro de Webflow.', en: 'I use AI chatbots (Claude, ChatGPT) to help me write or debug custom CSS or JavaScript inside Webflow.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado las funciones de IA de Webflow (generación de texto con IA, herramientas de imágenes con IA) al menos una vez en un proyecto real.', en: 'I have used Webflow AI features (AI text generation, AI image tools) at least once in a live project.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He generado una estructura de layout responsivo o esquema de CMS usando IA antes de construirlo en Webflow.', en: 'I have generated a responsive layout structure or CMS schema using AI before building it in Webflow.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para escribir meta títulos, descripciones y copy de Open Graph para páginas de Webflow.', en: 'I use AI to write SEO meta titles, descriptions, and Open Graph copy for Webflow pages.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He pedido a la IA que explique una interacción de Webflow, lógica de animación o comportamiento de atributos de Finsweet.', en: 'I have asked AI to explain a Webflow interaction, animation logic, or Finsweet attribute behavior.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para escribir commit messages, generar descripciones de pull requests, revisar diffs en busca de bugs y resumir entradas de changelog automáticamente como parte de mi flujo diario de Git.', en: 'I use AI to write commit messages, generate PR descriptions, review diffs for bugs, and summarize changelog entries automatically as part of my daily Git workflow.' }, isNew: true,
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso regularmente IA para escribir código embebido personalizado listo para producción (HTML, CSS, JS) que pego directamente en Webflow.', en: 'I regularly use AI to write production-ready custom code embeds (HTML, CSS, JS) that I paste directly into Webflow.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar estructuras de colecciones CMS de Webflow, esquemas de campos y lógica de campos de referencia para proyectos complejos.', en: 'I use AI to generate Webflow CMS collection structures, field schemas, and reference field logic for complex projects.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He construido un sitio en Webflow usando un sitemap y wireframe generados por IA como punto de partida.', en: 'I have built a Webflow site using an AI-generated sitemap and wireframe as the starting point.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para escribir specs de animaciones Lottie, código GSAP o lógica de interacciones con scroll para proyectos de Webflow.', en: 'I use AI to write Lottie animation specs, GSAP code, or scroll-triggered interaction logic for Webflow projects.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Mantengo una biblioteca de fragmentos de código de Webflow generados con IA que reutilizo en proyectos de clientes.', en: 'I maintain a library of AI-generated Webflow code snippets I reuse across client projects.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar copy de localización de Webflow o traducir contenido del sitio a múltiples idiomas.', en: 'I use AI to generate Webflow localization copy or translate site content into multiple languages.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He producido una landing page o feature de producto de media fidelidad usando herramientas de IA (v0, Framer AI, Gamma, Claude Artifacts u otras) sin necesitar un desarrollador o diseñador para comenzar desde cero.', en: 'I have produced a mid-fidelity landing page or product feature using AI tools (v0, Framer AI, Gamma, Claude Artifacts, or similar) without needing a developer or designer to start from scratch.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para escribir y testear lógica de Memberstack, Wized o Xano que extiende Webflow más allá de sus capacidades nativas.', en: 'I use AI to write and test Memberstack, Wized, or Xano logic that extends Webflow beyond its native capabilities.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He usado IA para construir flujos de integración Webflow-Airtable, Webflow-Make o Webflow-Zapier.', en: 'I have used AI to build Webflow-to-Airtable, Webflow-to-Make, or Webflow-to-Zapier integration flows.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Genero documentación de proyectos de Webflow lista para el cliente, guías de estilo y notas de handoff usando IA.', en: 'I generate client-ready Webflow project documentation, style guides, and handoff notes using AI.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para auditar sitios de Webflow en busca de problemas de rendimiento, accesibilidad o SEO y generar recomendaciones de corrección.', en: 'I use AI to audit Webflow sites for performance, accessibility, or SEO issues and generate fix recommendations.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He configurado automatizaciones de Webflow Logic con lógica de flujo de trabajo generada por IA para manejo de formularios y notificaciones.', en: 'I have set up Webflow Logic automations with AI-generated workflow logic for form handling and notifications.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar descripciones de productos de e-commerce, páginas de categorías y copy de checkout a escala en Webflow.', en: 'I use AI to generate e-commerce product descriptions, category pages, and checkout copy at scale in Webflow.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He producido una landing page o feature de UI de alta fidelidad y lista para producción usando IA (Cursor, Webflow AI, Framer AI o generación de código) que se publicó o fue entregada a un cliente sin retrabajos significativos.', en: 'I have produced a high-fidelity, production-ready landing page or UI feature using AI (Cursor, Webflow AI, Framer AI, or code generation) that went live or was delivered to a client without significant rework.' }, isNew: true,
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Conecto Webflow a APIs de IA (OpenAI, Anthropic) mediante código personalizado o Make para potenciar contenido dinámico impulsado por IA en sitios en vivo.', en: 'I connect Webflow to AI APIs (OpenAI, Anthropic) via custom code or Make to power dynamic, AI-driven content on live sites.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido funciones de búsqueda, personalización o recomendación potenciadas por IA directamente en proyectos de Webflow.', en: 'I have built AI-powered search, personalization, or recommendation features directly into Webflow projects.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Genero y publico sitios completos de Webflow para clientes en menos de 5 días hábiles usando flujos de trabajo asistidos por IA de principio a fin.', en: 'I generate and deploy complete Webflow client sites faster than 5 business days using AI-assisted workflows end-to-end.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He automatizado los reportes de clientes de Webflow — tráfico, envíos de formularios, actualizaciones de CMS — usando resúmenes generados por IA.', en: 'I have automated Webflow client reporting — traffic, form submissions, CMS updates — using AI-generated summaries.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso Cursor o v0 junto a Webflow para construir componentes personalizados que luego embebo o porto a proyectos de clientes.', en: 'I use Cursor or v0 alongside Webflow to build custom components that I then embed or port into client projects.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Mi equipo tiene un proceso de entrega de Webflow potenciado por IA que reduce los tiempos de proyecto de forma medible.', en: 'My team has a documented AI-powered Webflow delivery process that reduces project timelines measurably.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He construido templates, cloneables o bibliotecas de componentes de Webflow que otros desarrolladores usan.', en: 'I have built Webflow templates, cloneables, or component libraries that other Webflow developers use.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He capacitado a otros desarrolladores en flujos de trabajo de Webflow asistidos por IA y documentado el proceso.', en: 'I have trained or onboarded other developers on AI-assisted Webflow workflows and documented the process.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He conectado Webflow a servidores MCP o agentes de IA personalizados que gestionan actualizaciones del CMS de forma autónoma.', en: 'I have connected Webflow to MCP servers or custom AI agents that manage CMS updates autonomously.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Hago seguimiento del ROI de la IA en mi práctica de Webflow — horas ahorradas, proyectos entregados, ingresos por desarrollador — con métricas reales.', en: 'I track the ROI of AI in my Webflow practice — hours saved, projects delivered, revenue per developer — with real metrics.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He publicado tutoriales, hablado en público o contribuido a la comunidad de Webflow sobre desarrollo asistido por IA.', en: 'I have published tutorials, spoken, or contributed to the Webflow community about AI-assisted development.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Uso IA para construir y mantener sistemas de diseño de Webflow que garantizan consistencia de marca en múltiples proyectos de clientes automáticamente.', en: 'I use AI to build and maintain Webflow design systems that enforce brand consistency across multiple client projects automatically.' },
      },
    ],
  },
  'seo-specialist': {
    roleId: 'seo-specialist',
    roleName: { es: 'Especialista en SEO', en: 'SEO Specialist' },
    questions: [
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para generar meta títulos, meta descripciones y etiquetas Open Graph para páginas a escala.', en: 'I use AI to generate meta titles, meta descriptions, and Open Graph tags for pages at scale.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para investigar ideas de keywords, agrupar temas o identificar brechas de contenido más rápido que de forma manual.', en: 'I have used AI to research keyword ideas, cluster topics, or identify content gaps faster than manual methods.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para escribir o reescribir title tags y H1s para la optimización SEO de páginas existentes.', en: 'I use AI to write or rewrite title tags and H1s for SEO optimization on existing pages.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado Perplexity, ChatGPT o Claude para investigar la estrategia de contenido o el perfil de backlinks de un competidor.', en: 'I have used Perplexity, ChatGPT, or Claude to research a competitor\'s content strategy or backlink profile.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para generar secciones de FAQ, marcado de datos estructurados (JSON-LD) o recomendaciones de schema.', en: 'I use AI to generate FAQ sections, structured data markup (JSON-LD), or schema recommendations.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para resumir un reporte de Google Search Console o Google Analytics en insights clave.', en: 'I have used AI to summarize a Google Search Console or Google Analytics report into key insights.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para producir borradores de briefs de contenido SEO que incluyen keywords objetivo, encabezados y sugerencias de enlaces internos.', en: 'I use AI to produce first-draft SEO content briefs that include target keywords, headers, and internal link suggestions.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso regularmente IA para generar en lote títulos y descripciones optimizadas para 50+ páginas a la vez.', en: 'I regularly use AI to batch-generate optimized page titles and descriptions for 50+ pages at once.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para analizar features de SERP (PAA, featured snippets, knowledge panels) y optimizar contenido para ganarlos.', en: 'I use AI to analyze SERP features (PAA, featured snippets, knowledge panels) and optimize content to win them.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar estrategias de enlazado interno basadas en autoridad temática y mapeo de clusters de contenido.', en: 'I use AI to generate internal linking strategies based on topical authority and content cluster mapping.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado IA para escribir contenido de AEO (Optimización para Motores de Respuesta) específicamente dirigido a AI Overviews de Google y citas en LLMs.', en: 'I have used AI to write AEO (Answer Engine Optimization) content specifically targeting AI Overviews and LLM citations.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Mantengo una biblioteca de prompts específicos de SEO para briefs de contenido, auditorías y reportes que reutilizo semanalmente.', en: 'I maintain a saved library of SEO-specific prompts for content briefs, audits, and reporting that I reuse weekly.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He producido una landing page o feature de producto de media fidelidad usando herramientas de IA (v0, Framer AI, Gamma, Claude Artifacts u otras) sin necesitar un desarrollador o diseñador para comenzar desde cero.', en: 'I have produced a mid-fidelity landing page or product feature using AI tools (v0, Framer AI, Gamma, Claude Artifacts, or similar) without needing a developer or designer to start from scratch.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para automatizar auditorías técnicas de SEO — análisis de crawl, mapeo de redirecciones, revisiones de tags canónicos — a escala.', en: 'I use AI to automate technical SEO audits — crawl analysis, redirect mapping, canonical tag reviews — at scale.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar e implementar hreflang, estructuras de SEO internacional o contenido multilingüe a escala.', en: 'I use AI to generate and QA hreflang implementations, international SEO structures, or multilingual content at scale.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He construido un pipeline de producción de contenido donde la IA redacta, yo edito y el output se publica en menos de 24 horas.', en: 'I have built a content production pipeline where AI drafts, I edit, and output goes live in under 24 hours.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para monitorear menciones de marca, movimientos en SERP y actividad de competidores y generar reportes de inteligencia semanales automáticamente.', en: 'I use AI to monitor brand mentions, SERP movements, and competitor activity and generate weekly intel reports automatically.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He usado IA para analizar log files, datos de Core Web Vitals o crawl budgets y generar recomendaciones de corrección.', en: 'I have used AI to analyze log files, Core Web Vitals data, or crawl budgets and generate fix recommendations.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar contenido optimizado por entidades — estructurado en torno a temas, entidades y relaciones — no solo keywords.', en: 'I use AI to generate entity-optimized content — structured around topics, entities, and relationships — not just keywords.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He producido una landing page o feature de UI de alta fidelidad y lista para producción usando IA (Cursor, Webflow AI, Framer AI o generación de código) que se publicó o fue entregada a un cliente sin retrabajos significativos.', en: 'I have produced a high-fidelity, production-ready landing page or UI feature using AI (Cursor, Webflow AI, Framer AI, or code generation) that went live or was delivered to a client without significant rework.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Colaboro con compañeros de equipo usando GitHub — creando ramas, abriendo pull requests, revisando diffs y resolviendo conflictos de merge — con IA ayudándome a entender o escribir el código involucrado.', en: 'I collaborate with teammates using GitHub — creating branches, opening pull requests, reviewing diffs, and resolving merge conflicts — with AI helping me understand or write the code involved.' }, isNew: true,
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He conectado las APIs de GSC, GA4 o Ahrefs a herramientas de IA que generan reportes semanales automatizados de rendimiento SEO.', en: 'I have connected GSC, GA4, or Ahrefs APIs to AI tools that generate automated weekly SEO performance reports.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para construir y mantener mapas de autoridad temática que guían la estrategia de contenido en dominios completos.', en: 'I use AI to build and maintain topical authority maps that guide content strategy across entire domains.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He entrenado una IA en la voz de marca de un cliente y la uso para producir contenido SEO con esa voz a escala con edición mínima.', en: 'I have trained an AI on a client\'s brand voice and use it to produce on-brand SEO content at scale with minimal editing.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para identificar y ejecutar oportunidades de SEO de impacto rápido (reescritura de títulos, enlaces internos, schema) en 100+ páginas por sprint.', en: 'I use AI to identify and execute quick-win SEO opportunities (title rewrites, internal links, schema) across 100+ pages per sprint.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido pipelines automatizados de monitoreo SEO que me alertan sobre caídas de rankings, problemas de indexación o regresiones de Core Web Vitals.', en: 'I have built automated SEO monitoring pipelines that alert me to ranking drops, index issues, or Core Web Vital regressions.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Mi equipo usa un flujo de trabajo de SEO asistido por IA que yo construí y que reduce los tiempos de entrega de forma medible.', en: 'My team uses a documented AI-assisted SEO workflow that I built and that measurably reduces delivery time.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He construido herramientas de IA personalizadas para SEO — scripts de agrupación de keywords, modelos de puntuación de contenido o automatizaciones de auditoría — usadas en producción.', en: 'I have built custom AI SEO tools — keyword clustering scripts, content scoring models, or audit automations — used in production.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He construido una estrategia de AEO que logra que el contenido del cliente sea citado en ChatGPT, Claude, Perplexity o Google AI Overviews.', en: 'I have built an AEO strategy that successfully gets client content cited in ChatGPT, Claude, Perplexity, or Google AI Overviews.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Uso agentes de IA que monitorean rankings, identifican oportunidades y redactan planes de acción de forma autónoma sin mi intervención diaria.', en: 'I use AI agents that autonomously monitor rankings, identify opportunities, and draft action plans without my daily input.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Hago seguimiento del impacto en ingresos o tráfico del SEO asistido por IA con KPIs específicos y puedo presentar el ROI a los stakeholders.', en: 'I track the revenue or traffic impact of AI-assisted SEO with specific KPIs and can present the ROI to stakeholders.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He capacitado o mentoreado a otros profesionales de SEO en flujos de trabajo con IA y he documentado la metodología.', en: 'I have trained or mentored other SEO professionals on AI workflows and have documented the methodology.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Contribuyo al entendimiento del campo del SEO sobre la IA — a través de casos de estudio, charlas, posts o recursos de la comunidad.', en: 'I contribute to the SEO field\'s understanding of AI — through case studies, talks, posts, or community resources.' },
      },
    ],
  },
  'growth-marketing': {
    roleId: 'growth-marketing',
    roleName: { es: 'Marketing de Crecimiento', en: 'Growth Marketing' },
    questions: [
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para escribir borradores de campañas de email, líneas de asunto y texto de previsualización para pruebas A/B.', en: 'I use AI to write first-draft email campaigns, subject lines, and preview text for A/B testing.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para generar copy de landing pages, headlines principales y variaciones de CTA para experimentos de crecimiento.', en: 'I have used AI to generate landing page copy, hero headlines, and CTA variations for growth experiments.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para investigar estrategias de crecimiento de competidores, páginas de precios y funnels de adquisición.', en: 'I use AI to research competitor growth strategies, pricing pages, and acquisition funnels.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para resumir un reporte de rendimiento de campaña o dashboard de marketing en conclusiones clave.', en: 'I have used AI to summarize a campaign performance report or marketing dashboard into key takeaways.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para generar ideas de experimentos de crecimiento, programas de referidos o bucles virales.', en: 'I use AI to generate ideas for growth experiments, referral programs, or viral loops.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para escribir secuencias de email de onboarding o campañas de nurturing del ciclo de vida.', en: 'I have used AI to write onboarding email sequences or lifecycle nurture campaigns.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para construir y documentar hipótesis de experimentos de crecimiento, métricas de éxito y diseños de pruebas.', en: 'I use AI to build and document growth experiment hypotheses, success metrics, and test designs.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar variantes personalizadas de email o SMS basadas en el segmento, comportamiento o etapa del ciclo de vida del usuario.', en: 'I use AI to generate personalized email or SMS variants based on user segment, behavior, or lifecycle stage.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado IA para producir landing pages de conversión optimizadas o micrositios de campaña más rápido que los flujos de trabajo tradicionales.', en: 'I have used AI to produce conversion-optimized landing pages or campaign microsites faster than traditional workflows.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para analizar datos de abandono del funnel y generar hipótesis priorizadas para experimentos de CRO.', en: 'I use AI to analyze funnel drop-off data and generate prioritized hypotheses for CRO experiments.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para escribir e iterar en copy de anuncios pagados, briefs creativos y recomendaciones de targeting de audiencia.', en: 'I use AI to write and iterate on paid ad copy, creative briefs, and audience targeting recommendations.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Mantengo una biblioteca de prompts de crecimiento que cubre ideación, copywriting, análisis y reportes.', en: 'I maintain a growth-specific prompt library covering ideation, copywriting, analysis, and reporting.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He producido una landing page o feature de producto de media fidelidad usando herramientas de IA (v0, Framer AI, Gamma, Claude Artifacts u otras) sin necesitar un desarrollador o diseñador para comenzar desde cero.', en: 'I have produced a mid-fidelity landing page or product feature using AI tools (v0, Framer AI, Gamma, Claude Artifacts, or similar) without needing a developer or designer to start from scratch.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para hacer inteligencia competitiva — analizando libraries de anuncios de competidores, estrategias de contenido y cambios de posicionamiento semanalmente.', en: 'I use AI to run competitive intelligence — analyzing competitor ad libraries, content strategies, and positioning changes weekly.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He construido materiales de programas de referidos o afiliados asistidos por IA — emails, guías de socios, assets de co-marketing — a escala.', en: 'I have built AI-assisted referral or affiliate program materials — emails, partner guides, co-marketing assets — at scale.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar resúmenes semanales de rendimiento de crecimiento que van directamente a liderazgo con edición manual mínima.', en: 'I use AI to generate weekly growth performance summaries that go directly to leadership with minimal manual editing.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para construir y puntuar ICPs (perfiles de cliente ideal) usando datos de CRM, señales de comportamiento e inputs firmográficos.', en: 'I use AI to build and score ICPs (ideal customer profiles) using CRM data, behavioral signals, and firmographic inputs.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He conectado IA a mi plataforma de CRM o automatización de marketing para activar campañas personalizadas basadas en comportamiento.', en: 'I have connected AI to my CRM or marketing automation platform to trigger personalized campaigns based on behavior.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para analizar datos de retención y generar playbooks para reducir el churn o incrementar los ingresos por expansión.', en: 'I use AI to analyze retention data and generate playbooks for reducing churn or increasing expansion revenue.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He producido una landing page o feature de UI de alta fidelidad y lista para producción usando IA (Cursor, Webflow AI, Framer AI o generación de código) que se publicó o fue entregada a un cliente sin retrabajos significativos.', en: 'I have produced a high-fidelity, production-ready landing page or UI feature using AI (Cursor, Webflow AI, Framer AI, or code generation) that went live or was delivered to a client without significant rework.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Colaboro con compañeros de equipo usando GitHub — creando ramas, abriendo pull requests, revisando diffs y resolviendo conflictos de merge — con IA ayudándome a entender o escribir el código involucrado.', en: 'I collaborate with teammates using GitHub — creating branches, opening pull requests, reviewing diffs, and resolving merge conflicts — with AI helping me understand or write the code involved.' }, isNew: true,
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido pipelines automatizados de reportes de crecimiento donde la IA lee datos de GA4, CRM y ads y genera insights semanalmente.', en: 'I have built automated growth reporting pipelines where AI reads GA4, CRM, and ad data and generates insights weekly.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para ejecutar análisis de experimentos multivariados — leyendo significancia estadística, tamaños de efecto e impacto a nivel de segmento.', en: 'I use AI to run multi-variate experiment analysis — reading statistical significance, effect sizes, and segment-level impact.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido personalización a escala potenciada por IA — contenido dinámico, recomendaciones de productos o triggers de comportamiento — en producción.', en: 'I have built AI-powered personalization at scale — dynamic content, product recommendations, or behavioral triggers — in production.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para mapear y optimizar el journey completo del cliente — desde el primer contacto hasta la retención — con recomendaciones basadas en datos.', en: 'I use AI to map and optimize the full customer journey — from first touch to retention — with data-backed recommendations.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He entrenado IA en la voz de marca y datos de clientes para producir contenido de crecimiento que requiere edición humana mínima.', en: 'I have trained AI on brand voice and customer data to produce growth content that requires minimal human editing.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Mi equipo sigue un proceso de crecimiento asistido por IA que construí y que ha mejorado mediblemente la velocidad de experimentación.', en: 'My team follows a documented AI-assisted growth process that I built and that has measurably improved experiment velocity.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He construido herramientas de crecimiento con IA personalizadas — modelos de puntuación, priorizadores de experimentos o predictores de churn — usadas en producción.', en: 'I have built custom AI growth tools — scoring models, experiment prioritizers, or churn predictors — used in production.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Uso agentes de IA que monitorean métricas de crecimiento y detectan oportunidades o anomalías de forma proactiva sin mi intervención diaria.', en: 'I use AI agents that monitor growth metrics and proactively surface opportunities or anomalies without my daily input.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Hago seguimiento del impacto en ingresos del trabajo de crecimiento asistido por IA con métricas específicas y puedo presentar el ROI a ejecutivos C-level.', en: 'I track the revenue impact of AI-assisted growth work with specific metrics and can present ROI to C-level stakeholders.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He rediseñado los procesos del equipo de crecimiento en torno a la IA, reduciendo necesidades de contratación mientras aumento el output y la velocidad de experimentación.', en: 'I have redesigned growth team processes around AI, reducing headcount needs while increasing output and experiment velocity.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Mentoreo a profesionales de crecimiento en flujos de trabajo asistidos por IA y he documentado el playbook para que otros lo sigan.', en: 'I mentor growth professionals on AI-assisted workflows and have documented the playbook for others to follow.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Contribuyo al entendimiento de la comunidad de crecimiento sobre la IA — a través de casos de estudio, frameworks, charlas o publicaciones.', en: 'I contribute to the growth community\'s understanding of AI — through case studies, frameworks, talks, or publications.' },
      },
    ],
  },
  'full-stack-developer': {
    roleId: 'full-stack-developer',
    roleName: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
    questions: [
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso asistentes de código con IA (GitHub Copilot, Cursor, Windsurf) diariamente como mi entorno de programación principal.', en: 'I use AI coding assistants (GitHub Copilot, Cursor, Windsurf) daily as my primary coding environment.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para explicar mensajes de error, depurar tests fallidos o entender codebases desconocidos más rápido que buscando en Google.', en: 'I use AI to explain error messages, debug failing tests, or understand unfamiliar codebases faster than Googling.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para generar código boilerplate — scaffolding de proyectos, rutas de API, esquemas de base de datos — para nuevos proyectos.', en: 'I have used AI to generate boilerplate code — project scaffolding, API routes, database schemas — for new projects.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para escribir tests unitarios, tests de integración o casos de tests end-to-end para código que ya he escrito.', en: 'I use AI to write unit tests, integration tests, or end-to-end test cases for code I\'ve already written.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para traducir código entre lenguajes o frameworks (ej. JavaScript a TypeScript, REST a GraphQL).', en: 'I have used AI to translate code between languages or frameworks (e.g., JavaScript to TypeScript, REST to GraphQL).' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para escribir queries SQL, migraciones de base de datos o modelos ORM más rápido que escribirlos manualmente.', en: 'I use AI to write SQL queries, database migrations, or ORM models faster than writing them manually.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para escribir commit messages, generar descripciones de pull requests, revisar diffs en busca de bugs y resumir entradas de changelog automáticamente como parte de mi flujo diario de Git.', en: 'I use AI to write commit messages, generate PR descriptions, review diffs for bugs, and summarize changelog entries automatically as part of my daily Git workflow.' }, isNew: true,
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso Cursor Agent o Windsurf Cascade para hacer cambios de código en múltiples archivos y múltiples pasos en un codebase de forma autónoma.', en: 'I use Cursor Agent or Windsurf Cascade to make multi-file, multi-step code changes across a codebase autonomously.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar y refactorizar componentes de React, Vue o Next.js con tipos TypeScript correctos e interfaces de props.', en: 'I use AI to generate and refactor React, Vue, or Next.js components with proper TypeScript types and prop interfaces.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado v0, Lovable o Bolt para generar una interfaz front-end completa desde una descripción y luego personalizarla.', en: 'I have used v0, Lovable, or Bolt to generate a complete front-end UI from a description and then customized it.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para escribir configuraciones de CI/CD, Dockerfiles o código de infraestructura como código (Terraform, Pulumi).', en: 'I use AI to write CI/CD pipeline configurations, Dockerfiles, or infrastructure-as-code (Terraform, Pulumi).' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para hacer revisiones de código — enviando PRs a una IA y obteniendo feedback estructurado antes de la revisión humana.', en: 'I use AI to conduct code reviews — feeding PRs to an AI and getting structured feedback before human review.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Mantengo una biblioteca de prompts para tareas de desarrollo recurrentes: diseño de API, generación de schema, escritura de tests, documentación.', en: 'I maintain a library of AI prompts for recurring dev tasks: API design, schema generation, test writing, documentation.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He producido una landing page o feature de producto de media fidelidad usando herramientas de IA (v0, Framer AI, Gamma, Claude Artifacts u otras) sin necesitar un desarrollador o diseñador para comenzar desde cero.', en: 'I have produced a mid-fidelity landing page or product feature using AI tools (v0, Framer AI, Gamma, Claude Artifacts, or similar) without needing a developer or designer to start from scratch.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar documentación completa de API, archivos README y guías para desarrolladores directamente desde el código fuente.', en: 'I use AI to generate complete API documentation, README files, and developer guides directly from source code.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He construido features full-stack — front end, back end y base de datos — principalmente usando IA con yo como arquitecto y revisor.', en: 'I have built full-stack features — front end, back end, and database — primarily using AI with me as the architect and reviewer.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para identificar y corregir vulnerabilidades de seguridad, problemas de dependencias o cuellos de botella de rendimiento en un codebase.', en: 'I use AI to identify and fix security vulnerabilities, dependency issues, or performance bottlenecks across a codebase.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar scripts de migración de datos, archivos seed o pipelines ETL sin escribirlos completamente desde cero.', en: 'I use AI to generate data migration scripts, seed files, or ETL pipelines without writing them fully from scratch.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He conectado IA a mi flujo de trabajo de desarrollo mediante servidores MCP, herramientas personalizadas o integraciones CLI (Claude Code, reglas de Cursor).', en: 'I have connected AI to my dev workflow via MCP servers, custom tools, or CLI integrations (Claude Code, Cursor rules).' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar y mantener configs de entorno, estructuras de gestión de secrets y checklists de deployment.', en: 'I use AI to generate and maintain environment configs, secrets management structures, and deployment checklists.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He producido una landing page o feature de UI de alta fidelidad y lista para producción usando IA (Cursor, Webflow AI, Framer AI o generación de código) que se publicó o fue entregada a un cliente sin retrabajos significativos.', en: 'I have produced a high-fidelity, production-ready landing page or UI feature using AI (Cursor, Webflow AI, Framer AI, or code generation) that went live or was delivered to a client without significant rework.' }, isNew: true,
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He publicado una feature completa de producción — diseño, código, tests, deployment — en menos de 1 día usando desarrollo asistido por IA.', en: 'I have shipped a complete production feature — design, code, tests, deployment — in under 1 day using AI-assisted development.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He usado IA para arquitectar y estructurar microservicios, sistemas event-driven o features en tiempo real desde una especificación de alto nivel.', en: 'I have used AI to architect and scaffold microservices, event-driven systems, or real-time features from a high-level spec.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He integrado APIs de IA (OpenAI, Anthropic, Google) directamente en aplicaciones de producción que he construido.', en: 'I have integrated AI APIs (OpenAI, Anthropic, Google) directly into production applications I\'ve built.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para monitorear sistemas de producción — leyendo logs, tasas de error y datos de latencia — y generar resúmenes de incidentes.', en: 'I use AI to monitor production systems — reading logs, error rates, and latency data — and generate incident summaries.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido herramientas de IA internas para desarrolladores — generadores de código, scaffolders o bots de revisión — que mi equipo usa en producción.', en: 'I have built internal AI developer tools — code generators, scaffolders, or review bots — that my team uses in production.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Mi equipo tiene un flujo de trabajo de desarrollo asistido por IA que yo ayudé a definir, con impacto medible en la velocidad de entrega.', en: 'My team has a documented AI-assisted development workflow I helped define, with measurable impact on delivery speed.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He construido productos nativos de IA — aplicaciones donde el razonamiento, la generación o los agentes de IA son centrales para la experiencia de usuario.', en: 'I have built AI-native products — applications where AI reasoning, generation, or agents are core to the user experience.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He configurado servidores MCP, construido skills personalizados de Claude o creado arquitecturas de agentes de IA usadas por mi equipo en producción.', en: 'I have configured MCP servers, built custom Claude skills, or created AI agent architectures used by my team in production.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He construido sistemas multi-agente donde los agentes de IA se coordinan de forma autónoma para completar tareas de desarrollo complejas.', en: 'I have built multi-agent systems where AI agents coordinate autonomously to complete complex development tasks.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Hago seguimiento del impacto en velocidad de desarrollo del tooling de IA con métricas medibles (PRs por sprint, bugs por release, tiempo para publicar).', en: 'I track the dev velocity impact of AI tooling with measurable metrics (PRs per sprint, bugs per release, time-to-ship).' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Mentoreo a desarrolladores en prácticas de ingeniería asistida por IA y he documentado el flujo de trabajo para adopción a nivel de equipo.', en: 'I mentor developers on AI-assisted engineering practices and have documented the workflow for team-wide adoption.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Contribuyo al entendimiento de la comunidad de ingeniería sobre la IA — a través de open source, escritura, charlas o creación de herramientas.', en: 'I contribute to the engineering community\'s understanding of AI — through open source, writing, talks, or tool creation.' },
      },
    ],
  },
  'product-designer': {
    roleId: 'product-designer',
    roleName: { es: 'Diseñador de Producto', en: 'Product Designer' },
    questions: [
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para generar conceptos de diseño, moodboards o referencias visuales antes de abrir una herramienta de diseño.', en: 'I use AI to generate design concepts, mood boards, or visual references before opening a design tool.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para escribir resúmenes de requerimientos de producto, briefs de features o descripciones de historias de usuario desde notas en bruto.', en: 'I have used AI to write product requirement summaries, feature briefs, or user story descriptions from raw notes.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para generar personas de usuario, mapas de empatía o esquemas de journey del cliente a partir de inputs de investigación.', en: 'I use AI to generate user personas, empathy maps, or customer journey outlines from research inputs.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para crear decks de presentación, actualizaciones para stakeholders o documentos de justificación de diseño más rápido.', en: 'I have used AI to create presentation decks, stakeholder updates, or design rationale documents faster.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para comparar mis diseños con los de competidores — alimentando capturas de pantalla y obteniendo feedback estructurado de UX.', en: 'I use AI to benchmark my designs against competitors — feeding screenshots and getting structured UX feedback.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para generar listas de verificación de accesibilidad o recomendaciones de diseño inclusivo para mi trabajo.', en: 'I have used AI to generate accessibility checklists or inclusive design recommendations for my work.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar e iterar en arquitectura de información, estructuras de navegación o flujos de producto antes de hacer wireframes.', en: 'I use AI to generate and iterate on information architecture, navigation structures, or product flows before wireframing.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para producir documentación del sistema de diseño — lineamientos de componentes, reglas de uso, definiciones de tokens — automáticamente.', en: 'I use AI to produce design system documentation — component guidelines, usage rules, token definitions — automatically.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado IA para sintetizar hallazgos de investigación de usuarios de múltiples fuentes en un reporte de insights priorizado.', en: 'I have used AI to synthesize user research findings from multiple sources into a prioritized insights report.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar copy de producto — estados vacíos, mensajes de error, flujos de onboarding — directamente en mis archivos de diseño.', en: 'I use AI to generate product copy — empty states, error messages, onboarding flows — directly in my design files.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado Framer AI, v0 u herramientas similares para generar prototipos interactivos desde una descripción escrita de producto.', en: 'I have used Framer AI, v0, or similar tools to generate interactive prototypes from a written product description.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Mantengo una biblioteca de prompts de diseño de producto que cubre síntesis de investigación, copy, flujos y justificación de diseño.', en: 'I maintain a library of product design prompts covering research synthesis, copy, flows, and design rationale.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He producido una landing page o feature de producto de media fidelidad usando herramientas de IA (v0, Framer AI, Gamma, Claude Artifacts u otras) sin necesitar un desarrollador o diseñador para comenzar desde cero.', en: 'I have produced a mid-fidelity landing page or product feature using AI tools (v0, Framer AI, Gamma, Claude Artifacts, or similar) without needing a developer or designer to start from scratch.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para ejecutar y analizar pruebas de usabilidad — sintetizando grabaciones, transcripciones y resultados de encuestas en recomendaciones de diseño.', en: 'I use AI to run and analyze usability tests — synthesizing recordings, transcripts, and survey results into design recommendations.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He usado IA para diseñar y documentar APIs de producto o modelos de datos — contribuyendo a las especificaciones de back-end junto a ingeniería.', en: 'I have used AI to design and document product APIs or data models — contributing to back-end specs alongside engineering.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar hipótesis de pruebas A/B, métricas de éxito y análisis post-test para experimentos de producto.', en: 'I use AI to generate A/B test hypotheses, success metrics, and post-test analysis for product experiments.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He usado IA para mapear el roadmap completo del producto — organizando features por impacto, esfuerzo y alineación estratégica.', en: 'I have used AI to map the full product roadmap — organizing features by impact, effort, and strategic alignment.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para producir especificaciones de handoff para desarrolladores — diseños anotados, notas de interacción y documentación de casos edge — automáticamente.', en: 'I use AI to produce developer handoff specs — annotated designs, interaction notes, and edge case documentation — automatically.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He conectado herramientas de IA a mi flujo de trabajo de diseño mediante plugins, APIs o automatizaciones que ahorran horas medibles cada semana.', en: 'I have connected AI tools to my design workflow via plugins, APIs, or automations that save measurable hours each week.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He producido una landing page o feature de UI de alta fidelidad y lista para producción usando IA (Cursor, Webflow AI, Framer AI o generación de código) que se publicó o fue entregada a un cliente sin retrabajos significativos.', en: 'I have produced a high-fidelity, production-ready landing page or UI feature using AI (Cursor, Webflow AI, Framer AI, or code generation) that went live or was delivered to a client without significant rework.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Colaboro con compañeros de equipo usando GitHub — creando ramas, abriendo pull requests, revisando diffs y resolviendo conflictos de merge — con IA ayudándome a entender o escribir el código involucrado.', en: 'I collaborate with teammates using GitHub — creating branches, opening pull requests, reviewing diffs, and resolving merge conflicts — with AI helping me understand or write the code involved.' }, isNew: true,
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para diseñar y testear features de producto potenciadas por IA — donde la IA es un componente de primera clase de la experiencia de usuario.', en: 'I use AI to design and test AI-powered product features — where AI is a first-class citizen of the user experience.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido un sistema de diseño asistido por IA que garantiza consistencia de marca y UX en múltiples productos o equipos.', en: 'I have built an AI-assisted design system that enforces brand and UX consistency across multiple products or teams.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para generar código front-end desde mis diseños e iterarlo directamente con Cursor u herramientas similares.', en: 'I use AI to generate front-end code from my designs and iterate on it directly with Cursor or similar tools.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para hacer seguimiento de métricas de calidad de diseño — puntuaciones de consistencia, tasas de aprobación de accesibilidad, adopción de componentes — automáticamente.', en: 'I use AI to track design quality metrics — consistency scores, accessibility pass rates, component adoption — automatically.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He entrenado IA en los patrones de diseño de nuestro producto y la uso para generar diseños consistentes y alineados con la marca a escala.', en: 'I have trained AI on our product\'s design patterns and use it to generate on-brand, consistent designs at scale.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Mi equipo sigue un proceso de diseño de producto asistido por IA que ha mejorado mediblemente nuestra velocidad de entrega y calidad.', en: 'My team follows a documented AI-assisted product design process that has measurably improved our delivery speed and quality.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He diseñado experiencias de producto nativas de IA — productos donde la IA es central para la propuesta de valor, no solo una capa de features.', en: 'I have designed AI-native product experiences — products where AI is core to the value proposition, not a feature layer.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He construido herramientas de IA personalizadas para diseño — plugins de figma, sintetizadores de investigación o generadores de especificaciones — usadas por mi equipo en producción.', en: 'I have built custom AI design tools — figma plugins, research synthesizers, or spec generators — used by my team in production.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Hago seguimiento del impacto de negocio del diseño de producto asistido por IA — velocidad de features, satisfacción de usuario, tiempo de handoff diseño-a-desarrollo.', en: 'I track the business impact of AI-assisted product design — feature velocity, user satisfaction, design-to-dev handoff time.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Mentoreo a diseñadores de producto en flujos de trabajo de IA y he documentado la metodología de diseño con IA del equipo.', en: 'I mentor product designers on AI workflows and have documented the team\'s AI design methodology.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Contribuyo al entendimiento de la comunidad de diseño de producto sobre la IA a través de escritura, charlas o herramientas open-source.', en: 'I contribute to the product design community\'s understanding of AI through writing, talks, or open-source tooling.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Lidero la estrategia de IA para diseño de producto en mi empresa — con un roadmap definido, presupuesto y resultados medibles.', en: 'I lead the AI strategy for product design at my company — with a defined roadmap, budget, and measurable outcomes.' },
      },
    ],
  },
  'social-media': {
    roleId: 'social-media',
    roleName: { es: 'Redes Sociales', en: 'Social Media' },
    questions: [
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para generar ideas de captions, sets de hashtags y copy de posts para múltiples plataformas a la vez.', en: 'I use AI to generate caption ideas, hashtag sets, and post copy for multiple platforms at once.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado herramientas de imágenes con IA (Midjourney, DALL-E, Canva AI) para crear visuales o assets creativos para redes sociales.', en: 'I have used AI image tools (Midjourney, DALL-E, Canva AI) to create social media visuals or creative assets.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para reutilizar una pieza de contenido de formato largo (blog, podcast, video) en posts de redes sociales en múltiples plataformas.', en: 'I use AI to repurpose a long-form piece of content (blog, podcast, video) into social media posts across platforms.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para analizar cuáles de mis posts tuvieron mejor desempeño y por qué, basándome en datos de engagement.', en: 'I have used AI to analyze which of my posts performed best and why, based on engagement data.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para generar ideas de calendario de contenido o temas para las próximas semanas o meses.', en: 'I use AI to generate content calendar ideas or themes for upcoming weeks or months.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para investigar temas tendencia, sonidos o formatos relevantes para mi nicho o audiencia.', en: 'I have used AI to research trending topics, sounds, or formats relevant to my niche or audience.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar variaciones de contenido específicas para cada plataforma — optimizadas por separado para Instagram, LinkedIn, TikTok y X.', en: 'I use AI to generate platform-specific content variations — optimized separately for Instagram, LinkedIn, TikTok, and X.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para escribir e iterar en scripts para Reels, YouTube Shorts o hooks de TikTok antes de grabar.', en: 'I use AI to write and iterate on Reel scripts, YouTube shorts scripts, or TikTok hooks before filming.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado herramientas de video con IA (Runway, HeyGen, CapCut AI) para crear o editar contenido de video para redes sociales más rápido.', en: 'I have used AI video tools (Runway, HeyGen, CapCut AI) to create or edit social video content faster.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar respuestas de community management — respuestas, plantillas de DM y engagement en comentarios — a escala.', en: 'I use AI to generate community management responses — replies, DM templates, and comment engagement — at scale.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para producir resúmenes de reportes de redes sociales que van directamente a clientes o stakeholders con edición mínima.', en: 'I use AI to produce social media reporting summaries that go directly to clients or stakeholders with minimal editing.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Mantengo una biblioteca de prompts guardados para tareas recurrentes: captions, scripts, reportes, análisis competitivo, calendarios de contenido.', en: 'I maintain a saved prompt library for recurring tasks: captions, scripts, reporting, competitive analysis, content calendars.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He producido una landing page o feature de producto de media fidelidad usando herramientas de IA (v0, Framer AI, Gamma, Claude Artifacts u otras) sin necesitar un desarrollador o diseñador para comenzar desde cero.', en: 'I have produced a mid-fidelity landing page or product feature using AI tools (v0, Framer AI, Gamma, Claude Artifacts, or similar) without needing a developer or designer to start from scratch.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para monitorear menciones de marca, actividad de competidores y conversaciones trending en plataformas de forma automática.', en: 'I use AI to monitor brand mentions, competitor activity, and trending conversations across platforms automatically.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He construido un pipeline de producción de contenido donde la IA redacta posts, yo reviso y apruebo, y se auto-programan para publicar.', en: 'I have built a content production pipeline where AI drafts posts, I review and approve, and they auto-schedule to publish.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar carruseles, infografías o series de contenido educativo desde un único documento fuente o URL.', en: 'I use AI to generate carousels, infographics, or educational content series from a single source document or URL.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para analizar el sentimiento de la audiencia, temas de comentarios y patrones de DMs para informar decisiones de estrategia de contenido.', en: 'I use AI to analyze audience sentiment, comment themes, and DM patterns to inform content strategy decisions.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He usado herramientas de voz con IA (ElevenLabs, Murf) o generación de música con IA (Suno, Udio) para producción de contenido social.', en: 'I have used AI voiceover tools (ElevenLabs, Murf) or AI music generation (Suno, Udio) for social content production.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para hacer pruebas A/B de conceptos de contenido — generando múltiples versiones y usando datos para elegir ganadores antes de escalar.', en: 'I use AI to A/B test content concepts — generating multiple versions and using data to pick winners before scaling.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He producido una landing page o feature de UI de alta fidelidad y lista para producción usando IA (Cursor, Webflow AI, Framer AI o generación de código) que se publicó o fue entregada a un cliente sin retrabajos significativos.', en: 'I have produced a high-fidelity, production-ready landing page or UI feature using AI (Cursor, Webflow AI, Framer AI, or code generation) that went live or was delivered to a client without significant rework.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Colaboro con compañeros de equipo usando GitHub — creando ramas, abriendo pull requests, revisando diffs y resolviendo conflictos de merge — con IA ayudándome a entender o escribir el código involucrado.', en: 'I collaborate with teammates using GitHub — creating branches, opening pull requests, reviewing diffs, and resolving merge conflicts — with AI helping me understand or write the code involved.' }, isNew: true,
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He conectado herramientas de redes sociales a automatizaciones de IA (Make, Zapier) que activan la creación de contenido basada en eventos o datos.', en: 'I have connected social media tools to AI automations (Make, Zapier) that trigger content creation based on events or data.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para generar contenido que responde a tendencias en horas de que aparecen, no en días.', en: 'I use AI to generate trend-responsive content within hours of a trend emerging, not days.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He entrenado IA en una voz de marca y datos de audiencia para producir contenido social alineado con la marca con edición humana mínima.', en: 'I have trained AI on a brand voice and audience data to produce on-brand social content with minimal human editing.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para generar reportes de investigación de influencers, briefs de partnership y mensajes de outreach a escala.', en: 'I use AI to generate influencer research reports, partnership briefs, and outreach messages at scale.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido un dashboard de reportes de redes sociales donde la IA lee datos de plataforma y genera insights semanales automáticamente.', en: 'I have built a social media reporting dashboard where AI reads platform data and generates weekly insights automatically.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Mi equipo sigue un flujo de trabajo de redes sociales asistido por IA que reduce mediblemente el tiempo de producción por post.', en: 'My team follows a documented AI-assisted social media workflow that measurably reduces production time per post.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Administro la presencia en redes sociales de múltiples marcas usando flujos de trabajo de IA que requieren mínima intervención diaria de mi parte.', en: 'I manage multiple brands\' social media presence using AI workflows that require minimal daily input from me.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He construido herramientas de IA personalizadas para redes sociales — generadores de contenido, resumidores de analytics o bots de programación — usadas en producción.', en: 'I have built custom AI social media tools — content generators, analytics summarizers, or scheduling bots — used in production.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Hago seguimiento del ROI de la IA en la gestión de redes sociales — horas ahorradas, mejora en tasa de engagement, costo por post — con datos reales.', en: 'I track the ROI of AI in social media management — hours saved, engagement rate improvement, cost per post — with real data.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Mentoreo a profesionales de redes sociales en flujos de trabajo de contenido asistidos por IA y he documentado la metodología.', en: 'I mentor social media professionals on AI-assisted content workflows and have documented the methodology.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Contribuyo al entendimiento de la comunidad de redes sociales sobre la IA a través de casos de estudio, tutoriales o charlas.', en: 'I contribute to the social media community\'s understanding of AI through case studies, tutorials, or speaking engagements.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Lidero la estrategia de contenido con IA para mi organización — con un playbook definido, stack de herramientas y objetivos de rendimiento medibles.', en: 'I lead the AI content strategy for my organization — with a defined playbook, toolstack, and measurable performance targets.' },
      },
    ],
  },
  'writers-editors': {
    roleId: 'writers-editors',
    roleName: { es: 'Escritores y Editores', en: 'Writers & Editors' },
    questions: [
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para superar el bloqueo del escritor — generando líneas de apertura, esquemas o ideas de enfoque antes de empezar a escribir.', en: 'I use AI to overcome writer\'s block — generating opening lines, outlines, or angle ideas before I start writing.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para corregir, verificar gramática o mejorar la claridad de mi escritura antes de publicar.', en: 'I have used AI to proofread, grammar-check, or improve the clarity of my writing before publishing.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para resumir documentos largos, papers de investigación o reportes en puntos clave que puedo referenciar mientras escribo.', en: 'I use AI to summarize long documents, research papers, or reports into key points I can reference while writing.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para reescribir contenido en un tono diferente — más formal, más conversacional, más persuasivo.', en: 'I have used AI to rewrite content in a different tone — more formal, more conversational, more persuasive.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para generar variaciones de títulos, opciones de subtítulos o ideas de nombres para artículos y posts.', en: 'I use AI to generate headline variations, subhead options, or title ideas for articles and posts.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para investigar un tema, verificar un dato o encontrar información de respaldo para una pieza que estoy escribiendo.', en: 'I have used AI to research a topic, fact-check a claim, or find supporting data for a piece I\'m writing.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar borradores completos de artículos, blog posts o contenido de formato largo que luego edito y refino.', en: 'I use AI to generate complete first drafts of articles, blog posts, or long-form content that I then edit and refine.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He entrenado IA en mi estilo de escritura o una guía de voz de marca y la uso para generar contenido con esa voz de forma consistente.', en: 'I have trained AI on my writing style or a brand voice guide and use it to generate on-voice content consistently.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para reutilizar una pieza de contenido en múltiples formatos — blog, newsletter, posts de redes sociales, artículo de LinkedIn.', en: 'I use AI to repurpose one piece of content into multiple formats — blog, newsletter, social posts, LinkedIn article.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para escribir preguntas de entrevista, hacer investigación de escritorio y organizar material de fuentes antes de escribir.', en: 'I use AI to write interview questions, conduct desk research, and organize source material before writing.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado NotebookLM para analizar múltiples fuentes simultáneamente y producir una síntesis o brief de investigación.', en: 'I have used NotebookLM to analyze multiple sources simultaneously and produce a synthesis or research brief.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Mantengo una biblioteca de prompts de escritura: plantillas de brief, guías de estilo, estructuras de esquema y listas de verificación de edición.', en: 'I maintain a writing-specific prompt library: brief templates, style guides, outline structures, and editing checklists.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He producido una landing page o feature de producto de media fidelidad usando herramientas de IA (v0, Framer AI, Gamma, Claude Artifacts u otras) sin necesitar un desarrollador o diseñador para comenzar desde cero.', en: 'I have produced a mid-fidelity landing page or product feature using AI tools (v0, Framer AI, Gamma, Claude Artifacts, or similar) without needing a developer or designer to start from scratch.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para editar la escritura de otras personas — manteniendo su voz mientras mejoro la claridad, estructura e impacto.', en: 'I use AI to edit other people\'s writing — maintaining their voice while improving clarity, structure, and impact.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He construido un pipeline de producción de contenido donde la IA redacta, yo edito y el output se publica dentro de un SLA definido.', en: 'I have built a content production pipeline where AI drafts, I edit, and output is published within a defined SLA.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar briefs de contenido optimizados para SEO — con keywords objetivo, estructuras de encabezados e insights competitivos.', en: 'I use AI to generate SEO-optimized content briefs — with keyword targets, heading structures, and competitive insights.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para escribir a un ritmo de 10,000+ palabras por semana de calidad publicable, para múltiples clientes o marcas.', en: 'I use AI to write at a pace of 10,000+ words per week of publishable quality, across multiple clients or brands.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He usado IA para producir scripts para podcasts, videos o webinars y puedo hacerlo de forma consistente a escala.', en: 'I have used AI to produce scripts for podcasts, videos, or webinars and can do so consistently at scale.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para monitorear datos de rendimiento del contenido y generar recomendaciones para mejorar piezas con bajo desempeño.', en: 'I use AI to monitor content performance data and generate recommendations for improving underperforming pieces.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He producido una landing page o feature de UI de alta fidelidad y lista para producción usando IA (Cursor, Webflow AI, Framer AI o generación de código) que se publicó o fue entregada a un cliente sin retrabajos significativos.', en: 'I have produced a high-fidelity, production-ready landing page or UI feature using AI (Cursor, Webflow AI, Framer AI, or code generation) that went live or was delivered to a client without significant rework.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Colaboro con compañeros de equipo usando GitHub — creando ramas, abriendo pull requests, revisando diffs y resolviendo conflictos de merge — con IA ayudándome a entender o escribir el código involucrado.', en: 'I collaborate with teammates using GitHub — creating branches, opening pull requests, reviewing diffs, and resolving merge conflicts — with AI helping me understand or write the code involved.' }, isNew: true,
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido un flujo de trabajo editorial asistido por IA — desde el brief hasta la publicación — que mi equipo o clientes usan en producción.', en: 'I have built an AI-assisted editorial workflow — from brief to publish — that my team or clients use in production.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para gestionar un calendario de contenido para múltiples clientes o marcas simultáneamente sin un miembro dedicado del equipo.', en: 'I use AI to manage a content calendar for multiple clients or brands simultaneously without a dedicated team member.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He entrenado IA en los estándares editoriales de una publicación y la uso para hacer QA de contenido verificando consistencia, exactitud y tono.', en: 'I have trained AI on a publication\'s editorial standards and use it to QA content for consistency, accuracy, and tone.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para generar versiones traducidas o localizadas del contenido en múltiples idiomas y verificar su exactitud.', en: 'I use AI to generate translated or localized versions of content in multiple languages and QA them for accuracy.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido reportes de contenido automatizados donde la IA lee datos de tráfico, engagement y conversión y redacta insights.', en: 'I have built automated content reporting where AI reads traffic, engagement, and conversion data and drafts insights.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Mi equipo editorial sigue un proceso de escritura asistido por IA que yo definí, con mejoras medibles en volumen de output y calidad.', en: 'My editorial team follows a documented AI-assisted writing process I defined, with measurable improvements in output volume and quality.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Administro una operación de contenido a escala — 50+ piezas por mes — usando flujos de trabajo de IA que requieren edición diaria mínima de mi parte.', en: 'I manage a content operation at scale — 50+ pieces per month — using AI workflows that require minimal daily editing from me.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He construido herramientas de escritura con IA personalizadas — modelos de voz de marca, bots de QA editorial o sistemas de puntuación de contenido — usadas en producción.', en: 'I have built custom AI writing tools — brand voice models, editorial QA bots, content scoring systems — used in production.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Hago seguimiento del ROI de la IA en mi práctica de escritura — volumen de output, costo por palabra, tiempo de publicación — con datos reales.', en: 'I track the ROI of AI in my writing practice — output volume, cost per word, time-to-publish — with real data.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Mentoreo a otros escritores y editores en flujos de trabajo asistidos por IA y he documentado la metodología públicamente.', en: 'I mentor other writers and editors on AI-assisted workflows and have documented the methodology publicly.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Contribuyo al entendimiento de la comunidad de escritura y edición sobre la IA a través de ensayos, talleres o herramientas.', en: 'I contribute to the writing and editorial community\'s understanding of AI through essays, workshops, or tools.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Lidero la estrategia de contenido con IA en mi organización — con un framework definido, stack de herramientas y estándares de calidad.', en: 'I lead the AI content strategy at my organization — with a defined framework, toolstack, and quality standards.' },
      },
    ],
  },
  'paid-marketing': {
    roleId: 'paid-marketing',
    roleName: { es: 'Marketing de Performance', en: 'Paid / Performance Marketing' },
    questions: [
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para generar variaciones de copy de anuncios — headlines, texto principal, descripciones — para campañas de Google, Meta y LinkedIn.', en: 'I use AI to generate ad copy variations — headlines, primary text, descriptions — for Google, Meta, and LinkedIn campaigns.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para escribir briefs creativos para performance creative (anuncios estáticos, anuncios de video, scripts de UGC).', en: 'I have used AI to write creative briefs for performance creative (static ads, video ads, UGC scripts).' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para investigar intereses de audiencia, señales de targeting o estrategias de anuncios de competidores antes de lanzar campañas.', en: 'I use AI to research audience interests, targeting signals, or competitor ad strategies before launching campaigns.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para resumir reportes de rendimiento de campañas en insights clave y optimizaciones recomendadas.', en: 'I have used AI to summarize campaign performance reports into key insights and recommended optimizations.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para generar copy de landing pages, tests de headlines y variaciones de CTA para tráfico pagado.', en: 'I use AI to generate landing page copy, headline tests, and CTA variants for paid traffic.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para crear conceptos de anuncios de imagen o video y briefs creativos de primer borrador para un equipo de diseño.', en: 'I have used AI to create image or video ad concepts and first-draft creative briefs for a design team.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar 10+ variaciones de copy de anuncios por campaña y uso datos para identificar ganadores antes de escalar el gasto.', en: 'I use AI to generate 10+ ad copy variations per campaign and use data to identify winners before scaling spend.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado herramientas de imagen o video con IA (Midjourney, Runway, HeyGen) para producir assets creativos de paid media directamente.', en: 'I have used AI image or video tools (Midjourney, Runway, HeyGen) to produce paid creative assets directly.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para construir personas de audiencia, frameworks de targeting y definiciones de audiencias semilla para lookalikes.', en: 'I use AI to build audience personas, targeting frameworks, and lookalike seed audience definitions.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para escribir reportes de análisis post-campaña que van a clientes o stakeholders con edición manual mínima.', en: 'I use AI to write post-campaign analysis reports that go to clients or stakeholders with minimal manual editing.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para auditar las ad libraries de competidores (Meta Ad Library, Google Ads Transparency) y extraer insights estratégicos.', en: 'I use AI to audit competitor ad libraries (Meta Ad Library, Google Ads Transparency) and extract strategic insights.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Mantengo una biblioteca de prompts de paid media: frameworks de copy, investigación de audiencia, plantillas de reportes y briefs creativos.', en: 'I maintain a paid media prompt library: copy frameworks, audience research, reporting templates, and creative briefs.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He producido una landing page o feature de producto de media fidelidad usando herramientas de IA (v0, Framer AI, Gamma, Claude Artifacts u otras) sin necesitar un desarrollador o diseñador para comenzar desde cero.', en: 'I have produced a mid-fidelity landing page or product feature using AI tools (v0, Framer AI, Gamma, Claude Artifacts, or similar) without needing a developer or designer to start from scratch.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para construir planes de medios completos — mezcla de canales, asignación de presupuesto, estrategias de pujas — desde un brief y datos históricos de rendimiento.', en: 'I use AI to build full media plans — channel mix, budget allocation, bid strategies — from a brief and historical performance data.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He conectado las APIs de plataformas de anuncios (Meta, Google) a herramientas de IA que generan insights automatizados de rendimiento semanal.', en: 'I have connected ad platform APIs (Meta, Google) to AI tools that generate automated weekly performance insights.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para identificar oportunidades de reasignación de presupuesto en campañas basándome en datos de ROAS, CPA y atribución.', en: 'I use AI to identify budget reallocation opportunities across campaigns based on ROAS, CPA, and attribution data.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar roadmaps de testing creativo — priorizando hooks, formatos y audiencias a testear basándome en datos históricos.', en: 'I use AI to generate creative testing roadmaps — prioritizing hooks, formats, and audiences to test based on historical data.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He usado IA para escribir scripts completos de video UGC, storyboards de anuncios y briefs de creators a escala.', en: 'I have used AI to write full UGC video scripts, ad storyboards, and creator briefs at scale.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para monitorear anomalías de rendimiento de anuncios y alertarme sobre caídas o picos significativos antes de que escalen.', en: 'I use AI to monitor ad performance anomalies and alert me to significant drops or spikes before they escalate.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He producido una landing page o feature de UI de alta fidelidad y lista para producción usando IA (Cursor, Webflow AI, Framer AI o generación de código) que se publicó o fue entregada a un cliente sin retrabajos significativos.', en: 'I have produced a high-fidelity, production-ready landing page or UI feature using AI (Cursor, Webflow AI, Framer AI, or code generation) that went live or was delivered to a client without significant rework.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Colaboro con compañeros de equipo usando GitHub — creando ramas, abriendo pull requests, revisando diffs y resolviendo conflictos de merge — con IA ayudándome a entender o escribir el código involucrado.', en: 'I collaborate with teammates using GitHub — creating branches, opening pull requests, reviewing diffs, and resolving merge conflicts — with AI helping me understand or write the code involved.' }, isNew: true,
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido dashboards automatizados de reportes de paid media donde la IA lee datos de plataforma y genera insights diariamente.', en: 'I have built automated paid media reporting dashboards where AI reads platform data and generates insights daily.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para ejecutar análisis de atribución multi-touch — entendiendo la contribución real de cada canal a la conversión.', en: 'I use AI to run multi-touch attribution analysis — understanding the true contribution of each channel to conversion.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He entrenado IA en voz de marca, datos de audiencia y rendimiento histórico para generar copy de anuncios de alto rendimiento de forma autónoma.', en: 'I have trained AI on brand voice, audience data, and historical performance to generate high-performing ad copy autonomously.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para predecir ROAS, tasas de conversión o CPA para nuevas campañas antes del lanzamiento basándome en patrones históricos.', en: 'I use AI to predict ROAS, conversion rates, or CPA for new campaigns before launch based on historical patterns.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido flujos de trabajo automatizados de pacing de presupuesto y ajuste de pujas usando IA y herramientas de automatización (Make, Zapier, scripts).', en: 'I have built automated budget pacing and bid adjustment workflows using AI and automation tools (Make, Zapier, scripts).' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Mi equipo de paid media usa un flujo de trabajo asistido por IA que construí, con mejoras medibles en ROAS y eficiencia.', en: 'My paid media team uses a documented AI-assisted workflow I built, with measurable improvements in ROAS and efficiency.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He construido herramientas de paid media con IA personalizadas — modelos de puntuación creativa, optimizadores de presupuesto o constructores de audiencia — usadas en producción.', en: 'I have built custom AI paid media tools — creative scoring models, budget optimizers, or audience builders — used in production.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Administro presupuestos de anuncios de varios millones de dólares usando flujos de trabajo de optimización impulsados por IA que requieren intervención manual diaria mínima.', en: 'I manage multi-million dollar ad budgets using AI-driven optimization workflows that require minimal daily manual intervention.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Hago seguimiento del ROI de la IA en paid media con métricas específicas — mejora de ROAS, reducción de CPA, ahorro en costos de producción creativa.', en: 'I track the ROI of AI in paid media with specific metrics — ROAS lift, CPA reduction, creative production cost savings.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Mentoreo a profesionales de paid media en flujos de trabajo asistidos por IA y he documentado la metodología para adopción del equipo.', en: 'I mentor paid media professionals on AI-assisted workflows and have documented the methodology for team adoption.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Contribuyo al entendimiento de la comunidad de paid media sobre la IA a través de casos de estudio, frameworks o charlas.', en: 'I contribute to the paid media community\'s understanding of AI through case studies, frameworks, or speaking.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Lidero la estrategia de paid media con IA en mi organización — con un stack de herramientas definido, proceso y benchmarks de rendimiento.', en: 'I lead the AI paid media strategy at my organization — with a defined toolstack, process, and performance benchmarks.' },
      },
    ],
  },
  'data-analytics': {
    roleId: 'data-analytics',
    roleName: { es: 'Datos y Analytics', en: 'Data & Analytics' },
    questions: [
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para explicar queries SQL, scripts de Python o transformaciones de datos que no entiendo completamente.', en: 'I use AI to explain SQL queries, Python scripts, or data transformations I don\'t fully understand.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para escribir queries SQL para extracción, joins o agregaciones de datos más rápido que escribirlos manualmente.', en: 'I have used AI to write SQL queries for data extraction, joining, or aggregation faster than writing them manually.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para resumir un reporte de datos, dashboard o output de analytics en un resumen ejecutivo en lenguaje sencillo.', en: 'I use AI to summarize a data report, dashboard, or analytics output into a plain-language executive summary.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para generar ideas de visualización de datos o recomendaciones de tipo de gráfico para un conjunto de datos dado.', en: 'I have used AI to generate data visualization ideas or chart type recommendations for a given dataset.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para escribir scripts de Python o R para limpieza, transformación o análisis exploratorio de datos.', en: 'I use AI to write Python or R scripts for data cleaning, transformation, or exploratory analysis.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para auditar una configuración de GA4, configuración de GTM o implementación de tracking en busca de errores.', en: 'I have used AI to audit a GA4 setup, GTM configuration, or tracking implementation for errors.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar configuraciones de tags, triggers y variables de Google Tag Manager (GTM) desde descripciones en lenguaje sencillo.', en: 'I use AI to generate Google Tag Manager (GTM) tags, triggers, and variables configurations from plain-language descriptions.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para escribir y depurar esquemas de eventos de Google Analytics 4, dimensiones personalizadas y planes de medición.', en: 'I use AI to write and debug Google Analytics 4 event schemas, custom dimensions, and measurement plans.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado IA para generar especificaciones de dashboards de Looker Studio, Tableau o Power BI y lógica de campos calculados.', en: 'I have used AI to generate Looker Studio, Tableau, or Power BI dashboard specs and calculated field logic.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para producir narrativas de análisis de datos de primer borrador — interpretando tendencias, anomalías y correlaciones en lenguaje sencillo.', en: 'I use AI to produce first-draft data analysis narratives — interpreting trends, anomalies, and correlations in plain language.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado IA para construir modelos de atribución o análisis de rutas de conversión multi-touch desde datos de eventos en bruto.', en: 'I have used AI to build attribution models or multi-touch conversion path analyses from raw event data.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Mantengo una biblioteca de prompts específicos de datos: plantillas SQL, listas de verificación de auditoría, frameworks de reportes y specs de visualización.', en: 'I maintain a data-specific prompt library: SQL templates, audit checklists, reporting frameworks, and visualization specs.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He producido una landing page o feature de producto de media fidelidad usando herramientas de IA (v0, Framer AI, Gamma, Claude Artifacts u otras) sin necesitar un desarrollador o diseñador para comenzar desde cero.', en: 'I have produced a mid-fidelity landing page or product feature using AI tools (v0, Framer AI, Gamma, Claude Artifacts, or similar) without needing a developer or designer to start from scratch.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para escribir modelos dbt, scripts de BigQuery o lógica de pipelines de datos que procesa eventos en bruto en tablas de analytics limpias.', en: 'I use AI to write dbt models, BigQuery scripts, or data pipeline logic that processes raw events into clean analytics tables.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He construido procesos de QA de tracking asistidos por IA que validan automáticamente los datos de eventos contra un plan de medición.', en: 'I have built AI-assisted tracking QA processes that automatically validate event data against a measurement plan.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar y mantener diccionarios de datos, documentación de tracking y guías de gobernanza de analytics.', en: 'I use AI to generate and maintain data dictionaries, tracking documentation, and analytics governance guides.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He usado IA para diseñar e implementar configuraciones de tagging del lado del servidor (Stape, sGTM) con lógica personalizada de reenvío de eventos.', en: 'I have used AI to design and implement server-side tagging setups (Stape, sGTM) with custom event forwarding logic.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para analizar datos de funnel, curvas de retención de cohortes y métricas de uso de producto y generar recomendaciones priorizadas.', en: 'I use AI to analyze funnel data, cohort retention curves, and product usage metrics and generate prioritized recommendations.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar alertas automatizadas de anomalías — monitoreando métricas clave y notificando a stakeholders cuando los patrones cambian.', en: 'I use AI to generate automated anomaly alerts — monitoring key metrics and notifying stakeholders when patterns break.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He producido una landing page o feature de UI de alta fidelidad y lista para producción usando IA (Cursor, Webflow AI, Framer AI o generación de código) que se publicó o fue entregada a un cliente sin retrabajos significativos.', en: 'I have produced a high-fidelity, production-ready landing page or UI feature using AI (Cursor, Webflow AI, Framer AI, or code generation) that went live or was delivered to a client without significant rework.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Colaboro con compañeros de equipo usando GitHub — creando ramas, abriendo pull requests, revisando diffs y resolviendo conflictos de merge — con IA ayudándome a entender o escribir el código involucrado.', en: 'I collaborate with teammates using GitHub — creating branches, opening pull requests, reviewing diffs, and resolving merge conflicts — with AI helping me understand or write the code involved.' }, isNew: true,
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He conectado datos de GA4, BigQuery y CRM a herramientas de IA que generan reportes semanales automatizados de inteligencia de negocio.', en: 'I have connected GA4, BigQuery, and CRM data to AI tools that generate automated weekly business intelligence reports.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para construir modelos predictivos — predicción de churn, estimación de LTV, probabilidad de conversión — desde datos de comportamiento.', en: 'I use AI to build predictive models — churn prediction, LTV estimation, conversion probability — from behavioral data.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido pipelines de datos en tiempo real donde la IA procesa eventos entrantes y activa acciones de negocio automáticamente.', en: 'I have built real-time data pipelines where AI processes incoming events and triggers business actions automatically.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para auditar y remediar implementaciones de tracking en entornos web y app complejos y multiplataforma.', en: 'I use AI to audit and remediate tracking implementations across complex, multi-platform web and app environments.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He entrenado IA en nuestro modelo de datos y contexto de negocio para responder preguntas en lenguaje natural sobre rendimiento directamente.', en: 'I have trained AI on our data model and business context to answer natural language questions about performance directly.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Mi equipo de analytics sigue un flujo de trabajo de datos asistido por IA que construí, con mejoras medibles en velocidad y exactitud de reportes.', en: 'My analytics team follows a documented AI-assisted data workflow I built, with measurable improvements in reporting speed and accuracy.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He construido herramientas de analytics con IA personalizadas — agentes de reportes automatizados, interfaces de consulta NLP o detectores de anomalías — en producción.', en: 'I have built custom AI analytics tools — automated reporting agents, NLP query interfaces, or anomaly detectors — in production.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Administro una infraestructura de datos donde los agentes de IA monitorean, limpian y reportan sobre la calidad de los datos sin intervención manual diaria.', en: 'I manage a data infrastructure where AI agents monitor, clean, and report on data quality without daily manual intervention.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Hago seguimiento del ROI de la IA en datos y analytics — tiempo ahorrado en reportes, errores reducidos, velocidad de toma de decisiones mejorada — con métricas reales.', en: 'I track the ROI of AI in data and analytics — time saved on reporting, errors reduced, decision speed improved — with real metrics.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Mentoreo a profesionales de datos y analytics en flujos de trabajo asistidos por IA y he documentado la metodología.', en: 'I mentor data and analytics professionals on AI-assisted workflows and have documented the methodology.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Contribuyo al entendimiento de la comunidad de analytics sobre la IA a través de herramientas, casos de estudio o charlas.', en: 'I contribute to the analytics community\'s understanding of AI through tooling, case studies, or speaking.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Lidero la estrategia de datos con IA en mi organización — con una arquitectura definida, stack de herramientas, framework de gobernanza y KPIs de rendimiento.', en: 'I lead the AI data strategy at my organization — with a defined architecture, toolstack, governance framework, and performance KPIs.' },
      },
    ],
  },
'product-manager': {
    roleId: 'product-manager',
    roleName: { es: 'Product Manager', en: 'Product Manager' },
    questions: [
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para escribir primeros borradores de PRDs, especificaciones de features o historias de usuario a partir de notas o sesiones de whiteboard.', en: 'I use AI to write first-draft PRDs, feature specs, or user stories from rough notes or whiteboard sessions.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para resumir transcripciones de entrevistas con usuarios o grabaciones de pruebas de usabilidad en insights clave.', en: 'I have used AI to summarize user interview transcripts or usability test recordings into key insights.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para generar resúmenes de análisis competitivo o briefs de investigación de mercado más rápido que la investigación manual.', en: 'I use AI to generate competitor analysis summaries or market research briefs faster than manual research.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para crear presentaciones, actualizaciones para stakeholders o documentos de sprint review.', en: 'I have used AI to create presentation decks, stakeholder updates, or sprint review documents.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para escribir criterios de aceptación, listas de edge cases o escenarios de QA para las features que estoy construyendo.', en: 'I use AI to write acceptance criteria, edge case lists, or QA test scenarios for features I\'m building.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He pedido a la IA que me ayude a priorizar un backlog explicando los trade-offs entre los elementos.', en: 'I have asked AI to help me prioritize a backlog by explaining trade-offs between items.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar user personas, mapas de empatía o frameworks de Jobs-to-be-Done a partir de datos de investigación.', en: 'I use AI to generate user personas, empathy maps, or Jobs-to-be-Done frameworks from research data.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado IA para redactar OKRs, métricas de éxito o frameworks de KPIs para iniciativas de producto.', en: 'I have used AI to draft OKRs, success metrics, or KPI frameworks for product initiatives.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para escribir hipótesis de A/B tests, diseños de experimentos y resúmenes de análisis post-test.', en: 'I use AI to write A/B test hypotheses, experiment designs, and post-test analysis summaries.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para sintetizar datos cualitativos de múltiples fuentes de investigación en un reporte único de insights priorizados.', en: 'I use AI to synthesize qualitative data from multiple research sources into a single prioritized insights report.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Mantengo una biblioteca de prompts específica para PM para tareas recurrentes: specs, briefs, análisis y comunicaciones con stakeholders.', en: 'I maintain a PM-specific prompt library for recurring tasks: specs, briefs, analysis, and stakeholder communications.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado IA para producir slides de roadmap o narrativas estratégicas que fueron directamente a liderazgo o inversionistas.', en: 'I have used AI to produce roadmap slides or strategic narratives that went directly to leadership or investors.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He producido una landing page o feature de producto de media fidelidad usando herramientas de IA (v0, Framer AI, Gamma, Claude Artifacts u otras) sin necesitar un desarrollador o diseñador para comenzar desde cero.', en: 'I have produced a mid-fidelity landing page or product feature using AI tools (v0, Framer AI, Gamma, Claude Artifacts, or similar) without needing a developer or designer to start from scratch.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para ejecutar inteligencia competitiva — rastreando lanzamientos de competidores, cambios de precios y posicionamiento semanalmente.', en: 'I use AI to run competitive intelligence — tracking competitor releases, pricing changes, and positioning weekly.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He usado IA para diseñar y documentar contratos de API, modelos de datos o especificaciones técnicas compartidas con ingeniería.', en: 'I have used AI to design and document API contracts, data models, or technical specs shared with engineering.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar resúmenes de retrospectivas de sprint, análisis de velocidad o reportes de rendimiento del equipo automáticamente.', en: 'I use AI to generate sprint retrospective summaries, velocity analyses, or team performance reports automatically.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para escribir e iterar en copy de product marketing — declaraciones de posicionamiento, anuncios de features y release notes.', en: 'I use AI to write and iterate on product marketing copy — positioning statements, feature announcements, release notes.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para analizar datos de NPS, tickets de soporte o razones de churn y generar recomendaciones de mejora del producto.', en: 'I use AI to analyze NPS data, support tickets, or churn reasons and generate product improvement recommendations.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He producido una landing page o feature de UI de alta fidelidad y lista para producción usando IA (Cursor, Webflow AI, Framer AI o generación de código) que se publicó o fue entregada a un cliente sin retrabajos significativos.', en: 'I have produced a high-fidelity, production-ready landing page or UI feature using AI (Cursor, Webflow AI, Framer AI, or code generation) that went live or was delivered to a client without significant rework.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Colaboro con compañeros de equipo usando GitHub — creando ramas, abriendo pull requests, revisando diffs y resolviendo conflictos de merge — con IA ayudándome a entender o escribir el código involucrado.', en: 'I collaborate with teammates using GitHub — creating branches, opening pull requests, reviewing diffs, and resolving merge conflicts — with AI helping me understand or write the code involved.' }, isNew: true,
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He conectado analíticas de producto (Mixpanel, Amplitude, GA4) a herramientas de IA que generan reportes de insights semanales automáticamente.', en: 'I have connected product analytics (Mixpanel, Amplitude, GA4) to AI tools that generate weekly insight reports automatically.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para construir modelos predictivos o análisis de cohortes — riesgo de churn, LTV, adopción de features — para guiar decisiones del roadmap.', en: 'I use AI to build predictive models or cohort analyses — churn risk, LTV, feature adoption — to guide roadmap decisions.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido o configurado herramientas internas de IA — generadores de specs, sintetizadores de research o frameworks de priorización — usadas por mi equipo.', en: 'I have built or configured internal AI tools — spec generators, research synthesizers, or prioritization frameworks — used by my team.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para monitorear feedback de usuarios en todos los canales (soporte, reseñas, redes sociales) y detectar temas en tiempo real.', en: 'I use AI to monitor user feedback across all channels (support, reviews, social) and surface themes in real time.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He entrenado IA con el contexto de nuestro producto y la uso para incorporar nuevos PMs o responder preguntas internas sobre el producto con precisión.', en: 'I have trained AI on our product\'s context and use it to onboard new PMs or answer internal product questions accurately.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para simular journeys de usuario o predecir cómo un cambio de feature impactará métricas clave antes de construirlo.', en: 'I use AI to simulate user journeys or predict how a feature change will impact key metrics before building it.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Mi equipo sigue un proceso documentado de product management asistido por IA que yo ayudé a definir, con mejoras medibles en velocidad de entrega.', en: 'My team follows a documented AI-assisted product management process I helped define, with measurable improvements in delivery speed.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He diseñado experiencias de producto nativas de IA — productos donde la IA es la propuesta de valor central, no una capa de funcionalidad adicional.', en: 'I have designed AI-native product experiences — products where AI is core to the user value proposition, not a feature layer.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Uso agentes de IA que monitorean métricas de producto y detectan anomalías u oportunidades proactivamente sin mi intervención diaria.', en: 'I use AI agents that monitor product metrics and proactively surface anomalies or opportunities without my daily input.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Hago seguimiento del impacto de negocio del trabajo de PM asistido por IA — time-to-ship, velocidad de experimentación, ciclo de investigación — con datos reales.', en: 'I track the business impact of AI-assisted PM work — time-to-ship, experiment velocity, research cycle time — with real data.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Lidero la estrategia de producto con IA en mi organización — con un roadmap definido, stack de herramientas y metodología a nivel de equipo.', en: 'I lead the AI product strategy at my organization — with a defined roadmap, toolstack, and team-wide methodology.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Mentoreo a otros product managers en flujos de trabajo asistidos por IA y he documentado el playbook para la adopción en el equipo.', en: 'I mentor other product managers on AI-assisted workflows and have documented the playbook for team adoption.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Contribuyo al entendimiento de la comunidad de PM sobre IA a través de escritura, charlas, frameworks o herramientas open-source.', en: 'I contribute to the PM community\'s understanding of AI through writing, talks, frameworks, or open-source tooling.' },
      },
    ],
  },
  'sales-bdr': {
    roleId: 'sales-bdr',
    roleName: { es: 'Ventas & BDR', en: 'Sales & BDR' },
    questions: [
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para escribir primeros borradores de correos de outreach, mensajes de LinkedIn y guiones de llamadas en frío personalizados para cada prospecto.', en: 'I use AI to write first-draft outreach emails, LinkedIn messages, and cold call scripts personalized to each prospect.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para investigar la empresa de un prospecto — noticias recientes, financiamiento, pain points — antes de una llamada de ventas.', en: 'I have used AI to research a prospect\'s company — recent news, funding, pain points — before a sales call.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para generar guiones de manejo de objeciones o talk tracks para los rechazos más comunes que enfrento.', en: 'I use AI to generate objection-handling scripts or talk tracks for the most common pushbacks I face.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para resumir una grabación o transcripción de llamada de ventas en insights clave y próximos pasos.', en: 'I have used AI to summarize a sales call recording or transcript into key insights and next steps.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para escribir correos de seguimiento después de demos o llamadas de discovery más rápido que escribiéndolos manualmente.', en: 'I use AI to write follow-up emails after demos or discovery calls faster than writing them manually.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para investigar el posicionamiento de un competidor y generar una battle card o documento comparativo.', en: 'I have used AI to research a competitor\'s positioning and generate a battle card or comparison document.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para construir secuencias de outreach multi-paso — correos, toques en LinkedIn y guiones de llamada — adaptadas a diferentes personas.', en: 'I use AI to build multi-step outreach sequences — emails, LinkedIn touches, and call scripts — tailored to different personas.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar propuestas personalizadas, pitch decks o one-pagers para cuentas y casos de uso específicos.', en: 'I use AI to generate personalized proposals, pitch decks, or one-pagers for specific accounts and use cases.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado IA para definir y puntuar ICPs (perfiles de cliente ideal) usando señales firmográficas y de comportamiento.', en: 'I have used AI to define and score ICP (ideal customer profiles) using firmographic and behavioral signals.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para escribir notas en el CRM, actualizar etapas de deals y registrar resúmenes de actividad después de cada interacción.', en: 'I use AI to write CRM notes, update deal stages, and log activity summaries after every interaction.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Mantengo una biblioteca de prompts específica para ventas: plantillas de outreach, guiones de objeciones, briefs de investigación y frameworks de propuestas.', en: 'I maintain a sales-specific prompt library: outreach templates, objection scripts, research briefs, and proposal frameworks.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para analizar los datos de mi pipeline e identificar deals en riesgo u oportunidades para acelerar.', en: 'I use AI to analyze my pipeline data and identify deals at risk or opportunities to accelerate.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He producido una landing page o feature de producto de media fidelidad usando herramientas de IA (v0, Framer AI, Gamma, Claude Artifacts u otras) sin necesitar un desarrollador o diseñador para comenzar desde cero.', en: 'I have produced a mid-fidelity landing page or product feature using AI tools (v0, Framer AI, Gamma, Claude Artifacts, or similar) without needing a developer or designer to start from scratch.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar casos de estudio personalizados, calculadoras de ROI o documentos de prueba de concepto para prospectos específicos.', en: 'I use AI to generate personalized case studies, ROI calculators, or proof-of-concept documents for specific prospects.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He conectado mi CRM a herramientas de IA que generan automáticamente resúmenes de deals, alertas de riesgo y recomendaciones de próximos pasos.', en: 'I have connected my CRM to AI tools that automatically generate deal summaries, risk flags, and next-step recommendations.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para monitorear empresas prospecto en busca de eventos detonantes — rondas de financiamiento, cambios de liderazgo, vacantes publicadas — en tiempo real.', en: 'I use AI to monitor prospect companies for trigger events — funding rounds, leadership changes, job postings — in real time.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para autocoachearme en llamadas — analizando transcripciones por ratio hablar/escuchar, preguntas de discovery faltantes y menciones competitivas.', en: 'I use AI to coach myself on calls — analyzing transcripts for talk/listen ratio, missing discovery questions, and competitive mentions.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He usado IA para producir planes de territorio, mapas de cuentas o planes estratégicos de cuenta para cuentas enterprise.', en: 'I have used AI to produce territory plans, account maps, or strategic account plans for enterprise accounts.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He producido una landing page o feature de UI de alta fidelidad y lista para producción usando IA (Cursor, Webflow AI, Framer AI o generación de código) que se publicó o fue entregada a un cliente sin retrabajos significativos.', en: 'I have produced a high-fidelity, production-ready landing page or UI feature using AI (Cursor, Webflow AI, Framer AI, or code generation) that went live or was delivered to a client without significant rework.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Colaboro con compañeros de equipo usando GitHub — creando ramas, abriendo pull requests, revisando diffs y resolviendo conflictos de merge — con IA ayudándome a entender o escribir el código involucrado.', en: 'I collaborate with teammates using GitHub — creating branches, opening pull requests, reviewing diffs, and resolving merge conflicts — with AI helping me understand or write the code involved.' }, isNew: true,
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido pipelines automatizados de prospección donde la IA identifica, califica y enriquece leads sin intervención manual.', en: 'I have built automated prospecting pipelines where AI identifies, qualifies, and enriches leads without manual intervention.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para ejecutar análisis de win/loss — leyendo notas de deals y transcripciones de llamadas para identificar patrones en deals ganados y perdidos.', en: 'I use AI to run win/loss analysis — reading deal notes and call transcripts to identify patterns in won and lost deals.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He entrenado IA con nuestro producto, info competitiva y metodología de ventas para generar outreach on-brand y preciso a escala.', en: 'I have trained AI on our product, competitive info, and sales methodology to generate on-brand, accurate outreach at scale.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para generar modelos de forecasting de ventas — prediciendo tasas de cierre, tamaño de deal y tiempo de cierre a partir de datos históricos.', en: 'I use AI to generate sales forecasting models — predicting close rates, deal size, and time-to-close from historical data.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido onboarding asistido por IA para nuevos representantes de ventas — materiales de capacitación, guiones de roleplay y trackers de ramp-up.', en: 'I have built AI-assisted onboarding for new sales reps — training materials, roleplay scripts, and ramp trackers.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para generar reportes semanales de pipeline que van a liderazgo con análisis y recomendaciones — con mínima edición manual.', en: 'I use AI to generate weekly pipeline reports that go to leadership with analysis and recommendations — minimal manual editing.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Mi equipo sigue un proceso de ventas asistido por IA documentado que yo ayudé a definir, con mejoras medibles en conversión o eficiencia.', en: 'My team follows a documented AI-assisted sales process I helped define, with measurable improvements in conversion or efficiency.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He construido herramientas de IA personalizadas para ventas — modelos de lead scoring, generadores de outreach o dashboards de deal intelligence — usadas en producción.', en: 'I have built custom AI sales tools — lead scoring models, outreach generators, or deal intelligence dashboards — used in production.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Gestiono un pipeline de ventas usando flujos de trabajo de IA donde la prospección, calificación y seguimiento operan en gran medida de forma autónoma.', en: 'I manage a sales pipeline using AI workflows where prospecting, qualification, and follow-up run largely autonomously.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Hago seguimiento del ROI de la IA en ventas — ingreso por representante, velocidad de deals, tasas de respuesta de outreach — con métricas específicas.', en: 'I track the ROI of AI in sales — revenue per rep, deal velocity, outreach response rates — with specific metrics.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Mentoreo a profesionales de ventas en venta asistida por IA y he documentado la metodología para la adopción en el equipo.', en: 'I mentor sales professionals on AI-assisted selling and have documented the methodology for team adoption.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Contribuyo al entendimiento de la comunidad de ventas sobre IA a través de casos de estudio, frameworks o charlas.', en: 'I contribute to the sales community\'s understanding of AI through case studies, frameworks, or speaking engagements.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Lidero la estrategia de ventas con IA en mi organización — con un playbook definido, stack de herramientas y metas de rendimiento medibles.', en: 'I lead the AI sales strategy at my organization — with a defined playbook, toolstack, and measurable performance targets.' },
      },
    ],
  },
  'customer-success': {
    roleId: 'customer-success',
    roleName: { es: 'Customer Success', en: 'Customer Success' },
    questions: [
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para escribir correos de onboarding, mensajes de check-in y comunicaciones de renovación personalizados para cada cliente.', en: 'I use AI to write onboarding emails, check-in messages, and renewal communications personalized to each customer.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para resumir una transcripción de llamada con cliente o hilo de tickets de soporte en problemas clave y acciones a tomar.', en: 'I have used AI to summarize a customer call transcript or support ticket thread into key issues and action items.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para investigar el negocio de un cliente — noticias recientes, tendencias de la industria — antes de un QBR o llamada de seguimiento.', en: 'I use AI to research a customer\'s business — recent news, industry trends — before a QBR or check-in call.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para generar documentación de FAQ, artículos de base de conocimiento o guías paso a paso para la educación del cliente.', en: 'I have used AI to generate FAQ documentation, knowledge base articles, or how-to guides for customer education.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para redactar presentaciones de executive business review (QBR) o resúmenes de salud del cliente.', en: 'I use AI to draft executive business review (QBR) presentations or customer health summaries.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para escribir correos de escalación, propuestas de renovación o guiones de pitch de upsell.', en: 'I have used AI to write escalation emails, renewal proposals, or upsell pitch scripts.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar planes de éxito personalizados, playbooks de onboarding o hitos de adopción para cuentas individuales.', en: 'I use AI to generate personalized success plans, onboarding playbooks, or adoption milestones for individual accounts.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para analizar datos de uso de producto e identificar clientes en riesgo de churn o listos para expansión.', en: 'I use AI to analyze product usage data and identify customers who are at risk of churning or ready for expansion.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado IA para crear materiales de capacitación por rol, guiones de video o secuencias de onboarding para clientes a escala.', en: 'I have used AI to create role-specific training materials, video scripts, or onboarding sequences for customers at scale.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Mantengo una biblioteca de prompts específica para CS: plantillas de onboarding, guiones de check-in, frameworks de escalación y estructuras de QBR.', en: 'I maintain a CS-specific prompt library: onboarding templates, check-in scripts, escalation frameworks, and QBR structures.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar health scores de clientes combinando datos de uso de producto, NPS y engagement.', en: 'I use AI to generate customer health scores by combining product usage, NPS, and engagement data.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado IA para producir casos de estudio de clientes, historias de éxito o resúmenes de ROI para marketing y ventas.', en: 'I have used AI to produce customer case studies, success stories, or ROI summaries for marketing and sales.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He producido una landing page o feature de producto de media fidelidad usando herramientas de IA (v0, Framer AI, Gamma, Claude Artifacts u otras) sin necesitar un desarrollador o diseñador para comenzar desde cero.', en: 'I have produced a mid-fidelity landing page or product feature using AI tools (v0, Framer AI, Gamma, Claude Artifacts, or similar) without needing a developer or designer to start from scratch.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para monitorear el sentimiento del cliente en tickets de soporte, respuestas de NPS y reseñas de producto — señalando automáticamente cuentas en riesgo.', en: 'I use AI to monitor customer sentiment across support tickets, NPS responses, and product reviews — automatically flagging at-risk accounts.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He construido procesos de renovación asistidos por IA — la IA genera propuestas de renovación, evaluaciones de riesgo y guiones de negociación automáticamente.', en: 'I have built AI-assisted renewal processes — AI generates renewal proposals, risk assessments, and negotiation scripts automatically.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para analizar datos de churn y generar playbooks para prevenir tipos específicos de deserción de clientes.', en: 'I use AI to analyze churn data and generate playbooks for preventing specific types of customer attrition.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He conectado mi CRM a herramientas de IA que generan resúmenes semanales de salud de cuentas sin intervención manual.', en: 'I have connected my CRM to AI tools that generate weekly account health summaries without manual input.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para producir modelos de segmentación de clientes — agrupando cuentas por comportamiento, salud y potencial de expansión.', en: 'I use AI to produce customer segmentation models — grouping accounts by behavior, health, and expansion potential.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He producido una landing page o feature de UI de alta fidelidad y lista para producción usando IA (Cursor, Webflow AI, Framer AI o generación de código) que se publicó o fue entregada a un cliente sin retrabajos significativos.', en: 'I have produced a high-fidelity, production-ready landing page or UI feature using AI (Cursor, Webflow AI, Framer AI, or code generation) that went live or was delivered to a client without significant rework.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Colaboro con compañeros de equipo usando GitHub — creando ramas, abriendo pull requests, revisando diffs y resolviendo conflictos de merge — con IA ayudándome a entender o escribir el código involucrado.', en: 'I collaborate with teammates using GitHub — creating branches, opening pull requests, reviewing diffs, and resolving merge conflicts — with AI helping me understand or write the code involved.' }, isNew: true,
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido pipelines automatizados de monitoreo de salud del cliente donde la IA lee datos de producto y dispara intervenciones automáticamente.', en: 'I have built automated customer health monitoring pipelines where AI reads product data and triggers interventions automatically.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para predecir probabilidad de churn, potencial de expansión y LTV de cada cuenta — informando decisiones de asignación de recursos.', en: 'I use AI to predict churn probability, expansion potential, and LTV for each account — informing resource allocation decisions.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He entrenado IA con nuestro producto y contexto del cliente para generar respuestas precisas y on-brand a preguntas comunes de clientes.', en: 'I have trained AI on our product and customer context to generate accurate, on-brand responses to common customer questions.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para generar coaching en tiempo real para conversaciones de CS — señalando oportunidades perdidas o sugiriendo mejores acciones a seguir.', en: 'I use AI to generate real-time coaching for CS conversations — flagging missed opportunities or suggesting next-best actions.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido flujos de generación automatizada de QBRs donde la IA crea presentaciones específicas por cuenta a partir de datos de uso de producto.', en: 'I have built automated QBR generation workflows where AI creates account-specific presentations from product usage data.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para producir reportes de rendimiento del equipo de CS — métricas de clientes, KPIs del equipo y recomendaciones — automáticamente cada semana.', en: 'I use AI to produce CS team performance reports — customer metrics, team KPIs, and recommendations — automatically each week.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Mi equipo de CS sigue un flujo de trabajo asistido por IA documentado que yo construí, con mejoras medibles en retención, NPS o tiempo por cuenta.', en: 'My CS team follows a documented AI-assisted workflow I built, with measurable improvements in retention, NPS, or time-per-account.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He construido herramientas de IA personalizadas para CS — modelos de predicción de churn, motores de health score o bots de onboarding automatizado — usadas en producción.', en: 'I have built custom AI CS tools — churn prediction models, health score engines, or automated onboarding bots — used in production.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Gestiono un portafolio de clientes donde la IA maneja monitoreo de salud rutinario, alertas y comunicaciones de forma autónoma.', en: 'I manage a customer portfolio where AI handles routine health monitoring, alerts, and communications autonomously.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Hago seguimiento del ROI de la IA en customer success — reducción de tasa de churn, mejora de NPS, costo por cliente gestionado — con datos reales.', en: 'I track the ROI of AI in customer success — churn rate reduction, NPS improvement, cost-per-customer-managed — with real data.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Mentoreo a profesionales de CS en flujos de trabajo asistidos por IA y he documentado la metodología para la adopción en el equipo.', en: 'I mentor CS professionals on AI-assisted workflows and have documented the methodology for team adoption.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Contribuyo al entendimiento de la comunidad de CS sobre IA a través de casos de estudio, frameworks o charlas.', en: 'I contribute to the CS community\'s understanding of AI through case studies, frameworks, or speaking engagements.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Lidero la estrategia de customer success con IA en mi organización — con un playbook definido, stack de herramientas y benchmarks de retención.', en: 'I lead the AI customer success strategy at my organization — with a defined playbook, toolstack, and retention benchmarks.' },
      },
    ],
  },
  'video-editor': {
    roleId: 'video-editor',
    roleName: { es: 'Editor de Video', en: 'Video Editor' },
    questions: [
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para escribir guiones de video, outlines de episodios o listas de tomas a partir de un brief o tema.', en: 'I use AI to write video scripts, episode outlines, or shot lists from a brief or topic prompt.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado herramientas de IA para auto-generar subtítulos, captions o transcripciones para contenido de video (Descript, Captions.ai, CapCut).', en: 'I have used AI tools to auto-generate captions, subtitles, or transcriptions for video content (Descript, Captions.ai, CapCut).' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para generar conceptos de thumbnails, variaciones de títulos o metadata de plataformas para mejorar la visibilidad del contenido.', en: 'I use AI to generate thumbnail concepts, title variations, or platform metadata to improve discoverability.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado Runway, Pika o Kling para generar un clip de video corto o motion graphic con IA.', en: 'I have used Runway, Pika, or Kling to generate a short AI video clip or motion graphic.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para eliminar ruido de fondo, limpiar audio o mejorar la calidad de video automáticamente.', en: 'I use AI to remove background noise, clean up audio, or enhance video quality automatically.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para generar voiceovers o narración usando herramientas de texto-a-voz (ElevenLabs, Murf, Play.ht).', en: 'I have used AI to generate voiceovers or narration using text-to-speech tools (ElevenLabs, Murf, Play.ht).' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para cortar automáticamente videos de formato largo en clips cortos optimizados para redes sociales (Opus Clip, Descript, Vizard).', en: 'I use AI to automatically cut long-form videos into short clips optimized for social media (Opus Clip, Descript, Vizard).' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado HeyGen o Synthesia para crear un video de avatar con IA tipo talking-head a partir de un guión de texto.', en: 'I have used HeyGen or Synthesia to create a talking-head AI avatar video from a text script.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para clonar una voz — la mía o la de un cliente — para narración consistente en múltiples videos sin re-grabar.', en: 'I use AI to clone a voice — my own or a client\'s — for consistent narration across multiple videos without re-recording.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar conceptos de B-roll, descripciones de tomas o paneles de storyboard para una producción de video.', en: 'I use AI to generate B-roll concepts, shot descriptions, or storyboard panels for a video production.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para traducir o doblar videos a múltiples idiomas usando herramientas de lip-sync con IA.', en: 'I use AI to translate or dub videos into multiple languages using AI lip-sync tools.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Mantengo una biblioteca de prompts específica para producción: plantillas de guiones, briefs de thumbnails, estructuras de storyboard y frameworks de metadata.', en: 'I maintain a production-specific prompt library: script templates, thumbnail briefs, storyboard structures, and metadata frameworks.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He producido una landing page o feature de producto de media fidelidad usando herramientas de IA (v0, Framer AI, Gamma, Claude Artifacts u otras) sin necesitar un desarrollador o diseñador para comenzar desde cero.', en: 'I have produced a mid-fidelity landing page or product feature using AI tools (v0, Framer AI, Gamma, Claude Artifacts, or similar) without needing a developer or designer to start from scratch.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para automatizar flujos de edición de video — cortes rough, corrección de color, normalización de audio — que antes requerían edición manual.', en: 'I use AI to automate video editing workflows — rough cuts, color grading, audio normalization — that previously required manual editing.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He usado IA para producir un video completo de guión a exportación final con mínima intervención de edición manual.', en: 'I have used AI to produce a complete video from script to final export with minimal manual editing intervention.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar motion graphics, texto animado o efectos visuales que antes requerían conocimientos de After Effects.', en: 'I use AI to generate motion graphics, animated text, or visual effects that would previously require After Effects skills.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para analizar datos de rendimiento de video y generar recomendaciones para mejorar engagement, retención o CTR.', en: 'I use AI to analyze video performance data and generate recommendations for improving engagement, retention, or CTR.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He construido un pipeline de producción de video donde la IA maneja guiones, edición, subtítulos y generación de thumbnails de forma sistemática.', en: 'I have built a video production pipeline where AI handles scripting, editing, captions, and thumbnail generation systematically.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He producido una landing page o feature de UI de alta fidelidad y lista para producción usando IA (Cursor, Webflow AI, Framer AI o generación de código) que se publicó o fue entregada a un cliente sin retrabajos significativos.', en: 'I have produced a high-fidelity, production-ready landing page or UI feature using AI (Cursor, Webflow AI, Framer AI, or code generation) that went live or was delivered to a client without significant rework.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Colaboro con compañeros de equipo usando GitHub — creando ramas, abriendo pull requests, revisando diffs y resolviendo conflictos de merge — con IA ayudándome a entender o escribir el código involucrado.', en: 'I collaborate with teammates using GitHub — creating branches, opening pull requests, reviewing diffs, and resolving merge conflicts — with AI helping me understand or write the code involved.' }, isNew: true,
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He usado IA para generar un cortometraje, anuncio o video de marca completamente original donde la IA creó los visuales, audio y narrativa.', en: 'I have used AI to generate a fully original short film, ad, or branded video where AI created the visuals, audio, and narrative.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para producir contenido de video personalizado a escala — diferentes versiones para diferentes audiencias — sin re-grabar.', en: 'I use AI to produce personalized video content at scale — different versions for different audiences — without re-shooting.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He conectado plataformas de video (YouTube, Vimeo) a herramientas de IA que generan reportes de rendimiento y recomendaciones de contenido semanalmente.', en: 'I have connected video platforms (YouTube, Vimeo) to AI tools that generate performance reports and content recommendations weekly.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para construir experiencias de video interactivas — narrativas ramificadas, mensajes personalizados o contenido dinámico — para clientes.', en: 'I use AI to build interactive video experiences — branching narratives, personalized messages, or dynamic content — for clients.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He entrenado IA con los lineamientos de marca de un cliente para generar contenido de video on-brand con estilo visual y tono consistentes.', en: 'I have trained AI on a client\'s brand guidelines to generate on-brand video content with consistent visual style and tone.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para escribir propuestas, documentos de tratamiento y briefs de producción para proyectos con clientes — reduciendo el tiempo de pre-producción.', en: 'I use AI to write proposals, treatment documents, and production briefs for client projects — reducing pre-production time.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Mi equipo de producción sigue un flujo de trabajo asistido por IA documentado que yo construí, con reducciones medibles en tiempo de entrega y costo de producción.', en: 'My production team follows a documented AI-assisted workflow I built, with measurable reductions in delivery time and production cost.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He construido herramientas de IA personalizadas para video — pipelines de repurposing automatizado, generadores de video con voz de marca o dashboards de analytics — usadas en producción.', en: 'I have built custom AI video tools — automated repurposing pipelines, brand voice video generators, or analytics dashboards — used in production.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Produzco video a una escala que antes era imposible — múltiples videos completamente producidos por día — usando flujos de trabajo potenciados por IA.', en: 'I produce video at a scale that was previously impossible — multiple fully-produced videos per day — using AI-powered workflows.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Hago seguimiento del ROI de la IA en producción de video — horas ahorradas, costo por minuto producido, métricas de calidad — con datos reales.', en: 'I track the ROI of AI in video production — hours saved, cost per minute produced, quality metrics — with real data.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Mentoreo a profesionales de video en flujos de producción asistidos por IA y he documentado la metodología públicamente.', en: 'I mentor video professionals on AI-assisted production workflows and have documented the methodology publicly.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Contribuyo al entendimiento de la comunidad de video sobre IA a través de tutoriales, casos de estudio o charlas.', en: 'I contribute to the video community\'s understanding of AI through tutorials, case studies, or speaking engagements.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Lidero la estrategia de video con IA en mi organización — con un stack de herramientas definido, proceso de producción y estándares de calidad.', en: 'I lead the AI video strategy at my organization — with a defined toolstack, production process, and quality standards.' },
      },
    ],
  },
  'founder-executive': {
    roleId: 'founder-executive',
    roleName: { es: 'Fundador & Ejecutivo', en: 'Founder & Executive' },
    questions: [
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para escribir primeros borradores de documentos estratégicos — actualizaciones para inversionistas, decks de junta directiva, planes anuales — más rápido que manualmente.', en: 'I use AI to write first drafts of strategic documents — investor updates, board decks, annual plans — faster than manually.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para investigar un mercado, panorama competitivo o tesis de inversión antes de una reunión o decisión clave.', en: 'I have used AI to research a market, competitive landscape, or investment thesis before a key meeting or decision.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para resumir documentos extensos, reportes o grabaciones de reuniones en puntos clave y acciones a tomar.', en: 'I use AI to summarize long documents, reports, or meeting recordings into key points and action items.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para redactar comunicaciones importantes — anuncios al equipo, correos a clientes o acuerdos con socios.', en: 'I have used AI to draft important communications — team announcements, customer emails, or partner agreements.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para generar y stress-testear ideas de nuevos productos, servicios o modelos de negocio rápidamente.', en: 'I use AI to generate and stress-test ideas for new products, services, or business models quickly.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para prepararme para conversaciones difíciles — negociaciones, evaluaciones de desempeño, pitches a inversionistas — con escenarios y puntos de conversación.', en: 'I have used AI to prepare for difficult conversations — negotiations, performance reviews, investor pitches — with scenarios and talking points.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para realizar inteligencia competitiva — rastreando movimientos de competidores, cambios de precios y señales de mercado semanalmente.', en: 'I use AI to conduct competitive intelligence — tracking competitor moves, pricing changes, and market signals weekly.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado IA para construir modelos financieros, proyecciones o análisis de escenarios más rápido que con hojas de cálculo tradicionales.', en: 'I have used AI to build financial models, forecasts, or scenario analyses faster than with traditional spreadsheets.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar contenido de thought leadership — posts de LinkedIn, artículos, charlas — que refleja mi voz auténtica.', en: 'I use AI to generate content for thought leadership — LinkedIn posts, articles, talks — that reflects my authentic voice.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para preparar materiales para inversionistas — pitch decks, documentos de data room y respuestas de due diligence — a un alto estándar.', en: 'I use AI to prepare investor materials — pitch decks, data room documents, and due diligence responses — at a high standard.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Mantengo una biblioteca de prompts específica para ejecutivos para tareas recurrentes: briefs estratégicos, comunicaciones, análisis y planificación.', en: 'I maintain an executive-specific prompt library for recurring tasks: strategic briefs, communications, analysis, and planning.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado IA para ejecutar procesos de toma de decisiones estructurados — análisis pro/contra, evaluación de riesgos, mapeo de stakeholders — en decisiones importantes.', en: 'I have used AI to run structured decision-making processes — pro/con analysis, risk assessment, stakeholder mapping — on major decisions.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He producido una landing page o feature de producto de media fidelidad usando herramientas de IA (v0, Framer AI, Gamma, Claude Artifacts u otras) sin necesitar un desarrollador o diseñador para comenzar desde cero.', en: 'I have produced a mid-fidelity landing page or product feature using AI tools (v0, Framer AI, Gamma, Claude Artifacts, or similar) without needing a developer or designer to start from scratch.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar resúmenes ejecutivos semanales de todas las funciones del negocio — ventas, marketing, producto, operaciones — automáticamente.', en: 'I use AI to generate weekly executive summaries across all business functions — sales, marketing, product, ops — automatically.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He conectado datos de negocio (CRM, finanzas, analíticas de producto) a herramientas de IA que detectan insights y anomalías proactivamente.', en: 'I have connected business data (CRM, finance, product analytics) to AI tools that surface insights and anomalies proactively.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para construir e iterar en documentos de estrategia de la empresa — OKRs, posicionamiento, planes de go-to-market — con mayor profundidad y velocidad.', en: 'I use AI to build and iterate on company strategy documents — OKRs, positioning, go-to-market plans — at greater depth and speed.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He usado IA para diseñar y documentar procesos organizacionales, playbooks o sistemas operativos para mi equipo.', en: 'I have used AI to design and document organizational processes, playbooks, or operating systems for my team.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para monitorear tendencias de la industria, cambios regulatorios y amenazas competitivas y briefear a mi equipo de liderazgo semanalmente.', en: 'I use AI to monitor industry trends, regulatory changes, and competitive threats and brief my leadership team weekly.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He producido una landing page o feature de UI de alta fidelidad y lista para producción usando IA (Cursor, Webflow AI, Framer AI o generación de código) que se publicó o fue entregada a un cliente sin retrabajos significativos.', en: 'I have produced a high-fidelity, production-ready landing page or UI feature using AI (Cursor, Webflow AI, Framer AI, or code generation) that went live or was delivered to a client without significant rework.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Colaboro con compañeros de equipo usando GitHub — creando ramas, abriendo pull requests, revisando diffs y resolviendo conflictos de merge — con IA ayudándome a entender o escribir el código involucrado.', en: 'I collaborate with teammates using GitHub — creating branches, opening pull requests, reviewing diffs, and resolving merge conflicts — with AI helping me understand or write the code involved.' }, isNew: true,
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido una cadencia operativa potenciada por IA — reportes automatizados, dashboards y resúmenes que funcionan sin mi intervención diaria.', en: 'I have built an AI-powered operating cadence — automated reports, dashboards, and summaries that run without my daily input.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para identificar, evaluar y priorizar talento — la IA filtra, puntúa y resume candidatos antes de la revisión humana.', en: 'I use AI to identify, assess, and prioritize talent — AI screens, scores, and summarizes candidates before human review.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He usado IA para acelerar funciones de negocio importantes — reemplazando o aumentando roles que habrían requerido contrataciones adicionales.', en: 'I have used AI to accelerate major business functions — replacing or augmenting roles that would have required additional hires.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para modelar y stress-testear escenarios estratégicos — entrada a mercados, cambios de precios, M&A — antes de tomar decisiones.', en: 'I use AI to model and stress-test strategic scenarios — market entry, pricing changes, M&A — before committing to decisions.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He entrenado IA con el contexto, cultura y principios operativos de mi empresa para guiar decisiones del equipo de forma consistente.', en: 'I have trained AI on my company\'s context, culture, and operating principles to guide team decisions consistently.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para generar materiales de junta directiva — resúmenes financieros, actualizaciones estratégicas y dashboards de métricas — automáticamente cada trimestre.', en: 'I use AI to generate board materials — financial summaries, strategic updates, and metric dashboards — automatically each quarter.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Mi organización tiene una estrategia de adopción de IA definida que yo diseñé, con resultados medibles de productividad y ventaja competitiva.', en: 'My organization has a defined AI adoption strategy I designed, with measurable productivity and competitive advantage outcomes.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He construido productos o servicios nativos de IA — donde la IA es el motor central de valor, no una herramienta de productividad agregada.', en: 'I have built AI-native products or services — where AI is the core value driver, not a productivity tool layered on top.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Uso agentes de IA que monitorean el negocio de forma autónoma, detectan problemas críticos y redactan acciones recomendadas sin mi intervención.', en: 'I use AI agents that autonomously monitor the business, surface critical issues, and draft recommended actions without my prompt.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Hago seguimiento del ROI de la IA en toda la organización — impacto en ingresos, ahorro de costos, posicionamiento competitivo — con métricas reales.', en: 'I track the ROI of AI across the entire organization — revenue impact, cost savings, competitive positioning — with real metrics.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Lidero la transformación con IA de mi organización — con presupuesto, roadmap, estructura de responsabilidad y resultados medibles.', en: 'I lead the AI transformation of my organization — with a budget, roadmap, accountability structure, and measurable outcomes.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Mentoreo a otros fundadores y ejecutivos en estrategia de adopción de IA y he documentado el framework públicamente.', en: 'I mentor other founders and executives on AI adoption strategy and have documented the framework publicly.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Contribuyo al entendimiento de la comunidad de startups y ejecutivos sobre IA a través de escritura, inversión, asesoría o charlas.', en: 'I contribute to the startup and executive community\'s understanding of AI through writing, investing, advising, or speaking.' },
      },
    ],
  },
  'hr-people-ops': {
    roleId: 'hr-people-ops',
    roleName: { es: 'RR.HH. & People Ops', en: 'HR & People Ops' },
    questions: [
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para escribir descripciones de puesto, scorecards de rol y criterios de contratación más rápido y con menos sesgo que escribiéndolos manualmente.', en: 'I use AI to write job descriptions, role scorecards, and hiring criteria faster and with less bias than writing them manually.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para filtrar CVs — generando shortlists o puntuando candidatos contra criterios definidos del rol.', en: 'I have used AI to screen resumes — generating shortlists or scoring candidates against defined role criteria.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para escribir guías de preguntas de entrevista estructurada, frameworks de competencias o rúbricas de evaluación para roles específicos.', en: 'I use AI to write structured interview question guides, competency frameworks, or scoring rubrics for specific roles.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para redactar cartas oferta, contratos laborales o comunicaciones de bienvenida para el onboarding.', en: 'I have used AI to draft offer letters, employment contracts, or onboarding welcome communications.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para escribir políticas de RR.HH., secciones del manual del empleado o documentación de compliance.', en: 'I use AI to write HR policies, employee handbook sections, or compliance documentation.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para resumir resultados de encuestas de empleados o datos de entrevistas de salida en temas accionables clave.', en: 'I have used AI to summarize employee survey results or exit interview data into key actionable themes.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar planes de onboarding personalizados, agendas de primera semana y rutas de aprendizaje específicas por rol para nuevos empleados.', en: 'I use AI to generate personalized onboarding plans, first-week schedules, and role-specific learning paths for new hires.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para redactar plantillas de evaluación de desempeño, guías de calibración y frameworks de feedback para managers.', en: 'I use AI to draft performance review templates, calibration guides, and manager feedback frameworks.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado IA para escribir mensajes de outreach para sourcing de candidatos pasivos — personalizados según su background y fit con el rol.', en: 'I have used AI to write sourcing outreach messages for passive candidates — personalized to their background and role fit.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar contenido de L&D — materiales de capacitación, módulos de microlearning o planes de upskilling — para roles específicos.', en: 'I use AI to generate L&D content — training materials, microlearning modules, or upskilling plans — for specific roles.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Mantengo una biblioteca de prompts específica para RR.HH.: plantillas de JD, guías de entrevista, frameworks de políticas y scripts de comunicación.', en: 'I maintain an HR-specific prompt library: JD templates, interview guides, policy frameworks, and communication scripts.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado IA para analizar datos de compensación y generar recomendaciones de bandas salariales o reportes de benchmarking de mercado.', en: 'I have used AI to analyze compensation data and generate salary band recommendations or market benchmarking reports.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He producido una landing page o feature de producto de media fidelidad usando herramientas de IA (v0, Framer AI, Gamma, Claude Artifacts u otras) sin necesitar un desarrollador o diseñador para comenzar desde cero.', en: 'I have produced a mid-fidelity landing page or product feature using AI tools (v0, Framer AI, Gamma, Claude Artifacts, or similar) without needing a developer or designer to start from scratch.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para construir y mantener un pipeline de talento — la IA identifica, sourcea y trackea candidatos para roles futuros automáticamente.', en: 'I use AI to build and maintain a talent pipeline — AI identifies, sources, and tracks candidates for future roles automatically.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He conectado nuestro ATS y HRIS a herramientas de IA que generan métricas semanales de contratación, salud del pipeline e insights de talento.', en: 'I have connected our ATS and HRIS to AI tools that generate weekly hiring metrics, pipeline health, and talent insights.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para ejecutar análisis de sentimiento en encuestas de empleados, reseñas de Glassdoor o datos de engagement para detectar señales culturales.', en: 'I use AI to run sentiment analysis on employee surveys, Glassdoor reviews, or engagement data to surface culture signals.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He construido flujos de gestión del desempeño asistidos por IA — la IA redacta resúmenes de evaluación, señala outliers e identifica necesidades de coaching.', en: 'I have built AI-assisted performance management workflows — AI drafts review summaries, flags outliers, and identifies coaching needs.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para generar analíticas de DEI — identificando patrones de sesgo en contratación, promociones o compensación — y proponer intervenciones.', en: 'I use AI to generate DEI analytics — identifying bias patterns in hiring, promotion, or compensation — and propose interventions.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He producido una landing page o feature de UI de alta fidelidad y lista para producción usando IA (Cursor, Webflow AI, Framer AI o generación de código) que se publicó o fue entregada a un cliente sin retrabajos significativos.', en: 'I have produced a high-fidelity, production-ready landing page or UI feature using AI (Cursor, Webflow AI, Framer AI, or code generation) that went live or was delivered to a client without significant rework.' }, isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Colaboro con compañeros de equipo usando GitHub — creando ramas, abriendo pull requests, revisando diffs y resolviendo conflictos de merge — con IA ayudándome a entender o escribir el código involucrado.', en: 'I collaborate with teammates using GitHub — creating branches, opening pull requests, reviewing diffs, and resolving merge conflicts — with AI helping me understand or write the code involved.' }, isNew: true,
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido pipelines automatizados de adquisición de talento donde la IA sourcea, filtra y agenda entrevistas con mínima intervención humana.', en: 'I have built automated talent acquisition pipelines where AI sources, screens, and schedules interviews with minimal human input.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para predecir rotación de empleados — identificando personas en riesgo antes de que renuncien usando señales de comportamiento y desempeño.', en: 'I use AI to predict employee attrition — identifying at-risk employees before they resign using behavioral and performance signals.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He entrenado IA con la cultura y valores de nuestra empresa para evaluar el fit cultural de candidatos más allá de habilidades y experiencia.', en: 'I have trained AI on our company culture and values to evaluate candidate fit beyond skills and experience alone.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para generar reportes de people analytics — proyecciones de headcount, análisis de brechas de habilidades y planificación de workforce — automáticamente.', en: 'I use AI to generate people analytics reports — headcount forecasts, skill gap analyses, and workforce planning — automatically.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He construido experiencias de onboarding potenciadas por IA — personalizadas, interactivas y adaptativas al rol y ritmo de cada nuevo empleado.', en: 'I have built AI-powered onboarding experiences — personalized, interactive, and adaptive to each new hire\'s role and pace.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para monitorear y benchmarkear las habilidades del equipo contra estándares de la industria y auto-generar recomendaciones de L&D.', en: 'I use AI to monitor and benchmark team skills against industry standards and auto-generate L&D recommendations.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Mi equipo de people sigue un proceso de RR.HH. asistido por IA documentado que yo construí, con mejoras medibles en time-to-hire, retención o engagement.', en: 'My people team follows a documented AI-assisted HR process I built, with measurable improvements in time-to-hire, retention, or engagement.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He construido herramientas de IA personalizadas para RR.HH. — filtros de CVs, modelos de culture-fit o predictores de rotación — usadas en producción.', en: 'I have built custom AI HR tools — resume screeners, culture-fit models, or attrition predictors — used in production.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Gestiono una operación de talento a escala usando flujos de trabajo de IA que requieren mínima intervención manual por candidato o empleado.', en: 'I manage a talent operation at scale using AI workflows that require minimal manual intervention per candidate or employee.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Hago seguimiento del ROI de la IA en RR.HH. — costo por contratación, time-to-hire, tasa de retención, ROI de capacitación — con métricas específicas.', en: 'I track the ROI of AI in HR — cost-per-hire, time-to-hire, retention rate, training ROI — with specific metrics.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Mentoreo a profesionales de RR.HH. en operaciones de people asistidas por IA y he documentado la metodología para la adopción en el equipo.', en: 'I mentor HR professionals on AI-assisted people operations and have documented the methodology for team adoption.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Contribuyo al entendimiento de la comunidad de RR.HH. sobre IA a través de casos de estudio, charlas o frameworks publicados.', en: 'I contribute to the HR community\'s understanding of AI through case studies, talks, or published frameworks.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Lidero la estrategia de people con IA en mi organización — definiendo estándares de competencia en IA, programas de capacitación y roadmaps de adopción a nivel empresa.', en: 'I lead the AI people strategy at my organization — defining AI competency standards, training programs, and adoption roadmaps company-wide.' },
      },
    ],
  },
  'finance-accounting': {
    roleId: 'finance-accounting',
    roleName: { es: 'Finanzas y Contabilidad', en: 'Finance & Accounting' },
    questions: [
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para resumir informes financieros extensos, llamadas de resultados o notas de analistas en puntos clave más rápido que leyéndolos manualmente.', en: 'I use AI to summarize long financial reports, earnings calls, or analyst notes into key takeaways faster than reading manually.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para escribir borradores de comentarios financieros, explicaciones de variaciones o narrativas de presupuesto.', en: 'I have used AI to write first-draft financial commentary, variance explanations, or budget narratives.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para generar fórmulas, funciones de búsqueda o lógica de transformación de datos en Excel o Google Sheets.', en: 'I use AI to generate formulas, lookup functions, or data transformation logic in Excel or Google Sheets.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He usado IA para investigar la salud financiera de una empresa — ratios, reportes recientes, benchmarks de la industria — antes de una reunión o decisión.', en: 'I have used AI to research a company\'s financial health — ratios, recent filings, industry benchmarks — before a meeting or decision.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'Uso IA para redactar correos financieros, comunicaciones con clientes o resúmenes de actualización para el consejo.', en: 'I use AI to draft financial emails, client communications, or board update summaries.' },
      },
      {
        level: 0,
        levelLabel: { es: 'Nivel 1 — Explorador', en: 'Level 1 — Explorer' },
        statement: { es: 'He pedido a la IA que me explique un concepto financiero, regulación o norma contable que no conocía.', en: 'I have asked AI to explain a financial concept, regulation, or accounting standard I was unfamiliar with.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para construir o acelerar modelos financieros — proyecciones de ingresos, modelos de costos o análisis de escenarios — más rápido que construirlos manualmente.', en: 'I use AI to build or accelerate financial models — revenue forecasts, cost models, or scenario analyses — faster than building them manually.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado IA para generar narrativas de análisis de variaciones — explicando por qué los resultados reales se desviaron del presupuesto en múltiples centros de costo.', en: 'I have used AI to generate variance analysis narratives — explaining why actuals deviated from budget across multiple cost centers.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para producir borradores de actualizaciones para inversionistas, presentaciones de consejo o reportes gerenciales a partir de datos crudos.', en: 'I use AI to produce first-draft investor updates, board presentations, or management reports from raw data inputs.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He usado IA para analizar los estados financieros de una empresa y generar una tesis de inversión estructurada o memo de crédito.', en: 'I have used AI to analyze a company\'s financial statements and generate a structured investment thesis or credit memo.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Mantengo una biblioteca de prompts específica de finanzas para tareas recurrentes: plantillas de reportes, marcos de comentarios, supuestos de modelos y checklists de due diligence.', en: 'I maintain a finance-specific prompt library for recurring tasks: reporting templates, commentary frameworks, model assumptions, and due diligence checklists.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'Uso IA para generar anotaciones de gráficos, resúmenes ejecutivos o narrativas de data storytelling a partir de hojas de cálculo.', en: 'I use AI to generate chart annotations, executive summaries, or data storytelling narratives from spreadsheet outputs.' },
      },
      {
        level: 1,
        levelLabel: { es: 'Nivel 2 — Aprendiz', en: 'Level 2 — Learner' },
        statement: { es: 'He producido un dashboard financiero, reporte o presentación de fidelidad media usando herramientas de IA (Claude, ChatGPT, Gamma o similar) sin necesitar recursos adicionales para empezar desde cero.', en: 'I have produced a mid-fidelity financial dashboard, report, or presentation using AI tools (Claude, ChatGPT, Gamma, or similar) without needing additional resources to start from scratch.' },
        isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para realizar benchmarking financiero de competidores — extrayendo datos de reportes públicos y generando informes comparativos estructurados.', en: 'I use AI to run competitor financial benchmarking — pulling public filing data and generating structured comparison reports.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He usado IA para escribir y validar modelos complejos en Excel o Google Sheets — incluyendo modelos DCF, estructuras LBO o modelos de tres estados financieros.', en: 'I have used AI to write and QA complex Excel or Google Sheets models — including DCF models, LBO structures, or three-statement models.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para automatizar reportes financieros recurrentes — P&L mensuales, resúmenes de flujo de caja o paquetes de presupuesto vs. real — con mínimo formateo manual.', en: 'I use AI to automate recurring financial reports — monthly P&Ls, cash flow summaries, or budget vs. actual packages — with minimal manual formatting.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He usado IA para preparar materiales de due diligence — documentos de data room, respuestas financieras de Q&A o FAQs para inversionistas — con rapidez.', en: 'I have used AI to prepare due diligence materials — data room documents, financial Q&A responses, or investor FAQs — at speed.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Uso IA para analizar grandes conjuntos de datos financieros — identificando tendencias, valores atípicos y anomalías — y generar reportes de insights en lenguaje claro.', en: 'I use AI to analyze large financial datasets — identifying trends, outliers, and anomalies — and generate plain-language insight reports.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He usado IA para escribir o revisar contratos financieros, term sheets o acuerdos y señalar cláusulas clave o riesgos.', en: 'I have used AI to write or review financial contracts, term sheets, or agreements and flag key clauses or risks.' },
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'He producido un reporte financiero, modelo o presentación de alta fidelidad listo para producción usando IA que fue directamente a liderazgo, clientes o inversionistas sin retrabajo significativo.', en: 'I have produced a high-fidelity, production-ready financial report, model, or presentation using AI that went directly to leadership, clients, or investors without significant rework.' },
        isNew: true,
      },
      {
        level: 2,
        levelLabel: { es: 'Nivel 3 — Practicante', en: 'Level 3 — Practitioner' },
        statement: { es: 'Colaboro con compañeros técnicos usando herramientas con control de versiones o repositorios compartidos — con IA ayudándome a entender, escribir o revisar los scripts y código involucrados.', en: 'I collaborate with technical teammates using version-controlled tools or shared repositories — with AI helping me understand, write, or review the scripts and code involved.' },
        isNew: true,
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He conectado fuentes de datos financieros (ERP, software contable, data warehouse) a herramientas de IA que generan paquetes de reportes automatizados semanales o mensuales.', en: 'I have connected financial data sources (ERP, accounting software, data warehouse) to AI tools that generate automated weekly or monthly reporting packages.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para construir modelos financieros predictivos — pronóstico de ingresos, modelado de impacto de churn o optimización de capital de trabajo — usando datos históricos.', en: 'I use AI to build predictive financial models — revenue forecasting, churn impact modeling, or working capital optimization — using historical data.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He usado IA para diseñar y automatizar flujos de tesorería o gestión de efectivo — posicionamiento de caja, resúmenes de exposición cambiaria o seguimiento de covenants.', en: 'I have used AI to design and automate treasury or cash management workflows — cash positioning, FX exposure summaries, or covenant tracking.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para generar inteligencia competitiva en tiempo real — monitoreando reportes de competidores, sorpresas de resultados y revisiones de analistas automáticamente.', en: 'I use AI to generate real-time competitive intelligence — monitoring competitor filings, earnings surprises, and analyst revisions automatically.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'He entrenado IA con el contexto financiero y plan de cuentas de nuestra empresa para generar comentarios financieros precisos y consistentes a escala.', en: 'I have trained AI on our company\'s financial context and chart of accounts to generate accurate, on-brand financial commentary at scale.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Uso IA para producir análisis de provisiones fiscales, documentación de precios de transferencia o resúmenes de cumplimiento regulatorio más rápido que los procesos manuales.', en: 'I use AI to produce tax provision analyses, transfer pricing documentation, or regulatory compliance summaries faster than manual processes.' },
      },
      {
        level: 3,
        levelLabel: { es: 'Nivel 4 — Avanzado', en: 'Level 4 — Advanced' },
        statement: { es: 'Mi equipo de finanzas sigue un proceso documentado de reporteo asistido por IA que ayudé a definir, con reducciones medibles en el tiempo de cierre o esfuerzo de reporteo.', en: 'My finance team follows a documented AI-assisted reporting process I helped define, with measurable reductions in close cycle time or reporting effort.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He construido herramientas financieras de IA personalizadas — paquetes de cierre automatizados, explicadores inteligentes de variaciones o rastreadores de presupuesto en tiempo real — usados en producción por mi equipo.', en: 'I have built custom AI finance tools — automated close packages, intelligent variance explanators, or real-time budget trackers — used in production by my team.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Uso agentes de IA que monitorean autónomamente métricas financieras clave, señalan anomalías y redactan acciones recomendadas sin mi intervención diaria.', en: 'I use AI agents that autonomously monitor key financial metrics, flag anomalies, and draft recommended actions without my daily input.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Mido el ROI de la IA en operaciones financieras — horas ahorradas en cierre, mejoras en precisión de reportes, capacidad de analistas liberada — con métricas específicas.', en: 'I track the ROI of AI in finance operations — hours saved on close, reporting accuracy improvements, analyst capacity freed — with specific metrics.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'He rediseñado los flujos de trabajo del equipo de finanzas alrededor de la IA — reduciendo la carga de reporteo manual mientras mejoro la velocidad, precisión y profundidad analítica.', en: 'I have redesigned finance team workflows around AI — reducing manual reporting burden while improving speed, accuracy, and analytical depth.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Mentoreo a profesionales de finanzas en flujos de trabajo asistidos por IA y he documentado la metodología para adopción del equipo o la industria.', en: 'I mentor finance professionals on AI-assisted workflows and have documented the methodology for team or industry adoption.' },
      },
      {
        level: 4,
        levelLabel: { es: 'Nivel 5 — Catalizador', en: 'Level 5 — Catalyst' },
        statement: { es: 'Contribuyo al entendimiento de la IA en la comunidad financiera y de CFOs a través de casos de estudio, frameworks, charlas o contenido publicado.', en: 'I contribute to the finance and CFO community\'s understanding of AI through case studies, frameworks, speaking engagements, or published content.' },
      },
    ],
  },
};
