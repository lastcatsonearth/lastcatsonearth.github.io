import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/components/booking/LanguageContext";

import BandHeader from "@/components/BandHeader";
import Footer from "@/components/Footer";
import liveStagePhoto from "@/assets/booking/photos/zamanand/1.jpg";
import crowdPhoto from "@/assets/booking/photos/alte_utting/photo_2.png";
import festivalPhoto from "@/assets/booking/photos/zamanand/6.jpg";

type IntentKey = "munich" | "live" | "party" | "events" | "festivals" | "festival";

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

const pageContent: Record<
  IntentKey,
  {
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
  }
> = {
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
  festival: {
    title: "Festival and Venue Rock Band | Last Cats on Earth",
    description:
      "Book Last Cats on Earth for festivals, venues and concert series. A Munich funk rock and alternative rock band with an energetic live show.",
    eyebrow: "For promoters · venues · festivals",
    heading: "A live set that moves with the crowd.",
    intro:
      "Last Cats on Earth are available for festivals, open-air stages, clubs, cultural events and concert series. Our set moves from hard-hitting instrumentals to melodic hooks, rap verses and direct crowd work.",
    points: ["Festival-ready live set", "Club and open-air formats", "Professional booking communication"],
    sectionTitle: "Built for a real stage",
    sectionText:
      "We care about the full show: timing, energy, connection with the audience and fitting the format of your event. Tell us about your stage, date and audience and we will get back to you.",
    image: festivalPhoto,
    imageAlt: "Last Cats on Earth playing a festival show",
    imageCaption: "Made for bigger stages",
    secondImage: liveStagePhoto,
    secondImageAlt: "Last Cats on Earth performing live in Munich",
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
  events: {
    title: "Live Music for Events in Munich | Last Cats on Earth",
    description:
      "Book Last Cats on Earth for events in Munich: a live rock band for company events, cultural events, celebrations and special occasions.",
    eyebrow: "Events · Munich · live music",
    heading: "Give your event a live soundtrack.",
    intro:
      "From company events and cultural programmes to private celebrations, Last Cats on Earth bring a memorable live band experience with personality, movement and a sound that stands out.",
    points: ["Event-ready communication", "Adaptable performance format", "Rock, funk and alternative energy"],
    sectionTitle: "Your event, our live set",
    sectionText:
      "Tell us the date, location and atmosphere you are planning. We will help shape a performance that fits the room, the schedule and the people in it.",
    image: crowdPhoto,
    imageAlt: "Live rock music for an event audience",
    imageCaption: "Made for shared moments",
    secondImage: liveStagePhoto,
    secondImageAlt: "Munich band performing at an event",
  },
  festivals: {
    title: "Munich Rock Band for Festivals | Last Cats on Earth",
    description:
      "Last Cats on Earth are a Munich rock band for festivals, open-air stages and concert programmes, combining funk rock and alternative rock live.",
    eyebrow: "Festivals · open air · live stages",
    heading: "Bring a festival-sized live show.",
    intro:
      "Last Cats on Earth are available for festival stages and open-air programmes in Munich, Bavaria and beyond, with a high-energy set designed to connect quickly with a crowd.",
    points: ["Festival-ready stage presence", "Original music and distinctive covers", "Reliable promoter communication"],
    sectionTitle: "Made for the moment before sunset",
    sectionText:
      "Our set can open a programme, shift the energy between acts or close a stage with a room full of people singing, moving and discovering something new.",
    image: festivalPhoto,
    imageAlt: "Munich rock band playing a festival stage",
    imageCaption: "Festival energy",
    secondImage: crowdPhoto,
    secondImageAlt: "Festival crowd watching Last Cats on Earth",
  },
};

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
      { threshold: 0.2 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

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
  const { lang, setLang } = useLanguage();
  const content = intent === "munich" && lang === "de"
    ? {
      ...pageContent.munich,
      title: "Münchner Rockband für Live-Shows | Last Cats on Earth",
      description: "Last Cats on Earth sind eine Münchner Rockband für Clubs, Konzerte, Festivals, Veranstaltungsorte und Events.",
      eyebrow: "München · Deutschland",
      heading: "Eine Münchner Rockband für echte Live-Räume.",
      intro: "Last Cats on Earth verbinden Hard Rock, Funk, Alternative Rock, Rap und Pop-Rock-Energie zu einem eigenen Live-Set. Wir kommen aus München und sind für Shows in Bayern, Deutschland und darüber hinaus verfügbar.",
    }
    : pageContent[intent];
  const location = useLocation();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const isMunich = intent === "munich";

  const members = lang === "de" && intent === "munich"
    ? [
      ["Tony", "Gesang", "Tony betritt die Bühne, als würde der Raum ihm bereits gehören. Rap und Punk liegen ihm im Blut; mit scharfen Versen, großen Hooks und echtem Frontmann-Instinkt zieht er alle in die Show.", "/images/members/tony.jpg"],
      ["Alessandro", "Gitarre", "Alessandro spielt Gitarre, bei der Gespräche kurz verstummen. Er kann ein legendäres Solo Note für Note liefern und es im nächsten Moment in etwas ganz Eigenes verwandeln.", "/images/members/alessandro.jpg"],
      ["Chris", "Gitarre", "Chris — für seine Leute Chillone — behandelt die Gitarre wie Sampler, Rhythmuswaffe und Stimme zugleich. Hip-Hop-Attitüde, Scratch-Energie und melodischer Instinkt treffen bei ihm aufeinander.", "/images/members/chris.jpg"],
      ["Tim", "Bass", "Tim ist unser Young Gun mit der Superkraft im Tiefton. Er sitzt fest auf dem Schlagzeug, treibt die Gitarren nach vorne und hält die ganze Maschine mit einem unwiderstehlichen Groove in Bewegung.", "/images/members/tim.jpg"],
      ["Tom", "Schlagzeug", "Tom hält nicht einfach nur den Takt — er treibt die Nacht an. Präzise, explosiv und nicht abzuschütteln gibt er jedem Song seinen Puls und jedem Raum einen Grund, sich zu bewegen.", "/images/members/tom.jpg"],
    ]
    : [
      ["Tony", "Vocals", "Tony walks onstage like the room already belongs to him. With rap and punk in his DNA, he turns sharp verses, huge hooks and pure frontman instinct into the spark that pulls everyone into the show.", "/images/members/tony.jpg"],
      ["Alessandro", "Guitar", "Alessandro brings the kind of guitar playing that makes people stop mid-conversation. He can deliver a legendary solo note for note, then twist it into something unmistakably his when the moment calls for it.", "/images/members/alessandro.jpg"],
      ["Chris", "Guitar", "Chris — Chillone to those who know him — treats the guitar like a sampler, a rhythm weapon and a voice all at once. Hip-hop attitude, scratching energy and melodic instinct collide in his playing.", "/images/members/chris.jpg"],
      ["Tim", "Bass", "Tim is the young gun with the low-end superpower. He locks into the drums, pushes the guitars forward and keeps the whole machine moving with a groove that hits before you even realise you are dancing.", "/images/members/tim.jpg"],
      ["Tom", "Drums", "Tom does not simply keep time — he drives the night. Technical, explosive and impossible to shake, he gives every song its pulse and every live room a reason to move.", "/images/members/tom.jpg"],
    ];

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const previousDescription = description?.getAttribute("content");
    const previousCanonical = canonical?.getAttribute("href");

    document.title = content.title;
    description?.setAttribute("content", content.description);
    canonical?.setAttribute("href", `https://lastcatsonearth.de${location.pathname}`);

    return () => {
      document.title = previousTitle;
      if (previousDescription) description?.setAttribute("content", previousDescription);
      if (previousCanonical) canonical?.setAttribute("href", previousCanonical);
    };
  }, [content, location.pathname]);

  return (
    <div className={`min-h-screen text-white ${intentSpacing.page}`}>
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
            <button type="button" onClick={() => setIsNavigationOpen(false)} className="rounded-full border border-white/15 p-2 text-white/60 transition hover:border-cat-orange hover:text-cat-orange" aria-label="Close navigation">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 py-5">
            <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">{lang === "de" ? "Entdecken" : "Explore"}</p>
            <div className="space-y-0">
              {[
                [lang === "de" ? "Start" : "Home", "/"],
                [lang === "de" ? "Musik" : "Music", "/#music"],
                ["EPK", "/booking#contact"],
                ["Links", "/links"],
              ].map(([label, href]) => (
                <Link key={href} to={href} onClick={() => setIsNavigationOpen(false)} className="block border-b border-white/5 py-2 text-lg font-bold tracking-wide text-white/80 transition hover:pl-2 hover:text-cat-orange">{label}</Link>
              ))}
            </div>
          </div>
          <p className="border-t border-white/10 pt-5 text-[10px] uppercase leading-tight tracking-[0.2em] text-white/30">Original music<br />live shows</p>
        </aside>
        <button type="button" aria-label="Open navigation" aria-expanded={isNavigationOpen} onClick={() => setIsNavigationOpen((open) => !open)} className={`pointer-events-auto absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-cat-orange bg-cat-orange text-black shadow-lg shadow-cat-orange/20 transition hover:border-white hover:bg-white sm:left-8 sm:top-8 ${isNavigationOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}>
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
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-cat-orange">{lang === "de" ? "München · Deutschland" : "Munich · Germany"}</p>
                </div>
                <div className={`absolute z-10 flex items-center gap-1 rounded-full border border-white/20 bg-black/50 p-1 text-[9px] font-black uppercase tracking-[0.18em] backdrop-blur-md ${intentSpacing.languageToggle}`}>
                  <button type="button" onClick={() => setLang("en")} className={`rounded-full px-3 py-1.5 transition ${lang === "en" ? "bg-cat-orange text-black" : "text-white/60 hover:text-white"}`}>EN</button>
                  <button type="button" onClick={() => setLang("de")} className={`rounded-full px-3 py-1.5 transition ${lang === "de" ? "bg-cat-orange text-black" : "text-white/60 hover:text-white"}`}>DE</button>
                </div>
              </>
            )}
            <div className={isMunich ? "relative max-w-3xl" : ""}>
              <p className="text-[11px] uppercase tracking-[0.8em] text-cat-orange">{content.eyebrow}</p>
              <h1 className={`${intentSpacing.heroTitle} font-black uppercase tracking-tight ${isMunich ? "max-w-4xl text-5xl leading-[0.95] sm:text-7xl sm:leading-[0.9] lg:text-8xl" : "text-3xl leading-[0.9] sm:text-5xl"}`}>
                {content.heading}
              </h1>
              <p className={`${intentSpacing.heroIntro} text-sm leading-7 ${isMunich ? "max-w-2xl text-white/75 sm:text-base" : "mx-auto max-w-xl text-white/60"}`}>{content.intro}</p>
              <Link
                to="/booking#contact"
                className={`${intentSpacing.heroBooking} inline-flex items-center gap-2 rounded-full bg-cat-orange px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition hover:bg-white`}
              >
                {lang === "de" ? "Booking starten" : "Go to booking"} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </header>

          {!isMunich && <section className={`border-b border-white/10 ${intentSpacing.contentSection}`} aria-labelledby="fit-heading">
            <div className={`grid items-center sm:grid-cols-[1.05fr_0.95fr] ${intentSpacing.sectionGrid}`}>
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-cat-orange">Why the Cats</p>
                <h2 id="fit-heading" className={`${intentSpacing.sectionHeading} text-2xl font-bold tracking-wide`}>
                  Made to be felt.
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
          </section>}

          {!isMunich && <section className={intentSpacing.contentSection} aria-labelledby="details-heading">
            <div className={`grid items-center sm:grid-cols-[0.95fr_1.05fr] ${intentSpacing.sectionGrid}`}>
              <FlyingImage
                src={content.secondImage}
                alt={content.secondImageAlt}
                caption="No two shows feel the same"
                direction="left"
              />
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-cat-orange">The live experience</p>
                <h2 id="details-heading" className={`${intentSpacing.sectionHeading} text-2xl font-bold tracking-wide`}>
                  {content.sectionTitle}
                </h2>
                <p className={`${intentSpacing.sectionBody} text-sm leading-7 text-white/60`}>{content.sectionText}</p>
                <Link
                  to="/booking#contact"
                  className={`${intentSpacing.sectionLink} inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cat-orange transition hover:text-white`}
                >
                  See live videos and booking details <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>}

          {isMunich && (
            <section id="lineup" className={`border-t border-white/10 ${intentSpacing.lineupSection}`} aria-labelledby="lineup-heading">
              <p className="text-[11px] uppercase tracking-[0.28em] text-cat-orange">{lang === "de" ? "Die Menschen hinter dem Sound" : "The people behind the sound"}</p>
              <h2 id="lineup-heading" className={`${intentSpacing.sectionHeading} text-3xl font-bold tracking-wide sm:text-5xl`}>{lang === "de" ? "Lerne die Cats kennen." : "Meet the Cats."}</h2>
              <div className={intentSpacing.lineupList}>
                {members.map(([name, role, bio], index) => {
                  const photo = members[index][3];
                  const imageFirst = index % 2 === 0;
                  return (
                    <article key={name} className={`grid items-center border-b border-white/10 ${intentSpacing.memberRow} ${imageFirst ? "sm:grid-cols-[240px_minmax(0,1fr)]" : "sm:grid-cols-[minmax(0,1fr)_240px]"}`}>
                      {imageFirst ? (
                        <>
                          <img src={photo} alt={`${name}, ${role}`} className="order-1 aspect-square w-44 rounded-full border border-cat-orange/50 object-cover sm:w-56 sm:justify-self-start" />
                          <div className="order-2"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cat-orange">{role}</p><h3 className={`${intentSpacing.memberName} text-2xl font-bold`}>{name}</h3><p className={`${intentSpacing.memberBio} text-sm leading-7 text-white/60`}>{bio}</p></div>
                        </>
                      ) : (
                        <>
                          <img src={photo} alt={`${name}, ${role}`} className="order-1 aspect-square w-44 rounded-full border border-cat-orange/50 object-cover sm:order-2 sm:w-56 sm:justify-self-end" />
                          <div className="order-2 sm:order-1"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cat-orange">{role}</p><h3 className={`${intentSpacing.memberName} text-2xl font-bold`}>{name}</h3><p className={`${intentSpacing.memberBio} text-sm leading-7 text-white/60`}>{bio}</p></div>
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

const IntentPage = ({ intent }: { intent: IntentKey }) => (
  <LanguageProvider>
    <IntentPageContent intent={intent} />
  </LanguageProvider>
);

export default IntentPage;
