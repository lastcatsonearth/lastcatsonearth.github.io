// Singles with their own page at /music/<slug> (and /en/music/<slug>).
// New release: add an entry at the TOP, drop mp3 + webp into src/assets/booking/music/<slug>/,
// and add both URLs to public/sitemap.xml.
import type { Lang } from "@/i18n/LanguageContext";
import { socials } from "@/config/site";

import underwaterAudio from "@/assets/booking/music/underwater/underwater.mp3";
import underwaterCover from "@/assets/booking/music/underwater/underwater.webp";

export type Release = {
    slug: string;
    title: string;
    /** ISO date-time with timezone. Before this moment the page shows a countdown, after it the player. */
    releaseAt: string;
    cover: string;
    audio: string;
    /** /public path of the 1200×630 social image. */
    ogImage: string;
    text: Record<Lang, string>;
    lyrics: string;
    credits?: Record<Lang, string>;
    /** Streaming links. Fill them in as soon as the platforms publish the track. */
    links: { label: string; href: string }[];
};

const spotifyArtist = socials.find((s) => s.label === "Spotify")?.href ?? "";
const appleArtist = socials.find((s) => s.label === "Apple Music")?.href ?? "";

export const releases: Release[] = [
    {
        slug: "underwater",
        title: "UNDERWATER",
        releaseAt: "2026-11-27T00:00:00+01:00",
        cover: underwaterCover,
        audio: underwaterAudio,
        ogImage: "/og-underwater.jpg",
        text: {
            de: "UNDERWATER ist der neue Song von Last Cats on Earth: ein Hilferuf aus der Tiefe, der langsam zur Hymne wird. Erst zieht dich das Wasser nach unten, dann greifen Hände nach dir, das Licht kommt zurück und am Ende steht eine Erkenntnis: Du bist nicht allein.",
            en: "UNDERWATER is the new song by Last Cats on Earth: a call for help from the deep that slowly turns into an anthem. First the water pulls you down, then hands reach for you, the lights come back on, and in the end there is one thing left to know: you are not alone.",
        },
        lyrics: `I'm drowning, baby, deep beneath the sea,
The water keeps on pulling down on me,
Reach out your hand before it's too late,
Come and save me, darling, before I'm meeting my fate.

Can't see the shore from here, under the water,
hard to breathe down here, under the water,
Your name comes in and out, under the water,
Pull me up one more time, under the water.

Pull me close, take my heart, baby just don't let me go
Hands on me, hands on me, hands on me, I feel it slow
Lights on me, lights on me, lights on me, I start to know
I am not alone!

Pull me now, pull me now, pull and just don't let me go
Hands on me, hands on me, hands on me—I feel it slow
Lights on me, lights on me, lights on me—I start to know
I am not alone!

I'm drowning, baby, deep into your heart,
The water pulls me under, I can't find your love,
Reach out your hand before I drift too far,
Come and save me where you are.

Can't see the shore from here, under the water,
hard to breathe down here, under the water,
Your name comes in and out, under the water,
Pull me up one more time, under the water.

Hey oh, hey oh, hey oh, will you make me stay?
Hey oh, hey oh, hey oh, will you make me stay?`,
        links: [
            { label: "Spotify", href: spotifyArtist },
            { label: "Apple Music", href: appleArtist },
        ],
    },
];

export const latestRelease = releases[0];

export const findRelease = (slug?: string) => releases.find((r) => r.slug === slug);

export const formatReleaseDate = (iso: string, lang: Lang) =>
    new Date(iso).toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Europe/Berlin",
    });
