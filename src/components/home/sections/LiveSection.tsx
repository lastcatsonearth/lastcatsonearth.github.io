import { ArrowUpRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { homeSpacing } from "@/config/layoutSpacing";
import crowdPhoto from "@/assets/booking/photos/zamanand/6.jpg";

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
    return (
        <section id="live" className={`flex h-screen snap-start snap-always items-center ${homeSpacing.liveSection}`}>
            <div className="mx-auto w-full max-w-6xl">
                <Reveal>
                    <div className={`flex flex-col justify-between sm:flex-row sm:items-end ${homeSpacing.liveHeader}`}>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cat-orange">{copy.liveLabel}</p>
                            <h2 className="mt-3 text-4xl font-bold uppercase leading-none sm:text-6xl">{copy.live}</h2>
                        </div>
                        <Link to="/music" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-cat-orange">{copy.liveLink} <ArrowUpRight className="h-4 w-4" /></Link>
                    </div>
                    <button type="button" onClick={() => setActiveVideoUrl("https://www.youtube.com/embed/dWhzsrdGyko?autoplay=1")} className="group relative block w-full overflow-hidden rounded-3xl border border-white/10 text-left">
                        <img src={crowdPhoto} alt="Audience watching Last Cats on Earth live" className="h-[320px] w-full object-cover sm:h-[480px]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] sm:bottom-10 sm:left-10">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cat-orange text-black transition group-hover:scale-110"><Play className="ml-0.5 h-4 w-4 fill-current" /></span>
                            Live energy, Munich and beyond
                        </div>
                    </button>
                </Reveal>
            </div>
        </section>
    );
};