import { useState, useEffect } from "react";

interface PhotoGalleryProps {
    photos: string[];
}

const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);

    const handlePrev = () =>
        setActiveIdx((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));

    const handleNext = () =>
        setActiveIdx((prev) => (prev !== null ? (prev + 1) % photos.length : null));

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
            <p className="text-cat-orange uppercase tracking-[0.25em] text-sm mb-3 text-center">Photos</p>
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 tracking-wide">FROM THE SHOWS</h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {photos.map((photo, idx) => (
                    <div
                        key={idx}
                        onClick={() => setActiveIdx(idx)}
                        className="relative aspect-[4/5] bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden group cursor-pointer"
                    >
                        <img
                            src={photo}
                            alt={`Last Cats on Earth stage action photo ${idx + 1}`}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 flex items-center justify-center border border-dashed border-white/10 rounded-lg m-1 pointer-events-none text-white/20 text-xs bg-black/10 group-hover:border-cat-orange/40 transition-colors duration-300">
                            <span className="uppercase tracking-wider text-[10px]">Photo {idx + 1}</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-end p-4">
                            <p className="text-[10px] uppercase tracking-wider text-cat-orange font-medium">Stage Shot</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {activeIdx !== null && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn backdrop-blur-sm"
                    onClick={() => setActiveIdx(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-light transition-colors z-50 p-2"
                        onClick={() => setActiveIdx(null)}
                        aria-label="Close overlay"
                    >
                        ✕
                    </button>

                    <button
                        className="absolute left-4 md:left-8 text-white/40 hover:text-cat-orange text-4xl p-4 transition-colors z-50 select-none bg-black/20 rounded-full hover:bg-white/5"
                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        aria-label="Previous photo"
                    >
                        ‹
                    </button>

                    <div
                        className="relative max-w-4xl max-h-[80vh] flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={photos[activeIdx]}
                            alt={`Last Cats on Earth expanded shot ${activeIdx + 1}`}
                            className="max-w-full max-h-[75vh] object-contain rounded-lg border border-white/10 shadow-2xl select-none"
                        />
                        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/40 font-medium">
                            Photo <span className="text-cat-orange">{activeIdx + 1}</span> of {photos.length}
                        </p>
                    </div>

                    <button
                        className="absolute right-4 md:right-8 text-white/40 hover:text-cat-orange text-4xl p-4 transition-colors z-50 select-none bg-black/20 rounded-full hover:bg-white/5"
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