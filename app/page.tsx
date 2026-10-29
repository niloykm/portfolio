import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/HeroSection';
import { Work } from '@/components/sections/Work';
import { Stack } from '@/components/sections/Stack';
import { Experience } from '@/components/sections/Experience';
import { Notes } from '@/components/sections/Notes';
import { Contact } from '@/components/sections/Contact';
import { profile } from '@/data/profile';
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
    <Layout
      showNotes={showNotesInNav}
      notes={notes.map((n) => ({ slug: n.slug, title: n.title }))}
    >
      <HeroSection lastPushIso={lastPushIso} />
      <Work />
      <Stack />
      <Experience />
      <Notes
        notes={notes}
        repos={repos}
        contributions={contributions}
      />
      <Contact />
    </Layout>
  );
}
