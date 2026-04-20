export type Language = 'es' | 'en';

export type Question = {
  level: number;
  es: string;
  en: string;
};

/** Display labels for levels 0–4 (shown as Nivel 1–5 / Level 1–5) */
export const LEVEL_LABELS: { es: string; en: string }[] = [
  { es: 'Nivel 1 — Explorador · Primeros pasos', en: 'Level 1 — Explorer · First steps' },
  { es: 'Nivel 2 — Aprendiz · Uso básico', en: 'Level 2 — Learner · Basic use' },
  { es: 'Nivel 3 — Practicante · Uso cotidiano', en: 'Level 3 — Practitioner · Daily use' },
  { es: 'Nivel 4 — Avanzado · Integración real', en: 'Level 4 — Advanced · Real integration' },
  {
    es: 'Nivel 5 — Catalizador · Impacto organizacional',
    en: 'Level 5 — Catalyst · Org-wide impact',
  },
];

export const QUESTIONS: Question[] = [
  {
    level: 0,
    es: 'Tengo cuenta activa en ChatGPT, Claude o Gemini y la he usado al menos una vez este mes.',
    en: 'I have an active account on ChatGPT, Claude, or Gemini and have used it at least once this month.',
  },
  {
    level: 0,
    es: 'He completado con IA al menos una tarea real de trabajo y entregué ese resultado a alguien.',
    en: 'I have completed at least one real work task using AI and delivered the output to someone.',
  },
  {
    level: 0,
    es: 'Entiendo por qué algunas respuestas de la IA son mejores según cómo formulo lo que le pido.',
    en: 'I understand why some AI responses are better depending on how I phrase my request.',
  },
  {
    level: 1,
    es: 'Pago al menos una suscripción de IA (ChatGPT Plus, Claude Pro u otra herramienta premium).',
    en: 'I pay for at least one AI subscription (ChatGPT Plus, Claude Pro, or another premium tool).',
  },
  {
    level: 1,
    es: 'Sé darle a la IA un rol, contexto específico y formato esperado para obtener mejores resultados.',
    en: 'I know how to give the AI a role, specific context, and expected format to get better results.',
  },
  {
    level: 1,
    es: 'He compartido un output generado con IA directamente con un cliente, colega o en una reunión.',
    en: 'I have shared an AI-generated output directly with a client, colleague, or in a meeting.',
  },
  {
    level: 2,
    es: 'Uso IA todos los días como primera herramienta, antes de ir a Google o preguntarle a alguien.',
    en: 'I use AI every single day as my first tool, before going to Google or asking anyone.',
  },
  {
    level: 2,
    es: 'Tengo una biblioteca de prompts guardados que reutilizo regularmente por tipo de tarea.',
    en: 'I have a saved prompt library that I regularly reuse by task type.',
  },
  {
    level: 2,
    es: 'He configurado Proyectos en Claude, GPTs personalizados en ChatGPT, o instalado skills de terceros desde internet.',
    en: 'I have set up Projects in Claude, custom GPTs in ChatGPT, or installed third-party skills from the internet.',
  },
  {
    level: 3,
    es: 'He conectado la IA a mis herramientas de trabajo (Gmail, Slack, Notion, CRM) vía conectores o integraciones.',
    en: 'I have connected AI to my work tools (Gmail, Slack, Notion, CRM) via connectors or integrations.',
  },
  {
    level: 3,
    es: 'He automatizado al menos un proceso real con Make, Zapier, n8n u otra herramienta de automatización.',
    en: 'I have automated at least one real work process using Make, Zapier, n8n, or a similar tool.',
  },
  {
    level: 3,
    es: 'Mi equipo me busca cuando tiene dudas sobre IA y tenemos prompts y flujos documentados compartidos.',
    en: 'My team comes to me when they have AI questions, and we have shared documented prompts and workflows.',
  },
  {
    level: 4,
    es: 'Tengo agentes de IA corriendo de forma autónoma en segundo plano mientras trabajo en otra cosa.',
    en: 'I have AI agents running autonomously in the background while I work on something else.',
  },
  {
    level: 4,
    es: 'He construido o supervisado un GPT personalizado, skill propio o automatización multi-paso con datos propios de mi empresa.',
    en: "I have built or overseen a custom GPT, my own skill, or a multi-step automation using my company's own data.",
  },
  {
    level: 4,
    es: 'Mido el impacto de la IA en mi organización con KPIs concretos: tiempo ahorrado, costos reducidos o ingresos generados.',
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
      es: 'Estás en el punto de partida. La IA todavía no forma parte de tu día de trabajo real. El mundo ya se está moviendo sin ti y la brecha crece cada semana.',
      en: "You're at the starting point. AI is not yet part of your real workday. The world is already moving without you and the gap grows every week.",
    },
    nextStep: {
      es: 'Esta semana abre Claude o ChatGPT y resuelve con IA una tarea que tengas pendiente. No para experimentar, sino para terminar algo real y entregarlo.',
      en: 'This week, open Claude or ChatGPT and use AI to complete a task you have pending. Not to experiment — to actually finish and deliver something real.',
    },
  },
  {
    description: {
      es: 'Has dado los primeros pasos y ya entregas trabajo con IA. Estás por encima de quien no la usa, pero todavía muy lejos de lo que es posible. La versión gratuita tiene un techo muy bajo.',
      en: "You've taken your first steps and are already delivering work with AI. You're ahead of those who don't use it, but still far from what's possible. The free version has a very low ceiling.",
    },
    nextStep: {
      es: 'Paga una suscripción esta semana. ChatGPT Plus o Claude Pro cuestan menos que una hora de tu trabajo y desbloquean capacidades que cambian lo que puedes producir en un día.',
      en: 'Pay for a subscription this week. ChatGPT Plus or Claude Pro cost less than one hour of your work and unlock capabilities that change what you can produce in a day.',
    },
  },
  {
    description: {
      es: 'Usas IA todos los días y ya ves resultados reales. Estás en el grupo que entiende que esto es serio. El problema es que todavía trabajas manualmente donde ya existe automatización disponible.',
      en: "You use AI daily and are already seeing real results. You're in the group that understands this is serious. The problem is you're still working manually where automation already exists.",
    },
    nextStep: {
      es: 'El siguiente salto es la integración. Esta semana conecta la IA a una herramienta que ya usas: Gmail, Notion o Slack. No necesitas saber programar, solo activar un conector.',
      en: "Your next leap is integration. This week, connect AI to a tool you already use: Gmail, Notion, or Slack. You don't need to know how to code — just activate a connector.",
    },
  },
  {
    description: {
      es: 'La IA ya está integrada en tu operación y tu equipo te busca cuando tiene dudas. Estás en el top 15% de adopción real. Pero hay un nivel más: el de quien construye con ella y la hace trabajar sola.',
      en: "AI is already integrated into your operation and your team comes to you with questions. You're in the top 15% of real adoption. But there's one more level: the person who builds with it and makes it work on its own.",
    },
    nextStep: {
      es: 'Aprende sobre agentes y automatizaciones. n8n o Make pueden hacer que la IA ejecute procesos completos sin que tú intervengas. Ese es tu siguiente salto real.',
      en: "Learn about agents and automations. n8n or Make can make AI execute complete processes without your intervention. That's your next real leap.",
    },
  },
  {
    description: {
      es: 'Eres exactamente la persona que el 90% de los profesionales necesita conocer. No solo usas IA, la estrategizas, la escalas a toda tu organización y la conviertes en ventaja competitiva medible.',
      en: "You're exactly the person that 90% of professionals need to meet. You don't just use AI — you strategize it, scale it across your organization, and turn it into measurable competitive advantage.",
    },
    nextStep: {
      es: 'Tu siguiente nivel es enseñar y documentar. Comparte tu metodología, construye comunidad y ayuda a otros a llegar donde estás tú. Eso es exactamente lo que hacemos en Accionables.',
      en: "Your next level is to teach and document. Share your methodology, build community, and help others reach where you are. That's exactly what we do at Accionables.",
    },
  },
];

export const UI = {
  brand: 'ACCIONABLES',
  language: {
    heading: 'AI Adoption Self-Assessment',
    subtitle:
      "Find out exactly where you stand - and what the top 3% of professionals are already doing that you probably aren't.",
    meta: '15 quick-tap questions · ~2 minutes. No overthinking.',
    es: 'Español',
    en: 'English',
  },
  quiz: {
    es: {
      levelOf: (n: number) => `Nivel ${n} de 5`,
      questionOf: (x: number, total: number) => `Pregunta ${x} de ${total}`,
      yes: 'SÍ',
      no: 'NO',
      back: '← Pregunta anterior',
    },
    en: {
      levelOf: (n: number) => `Level ${n} of 5`,
      questionOf: (x: number, total: number) => `Question ${x} of ${total}`,
      yes: 'YES',
      no: 'NO',
      back: '← Previous question',
    },
  },
  email: {
    es: {
      title: '¡Ya casi!',
      body: 'Ingresa tu email para recibir tus resultados personalizados y recomendaciones según tu nivel de adopción de IA.',
      placeholder: 'tu@email.com',
      submit: 'Ver resultados',
      privacy:
        'Solo usaremos tu email para enviarte tus resultados y tips semanales de IA. Sin spam, nunca.',
      skip: 'Quizás después',
      invalidEmail: 'Introduce un email válido.',
    },
    en: {
      title: 'Almost done!',
      body: 'Enter your email to receive your personalized AI adoption results and course recommendations.',
      placeholder: 'you@email.com',
      submit: 'Get results',
      privacy: "We'll only use your email to send your results and weekly AI tips. No spam, ever.",
      skip: 'Maybe later',
      invalidEmail: 'Please enter a valid email address.',
    },
  },
  results: {
    es: {
      affirmativeLabel: 'Respuestas afirmativas',
      scoreOf: (s: number, t: number) => `${s} de ${t}`,
      nextStepHeading: 'Tu siguiente paso',
      benchmarkTitle: 'Compara tus resultados',
      benchmarkSubtitle: 'Responde 3 preguntas rápidas para ver cómo te comparas con la comunidad.',
      benchmarkCta: 'Comparar con la comunidad',
      again: 'Hacer el quiz de nuevo',
      ctaHeading: '¿Qué sigue?',
      ctaBody: 'Descubre cómo se compara tu nivel con el de otros profesionales de tu industria.',
    },
    en: {
      affirmativeLabel: 'Affirmative answers',
      scoreOf: (s: number, t: number) => `${s} of ${t}`,
      nextStepHeading: 'Your next step',
      benchmarkTitle: 'See how you compare',
      benchmarkSubtitle:
        'Answer 3 quick questions to see how your score stacks up against the community.',
      benchmarkCta: 'Compare with the community',
      again: 'Take the quiz again',
      ctaHeading: "What's next?",
      ctaBody: 'Find out how your level compares to other professionals in your industry.',
    },
  },
  demographics: {
    es: {
      title: 'Ayúdanos a crear el mejor benchmark público',
      subtitle:
        'Queremos compartir los resultados de forma abierta para que toda la comunidad pueda aprender. Con tu información anónima podemos armar un panorama real de la adopción de IA en la región.',
      countryLabel: 'País',
      countryPlaceholder: 'Selecciona tu país',
      companyLabel: 'Tipo de empresa',
      companyPlaceholder: 'Selecciona el tipo',
      ageLabel: 'Rango de edad',
      agePlaceholder: 'Selecciona tu rango',
      submit: 'Enviar y continuar →',
      skip: 'Prefiero no compartir',
    },
    en: {
      title: 'Help us build the best public benchmark',
      subtitle:
        'We want to share results openly so the whole community can learn. Your anonymous info helps us paint a real picture of AI adoption across industries.',
      countryLabel: 'Country',
      countryPlaceholder: 'Select your country',
      companyLabel: 'Company type',
      companyPlaceholder: 'Select company type',
      ageLabel: 'Age range',
      agePlaceholder: 'Select your range',
      submit: 'Submit and continue →',
      skip: "I'd rather not share",
    },
  },
  comingSoon: {
    es: {
      title: '¡Muchas gracias!',
      body: 'Tu aporte es muy valioso. Estamos recopilando respuestas y en cuanto tengamos suficientes, publicaremos los resultados del benchmark aquí mismo y te los enviaremos por email.',
      shareHeading: 'Mientras tanto, ayúdanos a correr la voz',
      shareBody: 'Cuantas más personas participen, mejores serán los resultados para todos.',
      shareCta: 'Copiar enlace para compartir',
      shareCopied: '¡Enlace copiado!',
    },
    en: {
      title: 'Thank you so much!',
      body: "Your input means a lot. We're collecting responses and as soon as we have enough, we'll publish benchmark results right here and send them to you by email.",
      shareHeading: 'In the meantime, help us spread the word',
      shareBody: 'The more people participate, the better the results are for everyone.',
      shareCta: 'Copy link to share',
      shareCopied: 'Link copied!',
    },
  },
  valueProp: {
    es: {
      heading: 'Terminaste. Esto es lo que pasa ahora.',
      sub1: 'Tu nivel de adopción de IA está listo.',
      sub2: 'Pero antes de mostrártelo — hay algo más valioso que podemos ofrecerte.',
      card1Title: 'Tus resultados, en tu correo',
      card1Desc: 'Análisis completo de tu nivel + próximos pasos',
      card2Title: 'Ve dónde estás vs. todos los demás',
      card2Desc: 'Compara tu puntaje con profesionales en tu país, industria y tipo de empresa',
      cta: 'Ver mis resultados + benchmark',
      skip: 'Saltar — solo muéstrame mi puntaje',
      liveCounter: (n: number) =>
        `Únete a ${n.toLocaleString()} profesionales que ya midieron su nivel de IA.`,
    },
    en: {
      heading: "You finished. Here's what happens next.",
      sub1: 'Your AI adoption level is ready.',
      sub2: "But before we show you — there's something more valuable we can offer you.",
      card1Title: 'Your results, sent to your inbox',
      card1Desc: 'Full breakdown of your level + next steps',
      card2Title: 'See where you stand vs. everyone else',
      card2Desc:
        'Compare your score against professionals in your country, industry, and company type',
      cta: 'Get my results + benchmark',
      skip: 'Skip — just show me my score',
      liveCounter: (n: number) =>
        `Join ${n.toLocaleString()} professionals who've already benchmarked their AI level.`,
    },
  },
  postQuizEmail: {
    es: {
      heading: '¿A dónde enviamos tus resultados?',
      placeholder: 'tucorreo@empresa.com',
      submit: 'Enviar →',
      privacy:
        'Solo usaremos tu email para enviarte tus resultados, tips de IA y tu reporte de benchmark. Sin spam. Cancela cuando quieras.',
      invalidEmail: 'Ingresa un email válido.',
      step: (current: number, total: number) => `Paso ${current} de ${total}`,
    },
    en: {
      heading: 'Where should we send your results?',
      placeholder: 'your@email.com',
      submit: 'Send results →',
      privacy:
        "We'll only use your email to send your results, occasional AI tips, and your benchmark report. No spam. Unsubscribe anytime.",
      invalidEmail: 'Please enter a valid email.',
      step: (current: number, total: number) => `Step ${current} of ${total}`,
    },
  },
  postQuizDemographics: {
    es: {
      heading: 'Un paso más — ayúdanos a construir el benchmark.',
      subtitle:
        'Tus respuestas son 100% anónimas. Solo las usamos para mostrarte cómo te comparas con otros en tu país, rango salarial e industria.',
      countryLabel: 'País',
      countryPlaceholder: 'Selecciona tu país',
      salaryLabel: 'Rango salarial anual (equivalente en USD)',
      salaryHelper: 'Usa el equivalente en tu moneda local. Esto es completamente anónimo.',
      companyLabel: '¿En qué tipo de empresa trabajas?',
      industryLabel: '¿En qué industria trabajas?',
      industryPlaceholder: 'Selecciona tu industria',
      submit: 'Ver mis resultados + benchmark →',
      skip: 'Saltar — solo ver mis resultados (sin benchmark)',
      step: (current: number, total: number) => `Paso ${current} de ${total}`,
      fieldRequired: 'Este campo es requerido',
    },
    en: {
      heading: 'One last step — help us build the benchmark.',
      subtitle:
        "Your answers are 100% anonymous. They're only used to show you how you compare to others in your country, salary range, and industry.",
      countryLabel: 'Country',
      countryPlaceholder: 'Select your country',
      salaryLabel: 'Annual salary range (USD equivalent)',
      salaryHelper: 'Use your local currency equivalent. This stays completely anonymous.',
      companyLabel: 'What type of company do you work at?',
      industryLabel: 'What industry are you in?',
      industryPlaceholder: 'Select your industry',
      submit: 'See my results + benchmark →',
      skip: 'Skip demographics — just show my results (no benchmark)',
      step: (current: number, total: number) => `Step ${current} of ${total}`,
      fieldRequired: 'This field is required',
    },
  },
  benchmark: {
    es: {
      panelHeading: 'Cómo te comparas',
      respondentCount: (n: number) =>
        `Basado en ${n.toLocaleString()} profesionales que tomaron este quiz`,
      overallLabel: 'Ranking general',
      countryLabel: (name: string) => `Tu país (${name})`,
      companyLabel: (name: string) => `Tu tipo de empresa (${name})`,
      industryLabel: (name: string) => `Tu industria (${name})`,
      percentileText: (pct: number, segment: string) =>
        `Puntuaste más alto que el ${pct}% de los encuestados ${segment}`,
      notEnoughData: 'Aún no hay suficientes datos — ¡sé de los primeros!',
      teaserHeading: 'Ve el panorama completo',
      teaserBody:
        '3 preguntas rápidas. Luego te mostramos dónde estás entre profesionales en tu rol, país e industria — y qué están haciendo ya las personas un nivel por delante de ti.',
      teaserCta: 'Muéstrame dónde estoy →',
      teaserSkip: 'Saltar — solo quiero ver mis resultados',
      teaserLockLabel: 'Tu benchmark está esperando',
      teaserLockSub: 'Responde 3 preguntas rápidas para desbloquearlo',
      calculating: 'Calculando tu benchmark...',
    },
    en: {
      panelHeading: 'How you compare',
      respondentCount: (n: number) =>
        `Based on ${n.toLocaleString()} professionals who've taken this quiz`,
      overallLabel: 'Overall ranking',
      countryLabel: (name: string) => `Your country (${name})`,
      companyLabel: (name: string) => `Your company type (${name})`,
      industryLabel: (name: string) => `Your industry (${name})`,
      percentileText: (pct: number, segment: string) =>
        `You scored higher than ${pct}% of all respondents ${segment}`,
      notEnoughData: 'Not enough data yet — be one of the first!',
      teaserHeading: 'See the full picture',
      teaserBody:
        "3 quick questions. Then we'll show you where you stand among professionals in your role, country, and industry — and what the people one level ahead are already doing.",
      teaserCta: 'Show me where I stand →',
      teaserSkip: 'Skip — I just want my results',
      teaserLockLabel: 'Your benchmark is waiting',
      teaserLockSub: 'Answer 3 quick questions to unlock it',
      calculating: 'Calculating your benchmark...',
    },
  },
} as const;
