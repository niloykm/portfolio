export type StackLayer = {
  id: string;
  layer: string;
  code: string;
  tools: string[];
  usage: string;
};

export const stackLayers: StackLayer[] = [
  {
    id: 'frontend',
    layer: 'Frontend',
    code: '[FRONTEND]',
    tools: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
    ],
    usage:
      'Server-first pages, accessible semantic markup, strict static typing, and high-density UI architecture.',
  },
  {
    id: 'backend',
    layer: 'Backend',
    code: '[BACKEND]',
    tools: [
      'Next.js Route Handlers',
      'Node.js',
      'Express',
      'REST API',
      'JWT Auth',
    ],
    usage:
      'Stateless API routes, role-based session authentication, and validated request handlers.',
  },
  {
    id: 'data',
    layer: 'Data & Storage',
    code: '[DATA]',
    tools: ['PostgreSQL', 'MongoDB', 'Mongoose'],
    usage:
      'Relational schemas and document models with indexed queries and atomic state updates.',
  },
  {
    id: 'infrastructure',
    layer: 'Infrastructure',
    code: '[INFRASTRUCTURE]',
    tools: ['Git', 'GitHub', 'Vercel', 'Docker (learning)', 'Postman', 'Jest'],
    usage:
      'Branch previews, automated production deployments on Vercel, and API contract verification.',
  },
];

export const currentlyLearning = ['Docker', 'Nest.js'];
