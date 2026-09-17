import { useState } from "react";
import type { PhotoGalleryTranslations, PhotoSelection, ShowGallery } from "./photoGallery.types";

interface PhotoLightboxProps {
    show: ShowGallery;
    selection: PhotoSelection;
    translations: PhotoGalleryTranslations;
    isLoading: boolean;
    onClose: () => void;
    onPrevious: () => void;
    onNext: () => void;
    onImageLoad: () => void;
}

const PhotoLightbox = ({
    show,
    selection,
    translations: t,
    isLoading,
    onClose,
    onPrevious,
    onNext,
    onImageLoad,
}: PhotoLightboxProps) => {
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const handleTouchEnd = () => {
        if (touchStart === null || touchEnd === null) return;
        const distance = touchStart - touchEnd;
        if (distance > 50) onNext();
        else if (distance < -50) onPrevious();
    };

    return (
        <div
            className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 animate-fadeIn touch-none"
            onClick={onClose}
            onTouchStart={(e) => {
                setTouchEnd(null);
                setTouchStart(e.targetTouches[0].clientX);
            }}
            onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="relative max-w-[90vw] w-fit flex flex-col items-center pointer-events-auto bg-neutral-900 border border-white/10 rounded-xl p-3 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                    <button
                        className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white/90 text-xs font-medium transition-colors border border-white/10"
                        onClick={onClose}
                        aria-label="Go back to gallery"
                    >
                        <span>←</span>
                        <span>{t.back}</span>
                    </button>
                    <button
                        className="text-white/60 hover:text-white text-xl font-light transition-colors px-2 py-0.5"
                        onClick={onClose}
                        aria-label="Close overlay"
                    >
                        ✕
                    </button>
                </div>

                <div className="relative flex items-center justify-center overflow-hidden rounded-lg group">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50">
                            <div className="w-6 h-6 border-2 border-cat-orange border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                    <button
                        className="absolute left-2 z-20 text-white/80 hover:text-cat-orange text-2xl w-9 h-9 flex items-center justify-center transition-all bg-black/50 hover:bg-black/80 rounded-full border border-white/10 select-none shadow-md backdrop-blur-xs"
                        onClick={(e) => {
                            e.stopPropagation();
                            onPrevious();
                        }}
                        aria-label="Previous photo"
                    >
                        ‹
                    </button>
                    <img
                        key={`${selection.showIdx}-${selection.photoIdx}`}
                        src={show.photos[selection.photoIdx]}
                        alt={`${t.lightboxAlt} ${selection.photoIdx + 1}`}
                        onLoad={onImageLoad}
                        className={`max-w-full max-h-[60vh] w-auto h-auto object-contain rounded select-none transition-opacity duration-200 ${isLoading ? "opacity-30" : "opacity-100"
                            }`}
                    />
                    <button
                        className="absolute right-2 z-20 text-white/80 hover:text-cat-orange text-2xl w-9 h-9 flex items-center justify-center transition-all bg-black/50 hover:bg-black/80 rounded-full border border-white/10 select-none shadow-md backdrop-blur-xs"
                        onClick={(e) => {
                            e.stopPropagation();
                            onNext();
                        }}
                        aria-label="Next photo"
                    >
                        ›
                    </button>
                </div>

                <div className="mt-2.5 text-center w-full px-2">
                    <p className="text-xs font-semibold text-white/90 truncate">{show.showTitle}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium mt-0.5">
                        {t.category.slice(0, -1)}{" "}
                        <span className="text-cat-orange font-semibold">{selection.photoIdx + 1}</span>{" "}
                        {t.counterTemplate} {show.photos.length}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PhotoLightbox;
