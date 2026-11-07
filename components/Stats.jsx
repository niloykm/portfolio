"use client";

import { motion } from "framer-motion";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 px-6 lg:px-12 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -4 }}
                className="bg-white dark:bg-slate-900/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2 tabular-nums">
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;
