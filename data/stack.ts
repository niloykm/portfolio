export type StackLayer = {
  id: string;
  layer: string;
  tools: string[];
  usage: string;
};

export const stackLayers: StackLayer[] = [
  {
    id: 'interface',
    layer: 'Interface',
    tools: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
    ],
    usage:
      'Server-first pages, accessible semantic markup, strict types, and restrained UI motion.',
  },
  {
    id: 'server',
    layer: 'Server',
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
    layer: 'Data',
    tools: ['PostgreSQL', 'MongoDB', 'Mongoose'],
    usage:
      'Relational schemas and document models with indexed queries and atomic updates.',
  },
  {
    id: 'delivery',
    layer: 'Delivery & tooling',
    tools: ['Git', 'GitHub', 'Vercel', 'Docker (learning)', 'Postman', 'Jest'],
    usage:
      'Branch previews, automated production deployments on Vercel, and API contract checks.',
  },
];

export const currentlyLearning = ['Docker', 'Nest.js'];
