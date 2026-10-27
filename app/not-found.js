"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Terminal, Home, Search } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 cyber-grid pointer-events-none" />
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 max-w-lg w-full text-center space-y-6"
      >
        {/* Terminal Diagnostic Card */}
        <div className="rounded-2xl overflow-hidden bg-slate-900/90 border border-slate-800 shadow-2xl p-6 text-left font-mono text-xs sm:text-sm">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-semibold text-slate-300">error.log</span>
            </div>
            <span className="text-[11px] text-rose-400 font-bold">STATUS: 404</span>
          </div>

          <div className="space-y-2 text-slate-300">
            <p className="text-emerald-400">❯ ping current_route</p>
            <p className="text-rose-400 pl-4">HTTP 404: Resource not found on server.</p>
            <p className="text-slate-400 pl-4">The route you requested does not exist or has been shifted.</p>
            <p className="text-emerald-400 pt-2">❯ resolve_navigation()</p>
            <p className="text-blue-400 pl-4">Redirect recommendation: Return to homepage.</p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-center">
          <MagneticButton strength={0.25}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-accent-foreground font-semibold rounded-lg shadow-sm hover:opacity-90 transition-all duration-300 text-sm sm:text-base"
            >
              <Home className="w-4 h-4" />
              <span>Return to Portfolio</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </MagneticButton>
        </div>
      </motion.div>
    </div>
  );
}
