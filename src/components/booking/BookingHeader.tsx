import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const sections = ["bio", "videos", "releases", "photos", "contact"];

const navLabels: Record<string, { en: string; de: string }> = {
    bio: { en: "bio", de: "bio" },
    videos: { en: "videos", de: "videos" },
    releases: { en: "releases", de: "releases" },
    photos: { en: "photos", de: "photos" },
    contact: { en: "Get in Touch", de: "Kontakt" },
};

const BookingHeader = () => {
    const { lang, setLang } = useLanguage();
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollToSection = (index: number) => {
        const el = document.getElementById(sections[index]);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            setActiveIndex(index);
        }
    };

    // Automatically update active tab when scrolling through sections
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        sections.forEach((sectionId, index) => {
            const el = document.getElementById(sectionId);
            if (!el) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveIndex(index);
                        }
                    });
                },
                { threshold: 0.5 } // Triggers when 50% of the section is in view
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => {
            observers.forEach((obs) => obs.disconnect());
        };
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/70 px-4 py-3 backdrop-blur-xl sm:px-8">
            <a
                href="/"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-cat-orange transition-transform hover:scale-105"
            >
                <ArrowLeft className="h-4 w-4" />
                {lang === "de" ? "Startseite" : "Home"}
            </a>

            <nav className="hidden items-center gap-6 text-[11px] font-black uppercase tracking-[0.25em] lg:flex">
                {sections.map((section, index) => (
                    <button
                        key={section}
                        onClick={() => scrollToSection(index)}
                        className={`capitalize transition-colors ${activeIndex === index ? "text-cat-orange underline underline-offset-8" : "text-white/50 hover:text-white"}`}
                    >
                        {navLabels[section]?.[lang] || section}
                    </button>
                ))}
            </nav>

            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-black uppercase tracking-widest backdrop-blur-sm">
                <button
                    onClick={() => setLang("en")}
                    className={`transition-colors ${lang === "en" ? "font-bold text-cat-orange" : "text-white/40 hover:text-white"}`}
                >
                    EN
                </button>
                <span className="text-white/20">|</span>
                <button
                    onClick={() => setLang("de")}
                    className={`transition-colors ${lang === "de" ? "font-bold text-cat-orange" : "text-white/40 hover:text-white"}`}
                >
                    DE
                </button>
            </div>
        </header>
    );
};

export default BookingHeader;