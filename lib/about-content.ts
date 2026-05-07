import type { Locale } from '@/i18n/routing';

export interface AboutSection {
  id: string;
  heading?: string;
  body: string;
}

export interface AboutCitation {
  text: string;
  author: string;
  source: string;
  url: string;
  views: string;
  date: string;
}

export interface AboutContent {
  meta: {
    title: string;
    subtitle: string;
    author: string;
    authorHandle: string;
    publishedDate: string;
    readTime: string;
  };
  sections: AboutSection[];
  citation: AboutCitation;
  cta: {
    heading: string;
    buttonLabel: string;
  };
}

const ABOUT_CONTENT: Record<Locale, AboutContent> = {
  en: {
    meta: {
      title: 'Something Big Is Happening. Most People Don’t Know Yet.',
      subtitle: 'Why we built this global AI adoption survey — and why it matters right now.',
      author: 'Orlando Osorio & Alberto Sadde',
      authorHandle: '@orlandosorio_ · @aesadde',
      publishedDate: '2026',
      readTime: '8 min read',
    },
    sections: [
      {
        id: 'opening',
        body: 'Most people think they’re using AI. Most people are wrong.\n\nWe spend a lot of time in the communities where this is actually happening — on X, YouTube, Discord servers, offline events, and forums where developers, founders, and operators are pushing AI further every week. And the gap between what those people are doing and what the average professional thinks “using AI” means is bigger than most people realize.\n\nHere’s what we keep seeing: someone says they use AI at work. What they mean is they open ChatGPT a few times a week to search for something, rewrite an email, or summarize a document. That’s not wrong. But it’s the first step on a long staircase — and most people don’t know the staircase exists.',
      },
      {
        id: 'covid-comparison',
        heading: 'The COVID comparison',
        body: 'In February 2020, a virus was spreading overseas. The stock market was doing great. Your kids were in school. You were going to restaurants and shaking hands. If someone told you they were stockpiling toilet paper, you would have thought they’d been spending too much time on a weird corner of the internet.\n\nThen, over three weeks, the entire world changed.\n\nMatt Shumer — with six years building in the AI space — published a thread in February 2026 that was seen 86 million times in 48 hours. His opening argument: we’re now in the “this seems overblown” phase of something much bigger than Covid. He’s not alone. The conversation happening in the communities where AI is actually being built sounds nothing like what most professionals hear in their industries.\n\nThe people raising the alarm aren’t predicting. They’re reporting what already happened to their own jobs.',
      },
      {
        id: 'faster-than-news',
        heading: 'It’s already moving faster than the news covers',
        body: 'There’s an organization called METR that actually measures this with data. They track how long an AI can work independently on real tasks without human help. About a year ago, the answer was roughly ten minutes. Then an hour. Then several hours. Their most recent measurement showed AI completing tasks that take a human expert nearly five hours — and that number is doubling approximately every seven months.\n\nThose measurements don’t yet include the latest models released in early 2026.\n\nThe free tier problem compounds this. Most people are using the free version of AI tools, which is over a year behind what paying users have access to. Judging AI by the free-tier tools is like evaluating the state of smartphones by using a flip phone. The people paying for the best tools and using them daily for real work are experiencing a completely different technology.',
      },
      {
        id: 'basic-chatgpt',
        heading: 'Most people think basic ChatGPT use is “using AI.”',
        body: 'The same tools being used to answer basic questions can also write and deploy code, automate entire workflows, analyze months of business data, generate production-ready designs, build internal tools, and run tasks autonomously while you do something else entirely.\n\nPeople who’ve figured this out aren’t working harder. They’re just not waiting.\n\nWe’re not in a “this will be important someday” moment. The people who are ahead in their industries right now are the ones who started experimenting seriously six months ago. The bar is still low enough that six months of honest effort puts you ahead of 90% of your field.',
      },
      {
        id: 'what-this-is',
        heading: 'What this survey actually is',
        body: 'This is a free, global, open self-assessment. No tricks, no sales pitch.\n\nWe built it because we believe the first step to changing your situation is understanding it honestly. You’ll answer questions about how you actually use AI in your specific role — not how you plan to, not how you think you should, but how you do right now. The questions get specific. Some of them will surprise you. Some of them will describe things you didn’t know were possible.\n\nAt the end, you’ll see your level across five stages, from Explorer to Catalyst. You’ll get an honest description of where you are and one concrete next step.',
      },
      {
        id: 'benchmark',
        heading: 'The benchmark — and how it works',
        body: 'If you want to see how your results compare to other professionals — by country, industry, company type, and salary range — you can share your email and a few anonymous demographic details. This is completely optional.\n\nYour individual answers are never shared with anyone. The benchmark is built from aggregate, anonymous data. The more people participate, the more useful the comparison becomes.\n\nIf you’d rather just see your own result and leave, that’s completely fine too.',
      },
      {
        id: 'what-comes-next',
        heading: 'What comes next',
        body: 'We’re building a library of resources around this: tools to try, communities to join, people to follow, free and paid learning paths, events, and news filtered for what actually matters. None of it is behind a paywall.\n\nIf you want any of that — tips, resources, community updates — you can opt in when you finish the quiz. Or not. No pressure either way.',
      },
      {
        id: 'why-we-do-this',
        heading: 'Why we’re doing this',
        body: 'We’re not researchers. We’re practitioners. We run an agency, we teach, we build, and we’re deep in communities where this conversation is already happening at a high level.\n\nWe built this because we kept having the same conversation: someone talented, experienced, and capable who simply hadn’t been exposed to what’s now possible. That’s a fixable problem. This is one small attempt to fix it.\n\nIf this resonates with you, share it with someone who should be thinking about this. Most people won’t hear it until it’s too late. You can be the reason someone you care about gets a head start.',
      },
    ],
    citation: {
      text: 'I think we’re in the “this seems overblown” phase of something much, much bigger than Covid.',
      author: 'Matt Shumer (@mattshumer_)',
      source: 'February 10, 2026',
      url: 'https://x.com/mattshumer_/status/2021256989876109403',
      views: '86.2M views on X',
      date: 'February 10, 2026',
    },
    cta: {
      heading: 'Ready to find out your real AI adoption level?',
      buttonLabel: 'Take the assessment →',
    },
  },
  es: {
    meta: {
      title: 'Algo grande está pasando. La mayoría todavía no lo sabe.',
      subtitle:
        'Por qué construimos esta encuesta global de adopción de IA — y por qué importa ahora mismo.',
      author: 'Orlando Osorio & Alberto Sadde',
      authorHandle: '@orlandosorio_ · @aesadde',
      publishedDate: '2026',
      readTime: '8 min de lectura',
    },
    sections: [
      {
        id: 'opening',
        body: 'La mayoría de las personas creen que están usando IA. La mayoría está equivocada.\n\nPasamos mucho tiempo en las comunidades donde esto realmente está ocurriendo — en X, YouTube, servidores de Discord, eventos presenciales y foros donde desarrolladores, fundadores y operadores llevan la IA más lejos cada semana. Y la brecha entre lo que esa gente hace y lo que el profesional promedio entiende por “usar IA” es más grande de lo que la mayoría imagina.\n\nEsto es lo que seguimos viendo: alguien dice que usa IA en el trabajo. Lo que quiere decir es que abre ChatGPT unas veces a la semana para buscar algo, reescribir un email o resumir un documento. Eso no está mal. Pero es el primer peldaño de una escalera muy larga — y la mayoría de las personas no sabe que esa escalera existe.',
      },
      {
        id: 'covid-comparison',
        heading: 'La comparación con el COVID',
        body: 'En febrero de 2020, un virus se estaba expandiendo en el extranjero. La bolsa estaba bien. Tus hijos iban a la escuela. Salías a restaurantes y dabas apretones de mano. Si alguien te decía que estaba almacenando papel de baño, pensarías que pasaba demasiado tiempo en un rincón raro de internet.\n\nTres semanas después, el mundo entero había cambiado.\n\nMatt Shumer — con seis años construyendo en el espacio de IA — publicó un hilo en febrero de 2026 que fue visto 86 millones de veces en 48 horas. Su argumento de apertura: estamos en la fase de “esto parece exagerado” de algo mucho más grande que el COVID. No está solo. La conversación que ocurre en las comunidades donde realmente se construye la IA no suena para nada a lo que la mayoría de los profesionales escuchan en sus industrias.\n\nLas personas que están lanzando la alarma no están prediciendo. Están reportando lo que ya le pasó a sus propios trabajos.',
      },
      {
        id: 'faster-than-news',
        heading: 'Ya se mueve más rápido de lo que cubren las noticias',
        body: 'Existe una organización llamada METR que mide esto con datos. Rastrean cuánto tiempo puede trabajar una IA de forma independiente en tareas reales sin ayuda humana. Hace un año, la respuesta era aproximadamente diez minutos. Luego una hora. Luego varias horas. Su medición más reciente mostró a la IA completando tareas que le toman casi cinco horas a un experto humano — y ese número se está duplicando aproximadamente cada siete meses.\n\nEsas mediciones todavía no incluyen los últimos modelos lanzados en 2026.\n\nEl problema de los planes gratuitos agrava esto. La mayoría de las personas usa la versión gratuita de las herramientas de IA, que está más de un año por detrás de lo que tienen los usuarios de pago. Juzgar la IA por las herramientas gratuitas es como evaluar el estado de los smartphones usando un teléfono de prepago. Las personas que pagan por las mejores herramientas y las usan diariamente para trabajo real están experimentando una tecnología completamente diferente.',
      },
      {
        id: 'basic-chatgpt',
        heading: 'La mayoría cree que usar ChatGPT básico es “usar IA”',
        body: 'Las mismas herramientas que se usan para responder preguntas básicas también pueden escribir y desplegar código, automatizar flujos de trabajo completos, analizar meses de datos de negocio, generar diseños listos para producción, construir herramientas internas y ejecutar tareas de forma autónoma mientras haces otra cosa.\n\nLas personas que ya descubrieron esto no trabajan más duro. Simplemente no están esperando.\n\nNo estamos en un momento de “esto será importante algún día”. Las personas que están adelante en sus industrias ahora mismo son las que empezaron a experimentar en serio hace seis meses. La barra todavía es lo suficientemente baja como para que seis meses de esfuerzo honesto te pongan por delante del 90% de tu campo.',
      },
      {
        id: 'what-this-is',
        heading: 'Qué es realmente esta encuesta',
        body: 'Es una autoevaluación global, gratuita y abierta. Sin trucos, sin argumentos de venta.\n\nLa construimos porque creemos que el primer paso para cambiar tu situación es entenderla con honestidad. Vas a responder preguntas sobre cómo realmente usas la IA en tu rol específico — no cómo planeas hacerlo, sino cómo lo haces ahora mismo. Las preguntas son específicas. Algunas te van a sorprender. Algunas van a describir cosas que no sabías que eran posibles.\n\nAl final, verás tu nivel en cinco etapas, de Explorador a Catalizador. Recibirás una descripción honesta de dónde estás y un siguiente paso concreto.',
      },
      {
        id: 'benchmark',
        heading: 'El benchmark — y cómo funciona',
        body: 'Si quieres ver cómo se comparan tus resultados con los de otros profesionales — por país, industria, tipo de empresa y rango salarial — puedes compartir tu email y algunos datos demográficos anónimos. Es completamente opcional.\n\nTus respuestas individuales nunca se comparten con nadie. El benchmark se construye con datos agregados y anónimos. Cuanta más gente participe, más útil se vuelve la comparación.\n\nSi prefieres solo ver tu resultado y seguir con tu día, también está perfectamente bien.',
      },
      {
        id: 'what-comes-next',
        heading: 'Qué viene después',
        body: 'Estamos construyendo una biblioteca de recursos alrededor de esto: herramientas para probar, comunidades para unirse, personas a quienes seguir, rutas de aprendizaje gratuitas y de pago, eventos y noticias filtradas por lo que realmente importa. Nada está detrás de un muro de pago.\n\nSi quieres algo de eso — tips, recursos, actualizaciones de comunidad — puedes activarlo cuando termines el quiz. O no. Sin presión de ningún tipo.',
      },
      {
        id: 'why-we-do-this',
        heading: 'Por qué hacemos esto',
        body: 'No somos investigadores. Somos practicantes. Dirigimos una agencia, enseñamos, construimos y estamos profundamente dentro de comunidades donde esta conversación ya ocurre a un nivel alto.\n\nConstruimos esto porque seguíamos teniendo la misma conversación: alguien talentoso, experimentado y capaz que simplemente no había sido expuesto a lo que ahora es posible. Ese es un problema que tiene solución. Este es un pequeño intento de resolverlo.\n\nSi esto resuena contigo, compártelo con alguien que debería estar pensando en esto. La mayoría de las personas no lo sabrá hasta que sea demasiado tarde. Puedes ser la razón por la que alguien que te importa llegue con ventaja.',
      },
    ],
    citation: {
      text: 'Creo que estamos en la fase de “esto parece exagerado” de algo mucho, mucho más grande que el COVID.',
      author: 'Matt Shumer (@mattshumer_)',
      source: '10 de febrero, 2026',
      url: 'https://x.com/mattshumer_/status/2021256989876109403',
      views: '86.2M vistas en X',
      date: '10 de febrero, 2026',
    },
    cta: {
      heading: '¿Listo para saber tu nivel real de adopción de IA?',
      buttonLabel: 'Hacer el assessment →',
    },
  },
};

export function getAboutContent(locale: Locale): AboutContent {
  return ABOUT_CONTENT[locale];
}
