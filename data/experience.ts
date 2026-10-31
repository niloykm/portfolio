export type ExperienceEntry = {
  id: string;
  role: string;
  organisation: string;
  period: string;
  location: string;
  current?: boolean;
  metricBadge?: string;
  summary: string;
  bullets: string[];
  tags: string[];
  href?: string;
  kind: 'work' | 'education';
};

export const experience: ExperienceEntry[] = [
  {
    id: 'gen-stella-it',
    role: 'Co-Founder & Technical Lead',
    organisation: 'Gen Stella IT',
    period: 'Jan 2026 – Present',
    location: 'Dhaka',
    current: true,
    metricBadge: '-40% Manual Triage via n8n',
    summary:
      'Directing end-to-end MVP-to-Production SaaS architecture, backend microservices, and AI/webhook automation pipelines.',
    bullets: [
      'Direct product architecture and technical roadmaps, translating business ideas into production SaaS platforms across Healthcare, EdTech, and Travel.',
      'Architect modular Next.js frontends and NestJS/PostgreSQL backend microservices with automated Vercel CI/CD pipelines.',
      'Implemented automated data ingestion and notification workflows using n8n and webhooks, cutting manual triage time by 40%.',
    ],
    tags: [
      'Next.js',
      'NestJS',
      'PostgreSQL',
      'n8n Automation',
      'Webhooks',
      'Vercel CI/CD',
    ],
    kind: 'work',
  },
  {
    id: 'scholarpass',
    role: 'Full-Stack Software Engineer',
    organisation: 'ScholarPASS',
    period: 'Nov 2025 – Present',
    location: 'Remote',
    current: true,
    metricBadge: '-30% DB Query Latency',
    summary:
      'Engineering multi-tenant LMS portals, donor governance dashboards, and optimized MongoDB aggregation pipelines.',
    bullets: [
      'Engineered full-stack LMS portals and governance dashboards with Next.js, Node.js, and MongoDB.',
      'Implemented JWT and OAuth role-based access control (RBAC) across enrollment, donor, and partner portals.',
      'Optimized MongoDB queries and aggregation pipelines, reducing data-loading latency and search response times by 30%.',
    ],
    tags: [
      'Next.js',
      'Node.js',
      'MongoDB',
      'JWT & OAuth RBAC',
      'Aggregation Pipelines',
    ],
    kind: 'work',
  },
  {
    id: 'tripbooking-ai',
    role: 'Frontend Engineer (Contract)',
    organisation: 'TripBooking.ai',
    period: 'Jan 2026 – Aug 2026',
    location: 'Dhaka',
    metricBadge: 'Real-Time Availability Sync',
    summary:
      'Built AI-assisted travel discovery interfaces, dynamic property listings, and smart search filters.',
    bullets: [
      'Engineered responsive travel discovery workflows, dynamic property listings, and smart search filters using Next.js and TypeScript.',
      'Collaborated with backend teams to integrate RESTful APIs and real-time property availability synchronization.',
    ],
    tags: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'RESTful APIs',
      'Search Architecture',
    ],
    kind: 'work',
  },
  {
    id: 'tutorsplan',
    role: 'Junior Frontend Developer',
    organisation: 'TutorsPlan',
    period: 'Apr 2025 – Aug 2025',
    location: 'Dhaka',
    metricBadge: '3.2s → 1.5s LCP Optimization',
    summary:
      'Developed EdTech marketplace interfaces and admin analytics dashboards with major Core Web Vitals improvements.',
    bullets: [
      'Built marketplace interfaces and admin analytics dashboards using Next.js, TypeScript, and Zustand/Redux Toolkit.',
      'Reduced Largest Contentful Paint (LCP) from 3.2s to 1.5s via Next.js image optimization and route-level lazy loading.',
    ],
    tags: [
      'Next.js',
      'TypeScript',
      'Zustand',
      'Redux Toolkit',
      'Core Web Vitals',
    ],
    kind: 'work',
  },
  {
    id: 'diu-cse',
    role: 'B.Sc. in Computer Science & Engineering',
    organisation: 'Daffodil International University',
    period: '2020 – 2024',
    location: 'Dhaka',
    metricBadge: '200+ C++ Problems Solved',
    summary:
      'Undergraduate foundation in algorithms, data structures, relational database design, and distributed web engineering.',
    bullets: [
      'Competitive Programming: Solved 200+ algorithmic problems in C++ across Codeforces, LeetCode, and beecrowd.',
      'Completed core coursework and capstone architectures in software engineering, operating systems, and database management.',
    ],
    tags: [
      'C++',
      'Algorithms & Data Structures',
      'Codeforces & LeetCode',
      'Database Systems',
    ],
    kind: 'education',
  },
];
