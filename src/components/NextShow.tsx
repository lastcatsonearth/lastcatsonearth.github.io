import { ArrowUpRight, MapPin } from "lucide-react";
import { formatGigDate, upcomingGigs } from "@/content/gigs";
import { SITE_NAME } from "@/config/site";
import { musicEventJsonLd } from "@/content/eventSchema";
import { useLanguage } from "@/i18n/LanguageContext";

const copy = {
    de: { kicker: "Nächste Show", more: "Weitere Show", cta: "Infos & Tickets" },
    en: { kicker: "Next show", more: "Also coming up", cta: "Info & tickets" },
} as const;

/** schema.org MusicEvent for every upcoming gig (Google can show these as event results). */
export const gigsJsonLd = () =>
    upcomingGigs().map((g) =>
        musicEventJsonLd({
            ...g,
            description: `${SITE_NAME} live bei ${g.title} in ${g.city.de}: Funk Rock, Alternative Rock, eigene Songs und Cover.`,
            city: g.city.de,
            image: g.flyer ?? "/og-image.jpg",
            ticketUrl: g.url,
        }),
    );

/** Big orange "next show" card. Renders nothing if no upcoming gig. */
const NextShow = () => {
    const { lang } = useLanguage();
    const t = copy[lang];
    const [next, ...later] = upcomingGigs();
    if (!next) return null;

    const day = formatGigDate(next.date, lang, { day: "numeric" });
    const month = formatGigDate(next.date, lang, { month: "short", year: "numeric" });
    const weekday = formatGigDate(next.date, lang, { weekday: "long" });

    return (
        <div className="overflow-hidden rounded-3xl bg-cat-orange text-black">
            <div className="grid gap-0 sm:grid-cols-[1fr_auto]">
                <div className="flex flex-col justify-between gap-8 p-6 sm:p-10">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-black/60">{t.kicker}</p>
                    <div className="flex items-end gap-5">
                        <span className="text-7xl font-black leading-[0.8] tracking-tighter sm:text-9xl">{day}</span>
                        <span className="pb-1 text-sm font-black uppercase leading-tight tracking-wider">
                            {month}
                            <br />
                            <span className="text-black/60">{weekday}{next.time ? ` · ${next.time}` : ""}</span>
                        </span>
                    </div>
                    <div>
                        <h3 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl">{next.title}</h3>
                        <p className="mt-2 flex items-center gap-1.5 text-sm font-bold text-black/70">
                            <MapPin className="h-4 w-4" /> {next.venue} · {next.city[lang]}
                        </p>
                    </div>
                    <a
                        href={next.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
                    >
                        {t.cta} <ArrowUpRight className="h-4 w-4" />
                    </a>
                </div>
                {next.flyer && (
                    <img src={next.flyer} alt={`${next.title} – Flyer`} loading="lazy" className="aspect-square w-full object-cover sm:h-full sm:w-80 lg:w-96" />
                )}
            </div>
            {later.length > 0 && (
                <ul className="border-t border-black/15 px-6 py-4 text-sm font-bold sm:px-10">
                    {later.map((g) => (
                        <li key={g.date + g.title} className="flex flex-wrap items-center justify-between gap-2 py-1">
                            <span>{formatGigDate(g.date, lang)} · {g.title} · {g.city[lang]}</span>
                            <a href={g.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{t.cta}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NextShow;
