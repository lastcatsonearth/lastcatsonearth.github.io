// Builds schema.org MusicEvent JSON-LD for gigs (upcoming) and shows (past).
// Google Search Console flags missing price / availability / organizer / endDate / description,
// so fill those fields in gigs.ts / shows.ts when you know them.
import { SITE_NAME, SITE_URL } from "@/config/site";

export type EventDetails = {
    /** Ticket price in EUR. 0 = free entry. Leave out if unknown. */
    price?: number;
    /** Ticket status, defaults to "InStock" */
    availability?: "InStock" | "SoldOut" | "PreOrder";
    /** Who runs the event (festival, venue, club) */
    organizer?: { name: string; url?: string };
    /** End time, HH:MM. Use endDate too if the show ends after midnight. */
    endTime?: string;
    /** YYYY-MM-DD, only needed if the event ends on a later day */
    endDate?: string;
};

/** "+01:00" / "+02:00" for Europe/Berlin on that day (handles summer time). */
const tzOffset = (date: string) => {
    const s = new Date(`${date}T12:00:00Z`).toLocaleString("en-US", { timeZone: "Europe/Berlin", timeZoneName: "longOffset" });
    return s.match(/GMT([+-]\d{2}:\d{2})/)?.[1] ?? "+01:00";
};

const isoDateTime = (date: string, time?: string) => (time ? `${date}T${time}:00${tzOffset(date)}` : date);

type EventInput = EventDetails & {
    title: string;
    description: string;
    /** YYYY-MM-DD (or YYYY-MM for old shows without a known day) */
    date: string;
    /** Start time, HH:MM */
    time?: string;
    venue: string;
    city: string;
    countryCode: string;
    image: string;
    /** Page or event link */
    url: string;
    /** Ticket link, defaults to url */
    ticketUrl?: string;
};

export const musicEventJsonLd = (e: EventInput) => {
    const end = e.endDate ?? e.date;
    return {
        "@context": "https://schema.org",
        "@type": "MusicEvent",
        name: `${SITE_NAME} – ${e.title}`,
        description: e.description,
        startDate: isoDateTime(e.date, e.time),
        endDate: e.endTime ? isoDateTime(end, e.endTime) : end,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
            "@type": "Place",
            name: e.venue,
            address: { "@type": "PostalAddress", addressLocality: e.city, addressCountry: e.countryCode },
        },
        image: e.image.startsWith("http") ? e.image : `${SITE_URL}${e.image}`,
        url: e.url,
        offers: {
            "@type": "Offer",
            url: e.ticketUrl ?? e.url,
            availability: `https://schema.org/${e.availability ?? "InStock"}`,
            ...(e.price !== undefined && { price: e.price, priceCurrency: "EUR" }),
        },
        ...(e.organizer && { organizer: { "@type": "Organization", name: e.organizer.name, url: e.organizer.url } }),
        performer: { "@type": "MusicGroup", "@id": `${SITE_URL}/#musicgroup`, name: SITE_NAME, url: SITE_URL },
    };
};
