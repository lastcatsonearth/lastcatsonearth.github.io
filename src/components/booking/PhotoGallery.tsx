import { useState, useEffect } from "react";
import { useLanguage } from "@/components/booking/LanguageContext";

export interface ShowGallery {
    showTitle: string;
    location?: string;
    date?: string;
    photos: string[];
}

interface PhotoGalleryProps {
    shows: ShowGallery[];
}

const translations = {
    en: {
        category: "Photos",
        headline: "FROM THE SHOWS",
        viewAll: "View all photos",
        altTemplate: "Stage action photo",
        lightboxAlt: "Expanded shot",
        counterTemplate: "of",
    },
    de: {
        category: "Fotos",
        headline: "VON DEN SHOWS",
        viewAll: "Alle Fotos ansehen",
        altTemplate: "Konzertfoto",
        lightboxAlt: "Vergrößerte Ansicht",
        counterTemplate: "von",
    },
};

const PhotoGallery = ({ shows }: PhotoGalleryProps) => {
    const { lang } = useLanguage();
    const t = translations[lang];

    // State tracks which show and which photo index within that show is active in the lightbox
    const [activeSelection, setActiveSelection] = useState<{ showIdx: number; photoIdx: number } | null>(null);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    const currentShow = activeSelection !== null ? shows[activeSelection.showIdx] : null;

    const handlePrev = () => {
        if (!activeSelection || !currentShow) return;
        setActiveSelection({
            showIdx: activeSelection.showIdx,
            photoIdx: (activeSelection.photoIdx - 1 + currentShow.photos.length) % currentShow.photos.length,
        });
    };

    const handleNext = () => {
        if (!activeSelection || !currentShow) return;
        setActiveSelection({
            showIdx: activeSelection.showIdx,
            photoIdx: (activeSelection.photoIdx + 1) % currentShow.photos.length,
        });
    };

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
        if (distance > minSwipeDistance) handleNext();
        else if (distance < -minSwipeDistance) handlePrev();
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (activeSelection === null) return;
            if (e.key === "ArrowLeft") handlePrev();
            else if (e.key === "ArrowRight") handleNext();
            else if (e.key === "Escape") setActiveSelection(null);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeSelection]);

    return (
        <section className="border-t border-white/5 pt-12 pb-6">
            <p className="text-cat-orange uppercase tracking-[0.25em] text-xs mb-2 text-center">
                {t.category}
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 tracking-wide">
                {t.headline}
            </h3>

            {/* Shows Stack */}
            <div className="space-y-10">
                {shows.map((show, showIdx) => {
                    const visiblePhotos = show.photos.slice(0, 5);
                    const remainingCount = show.photos.length - 5;

                    return (
                        <div key={showIdx} className="space-y-3">
                            {/* Show Header Tag */}
                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                <div className="flex items-baseline gap-3">
                                    <h4 className="text-base md:text-lg font-semibold tracking-wide text-white/90">
                                        {show.showTitle}
                                    </h4>
                                    {show.location && (
                                        <span className="text-xs text-white/40 font-mono hidden sm:inline">
                                            {show.location}
                                        </span>
                                    )}
                                </div>
                                {show.date && (
                                    <span className="text-xs uppercase tracking-wider text-cat-orange font-medium">
                                        {show.date}
                                    </span>
                                )}
                            </div>

                            {/* 1 Row Desktop / 3 Column Mobile Grid */}
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                                {visiblePhotos.map((photo, photoIdx) => {
                                    const isLastItem = photoIdx === 4 && remainingCount > 0;

                                    return (
                                        <div
                                            key={photoIdx}
                                            onClick={() => setActiveSelection({ showIdx, photoIdx })}
                                            className={`relative aspect-[4/3] bg-white/[0.02] border border-white/10 rounded-lg overflow-hidden group cursor-pointer ${photoIdx >= 3 ? "hidden sm:block" : ""
                                                }`}
                                        >
                                            <img
                                                src={photo}
                                                alt={`${t.altTemplate} - ${show.showTitle} ${photoIdx + 1}`}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                                            />
                                            {/* Overflow Counter Badge */}
                                            {isLastItem && (
                                                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center group-hover:bg-black/40 transition-colors">
                                                    <span className="text-xs md:text-sm font-bold text-white tracking-wider">
                                                        +{remainingCount}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Lightbox Overlay */}
            {activeSelection !== null && currentShow && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm touch-none"
                    onClick={() => setActiveSelection(null)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <button
                        className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-light transition-colors z-50 p-2"
                        onClick={() => setActiveSelection(null)}
                        aria-label="Close overlay"
                    >
                        ✕
                    </button>

                    <button
                        className="absolute left-4 md:left-8 text-white/40 hover:text-cat-orange text-4xl p-4 transition-colors z-50 select-none bg-black/20 rounded-full hover:bg-white/5 hidden md:block"
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePrev();
                        }}
                        aria-label="Previous photo"
                    >
                        ‹
                    </button>

                    <div
                        className="relative max-w-4xl max-h-[80vh] flex flex-col items-center justify-center pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={currentShow.photos[activeSelection.photoIdx]}
                            alt={`${t.lightboxAlt} ${activeSelection.photoIdx + 1}`}
                            className="max-w-full max-h-[75vh] object-contain rounded-lg border border-white/10 shadow-2xl select-none"
                        />
                        <div className="mt-4 text-center">
                            <p className="text-sm font-semibold text-white/80">{currentShow.showTitle}</p>
                            <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-medium mt-1">
                                {t.category.slice(0, -1)}{" "}
                                <span className="text-cat-orange">{activeSelection.photoIdx + 1}</span> {t.counterTemplate}{" "}
                                {currentShow.photos.length}
                            </p>
                        </div>
                    </div>

                    <button
                        className="absolute right-4 md:right-8 text-white/40 hover:text-cat-orange text-4xl p-4 transition-colors z-50 select-none bg-black/20 rounded-full hover:bg-white/5 hidden md:block"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                        }}
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