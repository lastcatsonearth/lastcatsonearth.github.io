import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const sections = ["bio", "videos", "releases", "photos", "contact", "links"];

const navLabels: Record<string, { en: string; de: string }> = {
    bio: { en: "bio", de: "bio" },
    videos: { en: "videos", de: "videos" },
    releases: { en: "releases", de: "releases" },
    photos: { en: "photos", de: "photos" },
    contact: { en: "Get in Touch", de: "Kontakt" },
    links: { en: "links", de: "links" },
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

    // Observer with rootMargin to trigger smoothly when the section enters the viewport focus zone
    useEffect(() => {
        const observerOptions: IntersectionObserverInit = {
            root: null, // default viewport
            rootMargin: "-25% 0px -25% 0px", // focus area in the middle 50% of screen
            threshold: 0.1, // trigger as soon as 10% enters the middle viewport zone
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = sections.indexOf(entry.target.id);
                    if (index !== -1) {
                        setActiveIndex(index);
                    }
                }
            });
        }, observerOptions);

        sections.forEach((sectionId) => {
            const el = document.getElementById(sectionId);
            if (el) {
                observer.observe(el);
            }
        });

        return () => {
            observer.disconnect();
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
                        className={`capitalize transition-colors ${activeIndex === index
                            ? "text-cat-orange underline underline-offset-8"
                            : "text-white/50 hover:text-white"
                            }`}
                    >
                        {navLabels[section]?.[lang] || section}
                    </button>
                ))}
            </nav>

            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-black uppercase tracking-widest backdrop-blur-sm">
                <button
                    onClick={() => setLang("en")}
                    className={`transition-colors ${lang === "en" ? "text-cat-orange" : "text-white/40 hover:text-white"
                        }`}
                >
                    EN
                </button>
                <span className="text-white/20">|</span>
                <button
                    onClick={() => setLang("de")}
                    className={`transition-colors ${lang === "de" ? "text-cat-orange" : "text-white/40 hover:text-white"
                        }`}
                >
                    DE
                </button>
            </div>
        </header>
    );
};

export default BookingHeader;