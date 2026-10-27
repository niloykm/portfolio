"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TrendingUp, Users, Code, Award } from "lucide-react";

const Stats = () => {
  const [stats, setStats] = useState([
    { icon: Code, label: "Projects Completed", value: 0, target: 15, suffix: "+" },
    { icon: Users, label: "Happy Clients", value: 0, target: 8, suffix: "+" },
    { icon: TrendingUp, label: "Code Commits", value: 0, target: 1200, suffix: "+" },
    { icon: Award, label: "Years Experience", value: 0, target: 2, suffix: "+" },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(prevStats =>
        prevStats.map(stat => ({
          ...stat,
          value: stat.target
        }))
      );
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section className="py-16 px-6 lg:px-12 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
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
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent text-accent-foreground rounded-xl mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <motion.div
                  className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                >
                  {stat.value.toLocaleString()}{stat.suffix}
                </motion.div>

                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
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
