import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { homeSpacing } from "@/config/layoutSpacing";

interface FinalCtaSectionProps {
    copy: {
        stageLabel: string;
        stageHeading: string;
        stageCta: string;
    };
}

export const FinalCtaSection = ({ copy }: FinalCtaSectionProps) => {
    return (
        <section
            id="final-cta"
            className="relative flex h-[calc(100dvh-4rem)] snap-start snap-always flex-col justify-between overflow-hidden bg-cat-orange px-4 pt-4 pb-3 sm:px-6 sm:pt-10 sm:pb-6 text-black"
        >
            {/* Centered CTA Content Area */}
            <div className={`my-auto mx-auto flex w-full max-w-6xl flex-col justify-between gap-4 sm:flex-row sm:items-end sm:gap-0 ${homeSpacing.finalCtaGrid}`}>
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/70">
                        {copy.stageLabel}
                    </p>
                    {/* Mobile: bumped up to text-7xl with hyper-tight leading */}
                    <h2 className="mt-1 max-w-3xl text-7xl font-black uppercase leading-[0.82] tracking-tighter text-black sm:mt-3 sm:text-8xl sm:leading-[0.88] sm:tracking-tight">
                        {copy.stageHeading}
                    </h2>
                </div>
                <Link
                    to="/booking#contact"
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
                >
                    {copy.stageCta} <ArrowUpRight className="h-4 w-4" />
                </Link>
            </div>

            {/* Bottom Footer Overlay */}
            <div className="mx-auto w-full max-w-6xl border-t border-black/15 pt-3 text-black sm:pt-6 [&_svg]:text-black [&_a]:text-black hover:[&_a]:text-white [&_p]:text-black/80">
                <Footer />
            </div>
        </section>
    );
};