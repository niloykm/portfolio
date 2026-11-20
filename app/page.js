"use client";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Work from "@/components/Work";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import CommandPalette from "@/components/ui/CommandPalette";
import { ToastProvider } from "@/components/ui/Toast";
import { MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { projects as staticProjects } from "@/data/projects";
import {
  assets,
  serviceData as staticService,
  infoList as staticInfo,
} from "@/assets/assets";

export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeHydrated, setThemeHydrated] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeStackTag, setActiveStackTag] = useState("");
  const [workData, setWorkData] = useState(staticProjects);
  const [serviceData, setServiceData] = useState(staticService);
  const [infoList, setInfoList] = useState(staticInfo);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersLight = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

    const shouldBeDark = !(savedTheme === "light" || (!savedTheme && systemPrefersLight));
    setIsDarkMode(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
    setThemeHydrated(true);

    // Hydrate portfolio data dynamically from API with safe static fallback merge
    fetch("/api/portfolio")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Portfolio API unavailable");
      })
      .then((data) => {
        if (data.workData && Array.isArray(data.workData)) {
          const mergedWork = data.workData
            .filter(
              (item) =>
                item.id !== "tithyniloy" &&
                item.slug !== "tithyniloy" &&
                !(item.url && item.url.includes("tithyniloy"))
            )
            .map((item) => {
              const matchedStatic = staticProjects.find(
                (s) => s.id === item.id || s.title === item.title
              );
              const resolvedGithubUrl =
                matchedStatic !== undefined
                  ? matchedStatic.githubUrl
                  : item.githubUrl ?? item.github ?? null;

              return {
                ...matchedStatic,
                ...item,
                title: matchedStatic?.title || item.title,
                githubUrl: resolvedGithubUrl
                  ? resolvedGithubUrl.replace(/\.git$/, "")
                  : null,
                github: resolvedGithubUrl
                  ? resolvedGithubUrl.replace(/\.git$/, "")
                  : null,
                bgImage:
                  item.image ||
                  matchedStatic?.image ||
                  (item.bgImageName && assets[item.bgImageName]) ||
                  assets.handsOn,
                image: item.image || matchedStatic?.image,
                featured: matchedStatic?.featured ?? item.featured ?? false,
                filterCategory:
                  matchedStatic?.filterCategory ||
                  item.filterCategory ||
                  "Systems & DevOps",
                tagline:
                  matchedStatic?.tagline || item.tagline || item.description,
                architectureHighlights:
                  matchedStatic?.architectureHighlights ||
                  item.architectureHighlights ||
                  item.highlights ||
                  [],
                category:
                  matchedStatic?.category || item.category || "Full-Stack",
                techStack:
                  matchedStatic?.techStack || item.techStack || [],
                teardown: matchedStatic?.teardown || item.teardown,
                highlights:
                  matchedStatic?.highlights || item.highlights || [],
              };
            });
          setWorkData(mergedWork);
        }
        if (data.serviceData && Array.isArray(data.serviceData))
          setServiceData(data.serviceData);
        if (data.infoList && Array.isArray(data.infoList))
          setInfoList(data.infoList);
      })
      .catch(() => {
        // Retain staticProjects fallback cleanly
      });
  }, []);

  useEffect(() => {
    if (!themeHydrated) return;
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode, themeHydrated]);

  const handleFilterByStack = (tag) => {
    setActiveStackTag(tag);
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 relative overflow-x-hidden">
          <ScrollProgressBar />
          <CommandPalette
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            isOpen={isCommandPaletteOpen}
            setIsOpen={setIsCommandPaletteOpen}
            workData={workData}
            onFilterByStack={handleFilterByStack}
          />
          <Navbar
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          />
          <main id="main-content">
            <Header projectCount={workData.length} />
            <Work
              workData={workData}
              activeStackTag={activeStackTag}
              onClearStackTag={() => setActiveStackTag("")}
              onSelectStackTag={(tag) => setActiveStackTag(tag)}
            />
            <About infoList={infoList} projectCount={workData.length} />
            <Services
              serviceData={serviceData}
              onSelectStackTag={handleFilterByStack}
            />
            <Contact />
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </MotionConfig>
  );
}
