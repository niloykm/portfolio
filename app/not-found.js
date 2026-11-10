"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-6 relative overflow-hidden font-sans structural-grid">
      <div className="relative z-10 max-w-lg w-full space-y-6">
        <div className="rounded-lg overflow-hidden bg-zinc-900/70 border border-neutral-800 p-6 text-left font-mono text-xs sm:text-sm">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800 text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="ml-2 text-xs font-semibold text-zinc-200">
                error.log
              </span>
            </div>
            <span className="text-[11px] text-rose-400 font-bold tabular-nums">
              STATUS: 404
            </span>
          </div>

          <div className="space-y-2 text-zinc-300">
            <p className="text-emerald-400">❯ ping requested_route</p>
            <p className="text-rose-400 pl-4">
              HTTP 404: Resource not found on server.
            </p>
            <p className="text-zinc-400 pl-4">
              The route you requested does not exist or has been relocated.
            </p>
            <p className="text-emerald-400 pt-2">❯ resolve_navigation()</p>
            <p className="text-zinc-200 pl-4">
              Redirect recommendation: Return to root index.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-mono font-semibold rounded-md transition-all duration-150 ease-out active:scale-[0.98] text-xs sm:text-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portfolio</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
