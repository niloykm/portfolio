import type { RecentRepo, ContributionDay } from '@/lib/github';
import { formatRelativeTime } from '@/lib/build-info';

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
    <div>
      <div className="flex items-baseline justify-between border-b border-border-subtle px-4 py-3 sm:px-6 font-mono text-xs uppercase tracking-wider">
        <h3 className="font-medium text-ink">{"// "}RECENT_COMMITS</h3>
        <span className="text-muted">[GITHUB_FEED]</span>
      </div>

      <ul className="divide-y divide-border-subtle">
        {repos.map((repo) => {
          const relTime = formatRelativeTime(repo.pushedAt);
          return (
            <li key={repo.id}>
              <a
                href={repo.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-4 px-4 py-3.5 transition-colors duration-100 hover:bg-ink hover:text-bg sm:px-6"
              >
                <div className="min-w-0">
                  <span className="font-mono text-xs font-semibold text-ink group-hover:text-bg">
                    {repo.name}
                  </span>
                  {repo.language && (
                    <span className="ml-2 font-mono text-[11px] uppercase text-muted group-hover:text-bg/80">
                      [{repo.language}]
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 font-mono text-xs text-muted group-hover:text-bg">
                  <time dateTime={repo.pushedAt} className="tabular-nums">
                    {relTime}
                  </time>
                  <span aria-hidden="true">-&gt;</span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>

      {recentContributionSlice && (
        <div className="border-t border-border-subtle p-4 sm:px-6 space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            {"// "}CONTRIBUTION_MATRIX (12_WEEKS)
          </p>
          <div className="inline-block border border-border-subtle bg-bg-primary p-2">
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
                    ? 'var(--border-subtle)'
                    : day.contributionCount <= 2
                      ? 'var(--text-muted)'
                      : 'var(--text-primary)';
                return (
                  <rect
                    key={day.date}
                    x={col * 10 + 1}
                    y={row * 10 + 1}
                    width="8"
                    height="8"
                    rx="0"
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
