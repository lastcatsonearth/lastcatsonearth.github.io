import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { homeSpacing } from "@/config/layoutSpacing";
import heroPhoto from "@/assets/booking/photos/zamanand/1.webp";
import { useLocalePath } from "@/i18n/LanguageContext";

interface HeroSectionProps {
    copy: {
        kicker: React.ReactNode;
        hero: string;
        booking: string;
    };
}

export const HeroSection = ({ copy }: HeroSectionProps) => {
    // Handler per rendere lo snap ipersensibile al minimo movimento sulla Hero
    const p = useLocalePath();

    const handleTouchOrScrollEnd = (e: React.UIEvent<HTMLElement>) => {
        const target = e.currentTarget;
        // Se l'utente ha scrollato anche solo di pochi pixel ma non ha superato la metà,
        // lo forziamo a tornare in cima o a scattare avanti in base alla direzione.
        if (target.scrollTop > 0 && target.scrollTop < 80) {
            target.scrollTo({ top: target.scrollTop > 40 ? window.innerHeight : 0, behavior: 'smooth' });
        }
    };

    return (
        <section
            id="hero-section"
            onScroll={handleTouchOrScrollEnd}
            className={`relative isolate flex h-[calc(100dvh-4rem)] phone-landscape:h-[calc(100dvh-3rem)] snap-start snap-always flex-col justify-between pt-4 pb-6 sm:justify-end sm:pt-0 sm:pb-12 overflow-hidden overflow-y-auto sm:overflow-hidden ${homeSpacing.hero}`}
        >
            <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
                <img
                    src={heroPhoto}
                    alt="Last Cats on Earth performing live in Munich"
                    {...{ fetchpriority: "high" }}
                    loading="eager"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-[center_100%] sm:object-center"
                />
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/85 via-black/40 to-black/80 sm:bg-gradient-to-t sm:from-black sm:via-black/55 sm:to-black/10" />
            <div className="absolute inset-0 -z-10 bg-cat-orange/10 mix-blend-screen" />

            {/* Top Header Content (Mobile) */}
            <div className="relative mx-auto w-full max-w-6xl">
                <p className={`${homeSpacing.heroKicker} text-xs font-bold uppercase tracking-[0.25em] text-cat-orange`}>
                    {copy.kicker}
                </p>
                <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.88] tracking-tight sm:text-7xl lg:text-9xl">
                    {copy.hero.includes(" ") ? (
                        <>
                            {copy.hero.split(" ")[0]} <span className="text-cat-orange">{copy.hero.split(" ").slice(1).join(" ")}</span>
                        </>
                    ) : (
                        copy.hero
                    )}
                </h1>
            </div>

            {/* CTA Button raised up 15% on mobile */}
            <div className="relative mx-auto mb-[15vh] w-full max-w-6xl sm:mb-0">
                <div className={`${homeSpacing.heroButton} flex flex-col gap-4 sm:flex-row sm:items-center`}>
                    <Link
                        to={p("/contact")}
                        className="inline-flex w-fit items-center gap-2 rounded-full bg-cat-orange px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition hover:scale-105 hover:bg-white"
                    >
                        {copy.booking} <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};