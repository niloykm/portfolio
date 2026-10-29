export type Project = {
  slug: string;
  title: string;
  year?: string;
  role?: string;
  kind: 'client' | 'product' | 'open-source' | 'tool';
  featured: boolean;
  summary: string;
  problem?: string; // 1-2 sentences
  approach?: string[]; // 3-5 bullets, concrete
  tradeoffs?: { decision: string; alternative: string; why: string }[];
  impact?: { label: string; value: string; source: string }[]; // ONLY with a real source
  architecture?: { layers: { name: string; nodes: string[] }[] }; // client / server / data / third-party
  stack: string[];
  links: { live?: string; repo?: string };
  preview?: { kind: 'iframe' | 'image'; src: string; alt?: string };
};

export const projects: Project[] = [
  {
    slug: 'newcare',
    title: 'NewCare',
    year: undefined, // TODO(niloy): confirm build year for NewCare
    role: 'Full-stack engineer',
    kind: 'product',
    featured: true,
    summary:
      'Healthcare appointment booking and patient record portal with doctor schedule discovery and medical history tracking.',
    problem:
      'Patients and clinics needed a single portal to filter doctor availability by specialty, book time slots without double-booking, and maintain appointment histories across patient and doctor roles.',
    approach: [
      'Built dynamic doctor availability and time-slot filtering in React and Tailwind CSS.',
      'Implemented JWT-protected authentication workflows separating patient and doctor permissions.',
      'Structured normalized MongoDB schemas for patient profiles, doctor schedules, and appointment bookings.',
      'Exposed Express REST endpoints to validate slot availability before persisting reservations.',
    ],
    tradeoffs: undefined, // TODO(niloy): add real architectural trade-offs for NewCare
    impact: undefined, // TODO(niloy): add sourced impact metrics for NewCare if available
    architecture: {
      layers: [
        { name: 'Client', nodes: ['React', 'Tailwind CSS'] },
        { name: 'Server', nodes: ['Node.js', 'Express', 'JWT Auth', 'REST API'] },
        { name: 'Data', nodes: ['MongoDB', 'Mongoose'] },
      ],
    },
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT Auth', 'REST API', 'Vercel'],
    links: {
      live: 'https://newcare.vercel.app/',
      repo: 'https://github.com/niloydiu/newcare',
    },
    preview: {
      kind: 'iframe',
      src: '/images/projects/newcare.png',
      alt: 'NewCare healthcare appointment portal interface',
    },
  },
  {
    slug: 'handson',
    title: 'HandsOn',
    year: undefined, // TODO(niloy): confirm build year for HandsOn
    role: 'Full-stack engineer',
    kind: 'product',
    featured: true,
    summary:
      'Community event management and workshop platform for organizing sessions, tracking attendance, and managing schedules.',
    problem:
      'Community organizers needed a unified web application to publish workshops, register attendees, and keep schedules synchronized across desktop and mobile viewports.',
    approach: [
      'Built responsive organizer and attendee dashboards in React with synchronized client state.',
      'Implemented Express REST API endpoints for workshop creation, attendee registration, and schedule updates.',
      'Modeled events, registrations, and schedules in MongoDB.',
      'Tuned image delivery and mobile viewport interactions for event browsing.',
    ],
    tradeoffs: undefined, // TODO(niloy): add real architectural trade-offs for HandsOn
    impact: undefined, // TODO(niloy): add sourced impact metrics for HandsOn if available
    architecture: {
      layers: [
        { name: 'Client', nodes: ['React', 'Tailwind CSS'] },
        { name: 'Server', nodes: ['Node.js', 'Express', 'REST API'] },
        { name: 'Data', nodes: ['MongoDB'] },
      ],
    },
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'REST API', 'Vercel'],
    links: {
      live: 'https://handsoncom.vercel.app/',
      repo: 'https://github.com/niloydiu/roBenDevHandsOn',
    },
    preview: {
      kind: 'iframe',
      src: '/images/projects/handsOn.png',
      alt: 'HandsOn event management platform interface',
    },
  },
  {
    slug: 'ndemy',
    title: 'Ndemy',
    year: undefined, // TODO(niloy): confirm build year for Ndemy
    role: 'Full-stack engineer',
    kind: 'product',
    featured: true,
    summary:
      'Learning management system with course catalogs, video lesson progression, student enrollment, and instructor course management.',
    problem:
      'Instructors and learners needed a structured platform to publish multi-lesson video courses, filter catalogs by category, and track per-student lesson completion.',
    approach: [
      'Constructed a modular video lecture player with persistent lesson completion tracking.',
      'Designed role-based views separating instructor course authoring from learner enrollment.',
      'Implemented catalog search with category filtering and pagination backed by Express and MongoDB.',
    ],
    tradeoffs: undefined, // TODO(niloy): add real architectural trade-offs for Ndemy
    impact: undefined, // TODO(niloy): add sourced impact metrics for Ndemy if available
    architecture: {
      layers: [
        { name: 'Client', nodes: ['React', 'Tailwind CSS', 'Context API'] },
        { name: 'Server', nodes: ['Node.js', 'Express', 'REST API'] },
        { name: 'Data', nodes: ['MongoDB'] },
      ],
    },
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'REST API', 'Vercel'],
    links: {
      live: 'https://ndemy-frontend.vercel.app/',
      repo: 'https://github.com/niloydiu/edemy',
    },
    preview: {
      kind: 'iframe',
      src: '/images/projects/ndemy1.png',
      alt: 'Ndemy learning management system interface',
    },
  },
  {
    slug: 'nobot',
    title: 'Nobot',
    year: undefined, // TODO(niloy): confirm build year for Nobot
    role: 'Frontend engineer',
    kind: 'tool',
    featured: false,
    summary:
      'AI assistant web client with token streaming, conversation history, and syntax-highlighted Markdown responses.',
    problem: undefined, // TODO(niloy): add problem statement for Nobot if expanding to full case study
    approach: [
      'Implemented token streaming UI with automatic scroll anchoring.',
      'Integrated Markdown rendering with copyable syntax-highlighted code blocks.',
    ],
    stack: ['React', 'Tailwind CSS', 'REST API', 'Vercel'],
    links: {
      live: 'https://nobot.vercel.app/',
      repo: 'https://github.com/niloydiu/Nobot',
    },
    preview: {
      kind: 'image',
      src: '/images/projects/nobot.png',
      alt: 'Nobot AI assistant interface',
    },
  },
  {
    slug: 'inventory-management',
    title: 'Inventory Management',
    year: undefined, // TODO(niloy): confirm build year for Inventory Management
    role: 'Full-stack engineer',
    kind: 'product',
    featured: false,
    summary:
      'Stock and inventory tracking web app with low-stock alerts, invoice generation, transaction logs, and supplier records.',
    problem: undefined, // TODO(niloy): add problem statement for Inventory Management
    approach: [
      'Implemented stock decrement transactions using atomic MongoDB updates.',
      'Built JWT session authentication and role-based access control.',
    ],
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT Auth', 'Vercel'],
    links: {
      live: 'https://niloyinventory.vercel.app/login',
      repo: 'https://github.com/niloydiu/inventory',
    },
    preview: {
      kind: 'image',
      src: '/images/projects/niloyinventory.png',
      alt: 'Inventory Management dashboard interface',
    },
  },
  {
    slug: 'qr-code-studio',
    title: 'QR Code Studio',
    year: undefined, // TODO(niloy): confirm build year for QR Code Studio
    role: 'Frontend engineer',
    kind: 'tool',
    featured: false,
    summary:
      'Client-side QR code generator with custom color styling, error-correction controls, and SVG/PNG export.',
    problem: undefined, // TODO(niloy): add problem statement for QR Code Studio
    approach: [
      'Rendered vector and canvas QR payloads purely on the client with zero server round-trips.',
      'Added custom foreground/background color controls and direct clipboard/file export.',
    ],
    stack: ['React', 'Tailwind CSS', 'Vercel'],
    links: {
      live: 'https://nqr.vercel.app/',
      repo: 'https://github.com/niloydiu/nqr',
    },
    preview: {
      kind: 'image',
      src: '/images/projects/nqr.png',
      alt: 'QR Code Studio interface',
    },
  },
  {
    slug: 'nrl-url-shortener',
    title: 'NRL URL Shortener',
    year: undefined, // TODO(niloy): confirm build year for NRL URL Shortener
    role: 'Full-stack engineer',
    kind: 'tool',
    featured: false,
    summary:
      'URL shortener service with custom slug generation, QR code creation for short links, and redirect lookup.',
    problem: undefined, // TODO(niloy): add problem statement for NRL URL Shortener
    approach: [
      'Generated collision-resistant short slugs with Nanoid and indexed MongoDB lookups.',
      'Built client-side URL validation, clipboard copy, and instant QR preview.',
    ],
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Vercel'],
    links: {
      live: 'https://nrl-zeta.vercel.app/',
      repo: 'https://github.com/niloydiu/url',
    },
    preview: {
      kind: 'image',
      src: '/images/projects/nrl.png',
      alt: 'NRL URL Shortener interface',
    },
  },
  {
    slug: 'robendev-handson',
    title: 'roBenDevHandsOn',
    year: undefined, // TODO(niloy): confirm build year for roBenDevHandsOn
    role: 'Full-stack engineer',
    kind: 'open-source',
    featured: false,
    summary:
      'Open-source repository for the HandsOn community event and workshop management platform.',
    problem: undefined, // TODO(niloy): clarify if roBenDevHandsOn should be merged with HandsOn or kept as a separate open-source repo entry
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Git', 'GitHub'],
    links: {
      repo: 'https://github.com/niloydiu/roBenDevHandsOn',
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const archiveProjects = projects.filter((p) => !p.featured);
