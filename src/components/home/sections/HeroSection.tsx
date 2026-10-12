import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { homeSpacing } from "@/config/layoutSpacing";
import heroPhoto from "@/assets/booking/photos/zamanand/1.jpg";

interface HeroSectionProps {
    copy: {
        kicker: React.ReactNode;
        hero: string;
        booking: string;
    };
    lang: string;
    setLang: (lang: "en" | "de") => void;
}

export const HeroSection = ({ copy, lang, setLang }: HeroSectionProps) => {
    return (
        <section id="hero-section" className={`relative isolate flex h-screen snap-start snap-always items-end overflow-hidden ${homeSpacing.hero}`}>
            <img src={heroPhoto} alt="Last Cats on Earth performing live in Munich" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/55 to-black/10" />
            <div className="absolute inset-0 -z-10 bg-cat-orange/10 mix-blend-screen" />
            <div className={`absolute z-10 mx-auto flex max-w-6xl flex-col items-start gap-1 ${homeSpacing.heroBrand}`}>
                <span className="text-lg font-black uppercase tracking-tight text-white">Last Cats <span className="text-cat-orange">on Earth</span></span>
                <span className="text-left text-[10px] font-bold uppercase tracking-[0.22em] text-cat-orange">Munich · Germany</span>
            </div>
            <div className="absolute right-5 top-5 z-10 flex items-center gap-1 rounded-full border border-white/20 bg-black/50 p-1 text-[9px] font-black uppercase tracking-[0.18em] backdrop-blur-md sm:right-10">
                <button type="button" onClick={() => setLang("en")} className={`rounded-full px-3 py-1.5 transition ${lang === "en" ? "bg-cat-orange text-black" : "text-white/60 hover:text-white"}`}>EN</button>
                <button type="button" onClick={() => setLang("de")} className={`rounded-full px-3 py-1.5 transition ${lang === "de" ? "bg-cat-orange text-black" : "text-white/60 hover:text-white"}`}>DE</button>
            </div>
            <div className="relative mx-auto w-full max-w-6xl">
                <p className={`${homeSpacing.heroKicker} text-xs font-bold uppercase tracking-[0.25em] text-cat-orange`}>{copy.kicker}</p>
                <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.88] tracking-tight sm:text-7xl lg:text-9xl">
                    {copy.hero.includes(" ") ? <>{copy.hero.split(" ")[0]} <span className="text-cat-orange">{copy.hero.split(" ").slice(1).join(" ")}</span></> : copy.hero}
                </h1>
                <div className={`${homeSpacing.heroButton} flex flex-col gap-4 sm:flex-row sm:items-center`}>
                    <Link to="/booking#contact" className="inline-flex w-fit items-center gap-2 rounded-full bg-cat-orange px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition hover:scale-105 hover:bg-white">
                        {copy.booking} <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};