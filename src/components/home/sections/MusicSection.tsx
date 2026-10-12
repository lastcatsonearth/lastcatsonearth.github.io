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
        <section id="music" className={`flex h-screen snap-start snap-always items-center ${homeSpacing.musicSection}`}>
            <div className={`mx-auto grid w-full max-w-6xl lg:grid-cols-[1fr_0.8fr] lg:items-center ${homeSpacing.musicGrid}`}>
                <Reveal>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-cat-orange">{copy.releaseLabel}</p>
                    <h2 className="mt-3 text-4xl font-bold uppercase leading-none sm:text-6xl">{copy.release}</h2>
                    <p className="mt-6 max-w-xl text-justify leading-7 text-white/60">{copy.releaseBody}</p>
                    <Link to="/booking#contact" className="mt-6 inline-flex items-center gap-2 rounded-full border border-cat-orange px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-cat-orange hover:bg-cat-orange hover:text-black">{copy.booking} <ArrowUpRight className="h-4 w-4" /></Link>
                </Reveal>
                <Reveal><AudioPlayer compact /></Reveal>
            </div>
        </section>
    );
};