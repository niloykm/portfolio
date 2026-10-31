export type HeroMetric = {
  value: string;
  label: string;
  detail: string;
};

export const profile = {
  name: 'Niloy Kumar Mohonta',
  handle: 'Niloy',
  role: 'Senior Full-Stack & AI Product Engineer',
  title:
    'Senior Software Engineer (Full-Stack, AI Systems & Product Architecture) & Co-Founder @ Gen Stella IT',
  badge: 'Co-Founder @ Gen Stella IT • Senior Full-Stack & AI Engineer',
  statusText:
    'Available for Senior Engineering & Technical Lead Roles • Dhaka / Remote',
  headline:
    'Engineering scalable SaaS products, AI-driven workflows, and high-speed web systems.',
  subheadline:
    'Architecting production SaaS platforms end-to-end with Next.js, NestJS, TypeScript, and PostgreSQL — powered by OpenAI/Gemini structured LLM pipelines and n8n automation.',
  location: 'Dhaka, Bangladesh (Open to On-Site & Remote)',
  timeZone: 'Asia/Dhaka',
  email: 'niloykumarmohonta@gmail.com',
  phone: '+8801518323782',
  whatsapp: 'https://wa.me/8801518323782',
  github: 'niloykm',
  githubAlt: 'niloydiu',
  linkedin: 'https://linkedin.com/in/niloykumarmohonta000',
  x: undefined as string | undefined,
  resumeUrl: '/niloy.pdf',
  availability: 'open' as 'open' | 'limited' | 'closed',
  openTo: 'Senior Engineering & Technical Lead Roles (On-Site & Remote)',
  now: {
    label: 'Co-Founder & Technical Lead @ Gen Stella IT',
    href: '#experience',
  },
  summary:
    'Senior Full-Stack & AI Product Engineer and Co-Founder at Gen Stella IT. Engineering scalable SaaS products, AI-driven workflows, and high-speed web systems.',
  portraitUrl: '/images/profileNiloy.png',
  metrics: [
    {
      value: '30%',
      label: 'DB Latency Reduction',
      detail: 'MongoDB query & aggregation pipeline optimization @ ScholarPASS',
    },
    {
      value: '3.2s → 1.5s',
      label: 'Core Web Vitals LCP',
      detail: 'Next.js image & route-level lazy loading @ TutorsPlan',
    },
    {
      value: '4+ Shipped',
      label: 'Production SaaS Systems',
      detail: 'End-to-end MVP-to-Production ownership + -40% manual triage via n8n',
    },
    {
      value: '200+',
      label: 'Algorithmic Problems',
      detail: 'Solved in C++ across Codeforces, LeetCode, and beecrowd',
    },
  ] satisfies HeroMetric[],
};
