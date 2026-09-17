import { useState, useEffect } from "react";
import { useLanguage } from "@/components/booking/LanguageContext";
<<<<<<< HEAD
import { createPortal } from "react-dom";

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
        back: "Back",
    },
    de: {
        category: "Fotos",
        headline: "VON DEN SHOWS",
        viewAll: "Alle Fotos ansehen",
        altTemplate: "Konzertfoto",
        lightboxAlt: "Vergrößerte Ansicht",
        counterTemplate: "von",
        back: "Zurück",
    },
};

const PhotoGallery = ({ shows }: PhotoGalleryProps) => {
    const { lang } = useLanguage();
    const t = translations[lang];

    const [activeSelection, setActiveSelection] = useState<{ showIdx: number; photoIdx: number } | null>(null);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const minSwipeDistance = 50;
    const currentShow = activeSelection !== null ? shows[activeSelection.showIdx] : null;

    useEffect(() => {
        if (!activeSelection || !currentShow) return;

        const total = currentShow.photos.length;
        const nextIdx = (activeSelection.photoIdx + 1) % total;
        const prevIdx = (activeSelection.photoIdx - 1 + total) % total;

        const nextImg = new Image();
        nextImg.src = currentShow.photos[nextIdx];

        const prevImg = new Image();
        prevImg.src = currentShow.photos[prevIdx];
    }, [activeSelection, currentShow]);

    const handlePrev = () => {
        if (!activeSelection || !currentShow) return;
        setIsLoading(true);
        setActiveSelection({
            showIdx: activeSelection.showIdx,
            photoIdx: (activeSelection.photoIdx - 1 + currentShow.photos.length) % currentShow.photos.length,
        });
    };

    const handleNext = () => {
        if (!activeSelection || !currentShow) return;
        setIsLoading(true);
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
                    const isFeatured = show.showTitle === "Zamanand Festival";

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

                            {/* Grid */}
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                                {visiblePhotos.map((photo, photoIdx) => {
                                    const isLastItem = photoIdx === 4 && remainingCount > 0;

                                    return (
                                        <div
                                            key={photoIdx}
                                            onClick={() => {
                                                setIsLoading(true);
                                                setActiveSelection({ showIdx, photoIdx });
                                            }}
                                            className={`relative ${isFeatured ? "aspect-[4/3]" : "aspect-[7/3]"
                                                } bg-white/[0.02] border border-white/10 rounded-lg overflow-hidden group cursor-pointer ${photoIdx >= 3 ? "hidden sm:block" : ""
                                                }`}
                                        >
                                            <img
                                                src={photo}
                                                alt={`${t.altTemplate} - ${show.showTitle} ${photoIdx + 1}`}
                                                className={`w-full h-full object-cover ${isFeatured ? "object-center" : "object-[center_40%]"
                                                    } opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300`}
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
            {activeSelection !== null &&
                currentShow &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4 animate-fadeIn touch-none"
                        onClick={() => setActiveSelection(null)}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Compact Card */}

                        <div
                            className="relative max-w-[90vw] max-h-[90vh] w-[calc(100vw-2rem)] md:w-fit flex flex-col items-center pointer-events-auto bg-neutral-900 border border-white/10 rounded-xl p-3 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header Controls */}
                            <div className="w-full flex justify-end pb-2 mb-2 border-b border-white/10">
                                <button
                                    className="text-white/60 hover:text-white text-xl font-light transition-colors px-2 py-0.5"
                                    onClick={() => setActiveSelection(null)}
                                    aria-label="Close overlay"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Photo Display */}
                            <div className="relative flex items-center justify-center overflow-hidden rounded-lg group w-[calc(90vw-1.5rem)] h-[60vh] md:w-auto md:h-auto">
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50">
                                        <div className="w-6 h-6 border-2 border-cat-orange border-t-transparent rounded-full animate-spin" />
                                    </div>
                                )}

                                {/* Previous Arrow */}
                                <button
                                    className="absolute left-2 z-20 text-white/80 hover:text-cat-orange text-2xl w-9 h-9 flex items-center justify-center transition-all bg-black/50 hover:bg-black/80 rounded-full border border-white/10 select-none shadow-md backdrop-blur-xs"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePrev();
                                    }}
                                    aria-label="Previous photo"
                                >
                                    ‹
                                </button>

                                <img
                                    key={`${activeSelection.showIdx}-${activeSelection.photoIdx}`}
                                    src={currentShow.photos[activeSelection.photoIdx]}
                                    alt={`${t.lightboxAlt} ${activeSelection.photoIdx + 1}`}
                                    onLoad={() => setIsLoading(false)}
                                    className={`block max-w-[calc(90vw-1.5rem)] max-h-[60vh] w-auto h-auto object-contain rounded select-none transition-opacity duration-200 ${isLoading ? "opacity-30" : "opacity-100"
                                        }`}
                                />

                                {/* Next Arrow */}
                                <button
                                    className="absolute right-2 z-20 text-white/80 hover:text-cat-orange text-2xl w-9 h-9 flex items-center justify-center transition-all bg-black/50 hover:bg-black/80 rounded-full border border-white/10 select-none shadow-md backdrop-blur-xs"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNext();
                                    }}
                                    aria-label="Next photo"
                                >
                                    ›
                                </button>
                            </div>

                            {/* Caption & Counter */}
                            <div className="mt-2.5 text-center w-full px-2">
                                <p className="text-xs font-semibold text-white/90 truncate">
                                    {currentShow.showTitle}
                                </p>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium mt-0.5">
                                    {t.category.slice(0, -1)}{" "}
                                    <span className="text-cat-orange font-semibold">
                                        {activeSelection.photoIdx + 1}
                                    </span>{" "}
                                    {t.counterTemplate} {currentShow.photos.length}
                                </p>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </section>
    );
};


export default PhotoGallery;