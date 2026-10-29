import { projects } from '@/data/projects';
import { profile } from '@/data/profile';
import { isFilled } from '@/lib/filled';

export type CommandItem = {
  id: string;
  label: string;
  group: 'Navigate' | 'Work' | 'Notes' | 'Actions' | 'Help';
  kbd?: string[];
  href?: string;
  external?: boolean;
  action?: 'copy-email' | 'toggle-theme' | 'open-shortcuts';
  keywords?: string[];
};

export function buildCommands(
  notes: { slug: string; title: string }[] = [],
  showNotesSection = false
): CommandItem[] {
  const navCommands: CommandItem[] = [
    {
      id: 'nav-top',
      label: 'Top / Overview',
      group: 'Navigate',
      href: '/#top',
      keywords: ['home', 'top', 'hero', 'status'],
    },
    {
      id: 'nav-work',
      label: 'Selected work',
      group: 'Navigate',
      kbd: ['g', 'w'],
      href: '/#work',
      keywords: ['projects', 'case files', 'archive'],
    },
    {
      id: 'nav-stack',
      label: 'Stack & systems map',
      group: 'Navigate',
      kbd: ['g', 's'],
      href: '/#stack',
      keywords: ['skills', 'technologies', 'tools'],
    },
    {
      id: 'nav-experience',
      label: 'Experience ledger',
      group: 'Navigate',
      kbd: ['g', 'x'],
      href: '/#experience',
      keywords: ['career', 'work history', 'education'],
    },
    ...(showNotesSection
      ? [
          {
            id: 'nav-notes',
            label: 'Notes & activity',
            group: 'Navigate' as const,
            kbd: ['g', 'n'],
            href: '/#notes',
            keywords: ['writing', 'blog', 'github'],
          },
        ]
      : []),
    {
      id: 'nav-contact',
      label: 'Contact',
      group: 'Navigate',
      kbd: ['g', 'c'],
      href: '/#contact',
      keywords: ['email', 'hire', 'reach out'],
    },
  ];

  const workCommands: CommandItem[] = projects.map((project) => ({
    id: `work-${project.slug}`,
    label: `${project.title} — ${project.summary.slice(0, 52)}…`,
    group: 'Work',
    href: `/work/${project.slug}`,
    keywords: [project.title, project.kind, ...project.stack],
  }));

  const noteCommands: CommandItem[] = notes.map((note) => ({
    id: `note-${note.slug}`,
    label: note.title,
    group: 'Notes',
    href: `/notes/${note.slug}`,
    keywords: ['note', 'article', note.title],
  }));

  const actionCommands: CommandItem[] = [
    {
      id: 'action-copy-email',
      label: `Copy email (${profile.email})`,
      group: 'Actions',
      kbd: ['e'],
      action: 'copy-email',
      keywords: ['email', 'contact', 'clipboard'],
    },
    {
      id: 'action-toggle-theme',
      label: 'Toggle color theme (Light / Dark)',
      group: 'Actions',
      kbd: ['t'],
      action: 'toggle-theme',
      keywords: ['dark mode', 'light mode', 'theme'],
    },
    ...(isFilled(profile.github)
      ? [
          {
            id: 'action-github',
            label: `Open GitHub (@${profile.github})`,
            group: 'Actions' as const,
            href: `https://github.com/${profile.github}`,
            external: true,
            keywords: ['github', 'git', 'profile'],
          },
        ]
      : []),
    ...(isFilled(profile.resumeUrl)
      ? [
          {
            id: 'action-resume',
            label: 'Download résumé (PDF)',
            group: 'Actions' as const,
            href: profile.resumeUrl,
            external: true,
            keywords: ['cv', 'resume', 'pdf'],
          },
        ]
      : []),
    {
      id: 'action-source',
      label: 'View source on GitHub',
      group: 'Actions',
      href: 'https://github.com/niloykm/portfolio',
      external: true,
      keywords: ['repo', 'code', 'source'],
    },
  ];

  const helpCommands: CommandItem[] = [
    {
      id: 'help-shortcuts',
      label: 'Keyboard shortcuts',
      group: 'Help',
      kbd: ['?'],
      action: 'open-shortcuts',
      keywords: ['help', 'keys', 'hotkeys', 'shortcuts'],
    },
  ];

  return [
    ...navCommands,
    ...workCommands,
    ...noteCommands,
    ...actionCommands,
    ...helpCommands,
  ];
}
