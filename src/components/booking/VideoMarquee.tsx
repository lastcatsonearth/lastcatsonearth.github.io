import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/components/booking/LanguageContext";

interface VideoMarqueeProps {
    videos: string[];
}

const SCROLL_SPEED = 0.5; // px per frame



const translations = {
    en: {
        welcome: "Welcome bookers & fans",
        bio1: (
            <>
                Based in Munich, <strong>Last Cats on Earth</strong> deliver a mix of hard rock, funk, and alternative rock sounds.
                Our main rule is originality: whether it's our original tracks or reinterpreting famous covers, we always do it our own way.
            </>
        ),
        bio2: (
            <>
                Our DNA is heavily influenced by the Californian pop-rock of the early 2000s, reworking those sounds with influences
                from funk, rap, punk, and even electronic music. Our latest single, <strong>NEVER STOP</strong>, is out now, following
                our debut <strong>FLASHBACK!</strong>. Our live set also features a growing collection of original material that has yet
                to be released, giving audiences the opportunity to discover songs they won't find anywhere else.
            </>
        ),
        bio3: (
            <>
                From intimate venues to bigger stages, our shows keep everyone on their toes by constantly shifting gears:
                from hard-hitting instrumentals and melodic hooks to rap verses, choreography, and direct crowd-work. We don't just
                play music: the stage is our home.
            </>
        ),
    },
    de: {
        welcome: "Willkommen Bookers & Fans",
        bio1: (
            <>
                Ansässig in München liefern <strong>Last Cats on Earth</strong> einen Mix aus Hard Rock, Funk und Alternative Rock.
                Unsere wichtigste Regel ist Originalität: Egal ob wir eigene Tracks raushauen oder berühmte Cover komplett umgestalten,
                wir machen es immer auf unsere eigene Art.
            </>
        ),
        bio2: (
            <>
                Unsere DNA ist stark vom kalifornischen Pop-Rock der frühen 2000er Jahre geprägt, dessen Sound wir mit Einflüssen aus
                Funk, Rap, Punk und sogar elektronischer Musik neu interpretieren. Unsere neueste Single <strong>NEVER STOP</strong> ist
                jetzt draußen und folgt auf unser Debüt <strong>FLASHBACK!</strong>. Unser Live-Set umfasst außerdem eine stetig
                wachsende Sammlung eigener Songs, die noch nicht veröffentlicht sind, und gibt dem Publikum die Möglichkeit, Musik zu
                entdecken, die es sonst nirgendwo zu hören gibt.
            </>
        ),
        bio3: (
            <>
                Von kleinen Clubs bis hin zu größeren Bühnen halten unsere Shows das Publikum ständig auf Trab und wechseln dabei immer wieder den Gang: von knallharten Instrumentals und melodischen Hooks bis hin zu Rap-Versen, Choreografien und direkter Interaktion mit dem Publikum. Wir machen nicht einfach nur Musik: Die Bühne ist unser Zuhause.

            </>
        ),
    }
};

const VideoMarquee = ({ videos }: VideoMarqueeProps) => {
    const { lang } = useLanguage();
    const t = translations[lang];

    const containerRef = useRef<HTMLDivElement | null>(null);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const rafRef = useRef<number | null>(null);
    const [isUserDragging, setIsUserDragging] = useState(false);
    const setWidthRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const measure = () => {
            setWidthRef.current = container.scrollWidth / 2;
        };

        measure();
        window.addEventListener("resize", measure);

        const tick = () => {
            if (!isDraggingRef.current && container) {
                container.scrollLeft += SCROLL_SPEED;
                const setWidth = setWidthRef.current;

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

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const videoElements = container.querySelectorAll("video");
        videoElements.forEach((video) => {
            video.play().catch(() => { });
        });
    }, [videos]);

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
        <section className="text-center w-full max-w-5xl mx-auto -mt-10 sm:-mt-0">
            <p className="text-cat-orange uppercase tracking-[0.25em] text-sm mb-2">{t.welcome}</p>

            <div className="text-sm text-white mx-auto mb-10 tracking-wide text-justify space-y-4 w-full break-words [hyphens:auto] [lang:inherit]">
                <p>{t.bio1}</p>
                <p>{t.bio2}</p>
                <p>{t.bio3}</p>
            </div>

            <div className="relative w-full [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]">
                <div
                    ref={containerRef}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                    className={`w-full flex gap-6 overflow-x-scroll scrollbar-none select-none touch-pan-y ${isUserDragging ? "cursor-grabbing" : "cursor-grab"}`}
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
                                controls={false}
                                webkit-playsinline="true"
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