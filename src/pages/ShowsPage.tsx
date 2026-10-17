import { ArrowUpRight, Camera, Play } from "lucide-react";
import { Link } from "react-router-dom";

import Footer from "@/components/Footer";
import NextShow, { gigsJsonLd } from "@/components/NextShow";
import SiteHeader from "@/components/SiteHeader";
import { ReviewQuotes } from "@/components/GoogleReviews";
import { Seo } from "@/components/Seo";
import { photosByShow } from "@/components/booking/bookingData";
import { formatShowDate, shows } from "@/content/shows";
import { upcomingGigs } from "@/content/gigs";
import { useLanguage, useLocalePath } from "@/i18n/LanguageContext";

const copy = {
    de: {
        title: "Live-Shows & Konzerte | Last Cats on Earth – Rockband München",
        description: "Nächste Show und Konzert-Archiv von Last Cats on Earth: Zamanand Festival, Alte Utting, Woodstock Party in Italien – mit Fotos und Live-Videos.",
        kicker: "Live",
        heading: "Shows.",
        intro: "Wo die Cats als Nächstes spielen – und wo sie schon gespielt haben. Jede Show mit Fotos und Videos.",
        archive: "Archiv",
        archiveHeading: "Hier haben wir gespielt.",
        photos: "Fotos",
        videos: "Videos",
        video: "Video",
        open: "Zur Show",
        ctaHeading: "Eure Bühne als nächste?",
        cta: "Band anfragen",
    },
    en: {
        title: "Live Shows & Concerts | Last Cats on Earth – Munich Rock Band",
        description: "Next show and concert archive of Last Cats on Earth: Zamanand Festival, Alte Utting, Woodstock Party in Italy – with photos and live videos.",
        kicker: "Live",
        heading: "Shows.",
        intro: "Where the Cats play next – and where they've already played. Every show with photos and videos.",
        archive: "Archive",
        archiveHeading: "Where we've played.",
        photos: "photos",
        videos: "videos",
        video: "video",
        open: "See the show",
        ctaHeading: "Your stage next?",
        cta: "Book the band",
    },
} as const;

const ShowsPage = () => {
    const { lang } = useLanguage();
    const p = useLocalePath();
    const t = copy[lang];
    const hasUpcoming = upcomingGigs().length > 0;

    return (
        <div className="min-h-screen bg-black text-white">
            <Seo path="/shows" title={t.title} description={t.description} jsonLd={gigsJsonLd()} />
            <SiteHeader />

            <main className="mx-auto w-full max-w-6xl px-5 sm:px-8">
                <header className="pb-10 pt-14 sm:pb-14 sm:pt-20">
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-cat-orange">{t.kicker}</p>
                    <h1 className="mt-3 text-7xl font-black uppercase leading-[0.85] tracking-tighter sm:text-9xl">{t.heading}</h1>
                    <p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">{t.intro}</p>
                </header>

                {hasUpcoming && <section className="pb-20"><NextShow /></section>}

                <section className="pb-20 sm:pb-28" aria-labelledby="archive">
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-cat-orange">{t.archive}</p>
                    <h2 id="archive" className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-5xl">{t.archiveHeading}</h2>

                    <ol className="mt-10 space-y-6">
                        {shows.map((show, i) => {
                            const photoCount = photosByShow[show.gallery]?.full.length ?? 0;
                            return (
                                <li key={show.slug}>
                                    <Link
                                        to={p(`/shows/${show.slug}`)}
                                        className={`group grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition hover:border-cat-orange/60 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
                                    >
                                        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[340px]">
                                            <img
                                                src={show.image}
                                                alt={`Last Cats on Earth live – ${show.title}, ${show.city[lang]}`}
                                                loading={i === 0 ? "eager" : "lazy"}
                                                style={{ objectPosition: show.imagePosition }}
                                                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-between gap-8 p-6 sm:p-10">
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-[0.25em] text-cat-orange">{formatShowDate(show.date, lang)}</p>
                                                <h3 className="mt-3 text-4xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl">{show.title}</h3>
                                                <p className="mt-2 text-sm font-bold uppercase tracking-wider text-white/50">{show.city[lang]}, {show.country[lang]}</p>
                                                <p className="mt-5 max-w-md text-sm leading-7 text-white/70 sm:text-base">{show.text[lang]}</p>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-between gap-4">
                                                <p className="flex gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                                                    {photoCount > 0 && <span className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5" /> {photoCount} {t.photos}</span>}
                                                    {show.videos.length > 0 && <span className="flex items-center gap-1.5"><Play className="h-3.5 w-3.5" /> {show.videos.length} {show.videos.length === 1 ? t.video : t.videos}</span>}
                                                </p>
                                                <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-cat-orange">
                                                    {t.open} <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ol>
                </section>

                <section className="pb-20 sm:pb-28"><ReviewQuotes /></section>
            </main>

            <section className="bg-cat-orange text-black">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-20">
                    <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-tighter sm:text-7xl">{t.ctaHeading}</h2>
                    <Link to={p("/contact")} className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-7 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black">
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

export default ShowsPage;
