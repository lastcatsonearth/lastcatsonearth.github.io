import type { Lang } from "@/i18n/LanguageContext";

export type Member = {
    name: string;
    photo: string;
    role: Record<Lang, string>;
    bio: Record<Lang, string>;
};

// Order matters: first two = top row on the homepage, last three = bottom row.
export const members: Member[] = [
    {
        name: "Tony",
        photo: "/images/members/tony.webp",
        role: { en: "Vocals", de: "Gesang" },
        bio: {
            en: "Tony walks onstage like the room already belongs to him. With rap and punk in his DNA, he turns sharp verses, huge hooks and pure frontman instinct into the spark that pulls everyone into the show.",
            de: "Tony betritt die Bühne, als würde der Raum ihm bereits gehören. Rap und Punk liegen ihm im Blut; mit scharfen Versen, großen Hooks und echtem Frontmann-Instinkt zieht er alle in die Show.",
        },
    },
    {
        name: "Alessandro",
        photo: "/images/members/alessandro.webp",
        role: { en: "Guitar", de: "Gitarre" },
        bio: {
            en: "Alessandro brings the kind of guitar playing that makes people stop mid-conversation. He can deliver a legendary solo note for note, then twist it into something unmistakably his when the moment calls for it.",
            de: "Alessandro spielt Gitarre, bei der Gespräche kurz verstummen. Er kann ein legendäres Solo Note für Note liefern und es im nächsten Moment in etwas ganz Eigenes verwandeln.",
        },
    },
    {
        name: "Chris",
        photo: "/images/members/chris.webp",
        role: { en: "Guitar", de: "Gitarre" },
        bio: {
            en: "Chris — Chillone to those who know him — treats the guitar like a sampler, a rhythm weapon and a voice all at once. Hip-hop attitude, scratching energy and melodic instinct collide in his playing.",
            de: "Chris — für seine Leute Chillone — behandelt die Gitarre wie Sampler, Rhythmuswaffe und Stimme zugleich. Hip-Hop-Attitüde, Scratch-Energie und melodischer Instinkt treffen bei ihm aufeinander.",
        },
    },
    {
        name: "Tim",
        photo: "/images/members/tim.webp",
        role: { en: "Bass", de: "Bass" },
        bio: {
            en: "Tim is the young gun with the low-end superpower. He locks into the drums, pushes the guitars forward and keeps the whole machine moving with a groove that hits before you even realise you are dancing.",
            de: "Tim ist unser Young Gun mit der Superkraft im Tiefton. Er sitzt fest auf dem Schlagzeug, treibt die Gitarren nach vorne und hält die ganze Maschine mit einem unwiderstehlichen Groove in Bewegung.",
        },
    },
    {
        name: "Tom",
        photo: "/images/members/tom.webp",
        role: { en: "Drums", de: "Schlagzeug" },
        bio: {
            en: "Tom does not simply keep time — he drives the night. Technical, explosive and impossible to shake, he gives every song its pulse and every live room a reason to move.",
            de: "Tom hält nicht einfach nur den Takt — er treibt die Nacht an. Präzise, explosiv und nicht abzuschütteln gibt er jedem Song seinen Puls und jedem Raum einen Grund, sich zu bewegen.",
        },
    },
];
