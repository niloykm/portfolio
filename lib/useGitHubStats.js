"use client";

import { useState, useEffect } from "react";
import { FALLBACK_METRICS, GITHUB_API_URL } from "@/lib/github";

/**
 * Custom hook to dynamically fetch GitHub public repo count with
 * build-time/ISR API route primary path and direct GitHub REST API fallback.
 * Guarantees immediate non-zero initial state (50+ Repos, 3+ Yrs Exp, 100% Craft).
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
          if (isMounted && typeof data?.publicRepos === "number" && data.publicRepos > 0) {
            setStats((prev) => ({
              ...prev,
              ...data,
              publicRepos: Math.max(data.publicRepos, FALLBACK_METRICS.publicRepos),
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
          if (isMounted && typeof user?.public_repos === "number" && user.public_repos > 0) {
            const publicRepos = Math.max(user.public_repos, FALLBACK_METRICS.publicRepos);
            setStats((prev) => ({
              ...prev,
              publicRepos,
              reposDisplay: `${publicRepos}+`,
            }));
          }
        }
      } catch {
        // Retain FALLBACK_METRICS (50+ Repos, 3+ Yrs, 100%)
      }
    }

    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

  return stats;
}
