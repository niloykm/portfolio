import type { RecentRepo, ContributionDay } from '@/lib/github';
import { formatRelativeTime } from '@/lib/build-info';
import { Label } from '@/components/ui/Label';

type ActivityListProps = {
  repos: RecentRepo[] | null;
  contributions?: ContributionDay[] | null;
};

export function ActivityList({ repos, contributions }: ActivityListProps) {
  if (!repos || repos.length === 0) return null;

  const recentContributionSlice =
    contributions && contributions.length > 0
      ? contributions.slice(-84) // last 12 weeks
      : null;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <Label as="h3">Recently pushed</Label>
          <span className="text-meta text-muted">GitHub</span>
        </div>

        <ul className="divide-y divide-border border-y border-border">
          {repos.map((repo) => {
            const relTime = formatRelativeTime(repo.pushedAt);
            return (
              <li key={repo.id}>
                <a
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-3 px-2 -mx-2 transition-colors duration-[120ms] hover:bg-surface"
                >
                  <div className="min-w-0">
                    <span className="font-mono text-[13px] font-medium text-ink">
                      <span className="row-underline">{repo.name}</span>
                    </span>
                    {repo.language && (
                      <span className="ml-2 text-meta text-muted">
                        · {repo.language}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-meta text-muted">
                    <time dateTime={repo.pushedAt}>{relTime}</time>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-[160ms] group-hover:translate-x-[2px] group-hover:text-ink"
                    >
                      ↗
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {recentContributionSlice && (
        <div className="space-y-2">
          <Label as="p">Recent activity (12 weeks)</Label>
          <div className="inline-block rounded-control border border-border bg-surface p-2">
            <svg
              width={12 * 10}
              height={7 * 10}
              viewBox={`0 0 ${12 * 10} ${7 * 10}`}
              aria-label="GitHub contribution strip"
              role="img"
            >
              {recentContributionSlice.map((day, i) => {
                const col = Math.floor(i / 7);
                const row = i % 7;
                const fill =
                  day.contributionCount === 0
                    ? 'var(--bg-sunken)'
                    : day.contributionCount <= 2
                    ? 'var(--border-strong)'
                    : day.contributionCount <= 5
                    ? 'var(--muted)'
                    : 'var(--ink)';
                return (
                  <rect
                    key={day.date}
                    x={col * 10 + 1}
                    y={row * 10 + 1}
                    width="8"
                    height="8"
                    rx="1"
                    fill={fill}
                  />
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
