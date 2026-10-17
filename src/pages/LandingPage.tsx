import { useState } from "react";
import { ArrowUpRight, Mail, Play, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import VideoOverlay from "@/components/VideoOverlay";
import { Seo } from "@/components/Seo";
import { EMAIL, SITE_NAME, SITE_URL } from "@/config/site";
import { members } from "@/content/members";
import {
    landingCopy,
    landingLabel,
    landingMedia,
    landingPath,
    setlist,
    venues,
    type LandingKey,
} from "@/content/landingPages";
import { useInView } from "@/hooks/useInView";
import { useLanguage, useLocalePath, type Lang } from "@/i18n/LanguageContext";

// Texts shared by every landing page. Page-specific copy lives in content/landingPages.ts.
const ui = {
    de: {
        book: "Band anfragen",
        watch: "Live-Video ansehen",
        playedAt: "Live gespielt bei",
        lineupKicker: "Die Band",
        lineupHeading: "Lerne die Cats kennen.",
        setlistLive: "live",
        stepsKicker: "Booking",
        stepLabel: "Schritt",
        stepsHeading: "So einfach geht's.",
        steps: [
            ["Anfrage schicken", "Datum, Ort und Anlass – per Formular im Pressekit oder per E-Mail."],
            ["Abstimmen", "Wir klären Setlist, Spieldauer, Technik und Ablauf und schicken ein Angebot."],
            ["Show", "Wir kommen, bauen auf, und eure Bühne wird laut."],
        ],
        faqHeading: "Häufige Fragen",
        relatedHeading: "Mehr Last Cats",
        shows: "Show-Archiv",
        epk: "Pressekit (EPK)",
        email: "Direkt per E-Mail",
        form: "Zum Booking-Formular",
        playVideo: "Video abspielen",
    },
    en: {
        book: "Book the band",
        watch: "Watch live video",
        playedAt: "Played live at",
        lineupKicker: "The band",
        lineupHeading: "Meet the Cats.",
        setlistLive: "live",
        stepsKicker: "Booking",
        stepLabel: "Step",
        stepsHeading: "It's that easy.",
        steps: [
            ["Send a request", "Date, place and occasion – via the form in our press kit or by email."],
            ["Fine-tune", "We sort out setlist, set length, tech and schedule and send you a quote."],
            ["Showtime", "We show up, set up, and your stage gets loud."],
        ],
        faqHeading: "FAQ",
        relatedHeading: "More Last Cats",
        shows: "Show archive",
        epk: "Press kit (EPK)",
        email: "Email us directly",
        form: "Go to booking form",
        playVideo: "Play video",
    },
} as const;

const ytThumb = (id: string) => `https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`;
const ytThumbFallback = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const ytEmbed = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1`;

/** Small orange label above headings. */
const Kicker = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <p className={`text-[11px] font-bold uppercase tracking-[0.3em] text-cat-orange ${className}`}>{children}</p>
);

/** Section that fades in when scrolled into view. */
const Section = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => {
    const { ref, inView } = useInView<HTMLElement>(0.1);
    return (
        <section id={id} ref={ref} className={`home-reveal ${inView ? "home-reveal-visible" : ""} mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
            {children}
        </section>
    );
};

const jsonLd = (key: LandingKey, lang: Lang) => {
    const copy = landingCopy[key][lang];
    const url = `${SITE_URL}${lang === "en" ? "/en" : ""}${landingPath[key]}`;
    return [
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: copy.faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}${lang === "en" ? "/en" : "/"}` },
                { "@type": "ListItem", position: 2, name: landingLabel[key][lang], item: url },
            ],
        },
    ];
};

const LandingPage = ({ page }: { page: LandingKey }) => {
    const { lang } = useLanguage();
    const p = useLocalePath();
    const t = ui[lang];
    const copy = landingCopy[page][lang];
    const media = landingMedia[page];
    const [video, setVideo] = useState<string | null>(null);
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(copy.cta.mailSubject)}`;
    const related = (Object.keys(landingPath) as LandingKey[]).filter((k) => k !== page);

    return (
        <div className="min-h-screen bg-black text-white">
            <Seo path={landingPath[page]} title={copy.seo.title} description={copy.seo.description} image={media.hero.src} jsonLd={jsonLd(page, lang)} />
            <SiteHeader />

            <main>
                {/* ── Hero ── */}
                <header className="relative isolate flex min-h-[calc(100svh-4rem)] phone-landscape:min-h-[calc(100svh-3rem)] items-end overflow-hidden">
                    <img
                        src={media.hero.src}
                        alt={media.hero.alt}
                        {...{ fetchpriority: "high" }}
                        className={`absolute inset-0 -z-20 h-full w-full object-cover ${media.hero.position ?? "object-center"}`}
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/70 to-black/20" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

                    <div className="mx-auto w-full max-w-6xl px-5 pb-12 pt-28 sm:px-8 sm:pb-16 phone-landscape:pb-8 phone-landscape:pt-12">
                        <Kicker>{copy.hero.kicker}</Kicker>
                        <h1 className="mt-4 max-w-5xl text-[2.6rem] font-black uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl phone-landscape:text-5xl">
                            {copy.hero.title} <span className="text-cat-orange">{copy.hero.highlight}</span>
                        </h1>
                        <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">{copy.hero.intro}</p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link
                                to={p("/booking#contact")}
                                className="inline-flex items-center gap-2 rounded-full bg-cat-orange px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-black transition hover:bg-white"
                            >
                                {t.book} <ArrowUpRight className="h-4 w-4" />
                            </Link>
                            <button
                                type="button"
                                onClick={() => setVideo(ytEmbed(media.videoId))}
                                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-white transition hover:border-cat-orange hover:text-cat-orange"
                            >
                                <Play className="h-3.5 w-3.5 fill-current" /> {t.watch}
                            </button>
                        </div>

                        <ul className="mt-10 flex flex-wrap gap-2 phone-landscape:mt-6">
                            {copy.facts.map((fact) => (
                                <li key={fact} className="rounded-full border border-white/15 bg-black/40 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                                    {fact}
                                </li>
                            ))}
                        </ul>
                    </div>
                </header>

                {/* ── Venue ticker ── */}
                <div className="flex items-center overflow-hidden border-y border-white/10 bg-black py-4" aria-label={t.playedAt}>
                    <p className="relative z-10 shrink-0 bg-black pl-5 pr-4 text-[10px] font-bold uppercase tracking-[0.25em] text-cat-orange sm:pl-8">
                        {t.playedAt}
                    </p>
                    <div className="flex min-w-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                        <ul className="flex shrink-0 animate-marquee items-center gap-10 pr-10 motion-reduce:animate-none">
                            {[...venues, ...venues].map((venue, i) => (
                                <li key={i} aria-hidden={i >= venues.length} className="whitespace-nowrap text-sm font-black uppercase tracking-wider text-white/70">
                                    {venue} <span className="ml-10 text-cat-orange">✶</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ── Pitch + 3 points ── */}
                <Section className="py-20 sm:py-28">
                    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
                        <div>
                            <Kicker>{copy.pitch.kicker}</Kicker>
                            <h2 className="mt-4 text-3xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">{copy.pitch.heading}</h2>
                        </div>
                        <div className="space-y-5 text-base leading-8 text-white/70 sm:text-lg">
                            {copy.pitch.body.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
                        </div>
                    </div>

                    <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3">
                        {copy.points.map((point, i) => (
                            <li key={point.title} className="bg-black p-7 sm:p-8">
                                <span className="text-5xl font-black text-transparent [-webkit-text-stroke:1.5px_#D34303]">0{i + 1}</span>
                                <h3 className="mt-4 text-lg font-black uppercase tracking-wide">{point.title}</h3>
                                <p className="mt-2 text-sm leading-7 text-white/60">{point.text}</p>
                            </li>
                        ))}
                    </ol>
                </Section>

                {/* ── Video + photos ── */}
                <Section className="pb-20 sm:pb-28">
                    <Kicker>Live</Kicker>
                    <h2 className="mt-4 text-3xl font-black uppercase tracking-tight sm:text-5xl">{copy.video.heading}</h2>
                    <div className="mt-8 grid gap-4 lg:grid-cols-12">
                        <figure className="lg:col-span-7">
                            <button
                                type="button"
                                onClick={() => setVideo(ytEmbed(media.videoId))}
                                className="group relative block aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                                aria-label={`${t.playVideo}: ${copy.video.caption}`}
                            >
                                <img
                                    src={ytThumb(media.videoId)}
                                    onError={(e) => {
                                        const fallback = ytThumbFallback(media.videoId);
                                        if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                                    }}
                                    alt={copy.video.caption}
                                    loading="lazy"
                                    className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                                />
                                <span className="absolute inset-0 flex items-center justify-center">
                                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cat-orange text-black shadow-2xl shadow-cat-orange/40 transition group-hover:scale-110 sm:h-20 sm:w-20">
                                        <Play className="ml-1 h-7 w-7 fill-current" />
                                    </span>
                                </span>
                            </button>
                            <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-white/50">{copy.video.caption}</figcaption>
                        </figure>
                        <div className="grid grid-cols-2 gap-4 lg:col-span-5">
                            {media.gallery.map((img) => (
                                <img key={img.src} src={img.src} alt={img.alt} loading="lazy" className="aspect-[3/4] h-full w-full rounded-3xl border border-white/10 object-cover" />
                            ))}
                        </div>
                    </div>
                </Section>

                {/* ── Setlist ── */}
                {media.setlist && copy.setlist && (
                    <Section className="pb-20 sm:pb-28">
                        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                            <div>
                                <Kicker>Setlist</Kicker>
                                <h2 className="mt-4 text-3xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">{copy.setlist.heading}</h2>
                                <p className="mt-5 max-w-md text-base leading-8 text-white/60">{copy.setlist.intro}</p>
                            </div>
                            {/* Styled like a taped paper setlist on stage */}
                            <div className="relative mx-auto w-full max-w-md -rotate-1 rounded-sm bg-[#f3eee4] px-7 pb-8 pt-10 text-black shadow-2xl shadow-black/60">
                                <span className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2 bg-white/60 backdrop-blur-sm" aria-hidden="true" />
                                <p className="border-b-2 border-black pb-2 text-center text-xs font-black uppercase tracking-[0.3em]">Last Cats on Earth</p>
                                <ol className="mt-4 space-y-2.5">
                                    {setlist.map((song, i) => (
                                        <li key={song.title} className="flex items-baseline gap-3 border-b border-black/10 pb-2">
                                            <span className="w-5 shrink-0 text-xs font-bold text-black/40">{i + 1}</span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block text-lg font-black uppercase leading-tight tracking-tight">{song.title}</span>
                                                <span className="block text-[11px] font-semibold uppercase tracking-wider text-black/50">{song.artist}</span>
                                            </span>
                                            {song.videoId && (
                                                <button
                                                    type="button"
                                                    onClick={() => setVideo(ytEmbed(song.videoId!))}
                                                    className="inline-flex shrink-0 items-center gap-1 rounded-full bg-black px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white transition hover:bg-cat-orange"
                                                    aria-label={`${song.title} – ${t.playVideo}`}
                                                >
                                                    <Play className="h-2.5 w-2.5 fill-current" /> {t.setlistLive}
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </Section>
                )}

                {/* ── Line-up (main band page only) ── */}
                {media.lineup && (
                    <Section id="lineup" className="pb-20 sm:pb-28">
                        <Kicker>{t.lineupKicker}</Kicker>
                        <h2 className="mt-4 text-3xl font-black uppercase tracking-tight sm:text-5xl">{t.lineupHeading}</h2>
                        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {members.map((m) => (
                                <article key={m.name} className="flex gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                                    <img src={m.photo} alt={`${m.name}, ${m.role[lang]} – ${SITE_NAME}`} loading="lazy" className="h-24 w-24 shrink-0 rounded-full border border-cat-orange/60 object-cover" />
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cat-orange">{m.role[lang]}</p>
                                        <h3 className="text-xl font-black uppercase">{m.name}</h3>
                                        <p className="mt-2 text-sm leading-6 text-white/60">{m.bio[lang]}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </Section>
                )}

                {/* ── How booking works ── */}
                <Section className="pb-20 sm:pb-28">
                    <Kicker>{t.stepsKicker}</Kicker>
                    <h2 className="mt-4 text-3xl font-black uppercase tracking-tight sm:text-5xl">{t.stepsHeading}</h2>
                    <ol className="mt-10 grid gap-8 sm:grid-cols-3">
                        {t.steps.map(([title, text], i) => (
                            <li key={title} className="border-t-2 border-cat-orange pt-5">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">{t.stepLabel} {i + 1}</p>
                                <h3 className="mt-2 text-xl font-black uppercase">{title}</h3>
                                <p className="mt-2 text-sm leading-7 text-white/60">{text}</p>
                            </li>
                        ))}
                    </ol>
                </Section>

                {/* ── FAQ ── */}
                <Section className="pb-20 sm:pb-28">
                    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                        <div>
                            <Kicker>FAQ</Kicker>
                            <h2 className="mt-4 text-3xl font-black uppercase tracking-tight sm:text-5xl">{t.faqHeading}</h2>
                        </div>
                        <div className="divide-y divide-white/10 border-y border-white/10">
                            {copy.faq.map(({ q, a }) => (
                                <details key={q} className="group py-5">
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-bold sm:text-lg [&::-webkit-details-marker]:hidden">
                                        <h3>{q}</h3>
                                        <Plus className="h-5 w-5 shrink-0 text-cat-orange transition group-open:rotate-45" />
                                    </summary>
                                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">{a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* ── Related pages (internal links) ── */}
                <Section className="pb-20 sm:pb-24">
                    <Kicker>{t.relatedHeading}</Kicker>
                    <nav className="mt-5 flex flex-wrap gap-2" aria-label={t.relatedHeading}>
                        {related.map((k) => (
                            <Link key={k} to={p(landingPath[k])} className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/80 transition hover:border-cat-orange hover:text-cat-orange">
                                {landingLabel[k][lang]}
                            </Link>
                        ))}
                        <Link to={p("/shows")} className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/80 transition hover:border-cat-orange hover:text-cat-orange">{t.shows}</Link>
                        <Link to={p("/booking")} className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/80 transition hover:border-cat-orange hover:text-cat-orange">{t.epk}</Link>
                    </nav>
                </Section>

                {/* ── Final CTA ── */}
                <section className="bg-cat-orange text-black">
                    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-16 sm:px-8 sm:py-24 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h2 className="max-w-3xl text-5xl font-black uppercase leading-[0.85] tracking-tighter sm:text-7xl">{copy.cta.heading}</h2>
                            <p className="mt-5 max-w-xl text-base font-medium leading-7 text-black/75">{copy.cta.text}</p>
                        </div>
                        <div className="flex shrink-0 flex-col gap-3">
                            <Link to={p("/booking#contact")} className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black">
                                {t.form} <ArrowUpRight className="h-4 w-4" />
                            </Link>
                            <a href={mailto} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-black px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] transition hover:bg-black hover:text-white">
                                <Mail className="h-4 w-4" /> {t.email}
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <div className="mx-auto w-full max-w-6xl px-5 pt-12 sm:px-8">
                <Footer />
            </div>

            {video && <VideoOverlay url={video} onClose={() => setVideo(null)} />}
        </div>
    );
};

export default LandingPage;
