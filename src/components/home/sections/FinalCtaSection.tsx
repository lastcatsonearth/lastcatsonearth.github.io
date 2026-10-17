import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { homeSpacing } from "@/config/layoutSpacing";
import { useLocalePath } from "@/components/booking/LanguageContext";

// in cima al componente

interface FinalCtaSectionProps {
    copy: {
        stageLabel: string;
        stageHeading: string;
        stageCta: string;
    };
}

export const FinalCtaSection = ({ copy }: FinalCtaSectionProps) => {
    const p = useLocalePath();

    const [isLandscapePhone, setIsLandscapePhone] = useState(false);

    useEffect(() => {
        const checkLandscape = () => {
            const isLandscape = window.matchMedia("(orientation: landscape)").matches;
            const isShort = window.innerHeight < 550;
            setIsLandscapePhone(isLandscape && isShort);
        };

        checkLandscape();
        window.addEventListener("resize", checkLandscape);
        return () => window.removeEventListener("resize", checkLandscape);
    }, []);

    return (
        <section
            id="final-cta"
            className={`relative flex h-[calc(100dvh-4rem)] snap-start snap-mandatory snap-y snap-always flex-col justify-between overflow-hidden bg-cat-orange text-black ${isLandscapePhone
                ? "px-4 pt-2 pb-2"
                : "px-4 pt-4 pb-3 sm:px-6 sm:pt-10 sm:pb-6"
                }`}
        >
            {/* Centered CTA Content Area */}
            <div
                className={`mx-auto flex w-full max-w-6xl ${isLandscapePhone
                    ? "my-auto flex-row items-center justify-between gap-4"
                    : `my-auto flex-col justify-between gap-4 sm:flex-row sm:items-end sm:gap-0 ${homeSpacing.finalCtaGrid}`
                    }`}
            >
                <div>
                    <p
                        className={`font-bold uppercase tracking-[0.3em] text-black/70 ${isLandscapePhone ? "text-[10px]" : "text-xs"
                            }`}
                    >
                        {copy.stageLabel}
                    </p>
                    <h2
                        className={`font-black uppercase tracking-tighter text-black ${isLandscapePhone
                            ? "mt-1 max-w-xl text-4xl leading-[0.88]"
                            : "mt-1 max-w-3xl text-7xl leading-[0.82] sm:mt-3 sm:text-8xl sm:leading-[0.88] sm:tracking-tight"
                            }`}
                    >
                        {copy.stageHeading}
                    </h2>
                </div>
                <Link
                    to={p("/booking#contact")}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black ${isLandscapePhone ? "w-auto" : "w-fit px-6 py-3"
                        }`}
                >
                    {copy.stageCta} <ArrowUpRight className="h-4 w-4" />
                </Link>
            </div>

            {/* Bottom Footer Overlay */}
            <div
                className={`mx-auto w-full max-w-6xl border-t border-black/15 text-black [&_svg]:text-black [&_a]:text-black hover:[&_a]:text-white [&_p]:text-black/80 ${isLandscapePhone ? "pt-1.5" : "pt-3 sm:pt-6"
                    }`}
            >
                <Footer />
            </div>
        </section>
    );
};