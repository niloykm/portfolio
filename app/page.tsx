import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/HeroSection';
import { Work } from '@/components/sections/Work';
import { Stack } from '@/components/sections/Stack';
import { Experience } from '@/components/sections/Experience';
import { Notes } from '@/components/sections/Notes';
import { Contact } from '@/components/sections/Contact';
import { getPublishedNotes } from '@/lib/notes';

export default async function HomePage() {
  const notes = getPublishedNotes();
  const showNotesInNav = notes.length > 0;

  return (
    <Layout
      showNotes={showNotesInNav}
      notes={notes.map((n) => ({ slug: n.slug, title: n.title }))}
    >
      <HeroSection />
      <Work />
      <Stack />
      <Experience />
      {showNotesInNav && <Notes notes={notes} repos={null} />}
      <Contact />
    </Layout>
  );
}
