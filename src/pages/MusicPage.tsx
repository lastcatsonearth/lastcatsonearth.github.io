import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import { Seo } from "@/components/Seo";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { formatReleaseDate, latestRelease, releases } from "@/content/releases";
import { useReleaseCountdown } from "@/hooks/useReleaseCountdown";
import { useLanguage, useLocalePath } from "@/i18n/LanguageContext";

const copy = {
    de: {
        title: `Musik | ${SITE_NAME} – Rockband aus München`,
        description: "Alle Songs von Last Cats on Earth, der Rockband aus München: Lyrics, die Geschichten hinter den Songs und Links zu Spotify, Apple Music und Bandcamp.",
        kicker: "Musik",
        heading: "Unsere Songs",
        intro: "Jeder Song hat seine eigene Geschichte. Hier findest du Lyrics, Hintergründe und alle Links zum Anhören und Kaufen.",
        upcoming: "Erscheint am",
        released: "Veröffentlicht am",
        open: "Zum Song",
        ctaHeading: "Live klingen sie noch besser.",
        cta: "Nächste Shows",
    },
    en: {
        title: `Music | ${SITE_NAME} – Rock band from Munich`,
        description: "All songs by Last Cats on Earth, the rock band from Munich: lyrics, the stories behind the songs and links to Spotify, Apple Music and Bandcamp.",
        kicker: "Music",
        heading: "Our songs",
        intro: "Every song has a story. Here you find the lyrics, what's behind them and every link to listen and buy.",
        upcoming: "Out on",
        released: "Released",
        open: "Open song",
        ctaHeading: "They sound even better live.",
        cta: "Upcoming shows",
    },
} as const;

const MusicPage = () => {
    const { lang } = useLanguage();
    const p = useLocalePath();
    const t = copy[lang];
    const latest = useReleaseCountdown(latestRelease.releaseAt);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "MusicGroup",
        name: SITE_NAME,
        url: SITE_URL,
        track: releases.map((r) => ({
            "@type": "MusicRecording",
            name: r.title,
            url: `${SITE_URL}${lang === "en" ? "/en" : ""}/music/${r.slug}`,
            datePublished: r.releaseAt.slice(0, 10),
        })),
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Seo path="/music" title={t.title} description={t.description} jsonLd={jsonLd} />
            <SiteHeader />

            <main className="mx-auto w-full max-w-6xl px-5 pb-20 pt-28 sm:px-8 md:pt-36">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-cat-orange">{t.kicker}</p>
                <h1 className="mt-3 text-5xl font-black uppercase leading-[0.85] tracking-tighter sm:text-7xl">{t.heading}</h1>
                <p className="mt-6 max-w-xl text-white/60">{t.intro}</p>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {releases.map((r) => {
                        const upcoming = r.slug === latestRelease.slug && !latest.released;
                        return (
                            <Link key={r.slug} to={p(`/music/${r.slug}`)} className="group block overflow-hidden rounded-3xl border border-white/10 transition hover:border-cat-orange">
                                <span className="relative block aspect-square overflow-hidden">
                                    <img src={r.cover} alt={`${r.title} – cover art`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                    {upcoming && (
                                        <span className="absolute left-3 top-3 rounded-full bg-cat-orange px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-black">New</span>
                                    )}
                                </span>
                                <span className="flex items-end justify-between gap-3 p-5">
                                    <span>
                                        <span className="block text-2xl font-black uppercase">{r.title}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                                            {upcoming ? t.upcoming : t.released} {formatReleaseDate(r.releaseAt, lang)}
                                        </span>
                                    </span>
                                    <ArrowUpRight className="h-5 w-5 shrink-0 text-white/30 transition group-hover:text-cat-orange" aria-label={t.open} />
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </main>

            <section className="bg-cat-orange text-black">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-20">
                    <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-tighter sm:text-7xl">{t.ctaHeading}</h2>
                    <Link to={p("/shows")} className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-7 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black">
                        {t.cta} <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="mx-auto w-full max-w-6xl px-5 pb-4 sm:px-8">
                    <div className="border-t border-black/15 pt-8">
                        <Footer onOrange />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MusicPage;
