import { useState } from "react";

export interface LiveVideo {
    id: string;
    title: string;
    venue: string;
    thumbnail: string;
}

export const liveVideos: LiveVideo[] = [
    {
        id: "k0L_bSeLRPI",
        title: "FLASHBACK!",
        venue: "Alte Utting, Munich",
        thumbnail: "https://img.youtube.com/vi/k0L_bSeLRPI/maxresdefault.jpg",
    },
    {
        id: "iqeK2wgDBOk",
        title: "Dani California",
        venue: "Shamrock, Munich",
        thumbnail: "https://img.youtube.com/vi/iqeK2wgDBOk/maxresdefault.jpg",
    },
    {
        id: "rpMnFdiqLKU",
        title: "Lonely Boy",
        venue: "Alte Utting, Munich",
        thumbnail: "https://img.youtube.com/vi/rpMnFdiqLKU/maxresdefault.jpg",
    },
    {
        id: "AM9d46YrdaM",
        title: "Can't Stop",
        venue: "Alte Utting, Munich",
        thumbnail: "https://img.youtube.com/vi/AM9d46YrdaM/maxresdefault.jpg",
    },
    {
        id: "Y27TPa3lVqk",
        title: "Hard to Handle",
        venue: "Shamrock, Munich",
        thumbnail: "https://img.youtube.com/vi/Y27TPa3lVqk/maxresdefault.jpg",
    },
    {
        id: "edZZoAsVDcA",
        title: "Smooth",
        venue: "Alte Utting, Munich",
        thumbnail: "https://img.youtube.com/vi/f5UjnMcHz7k/maxresdefault.jpg",
    },
];

const VISIBLE_COUNT = 3;

interface VideoCarouselProps {
    onVideoSelect: (embedUrl: string) => void;
}

const VideoCarousel = ({ onVideoSelect }: VideoCarouselProps) => {
    const [startIdx, setStartIdx] = useState(0);

    const prev = () => setStartIdx((i) => (i - 1 + liveVideos.length) % liveVideos.length);
    const next = () => setStartIdx((i) => (i + 1) % liveVideos.length);

    const visibleVideos = Array.from({ length: VISIBLE_COUNT }, (_, i) =>
        liveVideos[(startIdx + i) % liveVideos.length]
    );

    return (
        <section className="border-t border-white/5 pt-16">
            <p className="text-cat-orange uppercase tracking-[0.25em] text-sm mb-3 text-center">Live Video Reels</p>
            <h3 className="text-3xl md:text-2xl font-bold text-center mb-8 tracking-wide">WATCH US PLAY</h3>

            <div className="relative max-w-5xl mx-auto flex items-center justify-center gap-6">
                <button
                    onClick={prev}
                    className="absolute left-0 z-30 bg-black/60 hover:bg-cat-orange/80 text-white p-3 rounded-full backdrop-blur-sm transition"
                    aria-label="Previous videos"
                >
                    ‹
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full px-12">
                    {visibleVideos.map((video) => (
                        <div
                            key={video.id}
                            onClick={() =>
                                onVideoSelect(`https://www.youtube.com/embed/${video.id}?autoplay=1`)
                            }
                            className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10 p-1.5 cursor-pointer group shadow-xl transition-transform duration-300 hover:scale-[1.02]"
                        >
                            <div className="absolute inset-0 border border-dashed border-white/5 rounded-2xl m-2 group-hover:border-cat-orange/30 transition z-20" />

                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <div className="w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center group-hover:bg-cat-orange transition">
                                    <svg className="w-5 h-5 fill-white ml-0.5" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="absolute bottom-5 left-5 right-5 z-20">
                                <p className="text-[10px] uppercase tracking-widest text-cat-orange mb-1">
                                    {video.venue}
                                </p>
                                <h4 className="text-base font-bold uppercase tracking-wide truncate text-white">
                                    {video.title}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={next}
                    className="absolute right-0 z-30 bg-black/60 hover:bg-cat-orange/80 text-white p-3 rounded-full backdrop-blur-sm transition"
                    aria-label="Next videos"
                >
                    ›
                </button>
            </div>
        </section>
    );
};

export default VideoCarousel;