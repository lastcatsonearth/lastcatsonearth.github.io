import { ArrowUpRight, Star } from "lucide-react";
import { GOOGLE_REVIEW_URL, GOOGLE_REVIEWS_URL, googleRating, reviews } from "@/content/reviews";
import { useLanguage } from "@/i18n/LanguageContext";

const copy = {
    de: {
        kicker: "Stimmen nach der Show",
        heading: "Das sagen die Leute.",
        onGoogle: "auf Google",
        reviews: "Bewertungen",
        all: "Alle ansehen",
        write: "Bewerten",
        guest: "Google-Rezension",
        readOriginal: "Original auf Google lesen",
        ctaTitle: "Warst du dabei?",
        ctaText: "Eine Bewertung auf Google dauert 30 Sekunden und hilft uns enorm, neue Bühnen zu finden.",
    },
    en: {
        kicker: "Voices after the show",
        heading: "What people say.",
        onGoogle: "on Google",
        reviews: "reviews",
        all: "See all",
        write: "Write a review",
        guest: "Google review",
        readOriginal: "Read the original on Google",
        ctaTitle: "Were you there?",
        ctaText: "A Google review takes 30 seconds and helps us a lot to find new stages.",
    },
} as const;

const Stars = ({ className = "h-4 w-4" }: { className?: string }) => (
    <span className="flex gap-0.5 text-cat-orange" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => <Star key={i} className={`${className} fill-current`} />)}
    </span>
);

const linkProps = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Rating line + quotes + buttons. `compact` = 2 quotes, smaller type (for full-screen EPK sections). */
export const ReviewQuotes = ({ compact = false }: { compact?: boolean }) => {
    const { lang } = useLanguage();
    const t = copy[lang];
    const shown = compact ? reviews.slice(0, 2) : reviews;

    return (
        <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-cat-orange">{t.kicker}</p>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <h2 className={`font-black uppercase tracking-tight ${compact ? "text-3xl sm:text-4xl" : "text-3xl sm:text-5xl"}`}>{t.heading}</h2>
                <a href={GOOGLE_REVIEWS_URL} {...linkProps} className="flex items-center gap-2 whitespace-nowrap text-sm font-bold text-white/80 hover:text-cat-orange">
                    <Stars />
                    {lang === "de" ? googleRating.rating : googleRating.ratingEn} {t.onGoogle} · {googleRating.count} {t.reviews}
                </a>
            </div>

            <ul className={`mt-6 grid gap-4 ${compact ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
                {shown.map(({ author, text, url }) => (
                    <li key={text.slice(0, 20)}>
                        <a
                            href={url ?? GOOGLE_REVIEWS_URL}
                            {...linkProps}
                            title={t.readOriginal}
                            className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cat-orange/60 sm:p-6"
                        >
                            <blockquote className={`leading-6 text-white/80 ${compact ? "text-sm line-clamp-4 sm:line-clamp-none" : "text-sm sm:text-base sm:leading-7"}`}>
                                “{text}”
                            </blockquote>
                            <span className="mt-4 flex items-center justify-between gap-3">
                                <span className="truncate text-sm font-bold text-white">{author || t.guest}</span>
                                <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                                    <Stars className="h-3 w-3" /> Google <ArrowUpRight className="h-3 w-3" />
                                </span>
                            </span>
                        </a>
                    </li>
                ))}
            </ul>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:flex">
                <a href={GOOGLE_REVIEW_URL} {...linkProps} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-cat-orange px-5 py-3 text-[10px] font-black uppercase tracking-[0.15em] text-black transition hover:bg-white">
                    <Star className="h-3.5 w-3.5 fill-current" /> {t.write}
                </a>
                <a href={GOOGLE_REVIEWS_URL} {...linkProps} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/20 px-5 py-3 text-[10px] font-black uppercase tracking-[0.15em] text-white/80 transition hover:border-cat-orange hover:text-cat-orange">
                    {t.all} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
            </div>
        </div>
    );
};

/** Small "Were you there? Review us" banner – for show pages. */
export const ReviewCta = () => {
    const { lang } = useLanguage();
    const t = copy[lang];
    return (
        <div className="flex flex-col gap-5 rounded-3xl border border-cat-orange/40 bg-cat-orange/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
                <Stars className="h-5 w-5" />
                <p className="mt-3 text-2xl font-black uppercase">{t.ctaTitle}</p>
                <p className="mt-1 max-w-xl text-sm leading-6 text-white/70">{t.ctaText}</p>
            </div>
            <a href={GOOGLE_REVIEW_URL} {...linkProps} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-cat-orange px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-black transition hover:bg-white">
                {lang === "de" ? "Bewertung schreiben" : t.write} <ArrowUpRight className="h-4 w-4" />
            </a>
        </div>
    );
};
