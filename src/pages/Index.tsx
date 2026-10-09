import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, Menu, Play, X, Instagram, Youtube } from "lucide-react";
import { FaApple, FaFacebook, FaSpotify, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

import Footer from "@/components/Footer";
import AudioPlayer from "@/components/booking/AudioPlayer";
import { LanguageProvider, useLanguage } from "@/components/booking/LanguageContext";
import heroPhoto from "@/assets/booking/photos/zamanand/1.jpg";
import crowdPhoto from "@/assets/booking/photos/zamanand/6.jpg";

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
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
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
        lineup: "Die Cats kennenlernen",
        lineupLabel: "Die Besetzung",
        lineupSuffix: "Ein lauter Raum.",
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
        lineup: "Meet the Cats.",
        lineupLabel: "The lineup",
        lineupSuffix: "One loud room.",
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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsNavigationOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
      <div className="min-h-screen overflow-hidden text-white">
        <nav className="fixed inset-0 z-40 pointer-events-none" aria-label="Homepage navigation">
          <div
            className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${isNavigationOpen ? "pointer-events-auto opacity-100" : "opacity-0"}`}
            onClick={() => setIsNavigationOpen(false)}
            aria-hidden="true"
          />
          <aside
            id="homepage-menu"
            className={`absolute left-0 top-0 flex h-full w-[min(78vw,240px)] flex-col overflow-hidden border-r border-white/15 bg-[#080808]/95 px-4 py-5 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out sm:px-5 ${isNavigationOpen ? "pointer-events-auto translate-x-0" : "-translate-x-full"}`}
            aria-hidden={!isNavigationOpen}
          >
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <p className="-translate-x-1 text-lg font-black uppercase leading-[0.9] tracking-tight text-white">Last Cats<br /><span className="text-cat-orange">on Earth</span></p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">Munich · Germany</p>
              </div>
              <button type="button" onClick={() => setIsNavigationOpen(false)} className="rounded-full border border-white/15 p-2 text-white/60 transition hover:border-cat-orange hover:text-cat-orange" aria-label="Close navigation">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 py-5">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">{copy.exploreLabel}</p>
              <div className="space-y-0">
                {[
                  ["Home", "#top"],
                  ["Music", "#music"],
                  ["EPK", "/booking#contact"],
                  ["Links", "/links"],
                ].map(([label, href], index) => (
                  href.startsWith("#") ? (
                  <a key={href} href={href} onClick={() => setIsNavigationOpen(false)} className="block border-b border-white/5 py-2 text-lg font-bold tracking-wide text-white/80 transition hover:pl-2 hover:text-cat-orange">{copy.menu[index]}</a>
                  ) : href.startsWith("http") ? (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" onClick={() => setIsNavigationOpen(false)} className="block border-b border-white/5 py-2.5 text-lg font-bold tracking-wide text-white/80 transition hover:pl-2 hover:text-cat-orange">{label}</a>
                  ) : (
                    <Link key={href} to={href} onClick={() => setIsNavigationOpen(false)} className="block border-b border-white/5 py-2 text-lg font-bold tracking-wide text-white/80 transition hover:pl-2 hover:text-cat-orange">{copy.menu[index]}</Link>
                  )
                ))}
              </div>

              <p className="mb-2 mt-5 text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">{copy.workLabel}</p>
              <div className="space-y-0">
                <Link to="/booking#contact" onClick={() => setIsNavigationOpen(false)} className="flex items-center justify-between rounded-xl bg-cat-orange px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:bg-white">
                  {copy.bookLabel} <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>

              <p className="mb-2 mt-5 text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">{copy.followLabel}</p>
              <div className="flex flex-wrap items-center gap-1">
                {[
                  ["Instagram", "https://www.instagram.com/lastcatsonearth/", <Instagram className="h-5 w-5" />],
                  ["YouTube", "https://www.youtube.com/@lastcatsonearth", <Youtube className="h-5 w-5" />],
                  ["Facebook", "https://www.facebook.com/lastcatsonearth", <FaFacebook className="h-5 w-5" />],
                  ["TikTok", "https://www.tiktok.com/@lastcatsonearthband", <FaTiktok className="h-5 w-5" />],
                  ["Spotify", "https://open.spotify.com/intl-it/artist/2nW6fmoJwCEknAfAVhmGwa", <FaSpotify className="h-5 w-5" />],
                  ["Apple Music", "https://music.apple.com/at/artist/last-cats-on-earth/1887321356", <FaApple className="h-5 w-5" />],
                  ["Contact", "mailto:contact@lastcatsonearth.de", <Mail className="h-5 w-5" />],
                ].map(([label, href, icon]) => (
                  <a key={label as string} href={href as string} target={href?.toString().startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" aria-label={label as string} title={label as string} className="flex h-11 w-11 items-center justify-center text-cat-orange transition hover:scale-110 hover:brightness-125">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            <p className="border-t border-white/10 pt-5 text-[10px] uppercase leading-tight tracking-[0.2em] text-white/30">Original music<br />live shows</p>
          </aside>
          <button type="button" aria-label="Open navigation" aria-expanded={isNavigationOpen} aria-controls="homepage-menu" onClick={() => setIsNavigationOpen((open) => !open)} className={`absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-cat-orange bg-cat-orange text-black shadow-lg shadow-cat-orange/20 transition hover:border-white hover:bg-white sm:left-8 sm:top-8 ${isNavigationOpen ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"}`}>
            <Menu className="h-5 w-5" />
          </button>
        </nav>

        <main id="top">
          <section className="relative isolate flex min-h-[88vh] items-end overflow-hidden px-5 pb-12 pt-24 sm:px-10 sm:pb-16">
            <img src={heroPhoto} alt="Last Cats on Earth performing live in Munich" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/55 to-black/10" />
            <div className="absolute inset-0 -z-10 bg-cat-orange/10 mix-blend-screen" />
            <div className="absolute inset-x-5 top-20 z-10 mx-auto flex max-w-6xl flex-col items-start gap-1 sm:inset-x-10 sm:top-16">
              <span className="text-lg font-black uppercase tracking-tight text-white">Last Cats <span className="text-cat-orange">on Earth</span></span>
              <span className="text-left text-[10px] font-bold uppercase tracking-[0.22em] text-cat-orange">Munich · Germany</span>
            </div>
            <div className="absolute right-5 top-5 z-10 flex items-center gap-1 rounded-full border border-white/20 bg-black/50 p-1 text-[9px] font-black uppercase tracking-[0.18em] backdrop-blur-md sm:right-10">
              <button type="button" onClick={() => setLang("en")} className={`rounded-full px-3 py-1.5 transition ${lang === "en" ? "bg-cat-orange text-black" : "text-white/60 hover:text-white"}`}>EN</button>
              <button type="button" onClick={() => setLang("de")} className={`rounded-full px-3 py-1.5 transition ${lang === "de" ? "bg-cat-orange text-black" : "text-white/60 hover:text-white"}`}>DE</button>
            </div>
            <div className="relative mx-auto w-full max-w-6xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-cat-orange sm:mb-0">{copy.kicker}</p>
              <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.88] tracking-tight sm:text-7xl lg:text-9xl">
                {copy.hero.includes(" ") ? <>{copy.hero.split(" ")[0]} <span className="text-cat-orange">{copy.hero.split(" ").slice(1).join(" ")}</span></> : copy.hero}
              </h1>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link to="/booking#contact" className="inline-flex w-fit items-center gap-2 rounded-full bg-cat-orange px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition hover:scale-105 hover:bg-white">
                  {copy.booking} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          <section id="short-bio" className="scroll-mt-6 border-y border-white/10 bg-black/40 px-5 py-16 sm:px-10 sm:py-24">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <Reveal>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-cat-orange">{copy.shortLabel}</p>
                <h2 className="mt-4 text-4xl font-bold uppercase leading-none sm:text-6xl" dangerouslySetInnerHTML={{ __html: copy.short }} />
              </Reveal>
              <Reveal>
                <p className="max-w-2xl text-justify text-lg leading-8 text-white/70 sm:text-xl">
                  {copy.shortBody}
                </p>
                <Link to="/munich-rock-band" className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cat-orange hover:text-white">
                  Meet the Cats <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
          </section>

          <section id="live" className="px-5 py-16 sm:px-10 sm:py-24">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-cat-orange">{copy.liveLabel}</p>
                    <h2 className="mt-3 text-4xl font-bold uppercase leading-none sm:text-6xl">{copy.live}</h2>
                  </div>
                  <Link to="/music" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-cat-orange">{copy.liveLink} <ArrowUpRight className="h-4 w-4" /></Link>
                </div>
                <button type="button" onClick={() => setActiveVideoUrl("https://www.youtube.com/embed/dWhzsrdGyko?autoplay=1")} className="group relative block w-full overflow-hidden rounded-3xl border border-white/10 text-left">
                  <img src={crowdPhoto} alt="Audience watching Last Cats on Earth live" className="h-[360px] w-full object-cover sm:h-[520px]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] sm:bottom-10 sm:left-10">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cat-orange text-black transition group-hover:scale-110"><Play className="ml-0.5 h-4 w-4 fill-current" /></span>
                    Live energy, Munich and beyond
                  </div>
                </button>
              </Reveal>
            </div>
          </section>

          <section id="music" className="px-5 py-16 sm:px-10 sm:py-24">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <Reveal>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-cat-orange">{copy.releaseLabel}</p>
                <h2 className="mt-3 text-4xl font-bold uppercase leading-none sm:text-6xl">{copy.release}</h2>
                <p className="mt-6 max-w-xl text-justify leading-7 text-white/60">{copy.releaseBody}</p>
                <Link to="/booking#contact" className="mt-6 inline-flex items-center gap-2 rounded-full border border-cat-orange px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-cat-orange hover:bg-cat-orange hover:text-black">{copy.booking} <ArrowUpRight className="h-4 w-4" /></Link>
              </Reveal>
              <Reveal><AudioPlayer compact /></Reveal>
            </div>
          </section>

          <section className="relative overflow-hidden bg-cat-orange px-5 py-20 text-black sm:px-10 sm:py-28">
            <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em]">{copy.stageLabel}</p>
                <h2 className="mt-3 max-w-3xl text-5xl font-black uppercase leading-[0.88] sm:text-8xl">{copy.stageHeading}</h2>
              </div>
              <Link to="/booking#contact" className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black">{copy.stageCta} <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </section>
        </main>
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-10"><Footer /></div>
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
