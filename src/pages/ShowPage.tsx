import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Camera, MapPin, Play } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import NotFound from "@/pages/NotFound";
import SiteHeader from "@/components/SiteHeader";
import VideoOverlay from "@/components/VideoOverlay";
import { ReviewCta } from "@/components/GoogleReviews";
import { Seo } from "@/components/Seo";
import { photosByShow } from "@/components/booking/bookingData";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { musicEventJsonLd } from "@/content/eventSchema";
import { formatShowDate, shows, type Show } from "@/content/shows";
import { useLanguage, useLocalePath, type Lang } from "@/i18n/LanguageContext";

const copy = {
    de: {
        shows: "Shows",
        about: "Die Show",
        videos: "Live-Videos",
        photos: "Fotos",
        photosCount: "Fotos",
        videosCount: "Videos",
        videoCount: "Video",
        older: "Ältere Show",
        newer: "Neuere Show",
        all: "Alle Shows",
        ctaHeading: "Das wollt ihr auch?",
        cta: "Band anfragen",
        play: "Video abspielen",
    },
    en: {
        shows: "Shows",
        about: "The show",
        videos: "Live videos",
        photos: "Photos",
        photosCount: "photos",
        videosCount: "videos",
        videoCount: "video",
        older: "Older show",
        newer: "Newer show",
        all: "All shows",
        ctaHeading: "Want this at your event?",
        cta: "Book the band",
        play: "Play video",
    },
} as const;

const ytThumb = (id: string) => `https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`;
const ytFallback = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

const jsonLd = (show: Show, lang: Lang, url: string) => [
    musicEventJsonLd({
        ...show,
        date: show.day ?? show.date,
        description: show.text[lang],
        venue: show.venue[lang],
        city: show.city[lang],
        url,
    }),
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Shows", item: `${SITE_URL}${lang === "en" ? "/en" : ""}/shows` },
            { "@type": "ListItem", position: 2, name: show.title, item: url },
        ],
    },
];

const ShowPage = () => {
    const { slug } = useParams();
    const { lang } = useLanguage();
    const p = useLocalePath();
    const t = copy[lang];
    const [video, setVideo] = useState<string | null>(null);
    const [photo, setPhoto] = useState<number | null>(null);

    const index = shows.findIndex((s) => s.slug === slug);
    if (index === -1) return <NotFound />;
    const show = shows[index];
    const newer = shows[index - 1];
    const older = shows[index + 1];
    const photos = photosByShow[show.gallery] ?? { thumbs: [], full: [] };
    const url = `${SITE_URL}${lang === "en" ? "/en" : ""}/shows/${show.slug}`;
    const date = formatShowDate(show.date, lang);
    const photoAlt = (i: number) => `${SITE_NAME} live – ${show.title}, ${show.city[lang]} (${i + 1})`;

    return (
        <div className="min-h-screen bg-black text-white">
            <Seo
                path={`/shows/${show.slug}`}
                title={`${show.title} ${date} – ${show.city[lang]} | ${SITE_NAME} live`}
                description={show.text[lang]}
                image={show.image}
                jsonLd={jsonLd(show, lang, url)}
            />
            <SiteHeader />

            <main>
                {/* ── Hero ── */}
                <header className="relative isolate flex min-h-[78svh] items-end overflow-hidden phone-landscape:min-h-[calc(100svh-3rem)]">
                    <img src={show.image} alt={photoAlt(0)} {...{ fetchpriority: "high" }} style={{ objectPosition: show.imagePosition }} className="absolute inset-0 -z-20 h-full w-full object-cover" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/60 to-black/10" />
                    <div className="mx-auto w-full max-w-6xl px-5 pb-12 pt-24 sm:px-8 sm:pb-16 phone-landscape:pb-8 phone-landscape:pt-10">
                        <Link to={p("/shows")} className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/70 hover:text-cat-orange">
                            <ArrowLeft className="h-3.5 w-3.5" /> {t.shows}
                        </Link>
                        <p className="mt-6 text-xs font-black uppercase tracking-[0.3em] text-cat-orange">{date}</p>
                        <h1 className="mt-3 text-5xl font-black uppercase leading-[0.85] tracking-tighter sm:text-8xl lg:text-9xl phone-landscape:text-5xl">{show.title}</h1>
                        <p className="mt-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/70">
                            <MapPin className="h-4 w-4 text-cat-orange" /> {show.venue[lang]} · {show.city[lang]}, {show.country[lang]}
                        </p>
                        <p className="mt-6 flex flex-wrap gap-2">
                            {photos.full.length > 0 && (
                                <a href="#photos" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-sm hover:border-cat-orange">
                                    <Camera className="h-3.5 w-3.5" /> {photos.full.length} {t.photosCount}
                                </a>
                            )}
                            {show.videos.length > 0 && (
                                <a href="#videos" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-sm hover:border-cat-orange">
                                    <Play className="h-3.5 w-3.5" /> {show.videos.length} {show.videos.length === 1 ? t.videoCount : t.videosCount}
                                </a>
                            )}
                        </p>
                    </div>
                </header>

                <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
                    {/* ── Story ── */}
                    <section className="grid gap-8 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-cat-orange">{t.about}</p>
                            <p className="mt-3 text-2xl font-black uppercase leading-tight tracking-tight sm:text-3xl">{show.text[lang]}</p>
                        </div>
                        <div className="space-y-5 text-base leading-8 text-white/70 sm:text-lg">
                            {show.story[lang].map((para) => <p key={para.slice(0, 30)}>{para}</p>)}
                        </div>
                    </section>

                    {/* ── Videos ── */}
                    {show.videos.length > 0 && (
                        <section id="videos" className="scroll-mt-20 pb-16 sm:pb-24">
                            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-cat-orange">{t.videos}</p>
                            <div className={`mt-6 grid gap-4 ${show.videos.length > 1 ? "sm:grid-cols-2" : ""}`}>
                                {show.videos.map((v) => (
                                    <button
                                        key={v.id}
                                        type="button"
                                        onClick={() => setVideo(`https://www.youtube.com/embed/${v.id}?autoplay=1`)}
                                        className="group relative block aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left"
                                        aria-label={`${t.play}: ${v.title}`}
                                    >
                                        <img
                                            src={ytThumb(v.id)}
                                            onError={(e) => { const f = ytFallback(v.id); if (e.currentTarget.src !== f) e.currentTarget.src = f; }}
                                            alt={`${v.title} – ${SITE_NAME} live, ${show.title}`}
                                            loading="lazy"
                                            className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                                        />
                                        <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                        <span className="absolute bottom-4 left-4 flex items-center gap-3 sm:bottom-6 sm:left-6">
                                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cat-orange text-black transition group-hover:scale-110">
                                                <Play className="ml-0.5 h-5 w-5 fill-current" />
                                            </span>
                                            <span className="text-lg font-black uppercase tracking-wide">{v.title}</span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ── Photos ── */}
                    {photos.thumbs.length > 0 && (
                        <section id="photos" className="scroll-mt-20 pb-16 sm:pb-24">
                            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-cat-orange">{t.photos}</p>
                            <div className="mt-6 columns-2 gap-3 sm:columns-3 sm:gap-4">
                                {photos.thumbs.map((src, i) => (
                                    <button
                                        key={src}
                                        type="button"
                                        onClick={() => setPhoto(i)}
                                        className="group mb-3 block w-full overflow-hidden rounded-2xl border border-white/10 sm:mb-4"
                                    >
                                        <img src={src} alt={photoAlt(i)} loading="lazy" className="w-full transition duration-500 group-hover:scale-105" />
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ── Review CTA ── */}
                    <section className="pb-16 sm:pb-24"><ReviewCta /></section>

                    {/* ── Older / newer ── */}
                    <nav className="grid gap-4 pb-16 sm:grid-cols-2 sm:pb-24" aria-label={t.all}>
                        {[older && { show: older, label: t.older, Icon: ArrowLeft }, newer && { show: newer, label: t.newer, Icon: ArrowRight }]
                            .filter(Boolean)
                            .map((item) => {
                                const { show: s, label, Icon } = item as { show: Show; label: string; Icon: typeof ArrowLeft };
                                return (
                                    <Link key={s.slug} to={p(`/shows/${s.slug}`)} className="group relative isolate flex min-h-[180px] items-end overflow-hidden rounded-3xl border border-white/10 p-6 hover:border-cat-orange/60">
                                        <img src={s.image} alt="" loading="lazy" style={{ objectPosition: s.imagePosition }} className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50 transition duration-500 group-hover:scale-105 group-hover:opacity-70" />
                                        <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black to-transparent" />
                                        <span>
                                            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-cat-orange"><Icon className="h-3.5 w-3.5" /> {label}</span>
                                            <span className="mt-1 block text-2xl font-black uppercase">{s.title}</span>
                                            <span className="text-xs font-bold uppercase tracking-wider text-white/60">{formatShowDate(s.date, lang)} · {s.city[lang]}</span>
                                        </span>
                                    </Link>
                                );
                            })}
                    </nav>
                </div>

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
            </main>

            {video && <VideoOverlay url={video} onClose={() => setVideo(null)} />}
            {photo !== null && <Lightbox photos={photos.full} index={photo} alt={photoAlt} onChange={setPhoto} onClose={() => setPhoto(null)} />}
        </div>
    );
};

export default ShowPage;
