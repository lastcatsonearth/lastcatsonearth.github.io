// Copy for the SEO landing pages (/munich-rock-band, /live-band-munich, ...).
// One entry per page, each with German + English text. Layout lives in pages/LandingPage.tsx.
//
// Facts used here (keep them true!): 5 members, based in Munich, originals + covers or both,
// sets up to 2–3 hours, PA can be organised but venue PA preferred, travel beyond Bavaria.
import type { Lang } from "@/i18n/LanguageContext";

import zamanand5 from "@/assets/booking/photos/zamanand/5.webp";
import zamanand9 from "@/assets/booking/photos/zamanand/9.webp";
import zamanand11 from "@/assets/booking/photos/zamanand/11.webp";
import zamanand13 from "@/assets/booking/photos/zamanand/13.webp";
import zamanand16 from "@/assets/booking/photos/zamanand/16.webp";
import zamanand18 from "@/assets/booking/photos/zamanand/18.webp";
import zamanand21 from "@/assets/booking/photos/zamanand/21.webp";
import renazzo3 from "@/assets/booking/photos/renazzo/3.webp";
import renazzo4 from "@/assets/booking/photos/renazzo/4.webp";
import renazzo6 from "@/assets/booking/photos/renazzo/6.webp";
import renazzo7 from "@/assets/booking/photos/renazzo/7.webp";
import utting1 from "@/assets/booking/photos/alte_utting/photo_1.webp";
import utting2 from "@/assets/booking/photos/alte_utting/photo_2.webp";
import utting3 from "@/assets/booking/photos/alte_utting/photo_3.webp";
import utting4 from "@/assets/booking/photos/alte_utting/photo_4.webp";

export type LandingKey = "munich" | "live" | "party" | "cover" | "corporate";

/** URL path (without /en) for each landing page. Changing one = also add a redirect in public/_redirects. */
export const landingPath: Record<LandingKey, string> = {
    munich: "/munich-rock-band",
    live: "/live-band-munich",
    party: "/party-band-munich",
    cover: "/cover-band-munich",
    corporate: "/corporate-event-band-munich",
};

/** Short names, used for the "more pages" links and the footer. */
export const landingLabel: Record<LandingKey, Record<Lang, string>> = {
    munich: { de: "Rockband München", en: "Munich rock band" },
    live: { de: "Liveband München", en: "Live band Munich" },
    party: { de: "Partyband München", en: "Party band Munich" },
    cover: { de: "Coverband München", en: "Cover band Munich" },
    corporate: { de: "Band für Firmenfeiern", en: "Corporate event band" },
};

type Img = { src: string; alt: string };

/** Hero image + optional Tailwind object-position class to choose the crop (photos are portrait). */
type HeroImg = Img & { position?: string; /** Different photo for phones (portrait screens) */ mobileSrc?: string };

/** Things that don't change with the language. */
type LandingMedia = {
    hero: HeroImg;
    gallery: [Img, Img];
    /** YouTube id of the featured live video */
    videoId: string;
    /** Show the full member bios (only on the main band page) */
    lineup?: boolean;
    /** Show the setlist block */
    setlist?: boolean;
};

export type LandingCopy = {
    seo: { title: string; description: string };
    hero: { kicker: string; title: string; highlight: string; intro: string };
    /** 3–4 short fact chips under the hero */
    facts: string[];
    pitch: { kicker: string; heading: string; body: string[] };
    points: { title: string; text: string }[];
    video: { heading: string; caption: string };
    setlist?: { heading: string; intro: string };
    faq: { q: string; a: string }[];
    cta: { heading: string; text: string; mailSubject: string };
};

export const landingMedia: Record<LandingKey, LandingMedia> = {
    munich: {
        hero: { src: zamanand18, mobileSrc: zamanand11, alt: "Last Cats on Earth live auf der Bühne beim Zamanand Festival in München", position: "object-[center_85%]" },
        gallery: [
            { src: zamanand5, alt: "Sänger Tony von Last Cats on Earth im blauen Bühnenlicht" },
            { src: zamanand13, alt: "Gitarrist Alessandro beim Solo auf dem Zamanand Festival" },
        ],
        videoId: "k0L_bSeLRPI",
        lineup: true,
    },
    live: {
        hero: { src: zamanand16, alt: "Liveband Last Cats on Earth unter gelben Scheinwerfern auf einer Open-Air-Bühne in München", position: "object-[center_70%]" },
        gallery: [
            { src: renazzo3, alt: "Last Cats on Earth bei Nacht auf der Bühne in rotem Licht" },
            { src: zamanand9, alt: "Bassist Tim von Last Cats on Earth live" },
        ],
        videoId: "dWhzsrdGyko",
    },
    party: {
        hero: { src: renazzo7, alt: "Partyband Last Cats on Earth live vor dem Band-Banner" },
        gallery: [
            { src: renazzo6, alt: "Sänger Tony mitten in der Show, nah am Publikum" },
            { src: renazzo4, alt: "Last Cats on Earth mit Gastsängerin unter grünem Bühnenlicht" },
        ],
        videoId: "AM9d46YrdaM",
        setlist: true,
    },
    cover: {
        hero: { src: zamanand11, alt: "Coverband Last Cats on Earth: Sänger und Gitarrist tanzen auf der Bühne" },
        gallery: [
            { src: utting2, alt: "Last Cats on Earth spielen in der Alten Utting in München" },
            { src: utting3, alt: "Gitarrist und Sänger von Last Cats on Earth mitten im Publikum" },
        ],
        videoId: "iqeK2wgDBOk",
        setlist: true,
    },
    corporate: {
        hero: { src: utting1, alt: "Last Cats on Earth spielen entspannt unter freiem Himmel in der Alten Utting" },
        gallery: [
            { src: utting4, alt: "Band und Gäste ganz nah beieinander bei einem Event in München" },
            { src: zamanand21, alt: "Last Cats on Earth verbeugen sich nach der Show" },
        ],
        videoId: "edZZoAsVDcA",
        setlist: true,
    },
};

// FAQ answers that several pages share – one place to keep them true.
const faqShared = {
    de: {
        pa: {
            q: "Bringt ihr eine eigene Anlage mit?",
            a: "Am liebsten spielen wir über die Anlage vor Ort. Wenn es keine gibt, organisieren wir die PA und kümmern uns um den Sound – sagt uns einfach in der Anfrage, was vorhanden ist.",
        },
        duration: {
            q: "Wie lange spielt ihr?",
            a: "Von einem kompakten Set bis zu 2–3 Stunden Musik, gern auch in mehreren Blöcken mit Pausen. Wir passen die Länge an euren Ablauf an.",
        },
        travel: {
            q: "Spielt ihr nur in München?",
            a: "München ist unsere Basis, aber wir spielen in ganz Bayern, in Deutschland und darüber hinaus – zuletzt zum Beispiel auf der Woodstock Party in Renazzo, Italien.",
        },
        mix: {
            q: "Spielt ihr eigene Songs oder Cover?",
            a: "Beides – und genau so viel davon, wie ihr wollt: ein Set nur mit eigenen Songs, eine Mischung oder reines Cover-Programm. Wir stellen die Setlist passend zum Abend zusammen.",
        },
        price: {
            q: "Was kostet die Band?",
            a: "Das hängt von Datum, Ort, Spieldauer und Technik ab. Schreibt uns diese Eckdaten und ihr bekommt ein konkretes Angebot.",
        },
    },
    en: {
        pa: {
            q: "Do you bring your own sound system?",
            a: "We prefer to play through the venue's PA. If there isn't one, we can organise the PA and take care of the sound – just tell us what's available when you get in touch.",
        },
        duration: {
            q: "How long do you play?",
            a: "Anything from a compact set to 2–3 hours of music, also split into several blocks with breaks. We fit the length to your schedule.",
        },
        travel: {
            q: "Do you only play in Munich?",
            a: "Munich is home, but we play all over Bavaria, Germany and beyond – most recently at the Woodstock Party in Renazzo, Italy.",
        },
        mix: {
            q: "Do you play originals or covers?",
            a: "Both – in whatever ratio you want: an all-originals set, a mix, or covers only. We build the setlist around your night.",
        },
        price: {
            q: "How much does the band cost?",
            a: "It depends on date, location, set length and tech. Send us those basics and you'll get a concrete quote.",
        },
    },
};

export const landingCopy: Record<LandingKey, Record<Lang, LandingCopy>> = {
    // ─────────────────────────────── Rockband München ───────────────────────────────
    munich: {
        de: {
            seo: {
                title: "Rockband München – Last Cats on Earth | Funk & Alternative Rock live",
                description: "Last Cats on Earth sind eine fünfköpfige Rockband aus München: Funk Rock, Alternative Rock, Rap und große Hooks. Eigene Songs, Cover, Live-Shows in Bayern und darüber hinaus.",
            },
            hero: {
                kicker: "Rockband aus München",
                title: "Fünf Cats.",
                highlight: "Ein Sound.",
                intro: "Hard Rock, Funk, Alternative, Rap und Pop-Rock-Energie in einem Set, das sich nicht in eine Schublade stecken lässt. Wir sind Last Cats on Earth – eine Rockband aus München, gebaut für die Bühne.",
            },
            facts: ["5 Musiker", "Basis München", "Eigene Songs + Cover", "Bayern · DE · EU"],
            pitch: {
                kicker: "Wer wir sind",
                heading: "Eine Münchner Rockband, die man nicht nebenbei hört.",
                body: [
                    "Last Cats on Earth sind Tony, Alessandro, Chris, Tim und Tom. Fünf Musiker mit sehr unterschiedlichen Wurzeln – Rap und Punk, klassisches Rock-Gitarrenspiel, Hip-Hop-Attitüde, Groove und pure Drum-Energie – und eine gemeinsame Idee: Live soll man Musik spüren, nicht nur hören.",
                    "Unsere eigenen Songs wie NEVER STOP und FLASHBACK! sind energiegeladen, tanzbar und direkt. Dazu kommen Cover, die wir uns zu eigen machen – von Red Hot Chili Peppers bis The Black Keys. Gespielt haben wir unter anderem auf dem Zamanand Festival, in der Alten Utting und im Shamrock in München.",
                ],
            },
            points: [
                { title: "Eigene Songs", text: "NEVER STOP und FLASHBACK! sind auf Spotify und Apple Music – und live noch besser." },
                { title: "Funk trifft Rock", text: "Riffs, Grooves, Rap-Parts und Hooks zum Mitsingen. Kein Song klingt wie der davor." },
                { title: "Direkt am Publikum", text: "Wir spielen nicht vor den Leuten, sondern mit ihnen. Jede Show ist ein bisschen anders." },
            ],
            video: { heading: "So klingt das live.", caption: "FLASHBACK! – live in der Alten Utting, München" },
            faq: [
                { q: "Was für Musik macht Last Cats on Earth?", a: "Funk Rock und Alternative Rock mit Einflüssen aus Hard Rock, Rap und Pop-Rock – eigene Songs und neu interpretierte Cover." },
                faqShared.de.mix,
                faqShared.de.travel,
                { q: "Wo kann ich eure Musik hören?", a: "Auf Spotify, Apple Music und YouTube. Unsere Releases NEVER STOP und FLASHBACK! kannst du auch direkt im Pressekit anhören." },
                faqShared.de.price,
            ],
            cta: { heading: "Habt ihr eine Bühne?", text: "Club, Festival oder eigene Veranstaltung: Schreibt uns Datum und Ort, wir melden uns.", mailSubject: "Anfrage Rockband München" },
        },
        en: {
            seo: {
                title: "Munich Rock Band – Last Cats on Earth | Funk & Alternative Rock Live",
                description: "Last Cats on Earth are a five-piece rock band from Munich: funk rock, alternative rock, rap and big hooks. Original songs, covers and live shows across Bavaria and beyond.",
            },
            hero: {
                kicker: "Rock band from Munich",
                title: "Five Cats.",
                highlight: "One sound.",
                intro: "Hard rock, funk, alternative, rap and pop-rock energy in one set that refuses to stay in one lane. We are Last Cats on Earth – a rock band from Munich, built for the stage.",
            },
            facts: ["5-piece band", "Based in Munich", "Originals + covers", "Bavaria · DE · EU"],
            pitch: {
                kicker: "Who we are",
                heading: "A Munich rock band you can't keep in the background.",
                body: [
                    "Last Cats on Earth are Tony, Alessandro, Chris, Tim and Tom. Five musicians with very different roots – rap and punk, classic rock guitar, hip-hop attitude, groove and raw drum power – and one shared idea: live music should be felt, not just heard.",
                    "Our own songs like NEVER STOP and FLASHBACK! are energetic, danceable and direct. On top of that we play covers we make our own – from Red Hot Chili Peppers to The Black Keys. We've played Zamanand Festival, Alte Utting and Shamrock in Munich, among others.",
                ],
            },
            points: [
                { title: "Original songs", text: "NEVER STOP and FLASHBACK! are out on Spotify and Apple Music – and even better live." },
                { title: "Funk meets rock", text: "Riffs, grooves, rap parts and sing-along hooks. No song sounds like the one before." },
                { title: "Right in the crowd", text: "We don't play at people, we play with them. Every show is a little different." },
            ],
            video: { heading: "This is what it sounds like live.", caption: "FLASHBACK! – live at Alte Utting, Munich" },
            faq: [
                { q: "What kind of music does Last Cats on Earth play?", a: "Funk rock and alternative rock with hard rock, rap and pop-rock influences – original songs and reworked covers." },
                faqShared.en.mix,
                faqShared.en.travel,
                { q: "Where can I listen to your music?", a: "On Spotify, Apple Music and YouTube. You can also play NEVER STOP and FLASHBACK! right in our press kit." },
                faqShared.en.price,
            ],
            cta: { heading: "Got a stage?", text: "Club, festival or your own event: send us the date and place and we'll get back to you.", mailSubject: "Booking request – Munich rock band" },
        },
    },

    // ─────────────────────────────── Liveband München ───────────────────────────────
    live: {
        de: {
            seo: {
                title: "Liveband München buchen | Last Cats on Earth – Rock & Funk live",
                description: "Liveband aus München für Clubs, Konzerte, Festivals und Events: Last Cats on Earth spielen Funk Rock und Alternative Rock mit eigenen Songs und Covern – bis zu 2–3 Stunden.",
            },
            hero: {
                kicker: "Liveband aus München",
                title: "Live ist",
                highlight: "unser Ding.",
                intro: "Clubs, Konzertreihen, Festivals, Stadtfeste: Last Cats on Earth bringen eine Live-Show auf die Bühne, die zwischen Hard Rock, Funk und Alternative pendelt – und den Raum nicht mehr loslässt.",
            },
            facts: ["Clubs & Festivals", "Bis 2–3 Std.", "Originale + Cover", "PA nach Absprache"],
            pitch: {
                kicker: "Die Liveband",
                heading: "Kein Hintergrund-Gedudel. Eine Show.",
                body: [
                    "Wer eine Liveband in München sucht, findet viele, die sauber nachspielen. Wir wollen mehr: Spannung, Wechsel, Momente, in denen das Publikum mitsingt, und Momente, in denen es einfach nur zuschaut. Funk-Grooves, harte Riffs, Rap-Parts und große Refrains – in einem Set.",
                    "Wir haben auf der großen Open-Air-Bühne beim Zamanand Festival gespielt, in der Alten Utting und im Shamrock in München und auf der Woodstock Party in Italien. Ob 45 Minuten im Line-up oder ein ganzer Abend: Wir stellen das Set auf eure Bühne ein.",
                ],
            },
            points: [
                { title: "Bühnenerprobt", text: "Vom Club bis zur Festivalbühne – wir wissen, wie man einen Raum liest." },
                { title: "Flexibles Set", text: "Kurzes Festival-Set oder 2–3 Stunden in mehreren Blöcken, eigene Songs oder Cover." },
                { title: "Unkomplizierte Technik", text: "Wir spielen über die Hausanlage oder organisieren die PA, wenn keine da ist." },
            ],
            video: { heading: "Eine ganze Show, ungeschnitten.", caption: "Komplette Live-Show – Woodstock Party, Renazzo (IT)" },
            faq: [
                { q: "Für welche Veranstaltungen kann man euch als Liveband buchen?", a: "Clubkonzerte, Konzertreihen, Festivals, Stadt- und Straßenfeste, Firmenevents und private Feiern – überall, wo Live-Musik der Mittelpunkt sein soll." },
                faqShared.de.duration,
                faqShared.de.pa,
                faqShared.de.travel,
                faqShared.de.price,
            ],
            cta: { heading: "Line-up noch offen?", text: "Schickt uns Datum, Venue und Slot-Länge – wir sagen euch schnell, ob wir können.", mailSubject: "Anfrage Liveband München" },
        },
        en: {
            seo: {
                title: "Live Band Munich | Book Last Cats on Earth – Rock & Funk Live",
                description: "Live band from Munich for clubs, concerts, festivals and events: Last Cats on Earth play funk rock and alternative rock, original songs and covers – up to 2–3 hours.",
            },
            hero: {
                kicker: "Live band from Munich",
                title: "Live is",
                highlight: "our thing.",
                intro: "Clubs, concert series, festivals, street parties: Last Cats on Earth bring a live show that swings between hard rock, funk and alternative – and doesn't let go of the room.",
            },
            facts: ["Clubs & festivals", "Up to 2–3 hrs", "Originals + covers", "PA on request"],
            pitch: {
                kicker: "The live band",
                heading: "Not background music. A show.",
                body: [
                    "Looking for a live band in Munich, you'll find plenty that play it safe. We want more: tension, contrast, moments where the crowd sings along and moments where they just watch. Funk grooves, heavy riffs, rap parts and big choruses – in one set.",
                    "We've played the big open-air stage at Zamanand Festival, Alte Utting and Shamrock in Munich, and the Woodstock Party in Italy. A 45-minute slot in a line-up or a whole night: we tune the set to your stage.",
                ],
            },
            points: [
                { title: "Stage-tested", text: "From club to festival stage – we know how to read a room." },
                { title: "Flexible set", text: "Short festival slot or 2–3 hours in several blocks, originals or covers." },
                { title: "Easy tech", text: "We play through the house PA, or organise one if there isn't any." },
            ],
            video: { heading: "A whole show, uncut.", caption: "Full live show – Woodstock Party, Renazzo (IT)" },
            faq: [
                { q: "What kind of events can I book you for as a live band?", a: "Club gigs, concert series, festivals, street and city festivals, company events and private parties – anywhere live music should be the main act." },
                faqShared.en.duration,
                faqShared.en.pa,
                faqShared.en.travel,
                faqShared.en.price,
            ],
            cta: { heading: "Line-up still open?", text: "Send us the date, venue and slot length – we'll tell you quickly if we're free.", mailSubject: "Booking request – live band Munich" },
        },
    },

    // ─────────────────────────────── Partyband München ───────────────────────────────
    party: {
        de: {
            seo: {
                title: "Partyband München buchen | Last Cats on Earth – Rock & Funk für eure Feier",
                description: "Partyband aus München für Geburtstage, Sommerfeste, Vereinsfeiern und private Partys: Rock- und Funk-Hits plus eigene Songs, bis zu 2–3 Stunden. Jetzt anfragen.",
            },
            hero: {
                kicker: "Partyband aus München",
                title: "Eure Party.",
                highlight: "Unser Sound.",
                intro: "Geburtstag, Sommerfest, Vereinsfeier oder einfach eine Nacht, die man nicht vergisst: Last Cats on Earth bringen Rock- und Funk-Hits, eigene Songs und eine Bühnenshow, die die Tanzfläche füllt.",
            },
            facts: ["Private Feiern", "Bis 2–3 Std.", "Hits + eigene Songs", "Ganz Bayern"],
            pitch: {
                kicker: "Die Partyband",
                heading: "Für Leute, die keine Lust auf Schlager-Medleys haben.",
                body: [
                    "Eine Partyband muss nicht nach Hochzeits-DJ klingen. Wir spielen Songs, die alle kennen – Red Hot Chili Peppers, The Black Keys, Santana – aber mit Druck, Groove und unserer eigenen Handschrift. Dazwischen eigene Nummern, die man nach dem zweiten Refrain mitsingt.",
                    "Ihr sagt uns, wie der Abend laufen soll: eher Konzert, eher Tanzfläche, alles auf einmal. Wir stellen Setlist und Länge darauf ein – bis zu 2–3 Stunden, gern in mehreren Blöcken.",
                ],
            },
            points: [
                { title: "Tanzfläche voll", text: "Grooves, die in die Beine gehen, und Hooks, die jeder kennt." },
                { title: "Setlist nach Wunsch", text: "Nur Hits, Mischung oder unsere eigenen Songs – ihr entscheidet." },
                { title: "Nah dran", text: "Wir spielen mitten in eurer Party, nicht über sie hinweg." },
            ],
            video: { heading: "Party-Energie, live.", caption: "Can't Stop (Red Hot Chili Peppers) – live in der Alten Utting" },
            setlist: { heading: "Ein Blick auf die Setlist", intro: "Ein paar Songs, die bei uns regelmäßig laufen – die komplette Setlist bauen wir für euren Abend." },
            faq: [
                { q: "Für welche Partys kann man euch buchen?", a: "Geburtstage, Jubiläen, Sommerfeste, Vereins- und Abschlussfeiern, Gartenpartys – überall, wo gefeiert wird und Live-Musik mehr sein soll als Hintergrund." },
                faqShared.de.mix,
                faqShared.de.duration,
                faqShared.de.pa,
                faqShared.de.price,
            ],
            cta: { heading: "Wann steigt die Party?", text: "Datum, Ort und ungefähre Gästezahl reichen für den Anfang.", mailSubject: "Anfrage Partyband München" },
        },
        en: {
            seo: {
                title: "Party Band Munich | Book Last Cats on Earth – Rock & Funk for Your Party",
                description: "Party band from Munich for birthdays, summer parties, club celebrations and private parties: rock and funk hits plus original songs, up to 2–3 hours. Get in touch.",
            },
            hero: {
                kicker: "Party band from Munich",
                title: "Your party.",
                highlight: "Our sound.",
                intro: "Birthday, summer party, club celebration or just a night nobody forgets: Last Cats on Earth bring rock and funk hits, original songs and a stage show that fills the dance floor.",
            },
            facts: ["Private parties", "Up to 2–3 hrs", "Hits + originals", "All of Bavaria"],
            pitch: {
                kicker: "The party band",
                heading: "For people who don't want the usual medley.",
                body: [
                    "A party band doesn't have to sound like a wedding DJ. We play songs everyone knows – Red Hot Chili Peppers, The Black Keys, Santana – but with punch, groove and our own handwriting. In between: our own tracks that people sing along to by the second chorus.",
                    "You tell us how the night should go: more concert, more dance floor, all of it at once. We fit setlist and length to it – up to 2–3 hours, split into blocks if you like.",
                ],
            },
            points: [
                { title: "Full dance floor", text: "Grooves that hit the legs and hooks everyone knows." },
                { title: "Your setlist", text: "Hits only, a mix, or our own songs – your call." },
                { title: "Up close", text: "We play right in the middle of your party, not over it." },
            ],
            video: { heading: "Party energy, live.", caption: "Can't Stop (Red Hot Chili Peppers) – live at Alte Utting" },
            setlist: { heading: "A peek at the setlist", intro: "A few songs we play a lot – the full setlist gets built around your night." },
            faq: [
                { q: "What kind of parties can I book you for?", a: "Birthdays, anniversaries, summer parties, club and graduation parties, garden parties – anywhere people celebrate and live music should be more than background." },
                faqShared.en.mix,
                faqShared.en.duration,
                faqShared.en.pa,
                faqShared.en.price,
            ],
            cta: { heading: "When's the party?", text: "Date, place and a rough guest count are enough to start.", mailSubject: "Booking request – party band Munich" },
        },
    },

    // ─────────────────────────────── Coverband München ───────────────────────────────
    cover: {
        de: {
            seo: {
                title: "Coverband München | Last Cats on Earth – Rock- & Funk-Cover live",
                description: "Coverband aus München: Red Hot Chili Peppers, The Black Keys, Santana und mehr – live mit Druck und eigener Note. Reines Cover-Set oder Mix mit eigenen Songs, bis 2–3 Stunden.",
            },
            hero: {
                kicker: "Coverband aus München",
                title: "Songs, die ihr kennt.",
                highlight: "So habt ihr sie nie gehört.",
                intro: "Last Cats on Earth spielen Rock- und Funk-Klassiker nicht vom Blatt, sondern mit Druck, Groove und eigener Handschrift. Reines Cover-Programm oder gemischt mit unseren eigenen Songs – wie ihr wollt.",
            },
            facts: ["Rock & Funk", "Reines Cover-Set möglich", "Bis 2–3 Std.", "München & Umgebung"],
            pitch: {
                kicker: "Die Coverband",
                heading: "Nachspielen kann jeder. Wir drehen auf.",
                body: [
                    "Eine gute Coverband spielt die Songs, die alle hören wollen. Eine richtig gute macht daraus einen Moment. Bei uns treffen Red Hot Chili Peppers auf Rap-Parts, The Black Keys auf Funk-Gitarre und Santana auf eine Rhythmusgruppe, die nicht stillsteht.",
                    "Weil wir auch eigene Songs schreiben, klingt jedes Cover nach uns – ohne das Original zu verbiegen. Ihr könnt ein reines Cover-Set buchen, eine Mischung, oder wir entscheiden spontan nach Stimmung im Raum.",
                ],
            },
            points: [
                { title: "Hits mit Haltung", text: "Bekannte Songs, live gespielt mit Energie statt Playback-Gefühl." },
                { title: "Rock bis Funk", text: "Vom Gitarren-Riff bis zum Slap-Groove – die Setlist hat Tempo." },
                { title: "Plus eigene Songs", text: "Wenn ihr wollt, mischen wir NEVER STOP und FLASHBACK! dazu." },
            ],
            video: { heading: "Hört selbst.", caption: "Dani California (Red Hot Chili Peppers) – live im Shamrock, München" },
            setlist: { heading: "Aus unserem Cover-Repertoire", intro: "Ein Auszug – live auf YouTube zu sehen. Das Repertoire wächst, und Wünsche sprechen wir gern ab." },
            faq: [
                { q: "Welche Songs spielt ihr als Coverband?", a: "Vor allem Rock und Funk – zum Beispiel Dani California und Can't Stop von den Red Hot Chili Peppers, Lonely Boy von The Black Keys, Hard to Handle und Smooth. Die Setlist stellen wir für euren Anlass zusammen." },
                { q: "Kann man ein reines Cover-Set buchen?", a: "Ja. Wir spielen reine Cover-Sets, Mischungen mit eigenen Songs oder nur eigene Musik – je nachdem, was zu eurem Event passt." },
                { q: "Erfüllt ihr Songwünsche?", a: "Sprecht uns an. Was zu uns passt und sich vorbereiten lässt, nehmen wir gern ins Programm." },
                faqShared.de.duration,
                faqShared.de.pa,
            ],
            cta: { heading: "Welche Songs wollt ihr hören?", text: "Schreibt uns Datum, Ort und ein paar Lieblingssongs – wir melden uns mit einem Vorschlag.", mailSubject: "Anfrage Coverband München" },
        },
        en: {
            seo: {
                title: "Cover Band Munich | Last Cats on Earth – Rock & Funk Covers Live",
                description: "Cover band from Munich: Red Hot Chili Peppers, The Black Keys, Santana and more – played live with punch and our own twist. Covers-only set or mixed with originals, up to 2–3 hours.",
            },
            hero: {
                kicker: "Cover band from Munich",
                title: "Songs you know.",
                highlight: "Never heard like this.",
                intro: "Last Cats on Earth don't play rock and funk classics by the book – we play them with punch, groove and our own handwriting. Covers only or mixed with our own songs – your call.",
            },
            facts: ["Rock & funk", "Covers-only set possible", "Up to 2–3 hrs", "Munich & around"],
            pitch: {
                kicker: "The cover band",
                heading: "Anyone can copy. We turn it up.",
                body: [
                    "A good cover band plays the songs everyone wants to hear. A really good one turns them into a moment. With us, Red Hot Chili Peppers meet rap parts, The Black Keys meet funk guitar and Santana meets a rhythm section that never sits still.",
                    "Because we also write our own songs, every cover sounds like us – without bending the original out of shape. Book a covers-only set, a mix, or let us read the room and decide on the night.",
                ],
            },
            points: [
                { title: "Hits with attitude", text: "Well-known songs, played live with energy instead of that backing-track feel." },
                { title: "Rock to funk", text: "From guitar riffs to slap grooves – the setlist keeps moving." },
                { title: "Plus originals", text: "If you like, we mix in NEVER STOP and FLASHBACK!." },
            ],
            video: { heading: "Hear for yourself.", caption: "Dani California (Red Hot Chili Peppers) – live at Shamrock, Munich" },
            setlist: { heading: "From our cover repertoire", intro: "A selection – you can watch them live on YouTube. The repertoire keeps growing, and we're happy to talk about requests." },
            faq: [
                { q: "What songs do you play as a cover band?", a: "Mostly rock and funk – for example Dani California and Can't Stop by Red Hot Chili Peppers, Lonely Boy by The Black Keys, Hard to Handle and Smooth. We build the setlist for your occasion." },
                { q: "Can I book a covers-only set?", a: "Yes. We play covers-only sets, mixes with our own songs, or originals only – whatever fits your event." },
                { q: "Do you take song requests?", a: "Ask us. If it suits us and we can prepare it, we're happy to add it." },
                faqShared.en.duration,
                faqShared.en.pa,
            ],
            cta: { heading: "Which songs do you want to hear?", text: "Send us the date, place and a few favourite songs – we'll come back with a suggestion.", mailSubject: "Booking request – cover band Munich" },
        },
    },

    // ─────────────────────────────── Firmenfeier ───────────────────────────────
    corporate: {
        de: {
            seo: {
                title: "Band für Firmenfeier München | Last Cats on Earth – Live-Musik für Firmenevents",
                description: "Band für Firmenfeiern, Sommerfeste und Weihnachtsfeiern in München: Last Cats on Earth spielen Rock- und Funk-Hits und eigene Songs live – flexibel von Dinner-Set bis Party.",
            },
            hero: {
                kicker: "Band für Firmenfeiern in München",
                title: "Nicht die übliche",
                highlight: "Firmenfeier-Band.",
                intro: "Und genau deshalb redet man danach noch drüber. Last Cats on Earth bringen Rock, Funk und echte Live-Energie auf Sommerfest, Weihnachtsfeier oder Firmenjubiläum – abgestimmt auf euren Ablauf.",
            },
            facts: ["Sommerfest · Weihnachtsfeier", "Bis 2–3 Std. in Blöcken", "Cover, Originale oder Mix", "PA nach Absprache"],
            pitch: {
                kicker: "Live-Musik für Firmenevents",
                heading: "Euer Team hat Besseres verdient als Fahrstuhlmusik.",
                body: [
                    "Wir sind keine Galaband mit Smoking und Standard-Repertoire – wir sind eine Rockband aus München. Für eure Firmenfeier heißt das: Songs, die alle kennen, gespielt mit Spaß und Druck, und ein Abend, der sich nicht nach Pflichttermin anfühlt.",
                    "Gleichzeitig wissen wir, dass ein Firmenevent einen Ablauf hat. Wir spielen in Blöcken um Reden und Essen herum, fangen ruhiger an, wenn ihr wollt, und drehen auf, wenn die Tanzfläche bereit ist. Technik und Zeitplan klären wir vorab mit euch oder eurer Eventagentur.",
                ],
            },
            points: [
                { title: "Passt in euren Ablauf", text: "Mehrere Blöcke, Pausen für Reden und Dinner, Lautstärke nach Situation." },
                { title: "Für alle Altersgruppen", text: "Klassiker von Santana bis Red Hot Chili Peppers – da singt auch die Chefetage mit." },
                { title: "Ein Ansprechpartner", text: "Direkte Absprache mit der Band zu Setlist, Technik und Timing." },
            ],
            video: { heading: "Smooth – im wahrsten Sinne.", caption: "Smooth (Santana) – live in der Alten Utting, München" },
            setlist: { heading: "Songs, die auf Firmenfeiern funktionieren", intro: "Ein Auszug aus dem Repertoire – die Setlist stimmen wir auf euer Publikum ab." },
            faq: [
                { q: "Spielt ihr auf Sommerfesten und Weihnachtsfeiern?", a: "Ja – Sommerfeste, Weihnachtsfeiern, Firmenjubiläen, Teamevents und Kundenabende. Wir sind nicht die klassische Business-Band, und genau das schätzen viele Teams." },
                { q: "Könnt ihr auch leiser bzw. als Hintergrundmusik spielen?", a: "Wir können ruhiger einsteigen, etwa zum Empfang, und die Energie im Lauf des Abends steigern. Reine Hintergrundmusik ist aber nicht unsere Stärke – wir sind eine Rockband." },
                faqShared.de.duration,
                faqShared.de.pa,
                { q: "Stellt ihr eine Rechnung?", a: "Ja, ihr bekommt ein Angebot und eine ordentliche Rechnung. Schreibt uns Datum, Ort, Gästezahl und gewünschte Spieldauer." },
            ],
            cta: { heading: "Firmenfeier in Planung?", text: "Datum, Location, Gästezahl und grober Ablauf – mehr brauchen wir für ein Angebot nicht.", mailSubject: "Anfrage Band für Firmenfeier" },
        },
        en: {
            seo: {
                title: "Corporate Event Band Munich | Last Cats on Earth – Live Music for Company Parties",
                description: "Band for company parties, summer parties and Christmas parties in Munich: Last Cats on Earth play rock and funk hits and original songs live – flexible from dinner set to party.",
            },
            hero: {
                kicker: "Corporate event band in Munich",
                title: "Not your usual",
                highlight: "company party band.",
                intro: "That's exactly why people keep talking about it afterwards. Last Cats on Earth bring rock, funk and real live energy to summer parties, Christmas parties or company anniversaries – fitted to your schedule.",
            },
            facts: ["Summer & Christmas parties", "Up to 2–3 hrs in blocks", "Covers, originals or mix", "PA on request"],
            pitch: {
                kicker: "Live music for company events",
                heading: "Your team deserves better than elevator music.",
                body: [
                    "We're not a gala band in tuxedos with a standard repertoire – we're a rock band from Munich. For your company party that means songs everyone knows, played with fun and punch, and a night that doesn't feel like a mandatory meeting.",
                    "At the same time, we know a company event has a schedule. We play in blocks around speeches and dinner, start quieter if you want and turn it up when the dance floor is ready. We sort out tech and timing with you or your event agency in advance.",
                ],
            },
            points: [
                { title: "Fits your schedule", text: "Several blocks, breaks for speeches and dinner, volume to match the moment." },
                { title: "For all ages", text: "Classics from Santana to Red Hot Chili Peppers – even management sings along." },
                { title: "One contact", text: "Talk directly to the band about setlist, tech and timing." },
            ],
            video: { heading: "Smooth – literally.", caption: "Smooth (Santana) – live at Alte Utting, Munich" },
            setlist: { heading: "Songs that work at company parties", intro: "A selection from our repertoire – we tune the setlist to your crowd." },
            faq: [
                { q: "Do you play summer parties and Christmas parties?", a: "Yes – summer parties, Christmas parties, company anniversaries, team events and client evenings. We're not the classic business band, and that's exactly what many teams like." },
                { q: "Can you play quieter, as background music?", a: "We can start softer, for example during the reception, and build up the energy through the night. Pure background music isn't our strength though – we're a rock band." },
                faqShared.en.duration,
                faqShared.en.pa,
                { q: "Do you issue an invoice?", a: "Yes, you get a quote and a proper invoice. Send us date, place, guest count and the set length you'd like." },
            ],
            cta: { heading: "Planning a company party?", text: "Date, venue, guest count and a rough schedule – that's all we need for a quote.", mailSubject: "Booking request – corporate event" },
        },
    },
};

/** Songs we have live on YouTube – used for the setlist block. */
export const setlist: { title: string; artist: string; videoId?: string }[] = [
    { title: "Dani California", artist: "Red Hot Chili Peppers", videoId: "iqeK2wgDBOk" },
    { title: "Can't Stop", artist: "Red Hot Chili Peppers", videoId: "AM9d46YrdaM" },
    { title: "Lonely Boy", artist: "The Black Keys", videoId: "rpMnFdiqLKU" },
    { title: "Hard to Handle", artist: "The Black Crowes", videoId: "Y27TPa3lVqk" },
    { title: "Smooth", artist: "Santana", videoId: "edZZoAsVDcA" },
    { title: "NEVER STOP", artist: "Last Cats on Earth" },
    { title: "FLASHBACK!", artist: "Last Cats on Earth", videoId: "k0L_bSeLRPI" },
];

/** Venues for the ticker under the hero. */
export const venues = ["Zamanand Festival · München", "Alte Utting · München", "Shamrock · München", "Woodstock Party · Renazzo (IT)"];
