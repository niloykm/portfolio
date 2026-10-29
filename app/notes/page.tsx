import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Layout } from '@/components/Layout';
import { Heading, Body } from '@/components/Typography';
import { getPublishedNotes } from '@/lib/notes';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: 'Notes',
  description: `Engineering notes and technical writing by ${profile.name}.`,
};

export default function NotesIndexPage() {
  const notes = getPublishedNotes();
  if (notes.length === 0) {
    notFound();
  }

  return (
    <Layout
      showNotes
      notes={notes.map((n) => ({ slug: n.slug, title: n.title }))}
    >
      <header className="border-b border-border-subtle p-6 sm:p-8 space-y-3">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          {"// "}TECHNICAL_WRITING
        </p>
        <Heading as="h1" size="display">
          Notes
        </Heading>
        <Body size="base" muted measure>
          Technical notes on full-stack engineering, web performance, and system
          design.
        </Body>
      </header>

      <ul className="divide-y divide-border-subtle border-b border-border-subtle">
        {notes.map((note) => (
          <li key={note.slug}>
            <Link
              href={`/notes/${note.slug}`}
              className="group flex flex-wrap items-baseline justify-between gap-4 px-6 py-4 transition-colors duration-100 hover:bg-ink hover:text-bg"
            >
              <div className="flex items-baseline gap-4 min-w-0">
                <time
                  dateTime={note.date}
                  className="font-mono text-xs text-muted group-hover:text-bg/80 shrink-0 tabular-nums"
                >
                  {note.date}
                </time>
                <div className="space-y-1">
                  <span className="font-sans text-base font-semibold text-ink group-hover:text-bg block">
                    {note.title}
                  </span>
                  {note.summary && (
                    <p className="text-secondary text-muted group-hover:text-bg/80 measure">
                      {note.summary}
                    </p>
                  )}
                </div>
              </div>

              <span className="font-mono text-xs text-muted group-hover:text-bg shrink-0">
                [{note.readingTimeMinutes}_MIN] -&gt;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
