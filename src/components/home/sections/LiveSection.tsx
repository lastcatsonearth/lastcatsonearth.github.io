import { useEffect, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { homeSpacing } from "@/config/layoutSpacing";
import crowdPhoto from "@/assets/booking/photos/zamanand/6.webp";

interface LiveSectionProps {
    copy: {
        liveLabel: string;
        live: string;
        liveLink: string;
    };
    setActiveVideoUrl: (url: string) => void;
    Reveal: React.ComponentType<{ children: React.ReactNode }>;
}

export const LiveSection = ({ copy, setActiveVideoUrl, Reveal }: LiveSectionProps) => {
    const [isLandscapePhone, setIsLandscapePhone] = useState(false);

    // Rilevamento isolato dell'orientamento orizzontale su schermi bassi (iPhone landscape)
    useEffect(() => {
        const checkOrientation = () => {
            const isLandscape = window.innerWidth > window.innerHeight && window.innerHeight < 550;
            setIsLandscapePhone(isLandscape);
        };
        checkOrientation();
        window.addEventListener("resize", checkOrientation);
        window.addEventListener("orientationchange", checkOrientation);
        return () => {
            window.removeEventListener("resize", checkOrientation);
            window.removeEventListener("orientationchange", checkOrientation);
        };
    }, []);

    return (
        <section
            id="live"
            className={`relative flex h-[calc(100dvh-4rem)] phone-landscape:h-dvh snap-start snap-always flex-col justify-center overflow-hidden border-y border-white/10 bg-black/40 px-4 pt-4 pb-2 sm:px-6 sm:pt-0 sm:pb-8 ${homeSpacing.liveSection}`}        >
            <div className="mx-auto w-full max-w-6xl">
                <Reveal>
                    {/* In modalità landscape per iPhone passa a una disposizione a 2 colonne affiancate */}
                    <div className={isLandscapePhone ? "grid grid-cols-2 gap-4 items-center" : "block"}>
                        <div className={`flex flex-col justify-between sm:flex-row sm:items-end ${isLandscapePhone ? "space-y-2" : homeSpacing.liveHeader}`}>
                            <div>
                                <p className={`font-bold uppercase tracking-[0.3em] text-cat-orange ${isLandscapePhone ? "text-[10px]" : "text-xs"}`}>
                                    {copy.liveLabel}
                                </p>
                                <h2 className={`font-bold uppercase leading-none ${isLandscapePhone ? "mt-0.5 text-2xl" : "mt-1 text-3xl sm:mt-3 sm:text-6xl"}`}>
                                    {copy.live}
                                </h2>
                            </div>
                            <Link
                                to="/music"
                                className={`inline-flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-white/60 hover:text-cat-orange ${isLandscapePhone ? "mt-1 text-[9px]" : "mt-1 text-[10px] sm:mt-0"
                                    }`}
                            >
                                {copy.liveLink} <ArrowUpRight className={isLandscapePhone ? "h-3 w-3" : "h-4 w-4"} />
                            </Link>
                        </div>

                        <button
                            type="button"
                            onClick={() => setActiveVideoUrl("https://www.youtube.com/embed/dWhzsrdGyko?autoplay=1")}
                            className={`group relative block w-full overflow-hidden border border-white/10 text-left ${isLandscapePhone ? "rounded-xl mt-0" : "mt-3 rounded-3xl sm:mt-6"
                                }`}
                        >
                            {/* Altezza ridotta a 160px ESCLUSIVAMENTE quando l'iPhone è ruotato */}
                            <img
                                src={crowdPhoto}
                                alt="Audience watching Last Cats on Earth live"
                                className={`w-full object-cover ${isLandscapePhone ? "h-[160px]" : "h-[340px] sm:h-[440px]"
                                    }`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div
                                className={`absolute flex items-center gap-3 font-bold uppercase tracking-[0.2em] ${isLandscapePhone
                                    ? "bottom-2.5 left-2.5 text-[9px]"
                                    : "bottom-4 left-4 text-xs sm:bottom-10 sm:left-10"
                                    }`}
                            >
                                <span
                                    className={`flex items-center justify-center rounded-full bg-cat-orange text-black transition group-hover:scale-110 ${isLandscapePhone ? "h-7 w-7" : "h-9 w-9 sm:h-10 sm:w-10"
                                        }`}
                                >
                                    <Play className={`fill-current ${isLandscapePhone ? "ml-0.5 h-3 w-3" : "ml-0.5 h-4 w-4"}`} />
                                </span>
                                Live energy, Munich and beyond
                            </div>
                        </button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};