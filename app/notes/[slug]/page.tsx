import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Noto_Sans_Bengali } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Rule } from '@/components/ui/Rule';
import { Tag } from '@/components/ui/Tag';
import { getNoteBySlug, getPublishedNotes } from '@/lib/notes';
import { profile } from '@/data/profile';
import { socialLinks } from '@/data/links';

const fontBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500'],
  display: 'swap',
});

export const dynamicParams = false;

export function generateStaticParams() {
  const notes = getPublishedNotes();
  // Return a sentinel slug when 0 published notes exist so Next.js 15 static export/build succeeds;
  // getNoteBySlug('_none_') returns null and triggers notFound().
  if (notes.length === 0) {
    return [{ slug: '_none_' }];
  }
  return notes.map((note) => ({ slug: note.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) {
    return { title: 'Note Not Found' };
  }

  return {
    title: note.title,
    description: note.summary,
    alternates: {
      canonical: `/notes/${note.slug}`,
    },
    openGraph: {
      title: `${note.title} — ${profile.name}`,
      description: note.summary,
      url: `/notes/${note.slug}`,
      type: 'article',
      publishedTime: note.date,
    },
  };
}

export default async function NoteArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) {
    notFound();
  }

  const isBengali = note.lang === 'bn';

  return (
    <>
      <Header availability={profile.availability} showNotes />
      <main id="main" className="py-12 sm:py-16 lg:py-24">
        <Container>
          <article
            lang={note.lang}
            className={`space-y-8 ${isBengali ? fontBengali.className : ''}`}
          >
            <nav aria-label="Breadcrumb" className="text-meta text-muted">
              <Link
                href="/#notes"
                className="underline decoration-border-strong underline-offset-[3px] hover:text-accent"
              >
                ← Notes
              </Link>
            </nav>

            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-meta text-muted">
                <time dateTime={note.date}>{note.date}</time>
                <span aria-hidden="true">·</span>
                <span>{note.readingTimeMinutes} min read</span>
              </div>

              <h1 className="text-h2 text-ink measure">{note.title}</h1>

              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {note.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              )}
            </header>

            <Rule />

            <div className="measure space-y-4 text-body text-ink-2 whitespace-pre-wrap">
              {note.content}
            </div>
          </article>
        </Container>
      </main>
      <Footer
        name={profile.name}
        timeZone={profile.timeZone}
        showNotes
        elsewhere={socialLinks.map((s) => ({ label: s.label, href: s.href }))}
      />
    </>
  );
}
