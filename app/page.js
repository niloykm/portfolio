"use client";

import About from "@/components/About";
import Blog from "@/components/Blog";
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
import { assets, workData as staticWork, serviceData as staticService, infoList as staticInfo } from "@/assets/assets";

export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [workData, setWorkData] = useState(staticWork);
  const [serviceData, setServiceData] = useState(staticService);
  const [infoList, setInfoList] = useState(staticInfo);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }

    // Hydrate portfolio data dynamically from DB with fallback merge
    fetch("/api/portfolio")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("DB offline");
      })
      .then((data) => {
        if (data.workData && Array.isArray(data.workData)) {
          // Merge with static data to preserve imported asset objects and rich categories
          const mergedWork = data.workData.map((item) => {
            const matchedStatic = staticWork.find(
              (s) => s.id === item.id || s.title === item.title
            );
            return {
              ...matchedStatic,
              ...item,
              bgImage: matchedStatic?.bgImage || (item.bgImageName && assets[item.bgImageName]) || assets.handsOn,
              category: item.category || matchedStatic?.category || "Full-Stack",
              techStack: item.techStack || matchedStatic?.techStack || [],
              highlights: item.highlights || matchedStatic?.highlights || [],
            };
          });
          setWorkData(mergedWork);
        }
        if (data.serviceData && Array.isArray(data.serviceData)) setServiceData(data.serviceData);
        if (data.infoList && Array.isArray(data.infoList)) setInfoList(data.infoList);
      })
      .catch((err) => console.log("Hydration fallback: using static data", err));
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
      <div className="min-h-screen bg-background relative">
        <ScrollProgressBar />
        <CyberParticles />
        <CommandPalette
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isOpen={isCommandPaletteOpen}
          setIsOpen={setIsCommandPaletteOpen}
          workData={workData}
        />
        <header>
          <Navbar
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          />
        </header>
        <main id="main">
          <Header isDarkMode={isDarkMode} />
          <About isDarkMode={isDarkMode} infoList={infoList} />
          <Services isDarkMode={isDarkMode} serviceData={serviceData} />
          <Work isDarkMode={isDarkMode} workData={workData} />
          <Blog />
          <Contact isDarkMode={isDarkMode} />
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </ToastProvider>
  );
}
