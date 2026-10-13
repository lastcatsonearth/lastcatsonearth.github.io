import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import AudioPlayer from "@/components/booking/AudioPlayer";
import { homeSpacing } from "@/config/layoutSpacing";

interface MusicSectionProps {
    copy: {
        releaseLabel: string;
        release: string;
        releaseBody: string;
        booking: string;
    };
    Reveal: React.ComponentType<{ children: React.ReactNode }>;
}

export const MusicSection = ({ copy, Reveal }: MusicSectionProps) => {
    return (
        <section
            id="music"
            className={`flex h-[calc(100dvh-4rem)] sm:h-screen snap-start snap-always items-start pt-6 sm:items-center sm:pt-0 ${homeSpacing.musicSection}`}
        >
            <div className={`mx-auto grid w-full max-w-6xl gap-2 sm:gap-0 lg:grid-cols-[1fr_0.8fr] lg:items-center ${homeSpacing.musicGrid}`}>
                <Reveal>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-cat-orange">
                        {copy.releaseLabel}
                    </p>
                    <h2 className="mt-2 text-3xl font-bold uppercase leading-none sm:mt-3 sm:text-6xl">
                        {copy.release}
                    </h2>
                    <p className="mt-3 max-w-xl text-justify text-sm leading-6 text-white/60 sm:mt-6 sm:text-base sm:leading-7">
                        {copy.releaseBody}
                    </p>
                    {/* Hidden on mobile, shown on desktop */}
                    <Link
                        to="/booking#contact"
                        className="mt-6 hidden items-center gap-2 rounded-full border border-cat-orange px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-cat-orange transition hover:bg-cat-orange hover:text-black sm:inline-flex"
                    >
                        {copy.booking} <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Reveal>

                {/* Compact & further scaled-down card wrapper on mobile */}
                <Reveal>
                    <div className="w-full max-w-[65%] mx-auto scale-85 origin-top sm:scale-100 sm:max-w-none sm:origin-center">
                        <AudioPlayer compact />
                    </div>
                </Reveal>
            </div>
        </section>
    );
};