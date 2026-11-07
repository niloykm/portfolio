"use client";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Work from "@/components/Work";
import CyberParticles from "@/components/CyberParticles";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import CommandPalette from "@/components/ui/CommandPalette";
import { ToastProvider } from "@/components/ui/Toast";
import { useEffect, useState } from "react";
import {
  assets,
  workData as staticWork,
  serviceData as staticService,
  infoList as staticInfo,
} from "@/assets/assets";

export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeStackTag, setActiveStackTag] = useState("");
  const [workData, setWorkData] = useState(staticWork);
  const [serviceData, setServiceData] = useState(staticService);
  const [infoList, setInfoList] = useState(staticInfo);

  useEffect(() => {
    // Check for saved theme preference or default to system/dark preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersLight = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

    if (savedTheme === "light" || (!savedTheme && systemPrefersLight)) {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    // Hydrate portfolio data dynamically from DB with fallback merge
    fetch("/api/portfolio")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("DB offline");
      })
      .then((data) => {
        if (data.workData && Array.isArray(data.workData)) {
          const mergedWork = data.workData.map((item) => {
            const matchedStatic = staticWork.find(
              (s) => s.id === item.id || s.title === item.title
            );
            return {
              ...matchedStatic,
              ...item,
              title: matchedStatic?.title || item.title,
              github: (matchedStatic?.github || item.github || "").replace(
                /\.git$/,
                ""
              ),
              bgImage:
                matchedStatic?.bgImage ||
                (item.bgImageName && assets[item.bgImageName]) ||
                assets.handsOn,
              category:
                item.category || matchedStatic?.category || "Full-Stack",
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
        // Retain static fallback data on offline/error
      });
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background relative overflow-x-hidden">
        <ScrollProgressBar />
        <CyberParticles />
        <CommandPalette
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isOpen={isCommandPaletteOpen}
          setIsOpen={setIsCommandPaletteOpen}
          workData={workData}
          onFilterByStack={(tag) => setActiveStackTag(tag)}
        />
        <Navbar
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />
        <main id="main-content">
          <Header isDarkMode={isDarkMode} />
          <About isDarkMode={isDarkMode} infoList={infoList} />
          <Services isDarkMode={isDarkMode} serviceData={serviceData} />
          <Work
            isDarkMode={isDarkMode}
            workData={workData}
            activeStackTag={activeStackTag}
            onClearStackTag={() => setActiveStackTag("")}
            onSelectStackTag={(tag) => setActiveStackTag(tag)}
          />
          <Contact isDarkMode={isDarkMode} />
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </ToastProvider>
  );
}
