import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import LangToggle from "@/components/LangToggle";
import { externalProps, socialsWithMail } from "@/config/site";
import { useLocalePath } from "@/i18n/LanguageContext";

/** Sticky homepage header: brand, EPK button, social icons (lg+), language switch. */
export const TopBar = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => {
    const p = useLocalePath();

    return (
        <header className="sticky top-0 left-0 right-0 z-40 flex h-16 phone-landscape:h-12 w-full shrink-0 items-center justify-between border-b border-white/10 bg-black px-4 sm:px-8">
            {/* Brand: 5% from the left on mobile, 12% on desktop */}
            <div className="absolute left-[5%] sm:left-[12%] flex flex-col">
                <button
                    type="button"
                    onClick={() => scrollToSection("hero-section")}
                    className="text-left font-black uppercase tracking-tight text-white transition hover:text-cat-orange"
                >
                    <span className="text-xs sm:text-sm">
                        Last Cats <span className="text-cat-orange">on Earth</span>
                    </span>
                </button>
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/50 sm:text-[9px]">
                    Munich · Germany
                </span>
            </div>

            <div className="ml-auto flex items-center gap-3">
                <Link
                    to={p("/booking")}
                    className="inline-flex items-center gap-1 rounded-full bg-cat-orange px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-black transition hover:bg-white"
                >
                    EPK <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>

                <div className="hidden items-center -space-x-0.5 lg:flex">
                    {socialsWithMail.map(({ label, href, Icon }) => (
                        <a
                            key={label}
                            href={href}
                            {...externalProps(href)}
                            aria-label={label}
                            title={label}
                            className="flex h-8 w-8 items-center justify-center text-cat-orange transition hover:scale-110 hover:brightness-125"
                        >
                            <Icon className="h-5 w-5" />
                        </a>
                    ))}
                </div>

                <LangToggle />
            </div>
        </header>
    );
};
