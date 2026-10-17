// Past shows. Used by the /shows pages AND the photo gallery in the EPK (/booking).
// To add a show: add photos (see scripts/readme.md), add an entry here (newest first),
// then add its slug to public/sitemap.xml.
import type { Lang } from "@/i18n/LanguageContext";
import zamanand1 from "@/assets/booking/photos/zamanand/1.webp";
import zamanand6 from "@/assets/booking/photos/zamanand/6.webp";
import renazzo1 from "@/assets/booking/photos/renazzo/1.webp";
import utting2 from "@/assets/booking/photos/alte_utting/photo_2.webp";

export type Show = {
    slug: string;
    title: string;
    /** Folder name under src/assets/booking/photos/ */
    gallery: string;
    /** YYYY-MM */
    date: string;
    city: Record<Lang, string>;
    country: Record<Lang, string>;
    countryCode: string;
    image: string;
    secondImage: string;
    text: Record<Lang, string>;
};

export const shows: Show[] = [
    {
        slug: "zamanand-festival-munich-september-2026",
        title: "Zamanand Festival",
        gallery: "zamanand",
        date: "2026-09",
        city: { en: "Munich", de: "München" },
        country: { en: "Germany", de: "Deutschland" },
        countryCode: "DE",
        image: zamanand1,
        secondImage: zamanand6,
        text: {
            en: "A high-energy festival set in Munich, moving between hard rock, funk, alternative hooks and direct crowd work.",
            de: "Ein energiegeladenes Festival-Set in München – zwischen Hard Rock, Funk, Alternative-Hooks und direktem Kontakt zum Publikum.",
        },
    },
    {
        slug: "woodstock-party-renazzo-july-2026",
        title: "Woodstock Party",
        gallery: "renazzo",
        date: "2026-07",
        city: { en: "Renazzo", de: "Renazzo" },
        country: { en: "Italy", de: "Italien" },
        countryCode: "IT",
        image: renazzo1,
        secondImage: zamanand1,
        text: {
            en: "A live party set built for movement, connection and the kind of night where the audience becomes part of the show.",
            de: "Ein Party-Set, gebaut für Bewegung, Nähe und die Art von Nacht, in der das Publikum Teil der Show wird.",
        },
    },
    {
        slug: "alte-utting-munich-june-2026",
        title: "Alte Utting",
        gallery: "alte_utting",
        date: "2026-06",
        city: { en: "Munich", de: "München" },
        country: { en: "Germany", de: "Deutschland" },
        countryCode: "DE",
        image: utting2,
        secondImage: zamanand6,
        text: {
            en: "A Munich venue show bringing original material and reworked covers into an intimate, characterful room.",
            de: "Eine Club-Show in München mit eigenen Songs und neu gedachten Covern in einem intimen Raum mit viel Charakter.",
        },
    },
];

/** "September 2026" / "Sep 2026" in the given language. */
export const formatShowDate = (date: string, lang: Lang, month: "long" | "short" = "long") =>
    new Date(`${date}-01T12:00:00Z`).toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", { month, year: "numeric", timeZone: "UTC" });
