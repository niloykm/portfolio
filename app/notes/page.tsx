import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Label } from '@/components/ui/Label';
import { getPublishedNotes } from '@/lib/notes';
import { profile } from '@/data/profile';
import { socialLinks } from '@/data/links';

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
    <>
      <Header availability={profile.availability} showNotes />
      <main id="main" className="py-12 sm:py-16 lg:py-24">
        <Container className="space-y-10">
          <header className="space-y-3">
            <Label as="p">Writing</Label>
            <h1 className="text-display text-ink">Notes</h1>
            <p className="text-body text-muted measure">
              Technical notes on full-stack engineering, web performance, and
              system design.
            </p>
          </header>

          <ul className="divide-y divide-border border-y border-border">
            {notes.map((note) => (
              <li key={note.slug}>
                <Link
                  href={`/notes/${note.slug}`}
                  className="group flex flex-wrap items-baseline justify-between gap-4 py-4 px-2 -mx-2 transition-colors duration-[120ms] hover:bg-surface"
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <time
                      dateTime={note.date}
                      className="text-meta text-muted shrink-0"
                    >
                      {note.date}
                    </time>
                    <div className="space-y-1">
                      <span className="font-sans text-base font-medium text-ink block">
                        <span className="row-underline">{note.title}</span>
                      </span>
                      {note.summary && (
                        <p className="text-secondary text-muted measure">
                          {note.summary}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="text-meta text-muted shrink-0">
                    {note.readingTimeMinutes} min read →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
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
