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
}

export const HeroSection = ({ copy }: HeroSectionProps) => {
    const formattedHeroTitle = copy.hero.includes(" ") ? (
        <>
            {copy.hero.split(" ")[0]}{" "}
            <span className="text-cat-orange">
                {copy.hero.split(" ").slice(1).join(" ")}
            </span>
        </>
    ) : (
        copy.hero
    );

    return (
        <section
            id="hero-section"
            className={`relative isolate flex h-[calc(100dvh-4rem)] snap-start snap-always flex-col justify-between pt-4 pb-6 overflow-hidden sm:justify-end sm:pt-0 sm:pb-12 ${homeSpacing.hero} landscape:h-dvh landscape:flex-col landscape:justify-end landscape:px-8 landscape:pb-4`}
        >
            <img
                src={heroPhoto}
                alt="Last Cats on Earth performing live in Munich"
                className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/85 via-black/40 to-black/80 sm:bg-gradient-to-t sm:from-black sm:via-black/55 sm:to-black/10 landscape:bg-gradient-to-t landscape:from-black/90 landscape:via-black/40 landscape:to-black/20" />
            <div className="absolute inset-0 -z-10 bg-cat-orange/10 mix-blend-screen" />

            {/* Layout principale: in portrait/desktop è colonna standard, in LANDSCAPE diventa una riga in basso tra SX e DX */}
            <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-between h-full landscape:h-auto landscape:flex-row landscape:items-end landscape:justify-between landscape:gap-4">

                {/* BLOCCO SINISTRA (Bottom Left in Landscape) */}
                <div className="flex flex-col">
                    <p
                        className={`${homeSpacing.heroKicker} text-xs font-bold uppercase tracking-[0.25em] text-cat-orange landscape:text-[10px] landscape:tracking-widest`}
                    >
                        {copy.kicker}
                    </p>
                    <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.88] tracking-tight sm:text-7xl lg:text-9xl landscape:text-3xl landscape:sm:text-4xl landscape:mt-1 landscape:leading-none">
                        {formattedHeroTitle}
                    </h1>
                </div>

                {/* BLOCCO DESTRA / BOTTONE CTA (Bottom Right in Landscape) */}
                <div className="mb-[15vh] sm:mb-0 landscape:mb-0 landscape:shrink-0">
                    <div className={`${homeSpacing.heroButton} flex flex-col gap-4 sm:flex-row sm:items-center`}>
                        <Link
                            to="/booking#contact"
                            className="inline-flex w-fit items-center gap-2 rounded-full bg-cat-orange px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition hover:scale-105 hover:bg-white landscape:px-4 landscape:py-2 landscape:text-[9px]"
                        >
                            {copy.booking} <ArrowUpRight className="h-4 w-4 landscape:h-3.5 landscape:w-3.5" />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};