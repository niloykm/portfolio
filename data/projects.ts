export type ProjectCategory =
  | 'Full-Stack SaaS'
  | 'AI & Automation'
  | 'Frontend Architecture';

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  kind: 'client' | 'product' | 'open-source' | 'tool';
  category: ProjectCategory;
  categories: ProjectCategory[];
  featured: boolean;
  bentoSpan?: 'large' | 'normal';
  metricBadge: string;
  highlights: string[];
  summary: string;
  problem: string;
  solution: string;
  approach: string[];
  tradeoffs?: { decision: string; alternative: string; why: string }[];
  impact?: { label: string; value: string; source: string }[];
  architecture: {
    layers: {
      name: string;
      role: string;
      nodes: string[];
    }[];
  };
  stack: string[];
  links: { live?: string; repo?: string };
  preview?: {
    kind: 'iframe' | 'image' | 'mockup';
    src?: string;
    alt?: string;
    accentColor?: string;
  };
};

export const projects: Project[] = [
  {
    slug: 'newcare',
    title: 'NewCare',
    subtitle: 'Role-Based Healthcare & Appointment SaaS Platform',
    year: '2025',
    role: 'Lead Full-Stack Architect',
    kind: 'product',
    category: 'Full-Stack SaaS',
    categories: ['Full-Stack SaaS', 'Frontend Architecture'],
    featured: true,
    bentoSpan: 'large',
    metricBadge: 'Multi-Role RBAC • Playwright E2E',
    highlights: [
      'Multi-Role RBAC (Admin / Doctor / Patient)',
      'Playwright E2E Verified',
      'Concurrency-Safe Slot Booking',
    ],
    summary:
      'Multi-role Admin, Doctor, and Patient healthcare SaaS with real-time slot scheduling, medical record continuity, and end-to-end Playwright test coverage.',
    problem:
      'Clinics and patients struggled with fragmented scheduling, double-booked consultation slots, and disconnected medical histories across patient, doctor, and administrator workflows.',
    solution:
      'Architected a full-stack healthcare platform combining a Next.js App Router client and Zustand state layer with a modular backend service, relational TypeORM/PostgreSQL slot constraints, and automated Playwright E2E verification.',
    approach: [
      'Engineered multi-role RBAC guards isolating Patient booking flows, Doctor schedule management, and Admin clinic telemetry.',
      'Implemented conflict-free appointment slot reservation logic using strict transactional validation before persisting bookings.',
      'Built responsive specialty discovery, real-time availability filtering, and longitudinal patient record timelines with Zustand state synchronization.',
      'Automated critical user journeys (login, specialty filter, slot lock, appointment confirmation) using Playwright E2E test suites.',
    ],
    tradeoffs: [
      {
        decision: 'Relational schema with TypeORM & PostgreSQL constraints',
        alternative: 'Unstructured document store without transactional locks',
        why: 'Prevented concurrent double-booking of identical doctor time slots under simultaneous booking requests.',
      },
      {
        decision: 'Zustand store for multi-step appointment wizard state',
        alternative: 'URL-only query parameters or heavy Redux boilerplate',
        why: 'Kept specialty selection, date-slot picking, and patient intake instantaneous with zero unnecessary re-renders.',
      },
    ],
    impact: [
      {
        label: 'Access Architecture',
        value: '3 RBAC Roles',
        source: 'Admin, Doctor & Patient portals',
      },
      {
        label: 'Slot Collisions',
        value: '0 Double-Bookings',
        source: 'Transactional slot validation',
      },
      {
        label: 'QA Verification',
        value: 'Playwright E2E',
        source: 'Automated booking & auth specs',
      },
    ],
    architecture: {
      layers: [
        {
          name: 'Client Layer',
          role: 'Next.js App Router UI & State',
          nodes: [
            'Next.js (App Router)',
            'TypeScript',
            'Tailwind CSS',
            'Zustand Store',
            'Playwright E2E',
          ],
        },
        {
          name: 'API / Domain Layer',
          role: 'Modular Backend & Auth Guards',
          nodes: [
            'NestJS / Node.js',
            'JWT Multi-Role RBAC',
            'Slot Conflict Validator',
            'REST API Controllers',
          ],
        },
        {
          name: 'Database Layer',
          role: 'Relational Persistence',
          nodes: [
            'PostgreSQL',
            'TypeORM Entities',
            'Indexed Schedule Slots',
            'Medical Audit Logs',
          ],
        },
      ],
    },
    stack: [
      'Next.js',
      'NestJS',
      'PostgreSQL',
      'TypeORM',
      'Zustand',
      'Playwright',
      'TypeScript',
      'Tailwind CSS',
    ],
    links: {
      live: 'https://newcare.vercel.app/',
      repo: 'https://github.com/niloydiu/newcare',
    },
    preview: {
      kind: 'image',
      src: '/images/projects/newcare.png',
      alt: 'NewCare healthcare appointment SaaS interface',
      accentColor: '#3B82F6',
    },
  },
  {
    slug: 'scholarpass',
    title: 'ScholarPASS',
    subtitle: 'Enterprise LMS & Donor Governance Portal',
    year: '2025 – 2026',
    role: 'Full-Stack Software Engineer',
    kind: 'product',
    category: 'Full-Stack SaaS',
    categories: ['Full-Stack SaaS', 'Frontend Architecture'],
    featured: true,
    bentoSpan: 'normal',
    metricBadge: '-30% DB Query Latency',
    highlights: [
      '-30% Aggregation Latency',
      'JWT & OAuth Multi-Tenant RBAC',
      'Student, Donor & Partner Portals',
    ],
    summary:
      'Multi-tenant learning management and scholarship governance platform uniting enrollment, donor sponsorship telemetry, and partner portals with 30% faster database pipelines.',
    problem:
      'Scholarship administrators, donors, and students lacked a unified system to coordinate K-12/higher-ed course progression, scholarship disbursements, and multi-organization governance without slow reporting queries.',
    solution:
      'Engineered modular Next.js portals backed by Node.js/Express APIs, OAuth + JWT role-based access control, and compound-indexed MongoDB aggregation pipelines that cut dashboard and search latency by 30%.',
    approach: [
      'Architected fine-grained JWT and OAuth 2.0 RBAC permissions spanning student enrollment, donor impact tracking, and institutional partner dashboards.',
      'Refactored MongoDB aggregation pipelines with covered compound indexes and projection pruning, reducing search and dashboard load times by 30%.',
      'Built reusable data-table, analytics, and curriculum progression modules in Next.js and TypeScript.',
    ],
    tradeoffs: [
      {
        decision: 'Server-side MongoDB aggregation pipelines with compound indexes',
        alternative: 'In-memory application-layer filtering of enrollment records',
        why: 'Reduced payload transfer size and cut dashboard response latency by 30% on multi-thousand-record collections.',
      },
    ],
    impact: [
      {
        label: 'Query Latency',
        value: '-30%',
        source: 'MongoDB aggregation optimization',
      },
      {
        label: 'Governance Scope',
        value: '3 Portals',
        source: 'Enrollment, Donor & Partner RBAC',
      },
      {
        label: 'Auth Security',
        value: 'JWT + OAuth',
        source: 'Role-isolated session guards',
      },
    ],
    architecture: {
      layers: [
        {
          name: 'Client Layer',
          role: 'Multi-Portal Next.js Frontend',
          nodes: [
            'Next.js (App Router)',
            'TypeScript',
            'Tailwind CSS',
            'Role-Guarded Dashboards',
          ],
        },
        {
          name: 'API / Auth Layer',
          role: 'Governance & RBAC Engine',
          nodes: [
            'Node.js & Express',
            'OAuth 2.0 + JWT RBAC',
            'Enrollment & Donor Services',
            'RESTful Endpoints',
          ],
        },
        {
          name: 'Database Layer',
          role: 'Optimized Document Store',
          nodes: [
            'MongoDB',
            'Compound-Indexed Collections',
            'Aggregation Pipelines (-30% Latency)',
          ],
        },
      ],
    },
    stack: [
      'Next.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'OAuth / JWT RBAC',
      'TypeScript',
      'Tailwind CSS',
    ],
    links: {},
    preview: {
      kind: 'mockup',
      alt: 'ScholarPASS LMS and governance portal architecture preview',
      accentColor: '#10B981',
    },
  },
  {
    slug: 'whattocook',
    title: 'whattocook?',
    subtitle: 'AI-Powered Bilingual Recipe & Ingredient Engine',
    year: '2025',
    role: 'AI Product Engineer',
    kind: 'product',
    category: 'AI & Automation',
    categories: ['AI & Automation', 'Frontend Architecture'],
    featured: true,
    bentoSpan: 'normal',
    metricBadge: 'OpenAI Structured JSON • EN/BN',
    highlights: [
      'Strict JSON Schema Outputs',
      'English & Bangla Bilingual AI',
      'Pantry-to-Recipe Matching',
    ],
    summary:
      'Intelligent English/Bangla culinary synthesis engine utilizing OpenAI Structured JSON Outputs to transform available pantry ingredients into deterministic, step-by-step recipes.',
    problem:
      'Standard LLM recipe prompts return inconsistent markdown prose, hallucinated measurements, and poor localization for Bengali home cooks trying to cook with ingredients already in their kitchen.',
    solution:
      'Built an AI synthesis pipeline using Next.js, TypeScript, and OpenAI Structured JSON Outputs that enforces strict schema validation for ingredients, nutritional macros, prep timers, and instant English/Bangla toggling.',
    approach: [
      'Designed deterministic JSON Schema contracts for LLM responses so every generated recipe includes typed ingredient arrays, cook times, difficulty ratings, and step-by-step instructions.',
      'Implemented seamless bilingual (English / বাংলা) prompt conditioning and UI switching without losing pantry state.',
      'Engineered pantry-constraint matching that prioritizes recipes requiring zero extra grocery trips while suggesting smart spice substitutions.',
    ],
    tradeoffs: [
      {
        decision: 'Strict OpenAI Structured JSON Schema enforcement',
        alternative: 'Free-form Markdown streaming parsed with regex',
        why: 'Guaranteed 100% type-safe rendering of timer chips, macro badges, and bilingual ingredient checklists with zero UI parse crashes.',
      },
    ],
    impact: [
      {
        label: 'LLM Reliability',
        value: '100% Typed JSON',
        source: 'Deterministic schema validation',
      },
      {
        label: 'Localization',
        value: 'EN + বাংলা',
        source: 'Native bilingual culinary synthesis',
      },
      {
        label: 'UX Pattern',
        value: 'Zero-Prompt UI',
        source: 'Interactive pantry chip selector',
      },
    ],
    architecture: {
      layers: [
        {
          name: 'Client Layer',
          role: 'Interactive Pantry & Bilingual UI',
          nodes: [
            'Next.js (App Router)',
            'TypeScript',
            'Pantry Ingredient Selector',
            'EN / BN Locale Switcher',
          ],
        },
        {
          name: 'AI / Orchestration Layer',
          role: 'LLM Prompt & Schema Engine',
          nodes: [
            'Next.js Server Route Handlers',
            'OpenAI / Gemini API',
            'Structured JSON Schema Validator',
            'Substitution Logic',
          ],
        },
        {
          name: 'Data & State Layer',
          role: 'Client Cache & Recipe Persistence',
          nodes: [
            'Typed Recipe Store',
            'Local Pantry Persistence',
            'Nutritional Macro Calculator',
          ],
        },
      ],
    },
    stack: [
      'Next.js',
      'TypeScript',
      'OpenAI API',
      'Structured JSON Outputs',
      'Tailwind CSS',
    ],
    links: {},
    preview: {
      kind: 'mockup',
      alt: 'whattocook? AI bilingual recipe discovery engine preview',
      accentColor: '#8B5CF6',
    },
  },
  {
    slug: 'handson',
    title: 'HandsOn',
    subtitle: 'Real-Time Volunteer & Event Analytics Platform',
    year: '2025',
    role: 'Full-Stack Software Engineer',
    kind: 'product',
    category: 'Full-Stack SaaS',
    categories: ['Full-Stack SaaS', 'AI & Automation'],
    featured: true,
    bentoSpan: 'large',
    metricBadge: 'Chart.js Telemetry • Webhooks',
    highlights: [
      'Live Chart.js Organizer Telemetry',
      'Automated Registration Webhooks',
      'JWT Role-Protected Check-Ins',
    ],
    summary:
      'End-to-end community event coordination and volunteer workflow platform with automated ticket generation, webhook triggers, and live Chart.js attendance telemetry.',
    problem:
      'Event organizers and volunteer coordinators relied on disconnected spreadsheets and manual check-ins, leading to delayed attendance visibility and registration bottlenecks.',
    solution:
      'Built a full-stack event workflow platform in React, Node.js, Express, and MongoDB featuring JWT-secured organizer dashboards, automated registration webhooks, and real-time Chart.js analytics.',
    approach: [
      'Engineered interactive organizer analytics dashboards with Chart.js to visualize registration velocity, capacity utilization, and volunteer check-in rates.',
      'Implemented Express REST endpoints and webhook triggers for automated ticket issuance and schedule notifications.',
      'Modeled normalized MongoDB collections for multi-session events, attendee rosters, and role-protected check-in logs.',
    ],
    tradeoffs: [
      {
        decision: 'Event-driven webhook notifications on registration state change',
        alternative: 'Synchronous email/ticket generation blocking the HTTP response',
        why: 'Kept attendee registration API responses fast while decoupling downstream notifications.',
      },
    ],
    impact: [
      {
        label: 'Analytics',
        value: 'Real-Time',
        source: 'Chart.js capacity & check-in telemetry',
      },
      {
        label: 'Workflows',
        value: 'Webhook Sync',
        source: 'Automated registration pipeline',
      },
      {
        label: 'Access Control',
        value: 'JWT RBAC',
        source: 'Organizer vs. Attendee isolation',
      },
    ],
    architecture: {
      layers: [
        {
          name: 'Client Layer',
          role: 'Organizer & Attendee Portal',
          nodes: [
            'React.js',
            'Tailwind CSS',
            'Chart.js Telemetry',
            'Responsive Schedule Grid',
          ],
        },
        {
          name: 'API / Automation Layer',
          role: 'Event Engine & Webhooks',
          nodes: [
            'Node.js & Express',
            'JWT Session Guards',
            'Webhook Dispatchers',
            'REST API',
          ],
        },
        {
          name: 'Database Layer',
          role: 'Event & Roster Persistence',
          nodes: [
            'MongoDB',
            'Indexed Event Schemas',
            'Attendance Audit Logs',
          ],
        },
      ],
    },
    stack: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Chart.js',
      'JWT',
      'Webhooks',
      'Tailwind CSS',
    ],
    links: {
      live: 'https://handsoncom.vercel.app/',
      repo: 'https://github.com/niloydiu/roBenDevHandsOn',
    },
    preview: {
      kind: 'image',
      src: '/images/projects/handsOn.png',
      alt: 'HandsOn event and workflow management platform interface',
      accentColor: '#F59E0B',
    },
  },
  {
    slug: 'velora',
    title: 'Velora',
    subtitle: 'Modern High-Conversion E-Commerce Experience',
    year: '2025',
    role: 'Frontend Architect',
    kind: 'product',
    category: 'Frontend Architecture',
    categories: ['Frontend Architecture'],
    featured: false,
    metricBadge: 'Optimistic Cart & Checkout State',
    highlights: [
      'Deterministic Cart & Checkout State',
      'Dynamic Variant & Inventory Matrix',
      'Core Web Vitals Optimized',
    ],
    summary:
      'High-craft e-commerce storefront engineered with Next.js, TypeScript, and Tailwind CSS featuring instant variant switching, persistent cart state architecture, and frictionless multi-step checkout.',
    problem:
      'Modern retail storefronts often suffer from sluggish variant transitions, layout shift during image loading, and brittle cart state across page refreshes.',
    solution:
      'Architected a zero-CLS Next.js storefront with deterministic client state synchronization, optimistic cart mutations, and responsive product discovery filters.',
    approach: [
      'Designed a modular cart and checkout state machine supporting coupon calculations, SKU variant matrices, and persistent local hydration.',
      'Optimized product gallery rendering with Next.js Image priority loading and aspect-ratio reservation to eliminate cumulative layout shift.',
      'Built keyboard-accessible filter drawers, slide-over mini-cart, and responsive checkout validation.',
    ],
    architecture: {
      layers: [
        {
          name: 'Client Layer',
          role: 'Storefront & Variant UI',
          nodes: ['Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        },
        {
          name: 'State & Logic Layer',
          role: 'Cart & Checkout Engine',
          nodes: ['Optimistic Cart Store', 'SKU Variant Resolver', 'Checkout Validator'],
        },
        {
          name: 'Data Layer',
          role: 'Catalog & Order Persistence',
          nodes: ['Typed Product Catalog', 'Persistent Storage Sync', 'Order Payload API'],
        },
      ],
    },
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Cart & Checkout State Architecture',
      'Vercel',
    ],
    links: {},
    preview: {
      kind: 'mockup',
      alt: 'Velora modern e-commerce storefront interface',
      accentColor: '#EC4899',
    },
  },
  {
    slug: 'ndemy',
    title: 'Ndemy',
    subtitle: 'Modular Video LMS & Course Authoring Platform',
    year: '2024',
    role: 'Full-Stack Engineer',
    kind: 'product',
    category: 'Full-Stack SaaS',
    categories: ['Full-Stack SaaS', 'Frontend Architecture'],
    featured: false,
    metricBadge: 'Video Progression & Course Catalog',
    highlights: [
      'Persistent Video Lecture Tracking',
      'Instructor Course Builder',
      'Category & Search Pagination',
    ],
    summary:
      'Learning management system with course catalogs, video lesson progression, student enrollment, and instructor course management.',
    problem:
      'Instructors and learners needed a structured platform to publish multi-lesson video courses, filter catalogs by category, and track per-student lesson completion.',
    solution:
      'Constructed a modular React + Express + MongoDB LMS with role-based instructor authoring, paginated catalog filtering, and per-lecture completion persistence.',
    approach: [
      'Constructed a modular video lecture player with persistent lesson completion tracking.',
      'Designed role-based views separating instructor course authoring from learner enrollment.',
      'Implemented catalog search with category filtering and pagination backed by Express and MongoDB.',
    ],
    architecture: {
      layers: [
        {
          name: 'Client Layer',
          role: 'Learner & Instructor Views',
          nodes: ['React', 'Tailwind CSS', 'Context API', 'Video Player'],
        },
        {
          name: 'API Layer',
          role: 'Course & Enrollment REST API',
          nodes: ['Node.js', 'Express', 'REST API', 'Pagination Engine'],
        },
        {
          name: 'Database Layer',
          role: 'Course & Progress Store',
          nodes: ['MongoDB', 'Enrollment Schemas'],
        },
      ],
    },
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'REST API', 'Vercel'],
    links: {
      live: 'https://ndemy-frontend.vercel.app/',
      repo: 'https://github.com/niloydiu/edemy',
    },
    preview: {
      kind: 'image',
      src: '/images/projects/ndemy1.png',
      alt: 'Ndemy learning management system interface',
    },
  },
  {
    slug: 'nobot',
    title: 'Nobot',
    subtitle: 'Streaming AI Assistant & Code Workspace',
    year: '2024',
    role: 'Frontend & AI Engineer',
    kind: 'tool',
    category: 'AI & Automation',
    categories: ['AI & Automation', 'Frontend Architecture'],
    featured: false,
    metricBadge: 'Token Streaming • Markdown AST',
    highlights: [
      'Real-Time Token Streaming UI',
      'Syntax-Highlighted Code Blocks',
      'Persistent Thread History',
    ],
    summary:
      'AI assistant web client with real-time token streaming, multi-thread conversation history, and syntax-highlighted Markdown code responses.',
    problem:
      'Developers interacting with LLM APIs needed a fast, distraction-free web client with smooth scroll anchoring during token streaming and one-click code copying.',
    solution:
      'Built a low-latency streaming chat interface in React and Tailwind CSS with automatic scroll locking, Markdown AST rendering, and syntax-highlighted code blocks.',
    approach: [
      'Implemented token streaming UI with automatic scroll anchoring.',
      'Integrated Markdown rendering with copyable syntax-highlighted code blocks.',
    ],
    architecture: {
      layers: [
        {
          name: 'Client Layer',
          role: 'Streaming Chat Interface',
          nodes: ['React', 'Tailwind CSS', 'Markdown AST Renderer'],
        },
        {
          name: 'API / AI Layer',
          role: 'LLM Streaming Connector',
          nodes: ['LLM REST / Stream API', 'Prompt Context Manager'],
        },
        {
          name: 'Data Layer',
          role: 'Thread Persistence',
          nodes: ['Client Session Store', 'Conversation History'],
        },
      ],
    },
    stack: ['React', 'Tailwind CSS', 'LLM API', 'REST API', 'Vercel'],
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
    subtitle: 'Atomic Stock & Supplier Operations Portal',
    year: '2024',
    role: 'Full-Stack Engineer',
    kind: 'product',
    category: 'Full-Stack SaaS',
    categories: ['Full-Stack SaaS'],
    featured: false,
    metricBadge: 'Atomic Stock Ledger • JWT RBAC',
    highlights: [
      'Atomic MongoDB Stock Updates',
      'Low-Stock Alert Thresholds',
      'Automated Invoice Generation',
    ],
    summary:
      'Stock and inventory tracking web application with low-stock alerts, invoice generation, transaction audit logs, and supplier records.',
    problem:
      'Small retail operators needed accurate stock decrement tracking and automated low-stock alerts without race conditions during concurrent sales.',
    solution:
      'Engineered an Express + MongoDB inventory ledger using atomic stock updates, JWT session security, and instant invoice generation.',
    approach: [
      'Implemented stock decrement transactions using atomic MongoDB updates.',
      'Built JWT session authentication and role-based access control.',
    ],
    architecture: {
      layers: [
        {
          name: 'Client Layer',
          role: 'Inventory Dashboard',
          nodes: ['React', 'Tailwind CSS', 'Invoice View'],
        },
        {
          name: 'API Layer',
          role: 'Stock & Auth Controllers',
          nodes: ['Node.js', 'Express', 'JWT Auth'],
        },
        {
          name: 'Database Layer',
          role: 'Transactional Ledger',
          nodes: ['MongoDB', 'Atomic Stock Operations'],
        },
      ],
    },
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
    subtitle: 'Zero-Latency Client-Side Vector QR Generator',
    year: '2024',
    role: 'Frontend Engineer',
    kind: 'tool',
    category: 'Frontend Architecture',
    categories: ['Frontend Architecture'],
    featured: false,
    metricBadge: '100% Client-Side Vector Export',
    highlights: [
      'Zero Server Round-Trips',
      'Custom Error-Correction Levels',
      'Instant SVG & PNG Export',
    ],
    summary:
      'Client-side QR code generator with custom color styling, error-correction controls, and instant SVG/PNG vector export.',
    problem:
      'Many online QR generators require paid redirects or server uploads just to export high-resolution vector QR codes.',
    solution:
      'Built a pure client-side vector/canvas QR studio in React with custom foreground/background palettes and instant SVG/PNG download.',
    approach: [
      'Rendered vector and canvas QR payloads purely on the client with zero server round-trips.',
      'Added custom foreground/background color controls and direct clipboard/file export.',
    ],
    architecture: {
      layers: [
        {
          name: 'Client Layer',
          role: 'Interactive Studio UI',
          nodes: ['React', 'Tailwind CSS', 'Color & ECC Controls'],
        },
        {
          name: 'Rendering Engine',
          role: 'Client-Side Matrix Encoder',
          nodes: ['HTML5 Canvas', 'SVG Vector Serializer', 'Blob Exporter'],
        },
      ],
    },
    stack: ['React', 'Tailwind CSS', 'Canvas / SVG API', 'Vercel'],
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
    subtitle: 'Collision-Resistant Short Link & QR Microservice',
    year: '2024',
    role: 'Full-Stack Engineer',
    kind: 'tool',
    category: 'Full-Stack SaaS',
    categories: ['Full-Stack SaaS'],
    featured: false,
    metricBadge: 'Nanoid Slugs • Indexed Redirects',
    highlights: [
      'Collision-Resistant Nanoid Slugs',
      'Indexed MongoDB Lookups',
      'Instant QR Pairing',
    ],
    summary:
      'URL shortener service with custom slug generation, automatic QR code creation for short links, and low-latency redirect lookup.',
    problem:
      'Long campaign URLs needed compact, shareable aliases paired with downloadable QR codes and fast redirect resolution.',
    solution:
      'Implemented a Node.js + Express + MongoDB short-link service using Nanoid slug generation and indexed lookup keys.',
    approach: [
      'Generated collision-resistant short slugs with Nanoid and indexed MongoDB lookups.',
      'Built client-side URL validation, clipboard copy, and instant QR preview.',
    ],
    architecture: {
      layers: [
        {
          name: 'Client Layer',
          role: 'Link & QR Generator UI',
          nodes: ['React', 'Tailwind CSS', 'Clipboard & QR Preview'],
        },
        {
          name: 'API Layer',
          role: 'Slug & Redirect Service',
          nodes: ['Node.js', 'Express', 'Nanoid Generator'],
        },
        {
          name: 'Database Layer',
          role: 'Indexed Alias Store',
          nodes: ['MongoDB', 'Unique Slug Index'],
        },
      ],
    },
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
];

export const featuredProjects = projects.filter((p) => p.featured);
export const archiveProjects = projects.filter((p) => !p.featured);
