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
  | 'data-analytics';

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
};
