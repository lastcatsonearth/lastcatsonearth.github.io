import type { ReactNode } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import { useLanguage, useLocalePath } from "@/i18n/LanguageContext";
import { Seo } from "@/components/Seo";
import LangToggle from "@/components/LangToggle";
import { EMAIL, socials } from "@/config/site";
import heroPhoto from "@/assets/booking/photos/zamanand/1.webp";
import starsBg from "@/assets/stars_background.webp";
import releaseCover from "@/assets/booking/music/never_stop/never_stop.webp";
import favicon from "@/assets/favicon.webp";
// TODO: add this file yourself (portrait flyer, ~400px wide, webp). The build fails until it exists.
import nextShowFlyer from "@/assets/flyers/maerchenbazar-2026-11-28.webp";

import type { Lang } from "@/i18n/LanguageContext";
type Bilingual = Record<Lang, string>;

// ---------------------------------------------------------------
// EDIT HERE. Update these two when something new happens.
// ---------------------------------------------------------------
const nextShow: { title: Bilingual; href: string } = {
  title: { en: "Märchenbazar · 28 Nov", de: "Märchenbazar · 28. Nov." },
  // TODO: paste the Bandsintown event URL here (https://www.bandsintown.com/e/...)
  href: "https://www.bandsintown.com/",
};

const latestRelease: { title: string; href: string } = {
  title: "NEVER STOP",
  href: "https://open.spotify.com/intl-it/track/7AJohGsgWQTzB32uLrYuYk",
};
// ---------------------------------------------------------------

const copy = {
  en: {
    title: "Links | Last Cats on Earth",
    description: "All links to Last Cats on Earth, the Munich rock band: next show, latest release, music, videos and booking.",
    kicker: "Alternative rock · Munich",
    book: "Book the band",
    bookSub: "Press kit and booking inquiry",
    nextShow: "Next show",
    latestRelease: "Latest release",
    listenNow: "Listen on Spotify",
    website: "Our website",
    websiteSub: "Meet the band, watch us live",
    email: "Write us an email",
    legal: "Impressum",
    privacy: "Privacy Policy",
    follow: "Listen · Watch · Follow",
  },
  de: {
    title: "Links | Last Cats on Earth",
    description: "Alle Links zu Last Cats on Earth, der Münchner Rockband: nächste Show, neuester Release, Musik, Videos und Booking.",
    kicker: "Alternative Rock · München",
    book: "Die Band buchen",
    bookSub: "Pressekit und Booking-Anfrage",
    nextShow: "Nächste Show",
    latestRelease: "Neuester Release",
    listenNow: "Auf Spotify hören",
    website: "Unsere Webseite",
    websiteSub: "Die Band kennenlernen, live erleben",
    email: "E-Mail schreiben",
    legal: "Impressum",
    privacy: "Datenschutz",
    follow: "Hören · Sehen · Folgen",
  },
} as const;

const rowClass =
  "group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/50 p-3 backdrop-blur-sm transition hover:border-cat-orange hover:bg-white/10";

const FeatureRow = ({
  tag,
  title,
  image,
  href,
  external = false,
}: {
  tag: string;
  title: string;
  image: ReactNode;
  href: string;
  external?: boolean;
}) => {
  const inner = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl">
        {image}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-cat-orange">{tag}</span>
        <span className="mt-0.5 block truncate text-sm font-bold">{title}</span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition group-hover:text-cat-orange" />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={rowClass}>
      {inner}
    </a>
  ) : (
    <Link to={href} className={rowClass}>
      {inner}
    </Link>
  );
};

const LinksPage = () => {
  const { lang } = useLanguage();
  const p = useLocalePath();
  const t = copy[lang];

  return (
    <div className="snap-page-plain snap-end relative min-h-screen bg-black text-white">
      <Seo path="/links" title={t.title} description={t.description} noindex />

      <div
        className="pointer-events-none absolute inset-0 bg-repeat opacity-60"
        style={{ backgroundImage: `url(${starsBg})` }}
        aria-hidden="true"
      />

      <main className="relative mx-auto w-full max-w-md px-4 pb-8 pt-4">
        <header className="snap-start scroll-mt-4 relative isolate flex min-h-[300px] items-end overflow-hidden rounded-3xl border border-white/10 p-6">
          <img
            src={heroPhoto}
            alt="Last Cats on Earth performing live in Munich"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
            {...{ fetchpriority: "high" }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/60 to-black/10" />
          <div className="absolute inset-0 -z-10 bg-cat-orange/10 mix-blend-screen" />

          <LangToggle className="absolute right-4 top-4" />

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cat-orange">{t.kicker}</p>
            <h1 className="mt-3 text-5xl font-black uppercase leading-[0.88] tracking-tight">
              Last Cats <span className="text-cat-orange">on Earth</span>
            </h1>
          </div>
        </header>

        <Link
          to={p("/booking#contact")}
          className="group mt-3 flex items-center justify-between rounded-2xl bg-cat-orange px-5 py-4 text-black transition hover:bg-white"
        >
          <span>
            <span className="block text-base font-black uppercase tracking-wide">{t.book}</span>
            <span className="mt-0.5 block text-xs font-semibold text-black/70">{t.bookSub}</span>
          </span>
          <ArrowUpRight className="h-6 w-6 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>

        <ul className="mt-3 space-y-2.5">
          <li>
            <FeatureRow
              tag={t.nextShow}
              title={nextShow.title[lang]}
              image={<img src={nextShowFlyer} alt="" className="h-full w-full object-cover object-top" />}
              href={nextShow.href}
              external
            />
          </li>
          <li>
            <FeatureRow
              tag={t.latestRelease}
              title={`${latestRelease.title} · ${t.listenNow}`}
              image={<img src={releaseCover} alt="" className="h-full w-full object-cover" />}
              href={latestRelease.href}
              external
            />
          </li>
          <li>
            <FeatureRow
              tag={t.website}
              title={t.websiteSub}
              image={<img src={favicon} alt="" className="h-full w-full object-cover" />}
              href={p("/")}
            />
          </li>
        </ul>

        <a
          href={`mailto:${EMAIL}`}
          className="mt-3 flex items-center justify-center gap-2 rounded-2xl border border-cat-orange px-5 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-cat-orange transition hover:bg-cat-orange hover:text-black"
        >
          <Mail className="h-4 w-4" />
          {t.email}
        </a>

        <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">{t.follow}</p>
        <nav className="mt-2 flex items-center justify-between px-1" aria-label="Social media">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="flex h-11 w-11 items-center justify-center text-cat-orange transition hover:scale-110 hover:brightness-125"
            >
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </nav>

        <footer className="mt-6 space-y-2 text-center text-xs text-white/40">
          <p className="flex items-center justify-center gap-2">
            <Link to={p("/impressum")} className="underline underline-offset-4 transition hover:text-cat-orange">{t.legal}</Link>
            <span aria-hidden="true">•</span>
            <Link to={p("/privacy")} className="underline underline-offset-4 transition hover:text-cat-orange">{t.privacy}</Link>
          </p>
          <p>© 2026 Last Cats on Earth</p>
        </footer>
      </main>
    </div>
  );
};

export default LinksPage;