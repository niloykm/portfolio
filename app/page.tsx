import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Work } from '@/components/sections/Work';
import { Stack } from '@/components/sections/Stack';
import { Experience } from '@/components/sections/Experience';
import { Notes } from '@/components/sections/Notes';
import { Contact } from '@/components/sections/Contact';
import { CommandPalette } from '@/components/islands/CommandPalette';
import { KeyboardShortcuts } from '@/components/islands/KeyboardShortcuts';
import { profile } from '@/data/profile';
import { socialLinks } from '@/data/links';
import { getPublishedNotes } from '@/lib/notes';
import { getRecentRepos, getContributions } from '@/lib/github';

export default async function HomePage() {
  const notes = getPublishedNotes();
  const [repos, contributions] = await Promise.all([
    getRecentRepos(profile.github),
    getContributions(profile.github),
  ]);

  const showNotesInNav =
    notes.length > 0 || Boolean(repos && repos.length > 0);
  const lastPushIso = repos && repos.length > 0 ? repos[0].pushedAt : null;

  return (
    <>
      <Header
        availability={profile.availability}
        showNotes={showNotesInNav}
      />
      <CommandPalette
        notes={notes.map((n) => ({ slug: n.slug, title: n.title }))}
        showNotesSection={showNotesInNav}
      />
      <KeyboardShortcuts showNotesSection={showNotesInNav} />
      <main id="main">
        <Hero lastPushIso={lastPushIso} />
        <Work />
        <Stack />
        <Experience />
        <Notes
          notes={notes}
          repos={repos}
          contributions={contributions}
        />
        <Contact />
      </main>
      <Footer
        name={profile.name}
        timeZone={profile.timeZone}
        showNotes={showNotesInNav}
        elsewhere={socialLinks.map((s) => ({ label: s.label, href: s.href }))}
      />
    </>
  );
}
