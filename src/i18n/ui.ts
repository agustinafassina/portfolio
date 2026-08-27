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
  'home.role': 'DevOps · Cloud Infrastructure & Automation',
  'home.pitch':
    'I design and run cloud platforms: deployments, account security with daily scans and metrics, automation, and FinOps habits like Cost Explorer by project tag so spend stays predictable in production. I also build product backends in .NET when an API is needed, create and maintain Azure DevOps pipelines, and as a hobby I like building things with code, like dashboards and games.',
  'home.ctaProjects': 'See my work',
  'home.ctaContact': 'Get in touch',
  'home.latestProjects': 'Featured projects',
  'home.latestPosts': 'From the blog',
  'home.viewAllProjects': 'All projects',
  'home.viewAllPosts': 'All posts',
  'home.skillsTitle': 'Skills',
  'home.skillsSummary':
    'The domains I hire for. Tools and depth live in the full map, so it can keep growing without crowding this page.',
  'home.skillsMap': 'Full skills map',
  'home.skillsDomain.cloud': 'Cloud platforms',
  'home.skillsDomain.iac': 'IaC & containers',
  'home.skillsDomain.cicd': 'CI/CD & automation',
  'home.skillsDomain.security': 'Security & identity',
  'home.skillsDomain.dotnet': '.NET APIs',
  'home.skillsDomain.data': 'Data stores',
  'home.travelsTitle': 'Travels',
  'home.travelsSummary':
    'Pins on a map for places I actually stood. The wall version has more coffee stains.',
  'home.travelsBannerAlt':
    'Illustrated world map with a dashed travel route and a tiny car on the road',
  'home.viewAllTravels': 'See the map',
  'home.contactCtaTitle': 'Get in touch',
  'home.contactCtaBody':
    'Hiring, platform work, or a question about something I built. Write here or email me directly.',
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
  'projects.startedOn': 'Started',
  'projects.repo': 'Repository',
  'projects.demo': 'Live demo',
  'projects.readMore': 'Read more',
  'projects.empty': 'No projects yet.',
  'projects.outcome': 'Outcome',
  'projects.problem': 'Problem',
  'projects.decision': 'Decision',
  'projects.result': 'Result',
  'projects.metrics': 'Metrics',

  'blog.title': 'Blog',
  'blog.description':
    'Notes on infrastructure, cloud operations, automation and the occasional postmortem of something I broke.',
  'blog.readMore': 'Read post',
  'blog.publishedOn': 'Published',
  'blog.updatedOn': 'Updated',
  'blog.category': 'Category',
  'blog.categories': 'What I write about',
  'blog.category.postmortem': 'Postmortem',
  'blog.category.postmortem.about': 'Things that broke in production — and what we changed after.',
  'blog.category.infrastructure': 'Infrastructure',
  'blog.category.infrastructure.about':
    'AWS and architecture decisions: when to pick a pattern, and when to walk away.',
  'blog.category.craft': 'Craft',
  'blog.category.craft.about':
    'Opinions on how we work: comments, runbooks, reviews and habits that survive 3am.',
  'blog.category.automation': 'Automation',
  'blog.category.automation.about':
    'Scripts, pipelines, cron jobs and IaC — the boring glue that keeps systems running.',
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
    'Roles, collaborations, questions about my work, or a place worth visiting. Write here or email me directly.',
  'contact.formHeading': 'Send a message',
  'contact.formName': 'Your name',
  'contact.formEmail': 'Your email',
  'contact.formMessage': 'Message',
  'contact.formSend': 'Send message',
  'contact.formCaptcha': 'Security check',
  'contact.formNamePlaceholder': 'Your name',
  'contact.formEmailPlaceholder': 'you@company.com',
  'contact.formMessagePlaceholder':
    'Tell me about the role, the problem, or what you want to build...',
  'contact.orEmail': 'Email',
  'contact.socials': 'Elsewhere',
  'contact.asideNote':
    'I read every message. Hiring and platform work first; travel tips always welcome.',

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
  'site.keywords':
    'devops, automatización, cloud, infraestructura, ingeniería de plataformas, portfolio',

  'home.greeting': 'Hola, soy',
  'home.role': 'DevOps · Infraestructura Cloud y Automatización',
  'home.pitch':
    'Diseño y opero plataformas cloud: despliegues, seguridad de cuenta con escaneos diarios y métricas, automatización y FinOps concreto (Cost Explorer por tag de proyecto) para que el gasto se mantenga predecible en producción. También armo backends de producto en .NET cuando hace falta una API, creo y mantengo pipelines en Azure DevOps, y de hobby me gusta crear cosas con código, como dashboards y juegos.',
  'home.ctaProjects': 'Ver mi trabajo',
  'home.ctaContact': 'Escribime',
  'home.latestProjects': 'Proyectos destacados',
  'home.latestPosts': 'Del blog',
  'home.viewAllProjects': 'Todos los proyectos',
  'home.viewAllPosts': 'Todos los posts',
  'home.skillsTitle': 'Skills',
  'home.skillsSummary':
    'Los dominios por los que me contratan. Tools y detalle viven en el mapa completo, así puede crecer sin llenar esta página.',
  'home.skillsMap': 'Mapa completo de skills',
  'home.skillsDomain.cloud': 'Plataformas cloud',
  'home.skillsDomain.iac': 'IaC y contenedores',
  'home.skillsDomain.cicd': 'CI/CD y automatización',
  'home.skillsDomain.security': 'Seguridad e identidad',
  'home.skillsDomain.dotnet': 'APIs .NET',
  'home.skillsDomain.data': 'Datos',
  'home.travelsTitle': 'Viajes',
  'home.travelsSummary':
    'Chinches en un mapa de lugares donde realmente estuve. La versión de la pared tiene más manchas de café.',
  'home.travelsBannerAlt':
    'Mapa del mundo ilustrado con una ruta de viaje punteada y un autito en el camino',
  'home.viewAllTravels': 'Ver el mapa',
  'home.contactCtaTitle': 'Escribime',
  'home.contactCtaBody':
    'Hiring, trabajo de plataforma o una duda sobre algo que armé. Escribí acá o mandame un mail directo.',
  'home.deskAlt':
    'Un escritorio ilustrado de noche con un mapa del mundo, una pizarra y Buenos Aires por la ventana',

  'illustration.desk.projects': 'Una pizarra con un diagrama de despliegue dibujado a mano',
  'illustration.desk.travels':
    'Un mapa del mundo en la pared con chinchetas marcando ciudades visitadas',
  'illustration.desk.blog':
    'Una repisa con libros y una libreta abierta sobre un escritorio de madera',
  'illustration.desk.contact': 'Una ventana con vista a Buenos Aires de noche',

  'projects.title': 'Proyectos',
  'projects.description':
    'Scripts, módulos y herramientas chicas. Cada uno empezó como un problema que me cansé de resolver a mano.',
  'projects.stack': 'Stack',
  'projects.startedOn': 'Inicio',
  'projects.repo': 'Repositorio',
  'projects.demo': 'Demo en vivo',
  'projects.readMore': 'Leer más',
  'projects.empty': 'Todavía no hay proyectos.',
  'projects.outcome': 'Resultado',
  'projects.problem': 'Problema',
  'projects.decision': 'Decisión',
  'projects.result': 'Impacto',
  'projects.metrics': 'Métricas',

  'blog.title': 'Blog',
  'blog.description':
    'Notas sobre infraestructura, operaciones cloud, automatización y alguna que otra autopsia de algo que rompí.',
  'blog.readMore': 'Leer post',
  'blog.publishedOn': 'Publicado',
  'blog.updatedOn': 'Actualizado',
  'blog.category': 'Categoría',
  'blog.categories': 'De qué escribo',
  'blog.category.postmortem': 'Postmortem',
  'blog.category.postmortem.about':
    'Cosas que se rompieron en producción — y qué cambiamos después.',
  'blog.category.infrastructure': 'Infraestructura',
  'blog.category.infrastructure.about':
    'Decisiones de AWS y arquitectura: cuándo elegir un patrón y cuándo no.',
  'blog.category.craft': 'Oficio',
  'blog.category.craft.about':
    'Opiniones sobre cómo trabajar: comentarios, runbooks, reviews y hábitos que sobreviven a las 3am.',
  'blog.category.automation': 'Automatización',
  'blog.category.automation.about':
    'Scripts, pipelines, cron jobs e IaC — el pegamento aburrido que mantiene los sistemas en pie.',
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
    'Roles, colaboraciones, dudas sobre mi trabajo o un lugar que valga la pena. Escribí acá o mandame un mail directo.',
  'contact.formHeading': 'Enviar un mensaje',
  'contact.formName': 'Tu nombre',
  'contact.formEmail': 'Tu email',
  'contact.formMessage': 'Mensaje',
  'contact.formSend': 'Enviar mensaje',
  'contact.formCaptcha': 'Verificación de seguridad',
  'contact.formNamePlaceholder': 'Tu nombre',
  'contact.formEmailPlaceholder': 'vos@empresa.com',
  'contact.formMessagePlaceholder':
    'Contame del rol, del problema o de lo que querés construir...',
  'contact.orEmail': 'Email',
  'contact.socials': 'En otros lados',
  'contact.asideNote':
    'Leo todos los mensajes. Primero hiring y trabajo de plataforma; tips de viaje siempre bienvenidos.',

  'footer.rss': 'Feed RSS',
  'footer.builtWith': 'Hecho con Astro',
  'footer.rights': 'Todos los derechos reservados.',
  'footer.nav': 'Navegación del pie',

  'theme.toggle': 'Cambiar tema de color',
  'theme.light': 'Claro',
  'theme.dark': 'Oscuro',

  'lang.label': 'Cambiar idioma',
  'lang.current': 'Idioma actual',

  'common.fallbackNotice':
    'Esta entrada todavía no está traducida, se muestra la versión en inglés.',
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
  'home.role': 'DevOps · Infrastruttura Cloud e Automazione',
  'home.pitch':
    'Progetto e gestisco piattaforme cloud: deploy, sicurezza dell\'account con scansioni giornaliere e metriche, automazione e abitudini FinOps come Cost Explorer per tag di progetto, così la spesa resta prevedibile in produzione. Scrivo anche backend di prodotto in .NET quando serve un\'API, creo e mantengo pipeline in Azure DevOps, e per hobby mi piace creare cose con il codice, come dashboard e giochi.',
  'home.ctaProjects': 'Guarda i miei lavori',
  'home.ctaContact': 'Scrivimi',
  'home.latestProjects': 'Progetti in evidenza',
  'home.latestPosts': 'Dal blog',
  'home.viewAllProjects': 'Tutti i progetti',
  'home.viewAllPosts': 'Tutti gli articoli',
  'home.skillsTitle': 'Skills',
  'home.skillsSummary':
    'I domini per cui mi assumono. Tool e dettaglio stanno nella mappa completa, così può crescere senza riempire questa pagina.',
  'home.skillsMap': 'Mappa completa delle skills',
  'home.skillsDomain.cloud': 'Piattaforme cloud',
  'home.skillsDomain.iac': 'IaC e container',
  'home.skillsDomain.cicd': 'CI/CD e automazione',
  'home.skillsDomain.security': 'Sicurezza e identità',
  'home.skillsDomain.dotnet': 'API .NET',
  'home.skillsDomain.data': 'Dati',
  'home.travelsTitle': 'Viaggi',
  'home.travelsSummary':
    'Spilli su una mappa di posti dove sono stata davvero. La versione al muro ha più macchie di caffè.',
  'home.travelsBannerAlt':
    'Mappa del mondo illustrata con una rotta tratteggiata e una macchinina sulla strada',
  'home.viewAllTravels': 'Vedi la mappa',
  'home.contactCtaTitle': 'Scrivimi',
  'home.contactCtaBody':
    'Hiring, lavoro di piattaforma o una domanda su qualcosa che ho costruito. Scrivi qui o mandami una mail diretta.',
  'home.deskAlt':
    'Una scrivania illustrata di notte con una mappa del mondo, una lavagna e Buenos Aires dalla finestra',

  'illustration.desk.projects': 'Una lavagna con un diagramma di deploy disegnato a mano',
  'illustration.desk.travels':
    'Una mappa del mondo appuntata al muro con spilli sulle città visitate',
  'illustration.desk.blog': 'Una mensola con libri e un taccuino aperto su una scrivania in legno',
  'illustration.desk.contact': 'Una finestra con vista su Buenos Aires di notte',

  'projects.title': 'Progetti',
  'projects.description':
    'Script, moduli e piccoli strumenti. Ognuno è nato da un problema che mi ero stancata di risolvere a mano.',
  'projects.stack': 'Stack',
  'projects.startedOn': 'Inizio',
  'projects.repo': 'Repository',
  'projects.demo': 'Demo dal vivo',
  'projects.readMore': 'Leggi di più',
  'projects.empty': 'Ancora nessun progetto.',
  'projects.outcome': 'Esito',
  'projects.problem': 'Problema',
  'projects.decision': 'Decisione',
  'projects.result': 'Impatto',
  'projects.metrics': 'Metriche',

  'blog.title': 'Blog',
  'blog.description':
    'Appunti su infrastruttura, operazioni cloud, automazione e qualche autopsia di cose che ho rotto.',
  'blog.readMore': 'Leggi articolo',
  'blog.publishedOn': 'Pubblicato',
  'blog.updatedOn': 'Aggiornato',
  'blog.category': 'Categoria',
  'blog.categories': 'Di cosa scrivo',
  'blog.category.postmortem': 'Postmortem',
  'blog.category.postmortem.about':
    'Cose che si sono rotte in produzione — e cosa abbiamo cambiato dopo.',
  'blog.category.infrastructure': 'Infrastruttura',
  'blog.category.infrastructure.about':
    'Decisioni AWS e architettura: quando scegliere un pattern e quando lasciar perdere.',
  'blog.category.craft': 'Mestiere',
  'blog.category.craft.about':
    'Opinioni su come lavorare: commenti, runbook, review e abitudini che sopravvivono alle 3 di notte.',
  'blog.category.automation': 'Automazione',
  'blog.category.automation.about':
    'Script, pipeline, cron job e IaC — la colla noiosa che tiene in piedi i sistemi.',
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
    'Ruoli, collaborazioni, domande sul mio lavoro o un posto che vale la pena. Scrivi qui o mandami una mail diretta.',
  'contact.formHeading': 'Invia un messaggio',
  'contact.formName': 'Il tuo nome',
  'contact.formEmail': 'La tua email',
  'contact.formMessage': 'Messaggio',
  'contact.formSend': 'Invia messaggio',
  'contact.formCaptcha': 'Verifica di sicurezza',
  'contact.formNamePlaceholder': 'Il tuo nome',
  'contact.formEmailPlaceholder': 'tu@azienda.com',
  'contact.formMessagePlaceholder':
    'Parlami del ruolo, del problema o di quello che vuoi costruire...',
  'contact.orEmail': 'Email',
  'contact.socials': 'Altrove',
  'contact.asideNote':
    'Leggo ogni messaggio. Prima hiring e lavoro di piattaforma; consigli di viaggio sempre benvenuti.',

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
