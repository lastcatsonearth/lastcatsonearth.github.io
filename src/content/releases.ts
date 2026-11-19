// Every released song has its own page at /music/<slug> (and /en/music/<slug>); /music lists them all.
// New release: add an entry at the TOP, drop mp3 + webp into src/assets/booking/music/<slug>/,
// add a 1200×630 /public/og-<slug>.jpg and both URLs to public/sitemap.xml.
import type { Lang } from "@/i18n/LanguageContext";
import { socials } from "@/config/site";

import underwaterAudio from "@/assets/booking/music/underwater/underwater.mp3";
import underwaterCover from "@/assets/booking/music/underwater/underwater.webp";
import neverStopAudio from "@/assets/booking/music/never_stop/never_stop.mp3";
import neverStopCover from "@/assets/booking/music/never_stop/never_stop.webp";
import flashbackAudio from "@/assets/booking/music/flashback/flashback.mp3";
import flashbackCover from "@/assets/booking/music/flashback/flashback.webp";

export type Release = {
    slug: string;
    title: string;
    /** ISO date-time with timezone. Before this moment the page shows a countdown, after it the player. */
    releaseAt: string;
    cover: string;
    audio: string;
    /** /public path of the 1200×630 social image. */
    ogImage: string;
    /** The story behind the song. Paragraphs separated by a blank line. */
    text: Record<Lang, string>;
    lyrics: string;
    credits?: string;
    /** DistroKid HyperFollow: pre-save before the release, all-platforms page after it. */
    smartLink?: string;
    /** Streaming and store links, shown as buttons. */
    links: { label: string; href: string }[];
};

const appleArtist = socials.find((s) => s.label === "Apple Music")?.href ?? "";
const spotifyArtist = socials.find((s) => s.label === "Spotify")?.href ?? "";

export const releases: Release[] = [
    {
        slug: "underwater",
        title: "UNDERWATER",
        releaseAt: "2026-11-27T00:00:00+01:00",
        cover: underwaterCover,
        audio: underwaterAudio,
        ogImage: "/og-underwater.jpg",
        smartLink: "https://distrokid.com/hyperfollow/lastcatsonearth/underwater",
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
        credits: `Music: Alessandro Gessi
Lyrics: Antonio Coppola

Antonio Coppola – vocals
Alessandro Gessi – guitar
Christopher Kraus – guitar
Tim Tischler – bass
Thomas Matten – drums`,
        links: [
            { label: "Bandcamp", href: "https://lastcatsonearth.bandcamp.com/track/underwater" },
            { label: "Spotify", href: spotifyArtist },
            { label: "Apple Music", href: appleArtist },
        ],
    },
    {
        slug: "never-stop",
        title: "NEVER STOP",
        releaseAt: "2026-09-11T00:00:00+02:00",
        cover: neverStopCover,
        audio: neverStopAudio,
        ogImage: "/og-never-stop.jpg",
        text: {
            de: "NEVER STOP ist eine Hymne voller Energie über unaufhaltsamen Antrieb und Ehrgeiz. Über einem gnadenlosen Hook klettert der Erzähler ohne Decke nach oben, stapelt Flows und macht jedes Wort zu einer Investition. Hustle und Wortspiel werden zu einem Weg, sich zu befreien.\n\nDer Song ist in Münchens Straßen verwurzelt: die Isar, die scharfen Kanten von Giesing, Zigarettenrauch und das Echo der Züge am Hauptbahnhof. Diese Bilder rahmen eine Geschichte vom Rand bis in die Schlagzeilen. Zwischen den Punchlines blitzt eine sinnliche, provokante Seite auf: Verführung und Swagger laufen Seite an Seite.\n\nRoh, selbstbewusst und voller Bewegung: ein Aufruf, nie stehen zu bleiben, bis zum letzten Schrei: NEVER STOP!",
            en: "Never Stop is a high-energy anthem about unstoppable drive and ambition. Over a relentless hook, the narrator climbs with no ceiling, stacks flows and turns every word into an investment. Hustle and wordplay become a way to break free.\n\nThe song is rooted in Munich's streets: the Isar, the sharp edges of Giesing, cigarette smoke and echoing trains at the Hauptbahnhof. Those images frame a story of grinding from the margins to the headlines. Between the punchlines, a sensual, provocative streak shows up as seduction and swagger running side by side.\n\nIt's raw, cocky and kinetic, a call to keep moving that pushes all the way to the final shout: NEVER STOP!",
        },
        lyrics: `never stop (no ceilin' when I climb)
never stop (free myself from desire)
never stop (let me take you from behind)
never stop (yeah I stack every flow cause I..)
NEVER STOP!

do you wanna come down? comin downstairs
ready for the knockdown? time to get paid
Isar flows into Munich cracks, Giesing like a razor blade
Punchline to timeline, I invest in what I say

spin words around, we do it for the better
no slowing down, can't catch me on your radar
you can't stop me now!
kick it with your friends when I tell you "move around"

you cannot stop it, you cannot stop (movin' around)
you cannot stop it, you cannot stop (movin' around)
you cannot stop it, you cannot stop (movin' around)

do you wanna come down? comin downstairs
ready for the knockdown? time to get paid

rhyme-driller, time-killer
top-thriller, proud-sinner
be my fella now, not my filler
d0n't fear no flotilla for guerilla

In HBF, smoke of cigarettes
hollow echoes from the trains
Margins to headlines, I compound what I make

all of your acid trips
melt on your finger tips-tips
now put here both your lips
now and forever

now get you in your slips
show me all of your tricks-tricks
now put here both your lips
now and forever

let me get a couple things straight
let me tell you one thing now
do you hear me? can you hear me well?
never stop me
never stop me, boy
never, never, never, never (moving around)
never, never, never, never (moving around)

never stop (no ceilin' when I climb)
never stop (free myself from desire)
never stop (let me take you from behind)
never stop (yeah I stack every flow cause I..)
NEVER STOP!`,
        links: [
            { label: "Bandcamp", href: "https://lastcatsonearth.bandcamp.com/track/never-stop" },
            { label: "Spotify", href: "https://open.spotify.com/track/7AJohGsgWQTzB32uLrYuYk" },
            { label: "Apple Music", href: appleArtist },
        ],
    },
    {
        slug: "flashback",
        title: "FLASHBACK!",
        releaseAt: "2026-03-22T00:00:00+01:00",
        cover: flashbackCover,
        audio: flashbackAudio,
        ogImage: "/og-flashback.jpg",
        text: {
            de: "FLASHBACK! ist ein Song über überwältigende Anziehung, verstrickt mit Nostalgie. Der Erzähler sieht Schmerz in den Augen des anderen und etwas, das zurückgeblieben ist. Er bleibt unerreichbar, verloren in den Bildern in seinem Kopf, doch in dem Moment, in dem er sie hereinkommen sieht, beschleunigt alles und er verliert die Kontrolle.\n\nDer obsessive, wiederholte Refrain macht die Begegnung zu einer Erinnerung, die immer wieder zurückschlägt, irgendwo zwischen Erlebtem und Ersehntem. Am Ende baut das wiederholte „I know what you want“ die Spannung auf, bis sich die Perspektive dreht: Auch sie will den Flashback.\n\nEin Track für spät in der Nacht, voller Spannung, gebaut auf Wiederholung und einem steigenden Build, zwischen Romantik und Hunger.",
            en: "Flashback is a song about overwhelming attraction tangled up with nostalgia. The narrator sees pain and something left behind in the other person's eyes. He stays out of reach, lost in the pictures in his head, but the moment he sees her walk in, everything speeds up and he starts losing control.\n\nThe obsessive, repeated chorus turns the encounter into a memory that keeps hitting back, halfway between something lived and something wanted. In the ending, the repeated “I know what you want” builds the tension until the perspective flips: she wants the flashback too.\n\nIt's a late-night, high-tension track built on repetition and a rising build, caught between romance and hunger.",
        },
        lyrics: `I see the pain dance in your eyes
You look ahead but something has been left behind
I know you want me tonight
I'm out of reach, I live of pictures on my mind

But then I see you walking, lights break down when you come out
You don't say a word but I travel at the speed of sound
I get a little reckless, stop to pull me down
Your hands find my skin, I'm already losing ground

I'm gonna have a flashback, flashback
I'm gonna have a flashback, flashback
I'm gonna have a flashback, flashback
I'm gonna have a flashback, flashback

But I don't want your time
I just need these eyes
You and me, on fire
For the best time of my life
I'm sure about it!

But then I see you walking, lights break down when you come out
You don't say a word but I travel at the speed of sound
Find me in your eyes tonight, darling, darling
Pull me close, hold me tight tonight, darling, darling

I know what you want, I know what you want
I know what you want, I know what you want
I know what you want, I know what you want

I know you want a flashback!`,
        links: [
            { label: "Bandcamp", href: "https://lastcatsonearth.bandcamp.com/track/flashback" },
            { label: "Spotify", href: "https://open.spotify.com/track/71CmWXdlgbG0qiwAzn459K" },
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
