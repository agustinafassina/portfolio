export const locales = ['en', 'es', 'it'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  it: 'Italiano',
};

export const ogLocales: Record<Locale, string> = {
  en: 'en_GB',
  es: 'es_AR',
  it: 'it_IT',
};

const en = {
  'nav.home': 'Home',
  'nav.projects': 'Projects',
  'nav.blog': 'Blog',
  'nav.travels': 'Travels',
  'nav.contact': 'Contact',
  'nav.menu': 'Main navigation',

  'site.tagline': 'DevOps, cloud infrastructure, automation and serial map-pinning.',
  'site.description':
    'Portfolio of Agustina Fassina: infrastructure, cloud operations, platform automation and reliable systems.',
  'site.keywords': 'devops, automation, cloud, infrastructure, platform engineering, portfolio',

  'home.greeting': "Hi, I'm",
  'home.role': 'DevOps · Cloud Infrastructure & Automation · Argentina 🇦🇷',
  'home.pitch':
    'I started out in backend development, then moved deeper into servers, infrastructure and cloud ops: deployments, environments, performance and keeping services reliable. Today I build and run systems across different stacks, with a strong focus on automation and platform work.',
  'home.ctaProjects': 'See my work',
  'home.ctaContact': 'Get in touch',
  'home.latestProjects': 'Latest projects',
  'home.latestPosts': 'From the blog',
  'home.viewAllProjects': 'All projects',
  'home.viewAllPosts': 'All posts',
  'home.deskAlt':
    'An illustrated night-time desk with a world map, a whiteboard and Buenos Aires through the window',

  'illustration.desk.projects': 'A whiteboard covered in a hand-drawn deployment flowchart',
  'illustration.desk.travels': 'A pinned paper world map on a wall marking visited cities',
  'illustration.desk.blog': 'A shelf of books and an open notebook on a wooden desk',
  'illustration.desk.contact': 'A window looking out over Buenos Aires at night',

  'projects.title': 'Projects',
  'projects.description':
    'Scripts, modules and small tools. Each one started as a problem I got tired of solving by hand.',
  'projects.stack': 'Stack',
  'projects.repo': 'Repository',
  'projects.demo': 'Live demo',
  'projects.readMore': 'Read more',
  'projects.empty': 'No projects yet.',

  'blog.title': 'Blog',
  'blog.description':
    'Notes on infrastructure, cloud operations, automation and the occasional postmortem of something I broke.',
  'blog.readMore': 'Read post',
  'blog.publishedOn': 'Published',
  'blog.updatedOn': 'Updated',
  'blog.category': 'Category',
  'blog.backToList': 'Back to all posts',
  'blog.empty': 'No posts yet.',
  'blog.tableOfContents': 'On this page',

  'travels.title': 'Travels',
  'travels.description':
    'Every pin on this map is a place I have actually stood. The wall version has more coffee stains.',
  'travels.countries': 'Countries visited',
  'travels.gallery': 'Photo gallery',
  'travels.visitedOn': 'Visited',
  'travels.mapLabel': 'Interactive map of visited countries',
  'travels.previousPhoto': 'Previous photo',
  'travels.nextPhoto': 'Next photo',
  'travels.photoOf': 'Photo',
  'travels.empty': 'No travels logged yet.',

  'contact.title': 'Contact',
  'contact.description':
    'Got a project, a question, or a good recommendation for somewhere to visit? Write to me.',
  'contact.formName': 'Your name',
  'contact.formEmail': 'Your email',
  'contact.formMessage': 'Message',
  'contact.formSend': 'Send message',
  'contact.formNamePlaceholder': 'Ada Lovelace',
  'contact.formEmailPlaceholder': 'ada@example.com',
  'contact.formMessagePlaceholder': 'Tell me what you are building...',
  'contact.orEmail': 'Or email me directly at',
  'contact.socials': 'Find me elsewhere',

  'footer.rss': 'RSS feed',
  'footer.builtWith': 'Built with Astro',
  'footer.rights': 'All rights reserved.',
  'footer.nav': 'Footer navigation',

  'theme.toggle': 'Toggle colour theme',
  'theme.light': 'Light',
  'theme.dark': 'Dark',

  'lang.label': 'Change language',
  'lang.current': 'Current language',

  'common.fallbackNotice': 'This entry is not translated yet, showing the English version.',
  'common.skipToContent': 'Skip to content',
  'common.notFound': 'Page not found',
} as const;

export type UIKey = keyof typeof en;

const es: Record<UIKey, string> = {
  'nav.home': 'Inicio',
  'nav.projects': 'Proyectos',
  'nav.blog': 'Blog',
  'nav.travels': 'Viajes',
  'nav.contact': 'Contacto',
  'nav.menu': 'Navegación principal',

  'site.tagline': 'DevOps, infraestructura cloud, automatización y chinches en el mapa.',
  'site.description':
    'Portfolio de Agustina Fassina: infraestructura, operaciones cloud, automatización de plataformas y sistemas confiables.',
  'site.keywords': 'devops, automatización, cloud, infraestructura, ingeniería de plataformas, portfolio',

  'home.greeting': 'Hola, soy',
  'home.role': 'DevOps · Infraestructura Cloud y Automatización · Argentina 🇦🇷',
  'home.pitch':
    'Empecé en desarrollo backend y después me fui metiendo de lleno en servidores, infraestructura y operaciones cloud: despliegues, entornos, rendimiento y servicios confiables. Hoy construyo y opero sistemas con distintos stacks, con un fuerte foco en automatización y trabajo de plataforma.',
  'home.ctaProjects': 'Ver mi trabajo',
  'home.ctaContact': 'Escribime',
  'home.latestProjects': 'Últimos proyectos',
  'home.latestPosts': 'Del blog',
  'home.viewAllProjects': 'Todos los proyectos',
  'home.viewAllPosts': 'Todos los posts',
  'home.deskAlt':
    'Un escritorio ilustrado de noche con un mapa del mundo, una pizarra y Buenos Aires por la ventana',

  'illustration.desk.projects': 'Una pizarra con un diagrama de despliegue dibujado a mano',
  'illustration.desk.travels': 'Un mapa del mundo en la pared con chinchetas marcando ciudades visitadas',
  'illustration.desk.blog': 'Una repisa con libros y una libreta abierta sobre un escritorio de madera',
  'illustration.desk.contact': 'Una ventana con vista a Buenos Aires de noche',

  'projects.title': 'Proyectos',
  'projects.description':
    'Scripts, módulos y herramientas chicas. Cada uno empezó como un problema que me cansé de resolver a mano.',
  'projects.stack': 'Stack',
  'projects.repo': 'Repositorio',
  'projects.demo': 'Demo en vivo',
  'projects.readMore': 'Leer más',
  'projects.empty': 'Todavía no hay proyectos.',

  'blog.title': 'Blog',
  'blog.description':
    'Notas sobre infraestructura, operaciones cloud, automatización y alguna que otra autopsia de algo que rompí.',
  'blog.readMore': 'Leer post',
  'blog.publishedOn': 'Publicado',
  'blog.updatedOn': 'Actualizado',
  'blog.category': 'Categoría',
  'blog.backToList': 'Volver a todos los posts',
  'blog.empty': 'Todavía no hay posts.',
  'blog.tableOfContents': 'En esta página',

  'travels.title': 'Viajes',
  'travels.description':
    'Cada chinche de este mapa es un lugar donde realmente estuve parada. La versión de la pared tiene más manchas de café.',
  'travels.countries': 'Países visitados',
  'travels.gallery': 'Galería de fotos',
  'travels.visitedOn': 'Visitado',
  'travels.mapLabel': 'Mapa interactivo de países visitados',
  'travels.previousPhoto': 'Foto anterior',
  'travels.nextPhoto': 'Foto siguiente',
  'travels.photoOf': 'Foto',
  'travels.empty': 'Todavía no hay viajes registrados.',

  'contact.title': 'Contacto',
  'contact.description':
    '¿Tenés un proyecto, una duda o una buena recomendación de algún lugar para visitar? Escribime.',
  'contact.formName': 'Tu nombre',
  'contact.formEmail': 'Tu email',
  'contact.formMessage': 'Mensaje',
  'contact.formSend': 'Enviar mensaje',
  'contact.formNamePlaceholder': 'Ada Lovelace',
  'contact.formEmailPlaceholder': 'ada@ejemplo.com',
  'contact.formMessagePlaceholder': 'Contame qué estás construyendo...',
  'contact.orEmail': 'O escribime directamente a',
  'contact.socials': 'Encontrame en otros lados',

  'footer.rss': 'Feed RSS',
  'footer.builtWith': 'Hecho con Astro',
  'footer.rights': 'Todos los derechos reservados.',
  'footer.nav': 'Navegación del pie',

  'theme.toggle': 'Cambiar tema de color',
  'theme.light': 'Claro',
  'theme.dark': 'Oscuro',

  'lang.label': 'Cambiar idioma',
  'lang.current': 'Idioma actual',

  'common.fallbackNotice': 'Esta entrada todavía no está traducida, se muestra la versión en inglés.',
  'common.skipToContent': 'Saltar al contenido',
  'common.notFound': 'Página no encontrada',
};

const it: Record<UIKey, string> = {
  'nav.home': 'Home',
  'nav.projects': 'Progetti',
  'nav.blog': 'Blog',
  'nav.travels': 'Viaggi',
  'nav.contact': 'Contatti',
  'nav.menu': 'Navigazione principale',

  'site.tagline': 'DevOps, infrastruttura cloud, automazione e spilli sulla mappa.',
  'site.description':
    'Portfolio di Agustina Fassina: infrastruttura, operazioni cloud, automazione di piattaforma e sistemi affidabili.',
  'site.keywords': 'devops, automazione, cloud, infrastruttura, platform engineering, portfolio',

  'home.greeting': 'Ciao, sono',
  'home.role': 'DevOps · Infrastruttura Cloud e Automazione · Argentina 🇦🇷',
  'home.pitch':
    'Ho iniziato nello sviluppo backend, poi mi sono concentrata sempre di più su server, infrastruttura e operazioni cloud: deploy, ambienti, prestazioni e affidabilità dei servizi. Oggi costruisco e gestisco sistemi con stack diversi, con una forte attenzione all automazione e al lavoro di piattaforma.',
  'home.ctaProjects': 'Guarda i miei lavori',
  'home.ctaContact': 'Scrivimi',
  'home.latestProjects': 'Ultimi progetti',
  'home.latestPosts': 'Dal blog',
  'home.viewAllProjects': 'Tutti i progetti',
  'home.viewAllPosts': 'Tutti gli articoli',
  'home.deskAlt':
    'Una scrivania illustrata di notte con una mappa del mondo, una lavagna e Buenos Aires dalla finestra',

  'illustration.desk.projects': 'Una lavagna con un diagramma di deploy disegnato a mano',
  'illustration.desk.travels': 'Una mappa del mondo appuntata al muro con spilli sulle città visitate',
  'illustration.desk.blog': 'Una mensola con libri e un taccuino aperto su una scrivania in legno',
  'illustration.desk.contact': 'Una finestra con vista su Buenos Aires di notte',

  'projects.title': 'Progetti',
  'projects.description':
    'Script, moduli e piccoli strumenti. Ognuno è nato da un problema che mi ero stancata di risolvere a mano.',
  'projects.stack': 'Stack',
  'projects.repo': 'Repository',
  'projects.demo': 'Demo dal vivo',
  'projects.readMore': 'Leggi di più',
  'projects.empty': 'Ancora nessun progetto.',

  'blog.title': 'Blog',
  'blog.description':
    'Appunti su infrastruttura, operazioni cloud, automazione e qualche autopsia di cose che ho rotto.',
  'blog.readMore': 'Leggi articolo',
  'blog.publishedOn': 'Pubblicato',
  'blog.updatedOn': 'Aggiornato',
  'blog.category': 'Categoria',
  'blog.backToList': 'Torna a tutti gli articoli',
  'blog.empty': 'Ancora nessun articolo.',
  'blog.tableOfContents': 'In questa pagina',

  'travels.title': 'Viaggi',
  'travels.description':
    'Ogni spillo su questa mappa è un posto in cui sono stata davvero. La versione sul muro ha più macchie di caffè.',
  'travels.countries': 'Paesi visitati',
  'travels.gallery': 'Galleria fotografica',
  'travels.visitedOn': 'Visitato',
  'travels.mapLabel': 'Mappa interattiva dei paesi visitati',
  'travels.previousPhoto': 'Foto precedente',
  'travels.nextPhoto': 'Foto successiva',
  'travels.photoOf': 'Foto',
  'travels.empty': 'Ancora nessun viaggio registrato.',

  'contact.title': 'Contatti',
  'contact.description':
    'Hai un progetto, una domanda o un buon consiglio su un posto da visitare? Scrivimi.',
  'contact.formName': 'Il tuo nome',
  'contact.formEmail': 'La tua email',
  'contact.formMessage': 'Messaggio',
  'contact.formSend': 'Invia messaggio',
  'contact.formNamePlaceholder': 'Ada Lovelace',
  'contact.formEmailPlaceholder': 'ada@esempio.com',
  'contact.formMessagePlaceholder': 'Raccontami cosa stai costruendo...',
  'contact.orEmail': 'Oppure scrivimi direttamente a',
  'contact.socials': 'Trovami altrove',

  'footer.rss': 'Feed RSS',
  'footer.builtWith': 'Fatto con Astro',
  'footer.rights': 'Tutti i diritti riservati.',
  'footer.nav': 'Navigazione del footer',

  'theme.toggle': 'Cambia tema colore',
  'theme.light': 'Chiaro',
  'theme.dark': 'Scuro',

  'lang.label': 'Cambia lingua',
  'lang.current': 'Lingua attuale',

  'common.fallbackNotice': 'Questa voce non è ancora tradotta, viene mostrata la versione inglese.',
  'common.skipToContent': 'Vai al contenuto',
  'common.notFound': 'Pagina non trovata',
};

export const ui: Record<Locale, Record<UIKey, string>> = { en, es, it };
