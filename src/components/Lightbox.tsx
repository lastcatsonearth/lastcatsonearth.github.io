import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/** Fullscreen photo viewer: arrows / swipe / keyboard, Escape or backdrop to close. */
const Lightbox = ({
    photos,
    index,
    alt,
    onChange,
    onClose,
}: {
    photos: string[];
    index: number;
    alt: (i: number) => string;
    onChange: (i: number) => void;
    onClose: () => void;
}) => {
    const touchX = useRef<number | null>(null);
    const prev = () => onChange((index - 1 + photos.length) % photos.length);
    const next = () => onChange((index + 1) % photos.length);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    });

    const btn = "absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white transition hover:bg-cat-orange hover:text-black";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 backdrop-blur-md"
            onClick={onClose}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                if (dx > 50) prev();
                if (dx < -50) next();
                touchX.current = null;
            }}
            role="dialog"
            aria-modal="true"
        >
            <button type="button" onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white hover:text-cat-orange" aria-label="Close">
                <X className="h-6 w-6" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); prev(); }} className={`${btn} left-3`} aria-label="Previous photo">
                <ChevronLeft className="h-5 w-5" />
            </button>
            <img
                src={photos[index]}
                alt={alt(index)}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[calc(100dvh-5rem)] max-w-full rounded-xl object-contain"
            />
            <button type="button" onClick={(e) => { e.stopPropagation(); next(); }} className={`${btn} right-3`} aria-label="Next photo">
                <ChevronRight className="h-5 w-5" />
            </button>
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-bold tracking-[0.2em] text-white/60">
                {index + 1} / {photos.length}
            </p>
        </div>
    );
};

export default Lightbox;
