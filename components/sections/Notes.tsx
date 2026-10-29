import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { Label } from '@/components/ui/Label';
import { ActivityList } from '@/components/notes/ActivityList';
import type { NoteMeta } from '@/lib/notes';
import type { RecentRepo, ContributionDay } from '@/lib/github';

type NotesProps = {
  notes: NoteMeta[];
  repos: RecentRepo[] | null;
  contributions?: ContributionDay[] | null;
};

export function Notes({ notes, repos, contributions }: NotesProps) {
  const hasNotes = notes && notes.length > 0;
  const hasRepos = Boolean(repos && repos.length > 0);

  if (!hasNotes && !hasRepos) {
    return null;
  }

  const sectionLabel = hasNotes ? 'Notes' : 'Activity';

  return (
    <Section id="notes" index="04" label={sectionLabel}>
      {hasNotes && hasRepos ? (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-9 lg:gap-6">
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-baseline justify-between">
              <Label as="h3">Writing ({notes.length})</Label>
              <Link
                href="/notes"
                className="text-meta text-muted underline decoration-border-strong underline-offset-[3px] hover:text-accent"
              >
                All notes →
              </Link>
            </div>
            <NotesList notes={notes} />
          </div>

          <div className="lg:col-span-4">
            <ActivityList repos={repos} contributions={contributions} />
          </div>
        </div>
      ) : hasNotes ? (
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <Label as="h3">Writing ({notes.length})</Label>
            <Link
              href="/notes"
              className="text-meta text-muted underline decoration-border-strong underline-offset-[3px] hover:text-accent"
            >
              All notes →
            </Link>
          </div>
          <NotesList notes={notes} />
        </div>
      ) : (
        <div className="max-w-2xl">
          <ActivityList repos={repos} contributions={contributions} />
        </div>
      )}
    </Section>
  );
}

function NotesList({ notes }: { notes: NoteMeta[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {notes.map((note) => (
        <li key={note.slug}>
          <Link
            href={`/notes/${note.slug}`}
            className="group flex flex-wrap items-baseline justify-between gap-4 py-3.5 px-2 -mx-2 transition-colors duration-[120ms] hover:bg-surface"
          >
            <div className="flex items-baseline gap-4 min-w-0">
              <time
                dateTime={note.date}
                className="text-meta text-muted shrink-0"
              >
                {note.date}
              </time>
              <span className="font-sans text-base font-medium text-ink">
                <span className="row-underline">{note.title}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-meta text-muted shrink-0">
              <span>{note.readingTimeMinutes} min read</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-[160ms] group-hover:translate-x-[2px] group-hover:text-ink"
              >
                →
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
