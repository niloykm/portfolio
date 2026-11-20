// GitHub REST API utility with 24-hour ISR revalidation and verified fallbacks

export const GITHUB_USERNAME = "niloykm";
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
export const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
export const REVALIDATE_SECONDS = 86400; // 24 hours ISR

export const FALLBACK_METRICS = {
  publicRepos: 41,
  reposDisplay: "41",
  experienceYears: 3,
  experienceDisplay: "3+ Yrs",
  liveDeployments: 14,
  deploymentsDisplay: "14",
  githubUrl: GITHUB_PROFILE_URL,
};

/**
 * Fetches live public repository count and profile metadata from the GitHub REST API
 * for @niloykm with 24-hour ISR caching and truthful fallbacks when rate-limited.
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
    const publicRepos =
      typeof data?.public_repos === "number" && data.public_repos > 0
        ? data.public_repos
        : FALLBACK_METRICS.publicRepos;

    return {
      ...FALLBACK_METRICS,
      publicRepos,
      reposDisplay: String(publicRepos),
      followers: typeof data?.followers === "number" ? data.followers : 0,
      source: "github-api",
    };
  } catch {
    return { ...FALLBACK_METRICS, source: "fallback" };
  }
}
