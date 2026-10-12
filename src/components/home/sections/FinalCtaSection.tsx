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
        <section id="final-cta" className="relative flex h-[calc(100vh-4rem)] snap-start snap-always flex-col justify-between overflow-hidden bg-cat-orange pb-6 pt-10 text-black">            <div className={`mx-auto flex w-full max-w-6xl flex-col justify-between sm:flex-row sm:items-end ${homeSpacing.finalCtaGrid}`}>
            <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/70">{copy.stageLabel}</p>
                <h2 className="mt-3 max-w-3xl text-5xl font-black uppercase leading-[0.88] sm:text-8xl text-black">{copy.stageHeading}</h2>
            </div>
            <Link to="/booking#contact" className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition">
                {copy.stageCta} <ArrowUpRight className="h-4 w-4" />
            </Link>
        </div>

            <div className="mx-auto w-full max-w-6xl border-t border-black/15 pt-6 text-black [&_svg]:text-black [&_a]:text-black hover:[&_a]:text-white [&_p]:text-black/80">
                <Footer />
            </div>
        </section>
    );
};