import { useEffect, useRef, useState } from "react";
import { LanguageProvider, useLanguage } from "@/components/booking/LanguageContext";

import { TopBar } from "@/components/home/TopBar";
import { SideDotNav } from "@/components/home/SideDotNav";

import { HeroSection } from "@/components/home/sections/HeroSection";
import { ShortBioSection } from "@/components/home/sections/ShortBioSection";
import { LiveSection } from "@/components/home/sections/LiveSection";
import { MusicSection } from "@/components/home/sections/MusicSection";
import { FinalCtaSection } from "@/components/home/sections/FinalCtaSection";
import starsBg from "@/assets/stars_background.png";

const Reveal = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`home-reveal ${visible ? "home-reveal-visible" : ""}`}>{children}</div>;
};

const HomeContent = () => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { lang, setLang } = useLanguage();

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

  const membersRow1: [string, string, string][] = lang === "de"
    ? [
      ["Tony", "Gesang", "/images/members/tony.jpg"],
      ["Alessandro", "Gitarre", "/images/members/alessandro.jpg"],
    ]
    : [
      ["Tony", "Vocals", "/images/members/tony.jpg"],
      ["Alessandro", "Guitar", "/images/members/alessandro.jpg"],
    ];

  const membersRow2: [string, string, string][] = lang === "de"
    ? [
      ["Chris", "Gitarre", "/images/members/chris.jpg"],
      ["Tim", "Bass", "/images/members/tim.jpg"],
      ["Tom", "Schlagzeug", "/images/members/tom.jpg"],
    ]
    : [
      ["Chris", "Guitar", "/images/members/chris.jpg"],
      ["Tim", "Bass", "/images/members/tim.jpg"],
      ["Tom", "Drums", "/images/members/tom.jpg"],
    ];

  const sectionsConfig = [
    { id: "hero-section", label: "Hero" },
    { id: "short-bio", label: "Short Bio" },
    { id: "live", label: "Live" },
    { id: "music", label: "Music" },
    { id: "final-cta", label: "Contact & Footer" },
  ];

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");
    document.title = "Munich Funk Rock & Alternative Rock Band | Last Cats on Earth";
    description?.setAttribute(
      "content",
      "Last Cats on Earth are a Munich funk rock and alternative rock band for live shows, festivals, venues, parties and events."
    );
    return () => {
      document.title = previousTitle;
      if (previousDescription) description?.setAttribute("content", previousDescription);
    };
  }, []);

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
  }, [sectionsConfig]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-black text-white">
      <TopBar
        lang={lang}
        setLang={setLang}
        scrollToSection={scrollToSection}
      />

      <SideDotNav
        sectionsConfig={sectionsConfig}
        activeSectionIndex={activeSectionIndex}
        scrollToSection={scrollToSection}
      />

      {/* Scrollable container taking the remaining height (100vh - h-16) */}
      <main ref={containerRef} id="top" className="h-[calc(100dvh-4rem)] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth overscroll-y-none">
        {/* Top Section - No stars */}
        <HeroSection copy={copy} />

        {/* Middle Sections with Star Background */}
        <div
          className="relative bg-repeat"
          style={{ backgroundImage: `url(${starsBg})` }}
        >
          <ShortBioSection copy={copy} membersRow1={membersRow1} membersRow2={membersRow2} Reveal={Reveal} />
          <LiveSection copy={copy} setActiveVideoUrl={setActiveVideoUrl} Reveal={Reveal} />
          <MusicSection copy={copy} Reveal={Reveal} />
        </div>

        {/* Bottom Section - No stars */}
        <FinalCtaSection copy={copy} />
      </main>

      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4" onClick={() => setActiveVideoUrl(null)}>
          <button
            type="button"
            className="absolute right-6 top-6 z-10 p-2 text-3xl text-white/60 hover:text-white"
            onClick={() => setActiveVideoUrl(null)}
            aria-label="Close video"
          >
            ×
          </button>
          <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-black" onClick={(event) => event.stopPropagation()}>
            <iframe
              className="h-full w-full"
              src={activeVideoUrl}
              title="Last Cats on Earth live video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

const Index = () => (
  <LanguageProvider>
    <HomeContent />
  </LanguageProvider>
);

export default Index;