// PAST shows (the archive). Used by /shows, every /shows/<slug> page and the photo gallery in the EPK.
// To add a show: put photos in src/assets/booking/photos/<folder>/ and run `npm run thumbs`,
// add an entry here (newest first), then add /shows/<slug> + /en/shows/<slug> to public/sitemap.xml.
import type { Lang } from "@/i18n/LanguageContext";
import type { EventDetails } from "@/content/eventSchema";
import zamanand18 from "@/assets/booking/photos/zamanand/18.webp";
import renazzo7 from "@/assets/booking/photos/renazzo/7.webp";
import utting2 from "@/assets/booking/photos/alte_utting/photo_2.webp";

export type ShowVideo = { id: string; title: string };

export type Show = EventDetails & {
    slug: string;
    title: string;
    /** Folder name under src/assets/booking/photos/ */
    gallery: string;
    /** YYYY-MM */
    date: string;
    /** Exact day YYYY-MM-DD, if known (better for Google than just the month) */
    day?: string;
    /** Start time HH:MM, if known */
    time?: string;
    venue: Record<Lang, string>;
    city: Record<Lang, string>;
    country: Record<Lang, string>;
    countryCode: string;
    /** Cover photo (cards + hero of the show page) */
    image: string;
    /** Optional CSS object-position for the cover, e.g. "center 70%" */
    imagePosition?: string;
    /** One sentence: card teaser + meta description */
    text: Record<Lang, string>;
    /** Longer story for the show page (paragraphs) */
    story: Record<Lang, string[]>;
    /** YouTube videos recorded at this show */
    videos: ShowVideo[];
};

export const shows: Show[] = [
    {
        slug: "zamanand-festival-munich-september-2026",
        title: "Zamanand Festival",
        gallery: "zamanand",
        date: "2026-09",
        day: "2026-09-12",
        time: "21:00",
        price: 0,
        organizer: { name: "Zamanand Festival", url: "https://www.munich.travel/pois/maerkte-feste/corso-leopold-zamanand-festival" },
        venue: { de: "Ludwigstraße, Open-Air-Bühne", en: "Ludwigstraße, open-air stage" },
        city: { en: "Munich", de: "München" },
        country: { en: "Germany", de: "Deutschland" },
        countryCode: "DE",
        image: zamanand18,
        imagePosition: "center 85%",
        text: {
            en: "A high-energy set on the big open-air stage of Zamanand Festival, in the middle of Munich's Ludwigstraße.",
            de: "Ein energiegeladenes Set auf der großen Open-Air-Bühne des Zamanand Festivals, mitten auf der Münchner Ludwigstraße.",
        },
        story: {
            de: [
                "Beim Zamanand Festival wird die Ludwigstraße zwischen Odeonsplatz und Siegestor für ein Wochenende autofrei – ein kostenloses Straßenfestival mit Musik, Kultur und Mitmach-Aktionen, mitten in München.",
                "Bei der Herbstausgabe 2026 standen wir auf der großen Open-Air-Bühne: ein Festival-Set zwischen Hard Rock, Funk und Alternative, mit eigenen Songs, neu gedachten Covern und ganz viel direktem Kontakt zum Publikum.",
            ],
            en: [
                "At Zamanand Festival, Ludwigstraße between Odeonsplatz and Siegestor goes car-free for a weekend – a free street festival with music, culture and things to join in, right in the heart of Munich.",
                "At the 2026 autumn edition we played the big open-air stage: a festival set between hard rock, funk and alternative, with original songs, reworked covers and plenty of direct contact with the crowd.",
            ],
        },
        videos: [],
    },
    {
        slug: "woodstock-party-renazzo-july-2026",
        title: "Woodstock Party",
        gallery: "renazzo",
        date: "2026-07",
        day: "2026-07-24",
        time: "21:00",
        price: 0,
        organizer: { name: "Woodstock Party" },
        venue: { de: "Woodstock Party", en: "Woodstock Party" },
        city: { en: "Renazzo", de: "Renazzo" },
        country: { en: "Italy", de: "Italien" },
        countryCode: "IT",
        image: renazzo7,
        text: {
            en: "A full party set at the Woodstock Party in Renazzo, Italy – and the whole show is on YouTube.",
            de: "Ein komplettes Party-Set auf der Woodstock Party in Renazzo, Italien – die ganze Show gibt es auf YouTube.",
        },
        story: {
            de: [
                "Im Juli 2026 ging es für uns nach Italien: Auf der Woodstock Party in Renazzo, einem Ortsteil von Cento in der Emilia-Romagna, haben wir ein komplettes Party-Set gespielt.",
                "Rock, Funk, eigene Songs und Klassiker zum Mitsingen – die komplette Show gibt es ungeschnitten auf YouTube.",
            ],
            en: [
                "In July 2026 we took the show to Italy: at the Woodstock Party in Renazzo, a village near Cento in Emilia-Romagna, we played a full party set.",
                "Rock, funk, our own songs and sing-along classics – the whole show is on YouTube, uncut.",
            ],
        },
        videos: [{ id: "dWhzsrdGyko", title: "Full Show" }],
    },
    {
        slug: "alte-utting-munich-june-2026",
        title: "Alte Utting",
        gallery: "alte_utting",
        date: "2026-06",
        day: "2026-06-02",
        time: "21:00",
        price: 0,
        organizer: { name: "Alte Utting", url: "https://www.muenchen.de/veranstaltungen/veranstaltungsorte/alte-utting" },
        venue: { de: "Alte Utting, Sendling", en: "Alte Utting, Sendling" },
        city: { en: "Munich", de: "München" },
        country: { en: "Germany", de: "Deutschland" },
        countryCode: "DE",
        image: utting2,
        text: {
            en: "Summer show at Alte Utting – the old lake steamer on a railway bridge in Munich – with four songs filmed live.",
            de: "Sommer-Show in der Alten Utting – dem alten Ammersee-Dampfer auf einer Eisenbahnbrücke in München – mit vier live gefilmten Songs.",
        },
        story: {
            de: [
                "Die Alte Utting ist eines der ungewöhnlichsten Venues Münchens: ein ehemaliges Passagierschiff vom Ammersee, das auf einer alten Eisenbahnbrücke in Sendling steht.",
                "Im Juni 2026 haben wir dort unter freiem Himmel gespielt, ganz nah am Publikum. Eigene Songs wie FLASHBACK! und Cover von den Red Hot Chili Peppers, The Black Keys und Santana – vier davon haben wir live mitgefilmt.",
            ],
            en: [
                "Alte Utting is one of Munich's most unusual venues: a former Ammersee passenger ship sitting on an old railway bridge in Sendling.",
                "In June 2026 we played there in the open air, right next to the crowd. Our own songs like FLASHBACK! plus covers by Red Hot Chili Peppers, The Black Keys and Santana – four of them filmed live.",
            ],
        },
        videos: [
            { id: "k0L_bSeLRPI", title: "FLASHBACK!" },
            { id: "rpMnFdiqLKU", title: "Lonely Boy" },
            { id: "AM9d46YrdaM", title: "Can't Stop" },
            { id: "edZZoAsVDcA", title: "Smooth" },
        ],
    },
];

/** "September 2026" / "Sep 2026" in the given language. */
export const formatShowDate = (date: string, lang: Lang, month: "long" | "short" = "long") =>
    new Date(`${date}-01T12:00:00Z`).toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", { month, year: "numeric", timeZone: "UTC" });
