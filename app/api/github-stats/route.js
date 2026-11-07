import { NextResponse } from "next/server";
import { fetchGitHubUserStats, FALLBACK_METRICS } from "@/lib/github";

export const revalidate = 86400; // 24-hour ISR revalidation

export async function GET() {
  try {
    const stats = await fetchGitHubUserStats();
    return NextResponse.json(stats, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      },
    });
  } catch {
    return NextResponse.json(
      { ...FALLBACK_METRICS, source: "fallback" },
      { status: 200 }
    );
  }
}
