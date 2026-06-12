import { useState, useEffect } from "react";
import { useLanguage } from "@/components/booking/LanguageContext";

interface PhotoGalleryProps {
    photos: string[];
}

const translations = {
    en: {
        category: "Photos",
        headline: "FROM THE SHOWS",
        openBtn: "Open gallery",
        altTemplate: "Last Cats on Earth stage action photo",
        lightboxAlt: "Last Cats on Earth expanded shot",
        counterTemplate: "of"
    },
    de: {
        category: "Fotos",
        headline: "VON DEN SHOWS",
        openBtn: "Galerie öffnen",
        altTemplate: "Last Cats on Earth Konzertfoto",
        lightboxAlt: "Last Cats on Earth vergrößerte Ansicht",
        counterTemplate: "von"
    }
};

const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
    const { lang } = useLanguage();
    const t = translations[lang];

    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Minimum swipe distance in pixels to trigger a change
    const minSwipeDistance = 50;

    const handlePrev = () =>
        setActiveIdx((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));

    const handleNext = () =>
        setActiveIdx((prev) => (prev !== null ? (prev + 1) % photos.length : null));

    // Handle touch events for mobile sliding
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNext();
        } else if (isRightSwipe) {
            handlePrev();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (activeIdx === null) return;
            if (e.key === "ArrowLeft") handlePrev();
            else if (e.key === "ArrowRight") handleNext();
            else if (e.key === "Escape") setActiveIdx(null);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeIdx]);

    return (
        <section className="border-t border-white/5 pt-16">
            <p className="text-cat-orange uppercase tracking-[0.25em] text-sm mb-3 text-center">
                {t.category}
            </p>
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 tracking-wide">
                {t.headline}
            </h3>

            {/* Grid Container */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {photos.map((photo, idx) => (
                    <div
                        key={idx}
                        onClick={() => setActiveIdx(idx)}
                        className={`relative aspect-[4/5] bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden group cursor-pointer ${idx >= 2 ? "hidden md:block" : ""
                            }`}
                    >
                        <img
                            src={photo}
                            alt={`${t.altTemplate} ${idx + 1}`}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 flex items-center justify-center border border-dashed border-white/10 rounded-lg m-1 pointer-events-none text-white/20 text-xs bg-black/10 group-hover:border-cat-orange/40 transition-colors duration-300">
                            <span className="uppercase tracking-wider text-[10px]">
                                {t.category.slice(0, -1)} {idx + 1}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Open Gallery Button */}
            {photos.length > 2 && (
                <div className="mt-6 text-center md:hidden">
                    <button
                        onClick={() => setActiveIdx(0)}
                        className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold tracking-wider uppercase transition-colors"
                    >
                        {t.openBtn}
                    </button>
                </div>
            )}

            {/* Lightbox */}
            {activeIdx !== null && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm touch-none"
                    onClick={() => setActiveIdx(null)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <button
                        className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-light transition-colors z-50 p-2"
                        onClick={() => setActiveIdx(null)}
                        aria-label="Close overlay"
                    >
                        ✕
                    </button>

                    {/* Desktop Navigation Buttons */}
                    <button
                        className="absolute left-4 md:left-8 text-white/40 hover:text-cat-orange text-4xl p-4 transition-colors z-50 select-none bg-black/20 rounded-full hover:bg-white/5 hidden md:block"
                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        aria-label="Previous photo"
                    >
                        ‹
                    </button>

                    <div
                        className="relative max-w-4xl max-h-[80vh] flex flex-col items-center justify-center pointer-events-none"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={photos[activeIdx]}
                            alt={`${t.lightboxAlt} ${activeIdx + 1}`}
                            className="max-w-full max-h-[75vh] object-contain rounded-lg border border-white/10 shadow-2xl select-none"
                        />
                        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/40 font-medium">
                            {t.category.slice(0, -1)} <span className="text-cat-orange">{activeIdx + 1}</span> {t.counterTemplate} {photos.length}
                        </p>
                    </div>

                    <button
                        className="absolute right-4 md:right-8 text-white/40 hover:text-cat-orange text-4xl p-4 transition-colors z-50 select-none bg-black/20 rounded-full hover:bg-white/5 hidden md:block"
                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        aria-label="Next photo"
                    >
                        ›
                    </button>
                </div>
            )}
        </section>
    );
};

export default PhotoGallery;