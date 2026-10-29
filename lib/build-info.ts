import { execSync } from 'node:child_process';

function resolveCommitSha(): string {
  const envSha =
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  if (envSha && envSha.trim().length >= 7) {
    return envSha.trim().slice(0, 7);
  }
  try {
    const gitSha = execSync('git rev-parse --short=7 HEAD', {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    if (gitSha) return gitSha;
  } catch {
    // Fallback if git is unavailable
  }
  return 'local';
}

export const buildInfo = {
  commitSha: resolveCommitSha(),
  builtAtIso: new Date().toISOString(),
} as const;

export function formatRelativeTime(isoDate: string, now = new Date()): string {
  const date = new Date(isoDate);
  const diffMs = date.getTime() - now.getTime();
  const absSec = Math.round(Math.abs(diffMs) / 1000);

  if (absSec < 60) return 'just now';
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const minutes = Math.round(diffMs / (1000 * 60));
  if (Math.abs(minutes) < 60) return rtf.format(minutes, 'minute');
  const hours = Math.round(diffMs / (1000 * 60 * 60));
  if (Math.abs(hours) < 24) return rtf.format(hours, 'hour');
  const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (Math.abs(days) < 30) return rtf.format(days, 'day');
  const months = Math.round(days / 30);
  if (Math.abs(months) < 12) return rtf.format(months, 'month');
  const years = Math.round(days / 365);
  return rtf.format(years, 'year');
}
