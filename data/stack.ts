export type StackLayer = {
  id: string;
  layer: string;
  subtitle: string;
  code: string;
  highlightMetric: string;
  tools: string[];
  usage: string;
};

export const stackLayers: StackLayer[] = [
  {
    id: 'ai-automation',
    layer: 'AI Systems & Workflow Automation',
    subtitle: 'Deterministic LLM Pipelines & Orchestration',
    code: '01 // AI_AUTOMATION',
    highlightMetric: '-40% Manual Triage Time',
    tools: [
      'OpenAI API',
      'Gemini API',
      'Structured JSON Outputs',
      'Function Calling / Tool Use',
      'RAG Concepts',
      'n8n Pipelines',
      'Webhook Orchestration',
    ],
    usage:
      'Schema-validated LLM outputs, automated webhook ingestion, and multi-step n8n agentic workflows that eliminate manual operations.',
  },
  {
    id: 'frontend',
    layer: 'Full-Stack SaaS & Frontend Architecture',
    subtitle: 'High-Speed Interfaces & State Machines',
    code: '02 // FRONTEND_SAAS',
    highlightMetric: '3.2s → 1.5s LCP Speedup',
    tools: [
      'Next.js (App Router)',
      'React.js',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'Redux Toolkit',
      'Framer Motion',
    ],
    usage:
      'Server-first Next.js App Router applications, deterministic client state, zero-CLS responsive layouts, and accessible design systems.',
  },
  {
    id: 'backend-data',
    layer: 'Backend, Databases & DevOps',
    subtitle: 'Scalable APIs, RBAC Security & CI/CD',
    code: '03 // BACKEND_DATA_DEVOPS',
    highlightMetric: '-30% DB Aggregation Latency',
    tools: [
      'NestJS',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'MongoDB',
      'Prisma',
      'TypeORM',
      'REST APIs',
      'JWT / OAuth RBAC',
      'Docker',
      'GitHub Actions CI/CD',
      'Playwright E2E',
      'Vercel',
      'Linux / Fedora',
    ],
    usage:
      'Modular NestJS & Node.js services, relational PostgreSQL + document MongoDB data modeling, multi-tenant RBAC, and Playwright E2E verification.',
  },
];

export const coreStackMatrix: {
  category: string;
  items: string[];
}[] = [
  {
    category: 'AI & Automation',
    items: [
      'OpenAI API',
      'Gemini API',
      'Structured JSON Outputs',
      'Function Calling / Tool Use',
      'RAG Concepts',
      'n8n',
      'Webhooks',
    ],
  },
  {
    category: 'Frontend Architecture',
    items: [
      'Next.js (App Router)',
      'React.js',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'Redux Toolkit',
      'Framer Motion',
    ],
  },
  {
    category: 'Backend & Data',
    items: [
      'NestJS',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'MongoDB',
      'Prisma',
      'TypeORM',
      'REST APIs',
      'JWT / OAuth RBAC',
    ],
  },
  {
    category: 'DevOps & Testing',
    items: [
      'Docker',
      'CI/CD Pipelines',
      'GitHub Actions',
      'Vercel',
      'Playwright E2E',
      'Linux / Fedora',
    ],
  },
];

export const currentlyLearning = ['Agentic Multi-Step Workflows', 'Distributed Queues'];
