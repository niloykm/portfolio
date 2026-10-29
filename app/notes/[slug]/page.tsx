import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Noto_Sans_Bengali } from 'next/font/google';
import { Layout } from '@/components/Layout';
import { Heading } from '@/components/Typography';
import { Tag } from '@/components/ui/Tag';
import { getNoteBySlug, getPublishedNotes } from '@/lib/notes';
import { profile } from '@/data/profile';

const fontBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500'],
  display: 'swap',
});

export const dynamicParams = false;

export function generateStaticParams() {
  const notes = getPublishedNotes();
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
    <Layout showNotes>
      <article
        lang={note.lang}
        className={`border-b border-border-subtle ${
          isBengali ? fontBengali.className : ''
        }`}
      >
        <nav
          aria-label="Breadcrumb"
          className="border-b border-border-subtle px-6 py-3 font-mono text-xs uppercase tracking-wider text-muted"
        >
          <Link href="/#notes" className="text-ink hover:text-accent">
            [&lt;- NOTES_INDEX]
          </Link>
        </nav>

        <header className="border-b border-border-subtle p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
            <time dateTime={note.date}>{note.date}</time>
            <span aria-hidden="true">{"//"}</span>
            <span>[{note.readingTimeMinutes}_MIN_READ]</span>
          </div>

          <Heading as="h1" size="h2" className="measure">
            {note.title}
          </Heading>

          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {note.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </header>

        <div className="p-6 sm:p-8 measure space-y-4 text-body text-ink whitespace-pre-wrap">
          {note.content}
        </div>
      </article>
    </Layout>
  );
}
