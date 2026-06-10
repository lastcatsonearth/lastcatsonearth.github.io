import { useRef, useState, useEffect } from "react";

interface VideoMarqueeProps {
    videos: string[];
}

const SCROLL_SPEED = 0.5; // px per frame
const VideoMarquee = ({ videos }: VideoMarqueeProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const rafRef = useRef<number | null>(null);
    const [isUserDragging, setIsUserDragging] = useState(false);
    const setWidthRef = useRef(0);

    // Auto-scroll loop
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const measure = () => {
            // width of original set (half of full doubled scroll)
            setWidthRef.current = container.scrollWidth / 2;
        };

        measure();
        window.addEventListener("resize", measure);

        const tick = () => {
            if (!isDraggingRef.current && container) {
                container.scrollLeft += SCROLL_SPEED;

                const setWidth = setWidthRef.current;

                // seamless wrap without jump
                if (setWidth && container.scrollLeft >= setWidth) {
                    container.scrollLeft -= setWidth;
                }
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("resize", measure);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        const container = containerRef.current;
        if (!container) return;
        isDraggingRef.current = true;
        setIsUserDragging(true);
        const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
        startXRef.current = pageX;
        scrollLeftRef.current = container.scrollLeft;
    };

    const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDraggingRef.current || !containerRef.current) return;
        e.preventDefault();
        const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
        const walk = (pageX - startXRef.current) * 1.5;
        containerRef.current.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleDragEnd = () => {
        isDraggingRef.current = false;
        setIsUserDragging(false);
    };

    const loopedVideos = [...videos, ...videos];

    return (
        <section className="text-center">
            <p className="text-cat-orange uppercase tracking-[0.25em] text-sm mb-2">Welcome bookers & fans</p>
            <h3 className="text-3xl md:text-2xl font-bold mb-4 tracking-wide">EXPERIENCE THE ENERGY</h3>
            <p className="text-sm text-white/50 max-w-lg mx-auto mb-10 tracking-wide">
                Get a glimpse of our live atmosphere, media kits, and raw stage recordings below.
            </p>

            <div className="relative max-w-5xl mx-auto [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]">
                <div
                    ref={containerRef}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                    className={`w-full flex gap-6 overflow-x-scroll scrollbar-none select-none ${isUserDragging ? "cursor-grabbing" : "cursor-grab"}`}
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {loopedVideos.map((videoSrc, idx) => (
                        <div
                            key={idx}
                            aria-hidden={idx >= videos.length ? "true" : undefined}
                            className="relative flex-shrink-0 w-[260px] sm:w-[340px] md:w-[400px] aspect-video bg-white/[0.01] border border-white/10 rounded-xl overflow-hidden group shadow-md"
                        >
                            <video
                                src={videoSrc}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                            />
                            <div className="absolute inset-0 border border-dashed border-white/5 rounded-lg m-1 pointer-events-none group-hover:border-cat-orange/20 transition-colors" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoMarquee;