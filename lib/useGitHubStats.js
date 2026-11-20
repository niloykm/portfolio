"use client";

import { useState, useEffect } from "react";
import { FALLBACK_METRICS, GITHUB_API_URL } from "@/lib/github";

/**
 * Fetches verified live GitHub repository counts via /api/github-stats
 * with direct GitHub REST API fallback and immediate non-zero initial state.
 */
export function useGitHubStats(initialStats = FALLBACK_METRICS) {
  const [stats, setStats] = useState(() => ({
    ...FALLBACK_METRICS,
    ...(initialStats || {}),
  }));

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        const res = await fetch("/api/github-stats");
        if (res.ok) {
          const data = await res.json();
          if (
            isMounted &&
            typeof data?.publicRepos === "number" &&
            data.publicRepos > 0
          ) {
            setStats((prev) => ({
              ...prev,
              ...data,
              publicRepos: data.publicRepos,
              reposDisplay: String(data.publicRepos),
            }));
            return;
          }
        }
      } catch {
        // Fallback to direct GitHub REST API if internal route is unavailable
      }

      try {
        const directRes = await fetch(GITHUB_API_URL, {
          headers: { Accept: "application/vnd.github+json" },
        });
        if (directRes.ok) {
          const user = await directRes.json();
          if (
            isMounted &&
            typeof user?.public_repos === "number" &&
            user.public_repos > 0
          ) {
            setStats((prev) => ({
              ...prev,
              publicRepos: user.public_repos,
              reposDisplay: String(user.public_repos),
              source: "github-api",
            }));
          }
        }
      } catch {
        // Retain verified fallback metrics
      }
    }

    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

  return stats;
}
