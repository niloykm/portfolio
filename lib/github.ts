import { profile } from '@/data/profile';

export type RecentRepo = {
  id: number;
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string | null;
  language: string | null;
  pushedAt: string;
};

export type ContributionDay = {
  date: string;
  contributionCount: number;
};

type GitHubApiRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
  fork: boolean;
};

export async function getRecentRepos(
  username = profile.github
): Promise<RecentRepo[] | null> {
  if (!username) return null;

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'niloykm-portfolio',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(
        username
      )}/repos?sort=pushed&per_page=10`,
      {
        headers,
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(3000),
      }
    );

    if (!res.ok) return null;

    const raw = (await res.json()) as unknown;
    if (!Array.isArray(raw)) return null;

    const repos = (raw as GitHubApiRepo[])
      .filter((r) => !r.fork && r.pushed_at)
      .slice(0, 5)
      .map((r) => ({
        id: r.id,
        name: r.name,
        fullName: r.full_name,
        htmlUrl: r.html_url,
        description: r.description,
        language: r.language,
        pushedAt: r.pushed_at,
      }));

    return repos.length > 0 ? repos : null;
  } catch {
    return null;
  }
}

export async function getContributions(
  username = profile.github
): Promise<ContributionDay[] | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token || !username) return null;

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'niloykm-portfolio',
      },
      body: JSON.stringify({ query, variables: { login: username } }),
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    });

    if (!res.ok) return null;

    const json = (await res.json()) as {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: {
              weeks?: { contributionDays: ContributionDay[] }[];
            };
          };
        };
      };
    };

    const weeks =
      json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
    if (!Array.isArray(weeks)) return null;

    return weeks.flatMap((w) => w.contributionDays);
  } catch {
    return null;
  }
}
