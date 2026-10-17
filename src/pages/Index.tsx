import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Seo } from "@/components/Seo";
import VideoOverlay from "@/components/VideoOverlay";
import { TopBar } from "@/components/home/TopBar";
import { SideDotNav } from "@/components/home/SideDotNav";
import { HeroSection } from "@/components/home/sections/HeroSection";
import { ShortBioSection } from "@/components/home/sections/ShortBioSection";
import { LiveSection } from "@/components/home/sections/LiveSection";
import { MusicSection } from "@/components/home/sections/MusicSection";
import { FinalCtaSection } from "@/components/home/sections/FinalCtaSection";
import starsBg from "@/assets/stars_background.webp";

// Section ids, in scroll order. Used by the side dots and the scroll observer.
const sectionsConfig = [
  { id: "hero-section", label: "Hero" },
  { id: "short-bio", label: "Short Bio" },
  { id: "live", label: "Live" },
  { id: "music", label: "Music" },
  { id: "final-cta", label: "Contact & Footer" },
];

const HomeContent = () => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

  const copy = lang === "de"
    ? {
      kicker: <>Alternative-Rock-Band <span className="hidden sm:inline">· </span><span className="sm:hidden"><br /></span>Eigene Musik · Live-Shows</>,
      hero: "Mach Lärm.",
      short: "Aus München.<br />Für die Bühne.",
      shortLabel: "Die Kurzfassung",
      shortBody: "Last Cats on Earth verbinden Hard Rock, Funk, Alternative Rock, Rap und Pop-Rock-Energie zu einem Live-Set, das sich nicht in eine Schublade stecken lässt. Eigene Songs, neu gedachte Cover, große Hooks und direkter Kontakt zum Publikum.",
      live: "Der Raum macht den Rest.",
      liveLabel: "Live erleben",
      liveLink: "Alle Songs & Videos",
      release: "Songs, die im Kopf bleiben.",
      releaseLabel: "Hör genauer hin",
      releaseBody: "NEVER STOP und FLASHBACK! sind erst der Anfang. Drück Play und erlebe, was passiert, wenn die Songs die Lautsprecher verlassen.",
      booking: "Die Band buchen",
      stageLabel: "Eine Bühne?",
      stageHeading: "Machen wir sie laut.",
      stageCta: "EPK ansehen",
      menu: ["Start", "Musik", "EPK", "Links"],
      exploreLabel: "Entdecken",
      workLabel: "Mit uns arbeiten",
      bookLabel: "Die Band buchen",
      followLabel: "Hören · sehen · folgen",
    }
    : {
      kicker: <>Alternative rock band <span className="hidden sm:inline">· </span><span className="sm:hidden"><br /></span>Original music · live shows</>,
      hero: "Make some noise.",
      short: "Munich-born.<br />Stage-ready.",
      shortLabel: "The short version",
      shortBody: "Last Cats on Earth mix hard rock, funk, alternative rock, rap and pop-rock energy into a live set that refuses to stay in one lane. Original songs, reworked covers, big hooks and direct crowd connection.",
      live: "The room does the rest.",
      liveLabel: "Watch us play",
      liveLink: "All music & videos",
      release: "Songs that stay with you.",
      releaseLabel: "Listen closer",
      releaseBody: "NEVER STOP and FLASHBACK! are only the beginning. Press play, then come see what happens when the songs leave the speakers.",
      booking: "Book the band",
      stageLabel: "Have a stage?",
      stageHeading: "Let’s make it loud.",
      stageCta: "Check out our EPK",
      menu: ["Home", "Music", "EPK", "Links"],
      exploreLabel: "Explore",
      workLabel: "Work with us",
      bookLabel: "Book the band",
      followLabel: "Listen · watch · follow",
    };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sectionElements = sectionsConfig
      .map((sec) => document.getElementById(sec.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionElements.indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              setActiveSectionIndex(index);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.5,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-black text-white">
      <Seo
        path="/"
        title={lang === "de"
          ? "Rockband München | Last Cats on Earth – Funk & Alternative Rock"
          : "Munich Funk Rock & Alternative Rock Band | Last Cats on Earth"}
        description={lang === "de"
          ? "Last Cats on Earth sind eine Münchner Funk- und Alternative-Rockband für Konzerte, Festivals, Firmenfeiern und Events."
          : "Last Cats on Earth are a Munich funk rock and alternative rock band for live shows, festivals, venues, parties and events."}
      />
      <TopBar scrollToSection={scrollToSection} />

      <SideDotNav
        sectionsConfig={sectionsConfig}
        activeSectionIndex={activeSectionIndex}
        scrollToSection={scrollToSection}
      />

      {/* Scrollable container taking the remaining height (100vh - h-16) */}
      <main ref={containerRef} id="top"
        className="h-[calc(100dvh-4rem)] phone-landscape:h-[calc(100dvh-3rem)] phone-landscape:snap-none w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth overscroll-y-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"      >
        {/* Top Section - No stars */}
        <HeroSection copy={copy} />

        {/* Middle Sections with Star Background */}
        <div
          className="relative bg-repeat"
          style={{ backgroundImage: `url(${starsBg})` }}
        >
          <ShortBioSection copy={copy} />
          <LiveSection copy={copy} setActiveVideoUrl={setActiveVideoUrl} />
          <MusicSection copy={copy} />
        </div>

        {/* Bottom Section - No stars */}
        <FinalCtaSection copy={copy} />
      </main>

      {activeVideoUrl && <VideoOverlay url={activeVideoUrl} onClose={() => setActiveVideoUrl(null)} />}
    </div>
  );
};

export default HomeContent;