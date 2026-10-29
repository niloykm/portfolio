import Link from 'next/link';
import { Section } from '@/components/layout/Section';
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

  const sectionLabel = hasNotes ? 'Notes_&_Activity' : 'Activity_Log';

  return (
    <Section
      id="notes"
      index="04"
      label={sectionLabel}
      meta="LIVE_TELEMETRY // REPOS"
    >
      {hasNotes && hasRepos ? (
        <div className="grid grid-cols-1 divide-y divide-border-subtle lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
          <div className="lg:col-span-7">
            <div className="flex items-baseline justify-between border-b border-border-subtle px-4 py-3 sm:px-6 font-mono text-xs uppercase tracking-wider">
              <h3 className="font-medium text-ink">
                {"// "}WRITING [{notes.length}]
              </h3>
              <Link href="/notes" className="text-muted hover:text-accent">
                [ALL_NOTES -&gt;]
              </Link>
            </div>
            <NotesList notes={notes} />
          </div>

          <div className="lg:col-span-5">
            <ActivityList repos={repos} contributions={contributions} />
          </div>
        </div>
      ) : hasNotes ? (
        <div>
          <div className="flex items-baseline justify-between border-b border-border-subtle px-4 py-3 sm:px-6 font-mono text-xs uppercase tracking-wider">
            <h3 className="font-medium text-ink">
              {"// "}WRITING [{notes.length}]
            </h3>
            <Link href="/notes" className="text-muted hover:text-accent">
              [ALL_NOTES -&gt;]
            </Link>
          </div>
          <NotesList notes={notes} />
        </div>
      ) : (
        <ActivityList repos={repos} contributions={contributions} />
      )}
    </Section>
  );
}

function NotesList({ notes }: { notes: NoteMeta[] }) {
  return (
    <ul className="divide-y divide-border-subtle">
      {notes.map((note) => (
        <li key={note.slug}>
          <Link
            href={`/notes/${note.slug}`}
            className="group flex flex-wrap items-baseline justify-between gap-4 px-4 py-3.5 transition-colors duration-100 hover:bg-ink hover:text-bg sm:px-6"
          >
            <div className="flex items-baseline gap-4 min-w-0">
              <time
                dateTime={note.date}
                className="font-mono text-xs text-muted group-hover:text-bg/80 shrink-0 tabular-nums"
              >
                {note.date}
              </time>
              <span className="font-sans text-base font-semibold text-ink group-hover:text-bg">
                {note.title}
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-muted group-hover:text-bg shrink-0">
              <span>[{note.readingTimeMinutes}_MIN]</span>
              <span aria-hidden="true">-&gt;</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
