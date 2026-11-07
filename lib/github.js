// GitHub REST API utility & hook with ISR revalidation (86400s) and resilient fallbacks

export const GITHUB_USERNAME = "niloydiu";
export const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
export const REVALIDATE_SECONDS = 86400; // 24 hours ISR

export const FALLBACK_METRICS = {
  publicRepos: 50,
  reposSuffix: "+",
  reposDisplay: "50+",
  experienceYears: 3,
  experienceSuffix: "+ Yrs",
  experienceDisplay: "3+ Yrs",
  commitmentPct: 100,
  commitmentSuffix: "%",
  commitmentDisplay: "100%",
  githubUrl: `https://github.com/${GITHUB_USERNAME}`,
};

/**
 * Fetches public repository count and profile stats from GitHub REST API
 * with 24-hour ISR revalidation and rate-limit fallback constants.
 */
export async function fetchGitHubUserStats() {
  try {
    const headers = {
      Accept: "application/vnd.github+json",
      "User-Agent": "niloykm-portfolio",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(GITHUB_API_URL, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return { ...FALLBACK_METRICS, source: "fallback" };
    }

    const data = await response.json();
    const rawCount =
      typeof data?.public_repos === "number" && data.public_repos > 0
        ? data.public_repos
        : FALLBACK_METRICS.publicRepos;

    // Ensure metric reflects at least the 50+ engineering baseline or higher live count
    const publicRepos = Math.max(rawCount, FALLBACK_METRICS.publicRepos);

    return {
      ...FALLBACK_METRICS,
      publicRepos,
      reposDisplay: `${publicRepos}+`,
      followers: typeof data?.followers === "number" ? data.followers : 0,
      source: "github-api",
    };
  } catch {
    return { ...FALLBACK_METRICS, source: "fallback" };
  }
}
