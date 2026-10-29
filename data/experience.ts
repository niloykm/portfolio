export type ExperienceEntry = {
  role: string;
  organisation: string;
  period?: string;
  location?: string;
  summary: string;
  href?: string;
  kind: 'work' | 'education';
};

export const experience: ExperienceEntry[] = [
  {
    role: 'Co-founder',
    organisation: 'Gen Stella IT',
    period: undefined, // TODO(niloy): add start date / period for Gen Stella IT
    location: 'Dhaka',
    summary:
      'Small full-stack software and DevOps services studio building web applications and deployment pipelines.',
    href: undefined, // TODO(niloy): add Gen Stella IT URL if public
    kind: 'work',
  },
  {
    role: 'Full-Stack Developer / Founder',
    organisation: 'ScholarPASS',
    period: undefined, // TODO(niloy): add period for ScholarPASS
    summary:
      'Designed and built the full-stack web application and backend API architecture.',
    href: undefined, // TODO(niloy): add ScholarPASS URL if public
    kind: 'work',
  },
  {
    role: 'Contract Frontend Developer',
    organisation: 'TripBooking.ai',
    period: undefined, // TODO(niloy): add period for TripBooking.ai
    summary:
      'Developed frontend booking flows and search interfaces for an AI travel booking platform.',
    href: undefined, // TODO(niloy): add TripBooking.ai URL if public
    kind: 'work',
  },
  {
    role: 'Junior Frontend Developer',
    organisation: 'TutorsPlan',
    period: undefined, // TODO(niloy): add period for TutorsPlan
    summary:
      'Built responsive React user interfaces and student/tutor dashboard views.',
    href: undefined, // TODO(niloy): add TutorsPlan URL if public
    kind: 'work',
  },
  {
    role: 'BSc in Computer Science & Engineering',
    organisation: 'Daffodil International University',
    period: '2020 — 2024',
    location: 'Dhaka',
    summary:
      'Undergraduate degree in computer science, algorithms, software engineering, and web systems.',
    kind: 'education',
  },
];
