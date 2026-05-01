export type Language = 'es' | 'en';

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
