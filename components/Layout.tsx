import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/islands/CommandPalette';
import { KeyboardShortcuts } from '@/components/islands/KeyboardShortcuts';
import { profile } from '@/data/profile';
import { socialLinks } from '@/data/links';

type LayoutProps = {
  children: ReactNode;
  showNotes?: boolean;
  notes?: { slug: string; title: string }[];
  mainClassName?: string;
};

export function Layout({
  children,
  showNotes = false,
  notes = [],
  mainClassName = '',
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-bg-primary text-ink">
      <Header availability={profile.availability} showNotes={showNotes} />
      <CommandPalette notes={notes} showNotesSection={showNotes} />
      <KeyboardShortcuts showNotesSection={showNotes} />
      <main
        id="main"
        className={`mx-auto w-full max-w-container border-x border-border-subtle bg-bg-primary ${mainClassName}`.trim()}
      >
        {children}
      </main>
      <Footer
        name={profile.name}
        timeZone={profile.timeZone}
        showNotes={showNotes}
        elsewhere={socialLinks.map((s) => ({ label: s.label, href: s.href }))}
      />
    </div>
  );
}
