import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import AudioPlayer from "@/components/booking/AudioPlayer";
import { homeSpacing } from "@/config/layoutSpacing";
import { useLocalePath } from "@/i18n/LanguageContext";
import Reveal from "@/components/Reveal";
import { useIsLandscapePhone } from "@/hooks/useIsLandscapePhone";

interface MusicSectionProps {
    copy: {
        releaseLabel: string;
        release: string;
        releaseBody: string;
        booking: string;
    };
}

export const MusicSection = ({ copy }: MusicSectionProps) => {
    const isLandscapePhone = useIsLandscapePhone();
    const p = useLocalePath();


    return (
        <section
            id="music"
            className={`flex h-[calc(100dvh-4rem)] phone-landscape:h-auto phone-landscape:overflow-visible phone-landscape:py-12 snap-start snap-always items-start pt-6 sm:items-center sm:pt-0 overflow-hidden ${homeSpacing.musicSection}`}        >
            <div
                className={`mx-auto w-full max-w-6xl ${isLandscapePhone
                    ? "grid grid-cols-2 items-center gap-4 px-2"
                    : `grid gap-2 sm:gap-0 lg:grid-cols-[1fr_0.8fr] lg:items-center ${homeSpacing.musicGrid}`
                    }`}
            >
                {/* Colonna Sinistra / Info */}
                <Reveal>
                    <div>
                        <p
                            className={`font-bold uppercase tracking-[0.3em] text-cat-orange ${isLandscapePhone ? "text-[10px]" : "text-xs"
                                }`}
                        >
                            {copy.releaseLabel}
                        </p>
                        <h2
                            className={`font-bold uppercase leading-none ${isLandscapePhone
                                ? "mt-1 text-2xl"
                                : "mt-2 text-3xl sm:mt-3 sm:text-6xl"
                                }`}
                        >
                            {copy.release}
                        </h2>


                        {/* sm+: full text */}
                        <p
                            className={`hidden sm:block text-justify leading-relaxed text-white/60 ${isLandscapePhone
                                ? "mt-2 text-sm leading-6"
                                : "mt-6 max-w-xl text-base leading-7"
                                }`}
                        >
                            {copy.releaseBody}
                        </p>

                        {/* Hidden on mobile portrait, shown on desktop & optionally landscape */}
                        <Link
                            to={p("/booking#contact")}
                            className={`items-center gap-2 rounded-full border border-cat-orange px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-cat-orange transition hover:bg-cat-orange hover:text-black ${isLandscapePhone ? "hidden" : "mt-6 hidden sm:inline-flex"
                                }`}
                        >
                            {copy.booking} <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>
                </Reveal>

                {/* Colonna Destra / Audio Player */}
                <Reveal>
                    <div
                        className={
                            isLandscapePhone
                                ? "w-full scale-90 origin-center"
                                : "w-full max-w-[75%] mx-auto scale-85 origin-top sm:scale-100 sm:max-w-none sm:origin-center"
                        }
                    >
                        <AudioPlayer compact />
                    </div>
                </Reveal>
            </div>
        </section>
    );
};