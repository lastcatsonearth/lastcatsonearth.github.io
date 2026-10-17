import { useState, useEffect, useRef } from "react";
import React from "react";
import { useLanguage } from "@/components/booking/LanguageContext";

export interface LiveVideo {
    id: string;
    title: string;
    venue: string;
    thumbnail: string;
}

const yt = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.webp`;

const raw = [
    { id: "dWhzsrdGyko", title: "Full Show", venue: "Renazzo, Italy" },
    { id: "k0L_bSeLRPI", title: "FLASHBACK!", venue: "Alte Utting, Munich" },
    { id: "iqeK2wgDBOk", title: "Dani California", venue: "Shamrock, Munich" },
    { id: "rpMnFdiqLKU", title: "Lonely Boy", venue: "Alte Utting, Munich" },
    { id: "AM9d46YrdaM", title: "Can't Stop", venue: "Alte Utting, Munich" },
    { id: "Y27TPa3lVqk", title: "Hard to Handle", venue: "Shamrock, Munich" },
    { id: "edZZoAsVDcA", title: "Smooth", venue: "Alte Utting, Munich" },
];

// Thumbnail is derived from the id, so it can never mismatch the video
export const liveVideos: LiveVideo[] = raw.map((v) => ({ ...v, thumbnail: yt(v.id) }));

const translations = {
    en: { reel: "Live Video Reels", headline: "WATCH US PLAY" },
    de: { reel: "Live-Video-Reels", headline: "UNSERE LIVE-SHOWS" },
};

const getVisibleCount = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
};

interface VideoCarouselProps {
    onVideoSelect: (embedUrl: string) => void;
}

const MIN_SWIPE = 50;

const VideoCarousel = ({ onVideoSelect }: VideoCarouselProps) => {
    const { lang } = useLanguage();
    const t = translations[lang];

    const [startIdx, setStartIdx] = useState(0);
    const [visibleCount, setVisibleCount] = useState(getVisibleCount());

    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const prev = () => setStartIdx((i) => (i - 1 + liveVideos.length) % liveVideos.length);
    const next = () => setStartIdx((i) => (i + 1) % liveVideos.length);

    useEffect(() => {
        const handleResize = () => setVisibleCount(getVisibleCount());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchEndX.current = null;
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;
        const distance = touchStartX.current - touchEndX.current;
        if (distance > MIN_SWIPE) next();
        else if (distance < -MIN_SWIPE) prev();
        touchStartX.current = null;
        touchEndX.current = null;
    };

    const visibleVideos = Array.from({ length: visibleCount }, (_, i) =>
        liveVideos[(startIdx + i) % liveVideos.length]
    );

    return (
        <section className="flex w-full flex-col items-center justify-center sm:pt-16">
            <p className="mb-1 text-center text-xs uppercase tracking-[0.25em] text-cat-orange sm:mb-3 sm:text-sm -mt-10">
                {t.reel}
            </p>
            <h3 className="mb-4 text-center text-2xl font-bold tracking-wide sm:mb-8 sm:text-3xl md:text-2xl">
                {t.headline}
            </h3>

            <div className="relative flex w-full max-w-5xl items-center justify-center px-3 sm:px-12">
                <button
                    onClick={prev}
                    className="absolute left-5 z-30 rounded-full bg-black/60 p-3 text-white backdrop-blur-sm transition hover:bg-cat-orange/80 sm:left-0"
                    aria-label="Previous videos"
                >
                    ‹
                </button>

                <div
                    className="flex w-full items-center justify-center"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="mx-auto grid w-full max-w-sm grid-cols-1 justify-items-center gap-4 sm:max-w-none sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                        {visibleVideos.map((video) => (
                            <div
                                key={video.id}
                                onClick={() =>
                                    onVideoSelect(`https://www.youtube.com/embed/${video.id}?autoplay=1`)
                                }
                                className="relative aspect-square lg:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10 p-1.5 cursor-pointer group shadow-xl transition-transform duration-300 hover:scale-[1.02] select-none"                            >
                                <div className="absolute inset-0 z-20 m-2 rounded-2xl border border-dashed border-white/5 transition group-hover:border-cat-orange/30" />

                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    loading="lazy"
                                    decoding="async"
                                    draggable={false}
                                    className="pointer-events-none h-full w-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

                                <div className="absolute inset-0 z-20 flex items-center justify-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/60 transition group-hover:bg-cat-orange sm:h-12 sm:w-12">
                                        <svg className="ml-0.5 h-6 w-6 fill-white sm:h-5 sm:w-5" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="absolute bottom-5 left-5 right-5 z-20">
                                    <p className="mb-1 text-[10px] uppercase tracking-widest text-cat-orange">
                                        {video.venue}
                                    </p>
                                    <h4 className="truncate text-lg font-bold uppercase tracking-wide text-white sm:text-base">
                                        {video.title}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={next}
                    className="absolute right-5 z-30 rounded-full bg-black/60 p-3 text-white backdrop-blur-sm transition hover:bg-cat-orange/80 sm:right-0"
                    aria-label="Next videos"
                >
                    ›
                </button>
            </div>
        </section>
    );
};

export default VideoCarousel;