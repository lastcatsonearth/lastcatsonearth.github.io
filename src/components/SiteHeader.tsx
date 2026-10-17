import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import LangToggle from "@/components/LangToggle";
import { useLanguage, useLocalePath } from "@/i18n/LanguageContext";

const labels = {
    de: { shows: "Shows", music: "Musik", book: "Booking" },
    en: { shows: "Shows", music: "Music", book: "Booking" },
} as const;

/** Sticky header for subpages: brand (→ home), a few links, language switch, booking button. */
const SiteHeader = () => {
    const p = useLocalePath();
    const { lang } = useLanguage();
    const t = labels[lang];

    return (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
                <Link to={p("/")} className="group flex flex-col leading-none">
                    <span className="text-xs font-black uppercase tracking-tight text-white transition group-hover:text-cat-orange sm:text-sm">
                        Last Cats <span className="text-cat-orange">on Earth</span>
                    </span>
                    <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-white/50 sm:text-[9px]">Munich · Germany</span>
                </Link>

                <nav className="flex items-center gap-2 sm:gap-5">
                    <Link to={p("/shows")} className="hidden text-[10px] font-black uppercase tracking-[0.2em] text-white/60 transition hover:text-white sm:inline">{t.shows}</Link>
                    <Link to={p("/booking#releases")} className="hidden text-[10px] font-black uppercase tracking-[0.2em] text-white/60 transition hover:text-white sm:inline">{t.music}</Link>
                    <LangToggle />
                    <Link
                        to={p("/booking#contact")}
                        className="inline-flex items-center gap-1 rounded-full bg-cat-orange px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-black transition hover:bg-white"
                    >
                        {t.book} <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default SiteHeader;
