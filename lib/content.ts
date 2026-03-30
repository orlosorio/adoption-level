export type Language = "es" | "en";

export type Question = {
  level: number;
  es: string;
  en: string;
};

/** Display labels for levels 0–4 (shown as Nivel 1–5 / Level 1–5) */
export const LEVEL_LABELS: { es: string; en: string }[] = [
  { es: "Nivel 1 — Explorador · Primeros pasos", en: "Level 1 — Explorer · First steps" },
  { es: "Nivel 2 — Aprendiz · Uso básico", en: "Level 2 — Learner · Basic use" },
  { es: "Nivel 3 — Practicante · Uso cotidiano", en: "Level 3 — Practitioner · Daily use" },
  { es: "Nivel 4 — Avanzado · Integración real", en: "Level 4 — Advanced · Real integration" },
  { es: "Nivel 5 — Catalizador · Impacto organizacional", en: "Level 5 — Catalyst · Org-wide impact" },
];

export const QUESTIONS: Question[] = [
  {
    level: 0,
    es: "Tengo cuenta activa en ChatGPT, Claude o Gemini y la he usado al menos una vez este mes.",
    en: "I have an active account on ChatGPT, Claude, or Gemini and have used it at least once this month.",
  },
  {
    level: 0,
    es: "He completado con IA al menos una tarea real de trabajo y entregué ese resultado a alguien.",
    en: "I have completed at least one real work task using AI and delivered the output to someone.",
  },
  {
    level: 0,
    es: "Entiendo por qué algunas respuestas de la IA son mejores según cómo formulo lo que le pido.",
    en: "I understand why some AI responses are better depending on how I phrase my request.",
  },
  {
    level: 1,
    es: "Pago al menos una suscripción de IA (ChatGPT Plus, Claude Pro u otra herramienta premium).",
    en: "I pay for at least one AI subscription (ChatGPT Plus, Claude Pro, or another premium tool).",
  },
  {
    level: 1,
    es: "Sé darle a la IA un rol, contexto específico y formato esperado para obtener mejores resultados.",
    en: "I know how to give the AI a role, specific context, and expected format to get better results.",
  },
  {
    level: 1,
    es: "He compartido un output generado con IA directamente con un cliente, colega o en una reunión.",
    en: "I have shared an AI-generated output directly with a client, colleague, or in a meeting.",
  },
  {
    level: 2,
    es: "Uso IA todos los días como primera herramienta, antes de ir a Google o preguntarle a alguien.",
    en: "I use AI every single day as my first tool, before going to Google or asking anyone.",
  },
  {
    level: 2,
    es: "Tengo una biblioteca de prompts guardados que reutilizo regularmente por tipo de tarea.",
    en: "I have a saved prompt library that I regularly reuse by task type.",
  },
  {
    level: 2,
    es: "He configurado Proyectos en Claude, GPTs personalizados en ChatGPT, o instalado skills de terceros desde internet.",
    en: "I have set up Projects in Claude, custom GPTs in ChatGPT, or installed third-party skills from the internet.",
  },
  {
    level: 3,
    es: "He conectado la IA a mis herramientas de trabajo (Gmail, Slack, Notion, CRM) vía conectores o integraciones.",
    en: "I have connected AI to my work tools (Gmail, Slack, Notion, CRM) via connectors or integrations.",
  },
  {
    level: 3,
    es: "He automatizado al menos un proceso real con Make, Zapier, n8n u otra herramienta de automatización.",
    en: "I have automated at least one real work process using Make, Zapier, n8n, or a similar tool.",
  },
  {
    level: 3,
    es: "Mi equipo me busca cuando tiene dudas sobre IA y tenemos prompts y flujos documentados compartidos.",
    en: "My team comes to me when they have AI questions, and we have shared documented prompts and workflows.",
  },
  {
    level: 4,
    es: "Tengo agentes de IA corriendo de forma autónoma en segundo plano mientras trabajo en otra cosa.",
    en: "I have AI agents running autonomously in the background while I work on something else.",
  },
  {
    level: 4,
    es: "He construido o supervisado un GPT personalizado, skill propio o automatización multi-paso con datos propios de mi empresa.",
    en: "I have built or overseen a custom GPT, my own skill, or a multi-step automation using my company's own data.",
  },
  {
    level: 4,
    es: "Mido el impacto de la IA en mi organización con KPIs concretos: tiempo ahorrado, costos reducidos o ingresos generados.",
    en: "I track AI's impact on my organization with concrete KPIs: time saved, costs reduced, or revenue generated.",
  },
];

export type ResultCopy = {
  description: { es: string; en: string };
  nextStep: { es: string; en: string };
};

export const RESULT_COPY: ResultCopy[] = [
  {
    description: {
      es: "Estás en el punto de partida. La IA todavía no forma parte de tu día de trabajo real. El mundo ya se está moviendo sin ti y la brecha crece cada semana.",
      en: "You're at the starting point. AI is not yet part of your real workday. The world is already moving without you and the gap grows every week.",
    },
    nextStep: {
      es: "Esta semana abre Claude o ChatGPT y resuelve con IA una tarea que tengas pendiente. No para experimentar, sino para terminar algo real y entregarlo.",
      en: "This week, open Claude or ChatGPT and use AI to complete a task you have pending. Not to experiment — to actually finish and deliver something real.",
    },
  },
  {
    description: {
      es: "Has dado los primeros pasos y ya entregas trabajo con IA. Estás por encima de quien no la usa, pero todavía muy lejos de lo que es posible. La versión gratuita tiene un techo muy bajo.",
      en: "You've taken your first steps and are already delivering work with AI. You're ahead of those who don't use it, but still far from what's possible. The free version has a very low ceiling.",
    },
    nextStep: {
      es: "Paga una suscripción esta semana. ChatGPT Plus o Claude Pro cuestan menos que una hora de tu trabajo y desbloquean capacidades que cambian lo que puedes producir en un día.",
      en: "Pay for a subscription this week. ChatGPT Plus or Claude Pro cost less than one hour of your work and unlock capabilities that change what you can produce in a day.",
    },
  },
  {
    description: {
      es: "Usas IA todos los días y ya ves resultados reales. Estás en el grupo que entiende que esto es serio. El problema es que todavía trabajas manualmente donde ya existe automatización disponible.",
      en: "You use AI daily and are already seeing real results. You're in the group that understands this is serious. The problem is you're still working manually where automation already exists.",
    },
    nextStep: {
      es: "El siguiente salto es la integración. Esta semana conecta la IA a una herramienta que ya usas: Gmail, Notion o Slack. No necesitas saber programar, solo activar un conector.",
      en: "Your next leap is integration. This week, connect AI to a tool you already use: Gmail, Notion, or Slack. You don't need to know how to code — just activate a connector.",
    },
  },
  {
    description: {
      es: "La IA ya está integrada en tu operación y tu equipo te busca cuando tiene dudas. Estás en el top 15% de adopción real. Pero hay un nivel más: el de quien construye con ella y la hace trabajar sola.",
      en: "AI is already integrated into your operation and your team comes to you with questions. You're in the top 15% of real adoption. But there's one more level: the person who builds with it and makes it work on its own.",
    },
    nextStep: {
      es: "Aprende sobre agentes y automatizaciones. n8n o Make pueden hacer que la IA ejecute procesos completos sin que tú intervengas. Ese es tu siguiente salto real.",
      en: "Learn about agents and automations. n8n or Make can make AI execute complete processes without your intervention. That's your next real leap.",
    },
  },
  {
    description: {
      es: "Eres exactamente la persona que el 90% de los profesionales necesita conocer. No solo usas IA, la estrategizas, la escalas a toda tu organización y la conviertes en ventaja competitiva medible.",
      en: "You're exactly the person that 90% of professionals need to meet. You don't just use AI — you strategize it, scale it across your organization, and turn it into measurable competitive advantage.",
    },
    nextStep: {
      es: "Tu siguiente nivel es enseñar y documentar. Comparte tu metodología, construye comunidad y ayuda a otros a llegar donde estás tú. Eso es exactamente lo que hacemos en Accionables.",
      en: "Your next level is to teach and document. Share your methodology, build community, and help others reach where you are. That's exactly what we do at Accionables.",
    },
  },
];

export const UI = {
  brand: "ACCIONABLES",
  language: {
    heading: "AI Adoption Self-Assessment",
    subtitle:
      "Find out exactly where you stand - and what the top 10% of professionals are already doing that you probably aren't.",
    meta: "15 questions · ~5 minutes. No fluff.",
    es: "[Español]",
    en: "[English]",
  },
  quiz: {
    es: {
      levelOf: (n: number) => `Nivel ${n} de 5`,
      questionOf: (x: number, total: number) => `Pregunta ${x} de ${total}`,
      yes: "SÍ",
      no: "NO",
    },
    en: {
      levelOf: (n: number) => `Level ${n} of 5`,
      questionOf: (x: number, total: number) => `Question ${x} of ${total}`,
      yes: "YES",
      no: "NO",
    },
  },
  email: {
    es: {
      title: "¡Ya casi!",
      body: "Ingresa tu email para recibir tus resultados personalizados y recomendaciones según tu nivel de adopción de IA.",
      placeholder: "tu@email.com",
      submit: "Ver resultados",
      privacy:
        "Solo usaremos tu email para enviarte tus resultados y tips semanales de IA. Sin spam, nunca.",
      skip: "Quizás después",
      invalidEmail: "Introduce un email válido.",
    },
    en: {
      title: "Almost done!",
      body: "Enter your email to receive your personalized AI adoption results and course recommendations.",
      placeholder: "you@email.com",
      submit: "Get results",
      privacy:
        "We'll only use your email to send your results and weekly AI tips. No spam, ever.",
      skip: "Maybe later",
      invalidEmail: "Please enter a valid email address.",
    },
  },
  results: {
    es: {
      affirmativeLabel: "Respuestas afirmativas",
      scoreOf: (s: number, t: number) => `${s} de ${t}`,
      nextStepHeading: "Tu siguiente paso",
      newsletterTitle: "Recibe tips semanales de IA para tu trabajo",
      newsletterSubtitle: "Contenido práctico cada semana, sin relleno.",
      newsletterCta: "Suscribirme",
      again: "Hacer el quiz de nuevo",
    },
    en: {
      affirmativeLabel: "Affirmative answers",
      scoreOf: (s: number, t: number) => `${s} of ${t}`,
      nextStepHeading: "Your next step",
      newsletterTitle: "Get weekly AI tips for your work",
      newsletterSubtitle: "Practical content every week, no fluff.",
      newsletterCta: "Subscribe",
      again: "Take the quiz again",
    },
  },
} as const;

