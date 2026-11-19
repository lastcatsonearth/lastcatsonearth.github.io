import { ArrowLeft, ArrowUpRight, Instagram } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import { Seo } from "@/components/Seo";
import NotFound from "@/pages/NotFound";
import { SITE_NAME, SITE_URL, externalProps, socials } from "@/config/site";
import { findRelease, formatReleaseDate, latestRelease, releases, type Release } from "@/content/releases";
import { useReleaseCountdown } from "@/hooks/useReleaseCountdown";
import { useLanguage, useLocalePath, type Lang } from "@/i18n/LanguageContext";

const copy = {
    de: {
        label: "Neue Single",
        single: "Single",
        allMusic: "Alle Songs",
        more: "Mehr Musik",
        outOn: "Überall erhältlich ab",
        out: "Jetzt überall erhältlich",
        days: "Tage",
        hours: "Std",
        minutes: "Min",
        seconds: "Sek",
        presave: "Pre-Save",
        allPlatforms: "Alle Plattformen",
        followTitle: "Nichts verpassen",
        follow: "Jetzt pre-saven, dann landet der Song am 27. direkt in deiner Bibliothek.",
        listen: "Jetzt anhören",
        listenOn: "Hören auf",
        about: "Der Song",
        lyrics: "Lyrics",
        credits: "Credits",
        ctaHeading: "Live klingt er noch besser.",
        cta: "Nächste Shows",
    },
    en: {
        label: "New single",
        single: "Single",
        allMusic: "All songs",
        more: "More music",
        outOn: "Out everywhere on",
        out: "Out now everywhere",
        days: "Days",
        hours: "Hrs",
        minutes: "Min",
        seconds: "Sec",
        presave: "Pre-save",
        allPlatforms: "All platforms",
        followTitle: "Don't miss it",
        follow: "Pre-save it now and it lands in your library on release day.",
        listen: "Listen now",
        listenOn: "Listen on",
        about: "The song",
        lyrics: "Lyrics",
        credits: "Credits",
        ctaHeading: "It sounds even better live.",
        cta: "Upcoming shows",
    },
} as const;

const jsonLd = (r: Release, lang: Lang, url: string) => ({
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: r.title,
    url,
    datePublished: r.releaseAt.slice(0, 10),
    image: `${SITE_URL}${r.ogImage}`,
    description: r.text[lang].split("\n\n")[0],
    inLanguage: "en",
    byArtist: { "@type": "MusicGroup", name: SITE_NAME, url: SITE_URL },
});

const pad = (n: number) => String(n).padStart(2, "0");

/** First paragraph, cut at a word boundary to fit a meta description (~155 chars). */
const metaDescription = (text: string) => {
    const first = text.split("\n\n")[0];
    return first.length <= 155 ? first : `${first.slice(0, 152).replace(/\s+\S*$/, "")}…`;
};

const ReleasePage = () => {
    const { slug } = useParams();
    const release = findRelease(slug);
    const { lang } = useLanguage();
    const p = useLocalePath();
    const t = copy[lang];
    const countdown = useReleaseCountdown(release?.releaseAt ?? "2000-01-01T00:00:00Z");

    if (!release) return <NotFound />;

    const date = formatReleaseDate(release.releaseAt, lang);
    const url = `${SITE_URL}${lang === "en" ? "/en" : ""}/music/${release.slug}`;
    const instagram = socials.find((s) => s.label === "Instagram");
    const links = release.links.filter((l) => l.href);
    const units = [
        [countdown.days, t.days],
        [countdown.hours, t.hours],
        [countdown.minutes, t.minutes],
        [countdown.seconds, t.seconds],
    ] as const;

    return (
        <div className="min-h-screen bg-black text-white">
            <Seo
                path={`/music/${release.slug}`}
                title={`${release.title} – ${t.label} | ${SITE_NAME}`}
                description={metaDescription(release.text[lang])}
                image={release.ogImage}
                jsonLd={jsonLd(release, lang, url)}
            />
            <SiteHeader />

            <main>
                {/* ── Hero ── */}
                <header className="relative isolate overflow-hidden">
                    <img src={release.cover} alt="" aria-hidden className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover opacity-40 blur-2xl" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/60 to-black" />

                    <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-16 pt-28 sm:px-8 md:grid-cols-[0.9fr_1fr] md:gap-14 md:pb-24 md:pt-36">
                        <img
                            src={release.cover}
                            alt={`${release.title} – cover art`}
                            {...{ fetchpriority: "high" }}
                            className="mx-auto aspect-square w-full max-w-md rounded-2xl border border-white/10 object-cover shadow-2xl"
                        />

                        <div>
                            <Link to={p("/music")} className="mb-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/70 hover:text-cat-orange">
                                <ArrowLeft className="h-3.5 w-3.5" /> {t.allMusic}
                            </Link>
                            <p className="text-xs font-black uppercase tracking-[0.3em] text-cat-orange">{release.slug === latestRelease.slug ? t.label : `${t.single} · ${date}`}</p>
                            <h1 className="mt-3 text-5xl font-black uppercase leading-[0.85] tracking-tighter sm:text-7xl lg:text-8xl">
                                {release.title}
                            </h1>
                            <p className="mt-4 text-sm font-bold uppercase tracking-wider text-white/70">
                                {SITE_NAME} · {countdown.released ? t.out : `${t.outOn} ${date}`}
                            </p>

                            {!countdown.released ? (
                                <>
                                    <div className="mt-8 grid max-w-md grid-cols-4 gap-2 sm:gap-3" aria-live="off">
                                        {units.map(([value, label]) => (
                                            <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] py-3 text-center backdrop-blur-sm">
                                                <span className="block text-3xl font-black tabular-nums sm:text-4xl">
                                                    {countdown.ready ? pad(value) : "--"}
                                                </span>
                                                <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">{label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-white">{t.followTitle}</p>
                                    <p className="mt-1 text-sm text-white/60">{t.follow}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {release.smartLink && (
                                            <a href={release.smartLink} {...externalProps(release.smartLink)} className="inline-flex items-center gap-2 rounded-full bg-cat-orange px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-black transition hover:bg-white">
                                                {t.presave} <ArrowUpRight className="h-4 w-4" />
                                            </a>
                                        )}
                                        {instagram && (
                                            <a href={instagram.href} {...externalProps(instagram.href)} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition hover:border-cat-orange hover:text-cat-orange">
                                                <Instagram className="h-4 w-4" /> Instagram
                                            </a>
                                        )}
                                        {links.map((l) => (
                                            <a key={l.label} href={l.href} {...externalProps(l.href)} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition hover:border-cat-orange hover:text-cat-orange">
                                                {l.label} <ArrowUpRight className="h-4 w-4" />
                                            </a>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-white">{t.listen}</p>
                                    <audio controls preload="none" src={release.audio} className="mt-3 w-full max-w-md accent-[#D34303]">
                                        {release.title}
                                    </audio>
                                    {(links.length > 0 || release.smartLink) && (
                                        <>
                                            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.25em] text-white/50">{t.listenOn}</p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {release.smartLink && (
                                                    <a href={release.smartLink} {...externalProps(release.smartLink)} className="inline-flex items-center gap-2 rounded-full bg-cat-orange px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-black transition hover:bg-white">
                                                        {t.allPlatforms} <ArrowUpRight className="h-4 w-4" />
                                                    </a>
                                                )}
                                                {links.map((l) => (
                                                    <a key={l.label} href={l.href} {...externalProps(l.href)} className="inline-flex items-center gap-2 rounded-full bg-cat-orange px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-black transition hover:bg-white">
                                                        {l.label} <ArrowUpRight className="h-4 w-4" />
                                                    </a>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* ── About + lyrics ── */}
                <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 pb-20 sm:px-8 md:grid-cols-2">
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-cat-orange">{t.about}</h2>
                        <div className="mt-4 space-y-4 text-lg leading-8 text-white/80">{release.text[lang].split("\n\n").map((para) => <p key={para.slice(0, 24)}>{para}</p>)}</div>
                        {release.credits && (
                            <>
                                <h2 className="mt-10 text-xs font-black uppercase tracking-[0.3em] text-cat-orange">{t.credits}</h2>
                                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-white/60">{release.credits}</p>
                            </>
                        )}
                    </section>
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-cat-orange">{t.lyrics}</h2>
                        <p className="mt-4 whitespace-pre-line text-sm leading-7 text-white/70">{release.lyrics}</p>
                    </section>
                </div>

                {/* ── Other songs ── */}
                <div className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-cat-orange">{t.more}</h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {releases.filter((r) => r.slug !== release.slug).map((r) => (
                            <Link key={r.slug} to={p(`/music/${r.slug}`)} className="group flex items-center gap-4 rounded-2xl border border-white/10 p-3 transition hover:border-cat-orange">
                                <img src={r.cover} alt="" loading="lazy" className="h-16 w-16 rounded-xl object-cover" />
                                <span className="min-w-0 flex-1">
                                    <span className="block truncate text-lg font-black uppercase">{r.title}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">{formatReleaseDate(r.releaseAt, lang)}</span>
                                </span>
                                <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-cat-orange" />
                            </Link>
                        ))}
                    </div>
                </div>

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
            </main>
        </div>
    );
};

export default ReleasePage;
