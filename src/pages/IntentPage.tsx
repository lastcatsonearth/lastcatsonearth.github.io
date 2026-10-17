import { useState } from "react";
import { ArrowUpRight, Check, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage, useLocalePath } from "@/i18n/LanguageContext";
import LangToggle from "@/components/LangToggle";
import { members } from "@/content/members";
import { useInView } from "@/hooks/useInView";
import { Seo } from "@/components/Seo";

import BandHeader from "@/components/BandHeader";
import Footer from "@/components/Footer";
import liveStagePhoto from "@/assets/booking/photos/zamanand/1.webp";
import crowdPhoto from "@/assets/booking/photos/alte_utting/photo_2.webp";
import festivalPhoto from "@/assets/booking/photos/zamanand/6.webp";

type IntentKey = "munich" | "live" | "party";

const intentPath: Record<IntentKey, string> = {
  munich: "/munich-rock-band",
  live: "/live-band-munich",
  party: "/party-band-munich",
};

// Adjust the intent-page layout here. Each value is a Tailwind class so desktop
// and mobile spacing can be tuned independently without searching the JSX.
const intentSpacing = {
  page: "px-2 py-6 sm:px-6 sm:py-10",
  main: "p-3 sm:p-6",
  article: "px-2 pb-10",
  munichHero: "min-h-[72vh] px-6 pb-10 pt-28 sm:min-h-[78vh] sm:px-12 sm:pb-14",
  standardHero: "pb-10",
  heroTitle: "mt-4",
  heroIntro: "mt-5",
  heroBooking: "mt-7",
  contentSection: "py-10",
  lineupSection: "py-12",
  lineupList: "mt-10 space-y-12 sm:space-y-16",
  memberRow: "gap-7 pb-10 sm:gap-12",
  memberName: "mt-2",
  memberBio: "mt-3",
  sectionGrid: "gap-8",
  sectionHeading: "mt-3",
  sectionBody: "mt-4",
  sectionLink: "mt-6",
  pointsList: "mt-6 space-y-4",
  heroBrand: "left-6 top-20 sm:left-12 sm:top-24",
  languageToggle: "left-6 top-6 sm:left-12 sm:top-10",
} as const;

type PageContent = {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  points: string[];
  sectionTitle: string;
  sectionText: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  secondImage: string;
  secondImageAlt: string;
};

const pageContent: Record<IntentKey, PageContent> = {
  munich: {
    title: "Munich Rock Band for Live Shows | Last Cats on Earth",
    description:
      "Last Cats on Earth are a Munich rock band playing energetic funk rock and alternative rock for clubs, concerts, festivals, venues and events.",
    eyebrow: "",
    heading: "A Munich rock band built for live rooms.",
    intro:
      "Last Cats on Earth combine hard rock, funk, alternative rock, rap and pop-rock energy into an original live set. We are based in Munich and available for shows across Bavaria, Germany and beyond.",
    points: ["Original music and reworked covers", "High-energy live performance", "Flexible set for clubs and events"],
    sectionTitle: "From Munich to your stage",
    sectionText:
      "Whether you are booking a club night, a concert series or a local showcase, we bring a focused, adaptable performance and a sound that keeps the room moving.",
    image: liveStagePhoto,
    imageAlt: "Last Cats on Earth performing on stage",
    imageCaption: "Live from Munich",
    secondImage: crowdPhoto,
    secondImageAlt: "Last Cats on Earth performing for a live audience",
  },
  party: {
    title: "Rock Band for Parties and Events in Munich | Last Cats on Earth",
    description:
      "Book a Munich rock band for parties, private events, company events and celebrations. Last Cats on Earth bring funk rock and alternative rock live.",
    eyebrow: "For parties · events · collaborations",
    heading: "Make the event sound like nothing else.",
    intro:
      "Looking for live music with personality? Last Cats on Earth bring an energetic mix of funk rock, alternative rock and original songs to private parties, company events, celebrations and creative collaborations.",
    points: ["Energetic, memorable performance", "Originals and distinctive covers", "Direct communication with the band"],
    sectionTitle: "Tell us what you are planning",
    sectionText:
      "Share the event, location, date and the atmosphere you want to create. We can then talk through the right set-up and availability.",
    image: crowdPhoto,
    imageAlt: "Last Cats on Earth playing for a live audience",
    imageCaption: "Make it a night",
    secondImage: festivalPhoto,
    secondImageAlt: "Last Cats on Earth playing an outdoor event",
  },
  live: {
    title: "Live Band Munich | Live Rock Music for Events",
    description:
      "Last Cats on Earth are a live band from Munich playing energetic rock, funk and alternative live music for events, clubs and concerts.",
    eyebrow: "Live music · Munich",
    heading: "Live music with a pulse of its own.",
    intro:
      "Last Cats on Earth bring a dynamic live rock show from Munich to clubs, concert series, festivals and events. Expect original songs, reworked covers and a set built to move.",
    points: ["Live rock energy from Munich", "Flexible club and event set", "Originals with unexpected turns"],
    sectionTitle: "A band that keeps the room moving",
    sectionText:
      "Our live show shifts between hard rock, funk, alternative rock and rap-influenced moments, giving audiences a performance with real contrast and momentum.",
    image: liveStagePhoto,
    imageAlt: "Munich live band Last Cats on Earth on stage",
    imageCaption: "Live from Munich",
    secondImage: festivalPhoto,
    secondImageAlt: "Last Cats on Earth playing live outdoors",
  },
};

// Only "munich" has a German version for now. live/party stay English
// (and noindex under /de) until translated.
const germanContent: Partial<Record<IntentKey, Partial<PageContent>>> = {
  munich: {
    title: "Rockband München für Live-Shows | Last Cats on Earth",
    description:
      "Last Cats on Earth sind eine Münchner Rockband für Clubs, Konzerte, Festivals, Veranstaltungsorte und Events.",
    eyebrow: "",
    heading: "Eine Münchner Rockband für echte Live-Räume.",
    intro:
      "Last Cats on Earth verbinden Hard Rock, Funk, Alternative Rock, Rap und Pop-Rock-Energie zu einem eigenen Live-Set. Wir kommen aus München und sind für Shows in Bayern, Deutschland und darüber hinaus verfügbar.",
  },
};

const labels = {
  en: {
    explore: "Explore",
    home: "Home",
    music: "Music",
    tagline: ["Original music", "live shows"],
    whyCats: "Why the Cats",
    madeToBeFelt: "Made to be felt.",
    liveExperience: "The live experience",
    noTwoShows: "No two shows feel the same",
    seeVideos: "See live videos and booking details",
    booking: "Go to booking",
    peopleBehind: "The people behind the sound",
    meetCats: "Meet the Cats.",
    openNav: "Open navigation",
    closeNav: "Close navigation",
  },
  de: {
    explore: "Entdecken",
    home: "Start",
    music: "Musik",
    tagline: ["Eigene Musik", "Live-Shows"],
    whyCats: "Warum die Cats",
    madeToBeFelt: "Gemacht, um gespürt zu werden.",
    liveExperience: "Das Live-Erlebnis",
    noTwoShows: "Keine Show gleicht der anderen",
    seeVideos: "Live-Videos und Booking-Infos ansehen",
    booking: "Booking starten",
    peopleBehind: "Die Menschen hinter dem Sound",
    meetCats: "Lerne die Cats kennen.",
    openNav: "Navigation öffnen",
    closeNav: "Navigation schließen",
  },
} as const;

const FlyingImage = ({
  src,
  alt,
  caption,
  direction = "left",
}: {
  src: string;
  alt: string;
  caption: string;
  direction?: "left" | "right";
}) => {
  const { ref, inView: visible } = useInView<HTMLElement>(0.2);

  return (
    <figure
      ref={ref}
      className={`intent-image intent-image-${direction} ${visible ? "intent-image-visible" : ""}`}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      <figcaption className="absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
        {caption}
      </figcaption>
    </figure>
  );
};

const IntentPageContent = ({ intent }: { intent: IntentKey }) => {
  const p = useLocalePath();
  const { lang } = useLanguage();
  const t = labels[lang];
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const isMunich = intent === "munich";

  const content: PageContent = {
    ...pageContent[intent],
    ...(lang === "de" ? germanContent[intent] : undefined),
  };

  const navItems: [string, string][] = [
    [t.home, p("/")],
    [t.music, p("/#music")],
    ["EPK", p("/booking#contact")],
    ["Links", p("/links")],
  ];

  return (
    <div className={`min-h-screen text-white ${intentSpacing.page}`}>
      <Seo
        path={intentPath[intent]}
        title={content.title}
        description={content.description}
        noindex={lang === "de" && intent !== "munich"}
      />

      <nav className="fixed inset-0 z-40 pointer-events-none" aria-label="Site navigation">
        <div
          className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${isNavigationOpen ? "pointer-events-auto opacity-100" : "opacity-0"}`}
          onClick={() => setIsNavigationOpen(false)}
          aria-hidden="true"
        />
        <aside
          className={`absolute left-0 top-0 flex h-full w-[min(78vw,240px)] flex-col overflow-hidden border-r border-white/15 bg-[#080808]/95 px-4 py-5 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out sm:px-5 ${isNavigationOpen ? "pointer-events-auto translate-x-0" : "-translate-x-full"}`}
          aria-hidden={!isNavigationOpen}
        >
          <div className="flex items-start justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-lg font-black uppercase leading-[0.9] tracking-tight text-white">Last Cats<br /><span className="text-cat-orange">on Earth</span></p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">Munich · Germany</p>
            </div>
            <button type="button" onClick={() => setIsNavigationOpen(false)} className="rounded-full border border-white/15 p-2 text-white/60 transition hover:border-cat-orange hover:text-cat-orange" aria-label={t.closeNav}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 py-5">
            <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">{t.explore}</p>
            <div className="space-y-0">
              {navItems.map(([label, href]) => (
                <Link key={href} to={href} onClick={() => setIsNavigationOpen(false)} className="block border-b border-white/5 py-2 text-lg font-bold tracking-wide text-white/80 transition hover:pl-2 hover:text-cat-orange">{label}</Link>
              ))}
            </div>
            <LangToggle className="mt-6 w-fit" padding="px-3 py-1.5" />
          </div>
          <p className="border-t border-white/10 pt-5 text-[10px] uppercase leading-tight tracking-[0.2em] text-white/30">{t.tagline[0]}<br />{t.tagline[1]}</p>
        </aside>
        <button type="button" aria-label={t.openNav} aria-expanded={isNavigationOpen} onClick={() => setIsNavigationOpen((open) => !open)} className={`pointer-events-auto absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-cat-orange bg-cat-orange text-black shadow-lg shadow-cat-orange/20 transition hover:border-white hover:bg-white sm:left-8 sm:top-8 ${isNavigationOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}>
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      <main className={`mx-auto rounded-3xl backdrop-blur-sm ${intentSpacing.main} ${isMunich ? "max-w-5xl border-0 bg-transparent" : "max-w-3xl border border-white/10 bg-white/5"}`}>
        {!isMunich && <BandHeader linkToHome />}

        <article className={`mx-auto ${intentSpacing.article} ${isMunich ? "max-w-4xl" : "max-w-2xl"}`}>
          <header className={`relative isolate overflow-hidden border-b border-white/10 ${isMunich ? `flex items-end rounded-3xl text-left ${intentSpacing.munichHero}` : `text-center ${intentSpacing.standardHero}`}`}>
            {isMunich && (
              <>
                <img src={liveStagePhoto} alt="Last Cats on Earth performing live in Munich" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/60 to-black/15" />
                <div className="absolute inset-0 -z-10 bg-cat-orange/15 mix-blend-screen" />
                <div className={`absolute z-10 text-left ${intentSpacing.heroBrand}`}>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Last Cats on Earth</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.3em] text-cat-orange">Munich · Germany</p>
                </div>
                <LangToggle className={`absolute z-10 ${intentSpacing.languageToggle}`} padding="px-3 py-1.5" />
              </>
            )}
            <div className={isMunich ? "relative max-w-3xl" : ""}>
              {content.eyebrow && (
                <p className="text-[11px] uppercase tracking-[0.8em] text-cat-orange">{content.eyebrow}</p>
              )}
              <h1 className={`${intentSpacing.heroTitle} font-black uppercase leading-[0.9] tracking-tight ${isMunich ? "max-w-4xl text-5xl sm:text-7xl lg:text-8xl" : "text-3xl sm:text-5xl"}`}>
                {content.heading}
              </h1>
              <p className={`${intentSpacing.heroIntro} text-sm leading-7 ${isMunich ? "max-w-2xl text-white/75 sm:text-base" : "mx-auto max-w-xl text-white/60"}`}>{content.intro}</p>
              <Link
                to={p("/booking#contact")}
                className={`${intentSpacing.heroBooking} inline-flex items-center gap-2 rounded-full bg-cat-orange px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition hover:bg-white`}
              >
                {t.booking} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </header>

          {!isMunich && (
            <section className={`border-b border-white/10 ${intentSpacing.contentSection}`} aria-labelledby="fit-heading">
              <div className={`grid items-center sm:grid-cols-[1.05fr_0.95fr] ${intentSpacing.sectionGrid}`}>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-cat-orange">{t.whyCats}</p>
                  <h2 id="fit-heading" className={`${intentSpacing.sectionHeading} text-2xl font-bold tracking-wide`}>
                    {t.madeToBeFelt}
                  </h2>
                  <ul className={intentSpacing.pointsList}>
                    {content.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-sm text-white/70">
                        <Check className="h-4 w-4 shrink-0 text-cat-orange" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <FlyingImage
                  src={content.image}
                  alt={content.imageAlt}
                  caption={content.imageCaption}
                  direction="right"
                />
              </div>
            </section>
          )}

          {!isMunich && (
            <section className={intentSpacing.contentSection} aria-labelledby="details-heading">
              <div className={`grid items-center sm:grid-cols-[0.95fr_1.05fr] ${intentSpacing.sectionGrid}`}>
                <FlyingImage
                  src={content.secondImage}
                  alt={content.secondImageAlt}
                  caption={t.noTwoShows}
                  direction="left"
                />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-cat-orange">{t.liveExperience}</p>
                  <h2 id="details-heading" className={`${intentSpacing.sectionHeading} text-2xl font-bold tracking-wide`}>
                    {content.sectionTitle}
                  </h2>
                  <p className={`${intentSpacing.sectionBody} text-sm leading-7 text-white/60`}>{content.sectionText}</p>
                  <Link
                    to={p("/booking#contact")}
                    className={`${intentSpacing.sectionLink} inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cat-orange transition hover:text-white`}
                  >
                    {t.seeVideos} <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          )}

          {isMunich && (
            <section id="lineup" className={`border-t border-white/10 ${intentSpacing.lineupSection}`} aria-labelledby="lineup-heading">
              <p className="text-[11px] uppercase tracking-[0.28em] text-cat-orange">{t.peopleBehind}</p>
              <h2 id="lineup-heading" className={`${intentSpacing.sectionHeading} text-3xl font-bold tracking-wide sm:text-5xl`}>{t.meetCats}</h2>
              <div className={intentSpacing.lineupList}>
                {members.map(({ name, photo, role: roles, bio: bios }, index) => {
                  const role = roles[lang];
                  const bio = bios[lang];
                  const imageFirst = index % 2 === 0;
                  const text = (order: string) => (
                    <div className={order}>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cat-orange">{role}</p>
                      <h3 className={`${intentSpacing.memberName} text-2xl font-bold`}>{name}</h3>
                      <p className={`${intentSpacing.memberBio} text-sm leading-7 text-white/60`}>{bio}</p>
                    </div>
                  );
                  const image = (order: string, justify: string) => (
                    <img
                      src={photo}
                      alt={`${name}, ${role}`}
                      loading="lazy"
                      className={`${order} aspect-square w-44 rounded-full border border-cat-orange/50 object-cover sm:w-56 ${justify}`}
                    />
                  );
                  return (
                    <article key={name} className={`grid items-center border-b border-white/10 ${intentSpacing.memberRow} ${imageFirst ? "sm:grid-cols-[240px_minmax(0,1fr)]" : "sm:grid-cols-[minmax(0,1fr)_240px]"}`}>
                      {imageFirst ? (
                        <>
                          {image("order-1", "sm:justify-self-start")}
                          {text("order-2")}
                        </>
                      ) : (
                        <>
                          {text("order-1")}
                          {image("order-2", "sm:justify-self-end")}
                        </>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          )}
        </article>

        <Footer />
      </main>
    </div>
  );
};

export default IntentPageContent;