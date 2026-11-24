import { useLanguage } from "@/i18n/LanguageContext";
import heroPhoto from "@/assets/booking/photos/zamanand/1.webp";
import { Star } from "lucide-react";
import { CopyBioButton } from "./PressKit";
import { bios } from "@/content/press";
import type { ReactNode } from "react";
import { GOOGLE_REVIEWS_URL, googleRating } from "@/content/reviews";

// Bold the band name and song titles inside the plain-text bio (same text the copy button copies).
const HIGHLIGHT = /(Last Cats on Earth|FLASHBACK!|NEVER STOP|UNDERWATER)/;
const highlight = (text: string): ReactNode[] =>
    text.split(HIGHLIGHT).map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));

const translations = {
    en: {
        tagline: "Born in Munich. Made for the stage.",
        bioHeading: "LAST CATS ON EARTH",
        subHeading: "ELECTRONIC PRESS KIT",
    },
    de: {
        tagline: "Aus München. Für die Bühne gemacht.",
        bioHeading: "LAST CATS ON EARTH",
        subHeading: "ELECTRONIC PRESS KIT",
    }
};

const VideoMarquee = () => {
    const { lang } = useLanguage();
    const t = translations[lang];

    return (
        <section className="w-full max-w-6xl mx-auto px-4 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                {/* Colonna Sinistra: Foto visibile SOLO su desktop (hidden lg:block) */}
                <div className="hidden lg:block lg:col-span-5 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cat-orange to-amber-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
                    <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl">
                        <img
                            src={heroPhoto}
                            alt="Last Cats on Earth live performance"
                            className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                        </div>
                    </div>
                </div>

                {/* Colonna Destra (o tutto schermo su mobile): Press Kit & Bio */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                    <div className="border-l-4 border-cat-orange pl-5 sm:pl-6 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cat-orange">
                            {t.subHeading}
                        </p>
                        <h2 className="text-2xl sm:text-5xl font-black uppercase tracking-tight leading-none text-white">
                            {t.bioHeading}
                        </h2>
                        <p className="text-sm sm:text-base font-bold uppercase tracking-wider text-white/70">
                            {t.tagline}
                        </p>
                    </div>

                    <div className="space-y-2.5 sm:space-y-4 text-xs sm:text-sm leading-relaxed text-white/85 sm:pt-2">
                        {bios[lang].map((paragraph, i, all) => (
                            <p
                                key={i}
                                className={`border-t border-white/10 pt-2.5 sm:pt-3${i === all.length - 1 ? " text-cat-orange font-bold" : ""}`}
                            >
                                {highlight(paragraph)}
                            </p>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <CopyBioButton />
                        <a
                            href={GOOGLE_REVIEWS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-bold text-white/70 hover:text-cat-orange"
                        >
                            <Star className="h-3.5 w-3.5 fill-current text-cat-orange" />
                            {lang === "de" ? googleRating.rating : googleRating.ratingEn} · {googleRating.count} {lang === "de" ? "Google-Bewertungen" : "Google reviews"}
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default VideoMarquee;