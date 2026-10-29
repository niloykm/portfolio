import { profile } from './profile';
import { isFilled } from '@/lib/filled';

export type SocialLink = {
  label: string;
  href: string;
  handle?: string;
};

export const socialLinks: SocialLink[] = [
  ...(isFilled(profile.github)
    ? [
        {
          label: 'GitHub',
          href: `https://github.com/${profile.github}`,
          handle: `@${profile.github}`,
        },
      ]
    : []),
  ...(isFilled(profile.linkedin)
    ? [
        {
          label: 'LinkedIn',
          href: profile.linkedin,
        },
      ]
    : []),
  ...(isFilled(profile.x)
    ? [
        {
          label: 'X',
          href: profile.x,
        },
      ]
    : []),
  {
    label: 'Email',
    href: `mailto:${profile.email}`,
    handle: profile.email,
  },
];
