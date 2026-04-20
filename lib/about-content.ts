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

export const ABOUT_CONTENT: Record<'en' | 'es', AboutContent> = {
  en: {
    meta: {
      title: 'Something Big Is Happening. Most People Don\u2019t Know Yet.',
      subtitle: 'Why we built this global AI adoption survey \u2014 and why it matters right now.',
      author: 'Orlando Osorio & Alberto Sadde',
      authorHandle: '@orlandosorio_ · @aesadde',
      publishedDate: '2026',
      readTime: '8 min read',
    },
    sections: [
      {
        id: 'opening',
        body: 'Most people think they\u2019re using AI. Most people are wrong.\n\nWe spend a lot of time in the communities where this is actually happening \u2014 on X, YouTube, Discord servers, offline events, and forums where developers, founders, and operators are pushing AI further every week. And the gap between what those people are doing and what the average professional thinks \u201cusing AI\u201d means is bigger than most people realize.\n\nHere\u2019s what we keep seeing: someone says they use AI at work. What they mean is they open ChatGPT a few times a week to search for something, rewrite an email, or summarize a document. That\u2019s not wrong. But it\u2019s the first step on a long staircase \u2014 and most people don\u2019t know the staircase exists.',
      },
      {
        id: 'covid-comparison',
        heading: 'The COVID comparison',
        body: 'In February 2020, a virus was spreading overseas. The stock market was doing great. Your kids were in school. You were going to restaurants and shaking hands. If someone told you they were stockpiling toilet paper, you would have thought they\u2019d been spending too much time on a weird corner of the internet.\n\nThen, over three weeks, the entire world changed.\n\nMatt Shumer \u2014 with six years building in the AI space \u2014 published a thread in February 2026 that was seen 86 million times in 48 hours. His opening argument: we\u2019re now in the \u201cthis seems overblown\u201d phase of something much bigger than Covid. He\u2019s not alone. The conversation happening in the communities where AI is actually being built sounds nothing like what most professionals hear in their industries.\n\nThe people raising the alarm aren\u2019t predicting. They\u2019re reporting what already happened to their own jobs.',
      },
      {
        id: 'faster-than-news',
        heading: 'It\u2019s already moving faster than the news covers',
        body: 'There\u2019s an organization called METR that actually measures this with data. They track how long an AI can work independently on real tasks without human help. About a year ago, the answer was roughly ten minutes. Then an hour. Then several hours. Their most recent measurement showed AI completing tasks that take a human expert nearly five hours \u2014 and that number is doubling approximately every seven months.\n\nThose measurements don\u2019t yet include the latest models released in early 2026.\n\nThe free tier problem compounds this. Most people are using the free version of AI tools, which is over a year behind what paying users have access to. Judging AI by the free-tier tools is like evaluating the state of smartphones by using a flip phone. The people paying for the best tools and using them daily for real work are experiencing a completely different technology.',
      },
      {
        id: 'basic-chatgpt',
        heading: 'Most people think basic ChatGPT use is \u201cusing AI.\u201d',
        body: 'The same tools being used to answer basic questions can also write and deploy code, automate entire workflows, analyze months of business data, generate production-ready designs, build internal tools, and run tasks autonomously while you do something else entirely.\n\nPeople who\u2019ve figured this out aren\u2019t working harder. They\u2019re just not waiting.\n\nWe\u2019re not in a \u201cthis will be important someday\u201d moment. The people who are ahead in their industries right now are the ones who started experimenting seriously six months ago. The bar is still low enough that six months of honest effort puts you ahead of 90% of your field.',
      },
      {
        id: 'what-this-is',
        heading: 'What this survey actually is',
        body: 'This is a free, global, open self-assessment. No tricks, no sales pitch.\n\nWe built it because we believe the first step to changing your situation is understanding it honestly. You\u2019ll answer questions about how you actually use AI in your specific role \u2014 not how you plan to, not how you think you should, but how you do right now. The questions get specific. Some of them will surprise you. Some of them will describe things you didn\u2019t know were possible.\n\nAt the end, you\u2019ll see your level across five stages, from Explorer to Catalyst. You\u2019ll get an honest description of where you are and one concrete next step.',
      },
      {
        id: 'benchmark',
        heading: 'The benchmark \u2014 and how it works',
        body: 'If you want to see how your results compare to other professionals \u2014 by country, industry, company type, and salary range \u2014 you can share your email and a few anonymous demographic details. This is completely optional.\n\nYour individual answers are never shared with anyone. The benchmark is built from aggregate, anonymous data. The more people participate, the more useful the comparison becomes.\n\nIf you\u2019d rather just see your own result and leave, that\u2019s completely fine too.',
      },
      {
        id: 'what-comes-next',
        heading: 'What comes next',
        body: 'We\u2019re building a library of resources around this: tools to try, communities to join, people to follow, free and paid learning paths, events, and news filtered for what actually matters. None of it is behind a paywall.\n\nIf you want any of that \u2014 tips, resources, community updates \u2014 you can opt in when you finish the quiz. Or not. No pressure either way.',
      },
      {
        id: 'why-we-do-this',
        heading: 'Why we\u2019re doing this',
        body: 'We\u2019re not researchers. We\u2019re practitioners. We run an agency, we teach, we build, and we\u2019re deep in communities where this conversation is already happening at a high level.\n\nWe built this because we kept having the same conversation: someone talented, experienced, and capable who simply hadn\u2019t been exposed to what\u2019s now possible. That\u2019s a fixable problem. This is one small attempt to fix it.\n\nIf this resonates with you, share it with someone who should be thinking about this. Most people won\u2019t hear it until it\u2019s too late. You can be the reason someone you care about gets a head start.',
      },
    ],
    citation: {
      text: 'I think we\u2019re in the \u201cthis seems overblown\u201d phase of something much, much bigger than Covid.',
      author: 'Matt Shumer (@mattshumer_)',
      source: 'February 10, 2026',
      url: 'https://x.com/mattshumer_/status/2021256989876109403',
      views: '86.2M views on X',
      date: 'February 10, 2026',
    },
    cta: {
      heading: 'Ready to find out your real AI adoption level?',
      buttonLabel: 'Take the assessment \u2192',
    },
  },
  es: {
    meta: {
      title: 'Algo grande est\u00e1 pasando. La mayor\u00eda todav\u00eda no lo sabe.',
      subtitle:
        'Por qu\u00e9 construimos esta encuesta global de adopci\u00f3n de IA \u2014 y por qu\u00e9 importa ahora mismo.',
      author: 'Orlando Osorio & Alberto Sadde',
      authorHandle: '@orlandosorio_ · @aesadde',
      publishedDate: '2026',
      readTime: '8 min de lectura',
    },
    sections: [
      {
        id: 'opening',
        body: 'La mayor\u00eda de las personas creen que est\u00e1n usando IA. La mayor\u00eda est\u00e1 equivocada.\n\nPasamos mucho tiempo en las comunidades donde esto realmente est\u00e1 ocurriendo \u2014 en X, YouTube, servidores de Discord, eventos presenciales y foros donde desarrolladores, fundadores y operadores llevan la IA m\u00e1s lejos cada semana. Y la brecha entre lo que esa gente hace y lo que el profesional promedio entiende por \u201cusar IA\u201d es m\u00e1s grande de lo que la mayor\u00eda imagina.\n\nEsto es lo que seguimos viendo: alguien dice que usa IA en el trabajo. Lo que quiere decir es que abre ChatGPT unas veces a la semana para buscar algo, reescribir un email o resumir un documento. Eso no est\u00e1 mal. Pero es el primer pelda\u00f1o de una escalera muy larga \u2014 y la mayor\u00eda de las personas no sabe que esa escalera existe.',
      },
      {
        id: 'covid-comparison',
        heading: 'La comparaci\u00f3n con el COVID',
        body: 'En febrero de 2020, un virus se estaba expandiendo en el extranjero. La bolsa estaba bien. Tus hijos iban a la escuela. Sal\u00edas a restaurantes y dabas apretones de mano. Si alguien te dec\u00eda que estaba almacenando papel de ba\u00f1o, pensar\u00edas que pasaba demasiado tiempo en un rinc\u00f3n raro de internet.\n\nTres semanas despu\u00e9s, el mundo entero hab\u00eda cambiado.\n\nMatt Shumer \u2014 con seis a\u00f1os construyendo en el espacio de IA \u2014 public\u00f3 un hilo en febrero de 2026 que fue visto 86 millones de veces en 48 horas. Su argumento de apertura: estamos en la fase de \u201cesto parece exagerado\u201d de algo mucho m\u00e1s grande que el COVID. No est\u00e1 solo. La conversaci\u00f3n que ocurre en las comunidades donde realmente se construye la IA no suena para nada a lo que la mayor\u00eda de los profesionales escuchan en sus industrias.\n\nLas personas que est\u00e1n lanzando la alarma no est\u00e1n prediciendo. Est\u00e1n reportando lo que ya le pas\u00f3 a sus propios trabajos.',
      },
      {
        id: 'faster-than-news',
        heading: 'Ya se mueve m\u00e1s r\u00e1pido de lo que cubren las noticias',
        body: 'Existe una organizaci\u00f3n llamada METR que mide esto con datos. Rastrean cu\u00e1nto tiempo puede trabajar una IA de forma independiente en tareas reales sin ayuda humana. Hace un a\u00f1o, la respuesta era aproximadamente diez minutos. Luego una hora. Luego varias horas. Su medici\u00f3n m\u00e1s reciente mostr\u00f3 a la IA completando tareas que le toman casi cinco horas a un experto humano \u2014 y ese n\u00famero se est\u00e1 duplicando aproximadamente cada siete meses.\n\nEsas mediciones todav\u00eda no incluyen los \u00faltimos modelos lanzados en 2026.\n\nEl problema de los planes gratuitos agrava esto. La mayor\u00eda de las personas usa la versi\u00f3n gratuita de las herramientas de IA, que est\u00e1 m\u00e1s de un a\u00f1o por detr\u00e1s de lo que tienen los usuarios de pago. Juzgar la IA por las herramientas gratuitas es como evaluar el estado de los smartphones usando un tel\u00e9fono de prepago. Las personas que pagan por las mejores herramientas y las usan diariamente para trabajo real est\u00e1n experimentando una tecnolog\u00eda completamente diferente.',
      },
      {
        id: 'basic-chatgpt',
        heading: 'La mayor\u00eda cree que usar ChatGPT b\u00e1sico es \u201cusar IA\u201d',
        body: 'Las mismas herramientas que se usan para responder preguntas b\u00e1sicas tambi\u00e9n pueden escribir y desplegar c\u00f3digo, automatizar flujos de trabajo completos, analizar meses de datos de negocio, generar dise\u00f1os listos para producci\u00f3n, construir herramientas internas y ejecutar tareas de forma aut\u00f3noma mientras haces otra cosa.\n\nLas personas que ya descubrieron esto no trabajan m\u00e1s duro. Simplemente no est\u00e1n esperando.\n\nNo estamos en un momento de \u201cesto ser\u00e1 importante alg\u00fan d\u00eda\u201d. Las personas que est\u00e1n adelante en sus industrias ahora mismo son las que empezaron a experimentar en serio hace seis meses. La barra todav\u00eda es lo suficientemente baja como para que seis meses de esfuerzo honesto te pongan por delante del 90% de tu campo.',
      },
      {
        id: 'what-this-is',
        heading: 'Qu\u00e9 es realmente esta encuesta',
        body: 'Es una autoevaluaci\u00f3n global, gratuita y abierta. Sin trucos, sin argumentos de venta.\n\nLa construimos porque creemos que el primer paso para cambiar tu situaci\u00f3n es entenderla con honestidad. Vas a responder preguntas sobre c\u00f3mo realmente usas la IA en tu rol espec\u00edfico \u2014 no c\u00f3mo planeas hacerlo, sino c\u00f3mo lo haces ahora mismo. Las preguntas son espec\u00edficas. Algunas te van a sorprender. Algunas van a describir cosas que no sab\u00edas que eran posibles.\n\nAl final, ver\u00e1s tu nivel en cinco etapas, de Explorador a Catalizador. Recibir\u00e1s una descripci\u00f3n honesta de d\u00f3nde est\u00e1s y un siguiente paso concreto.',
      },
      {
        id: 'benchmark',
        heading: 'El benchmark \u2014 y c\u00f3mo funciona',
        body: 'Si quieres ver c\u00f3mo se comparan tus resultados con los de otros profesionales \u2014 por pa\u00eds, industria, tipo de empresa y rango salarial \u2014 puedes compartir tu email y algunos datos demogr\u00e1ficos an\u00f3nimos. Es completamente opcional.\n\nTus respuestas individuales nunca se comparten con nadie. El benchmark se construye con datos agregados y an\u00f3nimos. Cuanta m\u00e1s gente participe, m\u00e1s \u00fatil se vuelve la comparaci\u00f3n.\n\nSi prefieres solo ver tu resultado y seguir con tu d\u00eda, tambi\u00e9n est\u00e1 perfectamente bien.',
      },
      {
        id: 'what-comes-next',
        heading: 'Qu\u00e9 viene despu\u00e9s',
        body: 'Estamos construyendo una biblioteca de recursos alrededor de esto: herramientas para probar, comunidades para unirse, personas a quienes seguir, rutas de aprendizaje gratuitas y de pago, eventos y noticias filtradas por lo que realmente importa. Nada est\u00e1 detr\u00e1s de un muro de pago.\n\nSi quieres algo de eso \u2014 tips, recursos, actualizaciones de comunidad \u2014 puedes activarlo cuando termines el quiz. O no. Sin presi\u00f3n de ning\u00fan tipo.',
      },
      {
        id: 'why-we-do-this',
        heading: 'Por qu\u00e9 hacemos esto',
        body: 'No somos investigadores. Somos practicantes. Dirigimos una agencia, ense\u00f1amos, construimos y estamos profundamente dentro de comunidades donde esta conversaci\u00f3n ya ocurre a un nivel alto.\n\nConstruimos esto porque segu\u00edamos teniendo la misma conversaci\u00f3n: alguien talentoso, experimentado y capaz que simplemente no hab\u00eda sido expuesto a lo que ahora es posible. Ese es un problema que tiene soluci\u00f3n. Este es un peque\u00f1o intento de resolverlo.\n\nSi esto resuena contigo, comp\u00e1rtelo con alguien que deber\u00eda estar pensando en esto. La mayor\u00eda de las personas no lo sabr\u00e1 hasta que sea demasiado tarde. Puedes ser la raz\u00f3n por la que alguien que te importa llegue con ventaja.',
      },
    ],
    citation: {
      text: 'Creo que estamos en la fase de \u201cesto parece exagerado\u201d de algo mucho, mucho m\u00e1s grande que el COVID.',
      author: 'Matt Shumer (@mattshumer_)',
      source: '10 de febrero, 2026',
      url: 'https://x.com/mattshumer_/status/2021256989876109403',
      views: '86.2M vistas en X',
      date: '10 de febrero, 2026',
    },
    cta: {
      heading: '\u00bfListo para saber tu nivel real de adopci\u00f3n de IA?',
      buttonLabel: 'Hacer el assessment \u2192',
    },
  },
};
