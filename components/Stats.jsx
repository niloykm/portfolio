"use client";

import { TrendingUp, Users, Code, Award } from "lucide-react";
import { useGitHubStats } from "@/lib/useGitHubStats";

const Stats = () => {
  const githubStats = useGitHubStats();

  const stats = [
    {
      icon: Code,
      label: "GitHub Repositories",
      value: githubStats.publicRepos || 50,
      suffix: "+",
    },
    {
      icon: Award,
      label: "Years Experience",
      value: githubStats.experienceYears || 3,
      suffix: "+ Yrs",
    },
    {
      icon: TrendingUp,
      label: "Code Commits",
      value: 1500,
      suffix: "+",
    },
    {
      icon: Users,
      label: "Commitment to Craft",
      value: 100,
      suffix: "%",
    },
  ];

  return (
    <section className="py-12 px-6 lg:px-8 bg-[#ffffff] dark:bg-[#09090b] border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-zinc-50 dark:bg-zinc-900/50 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800"
              >
                <div className="inline-flex items-center justify-center w-8 h-8 bg-zinc-100 dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800 rounded-md mb-3">
                  <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>

                <div className="text-2xl lg:text-3xl font-mono font-bold text-zinc-950 dark:text-white mb-1 tabular-nums">
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-xs font-mono">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
