import { profile } from './profile';

export type SocialLink = {
  label: string;
  href: string;
  handle?: string;
};

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: `https://github.com/${profile.github}`,
    handle: `@${profile.github}`,
  },
  ...(profile.linkedin
    ? [
        {
          label: 'LinkedIn',
          href: profile.linkedin,
          handle: 'in/niloykumarmohonta000',
        },
      ]
    : []),
  {
    label: 'WhatsApp',
    href: profile.whatsapp,
    handle: profile.phone,
  },
  {
    label: 'Email',
    href: `mailto:${profile.email}`,
    handle: profile.email,
  },
];
