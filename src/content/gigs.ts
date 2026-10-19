// UPCOMING shows. Add the next gig here – it then appears on the homepage, /shows and /links.
// Past dates hide themselves automatically (no need to delete them; move them to shows.ts with photos later).
import type { Lang } from "@/i18n/LanguageContext";
import type { EventDetails } from "@/content/eventSchema";
import maerchenbazarFlyer from "@/assets/flyers/maerchenbazar-2026-11-28.webp";

export type Gig = EventDetails & {
    /** YYYY-MM-DD */
    date: string;
    /** Optional start time, HH:MM */
    time?: string;
    title: string;
    venue: string;
    city: Record<Lang, string>;
    countryCode: string;
    /** Bandsintown event link (tickets / RSVP) */
    url: string;
    flyer?: string;
};

export const gigs: Gig[] = [
    {
        date: "2026-11-28",
        title: "Märchenbazar",
        venue: "Olympiapark Süd",
        city: { de: "München", en: "Munich" },
        countryCode: "DE",
        time: "19:30",
        url: "https://www.bandsintown.com/e/108894107",
        flyer: maerchenbazarFlyer,
        price: 0,
        endTime: "21:30",
        organizer: { name: "Märchenbazar München", url: "https://www.munich.travel/pois/maerkte-feste/maerchenbazar-muenchen" },
        ticketsFrom: "2026-10-19",
    },
];

/** Gigs from today on, soonest first. */
export const upcomingGigs = (today = new Date()) => {
    const todayStr = today.toISOString().slice(0, 10);
    return gigs.filter((g) => g.date >= todayStr).sort((a, b) => a.date.localeCompare(b.date));
};

/** "Sa., 28. Nov. 2026" / "Sat, 28 Nov 2026" */
export const formatGigDate = (date: string, lang: Lang, opts: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short", year: "numeric" }) =>
    new Date(`${date}T12:00:00Z`).toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", { ...opts, timeZone: "UTC" });
