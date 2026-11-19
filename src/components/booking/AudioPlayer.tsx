import { useState, useRef, TouchEvent } from "react";
import { FaSpotify, FaPlay, FaPause, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReleaseCountdown } from "@/hooks/useReleaseCountdown";
import { Link } from "react-router-dom";
import { useLocalePath } from "@/i18n/LanguageContext";
import { formatReleaseDate, releases } from "@/content/releases";

interface Track {
    src: string;
    coverSrc: string;
    title: string;
    artist: string;
    spotifyUrl?: string;
    released?: boolean;
    releaseDate?: string;
    /** ISO date-time: before it the track shows the release date, after it it plays (no redeploy needed). */
    releaseAt?: string;
    /** Song page at /music/<slug>. */
    slug?: string;
}

// Newest first, straight from content/releases.ts. Unreleased songs unlock themselves on their release date.
const tracks: Track[] = releases.map((r) => ({
    src: r.audio,
    coverSrc: r.cover,
    title: r.title,
    artist: "Last Cats on Earth",
    releaseAt: r.releaseAt,
    slug: r.slug,
    spotifyUrl: r.links.find((l) => l.label === "Spotify" && l.href.includes("/track/"))?.href,
}));

const translations = {
    en: {
        category: "Our latest releases",
        release: "Out on",
        altTemplate: "cover art",
        play: "Play",
        pause: "Pause",
        spotify: "Open in Spotify",
    },
    de: {
        category: "Unsere neuesten Veröffentlichungen",
        release: "Erscheint am",
        altTemplate: "Cover-Artwork",
        play: "Abspielen",
        pause: "Pausieren",
        spotify: "In Spotify öffnen",
    },
};

const SinglePlayer = ({
    track,
    onPrev,
    onNext,
    showControls = false,
}: {
    track: Track;
    onPrev?: () => void;
    onNext?: () => void;
    showControls?: boolean;
}) => {
    const { lang } = useLanguage();
    const p = useLocalePath();
    const t = translations[lang];

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const countdown = useReleaseCountdown(track.releaseAt ?? "2000-01-01T00:00:00Z");
    const released = track.releaseAt ? countdown.released : track.released ?? true;
    const releaseDate = track.releaseAt ? formatReleaseDate(track.releaseAt, lang) : track.releaseDate;

    const togglePlay = () => {
        if (!audioRef.current || !released) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => { });
        }

        setIsPlaying(!isPlaying);
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";

        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);

        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="text-center w-full">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 sm:p-5 md:p-7 backdrop-blur-md shadow-2xl relative group w-full min-w-0 mx-auto">
                <div className="absolute inset-0 border border-dashed border-white/5 rounded-2xl m-1 pointer-events-none group-hover:border-cat-orange/20 transition-colors" />

                <audio
                    ref={audioRef}
                    src={released ? track.src : undefined}
                    onTimeUpdate={() =>
                        audioRef.current && setCurrentTime(audioRef.current.currentTime)
                    }
                    onLoadedMetadata={() =>
                        audioRef.current && setDuration(audioRef.current.duration)
                    }
                    onEnded={() => {
                        setIsPlaying(false);
                        setCurrentTime(0);
                    }}
                />

                {/* Cover with optional Mobile Controls Overlay */}
                <div className="relative aspect-square w-full max-w-60 mx-auto rounded-lg overflow-hidden shadow-lg border border-white/10">
                    <img
                        src={track.coverSrc}
                        alt={`${track.title} ${t.altTemplate}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                    />

                    {!released && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-xs uppercase tracking-[0.2em] text-white/80 text-center px-4">
                                {t.release} {releaseDate}
                            </span>
                        </div>
                    )}

                    {showControls && (
                        <>
                            <button
                                onClick={onPrev}
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors border border-white/10"
                                aria-label="Previous Track"
                            >
                                <FaChevronLeft size={14} />
                            </button>
                            <button
                                onClick={onNext}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors border border-white/10"
                                aria-label="Next Track"
                            >
                                <FaChevronRight size={14} />
                            </button>
                        </>
                    )}
                </div>

                {/* Song information */}
                <div className="relative z-10 mt-6 mb-5 min-w-0">
                    <div className="flex items-center justify-center gap-2 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold tracking-widest uppercase truncate">
                            {track.slug ? (
                                <Link to={p(`/music/${track.slug}`)} className="hover:text-cat-orange transition-colors">
                                    {track.title}
                                </Link>
                            ) : (
                                track.title
                            )}
                        </h3>

                        {track.spotifyUrl && (
                            <a
                                href={track.spotifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-500 hover:text-green-400 transition-colors flex-shrink-0"
                                aria-label={t.spotify}
                            >
                                <FaSpotify size={20} />
                            </a>
                        )}
                    </div>

                    <p className="text-xs text-white/45 tracking-wider mt-1">
                        {track.artist}
                    </p>
                </div>

                {/* Fixed player area */}
                <div className="h-10 w-full max-w-60 mx-auto relative z-10">
                    {released ? (
                        <div className="h-full rounded-full bg-black/50 border border-white/5 px-3 backdrop-blur-sm flex items-center gap-2">
                            <button
                                onClick={togglePlay}
                                className="w-8 h-8 rounded-full bg-cat-orange text-black flex items-center justify-center transition-transform active:scale-95 flex-shrink-0"
                                aria-label={isPlaying ? t.pause : t.play}
                            >
                                {isPlaying ? (
                                    <FaPause size={10} />
                                ) : (
                                    <FaPlay size={10} className="ml-0.5" />
                                )}
                            </button>

                            <span className="text-[10px] font-mono text-white/40 w-7 text-left">
                                {formatTime(currentTime)}
                            </span>

                            <input
                                type="range"
                                min="0"
                                max={duration || 100}
                                value={currentTime}
                                onChange={(e) => {
                                    if (!audioRef.current) return;

                                    const time = Number(e.target.value);
                                    audioRef.current.currentTime = time;
                                    setCurrentTime(time);
                                }}
                                className="w-full h-1 accent-cat-orange appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(
                                        to right,
                                        #f97316 0%,
                                        #f97316 ${progress}%,
                                        rgba(255,255,255,0.1) ${progress}%,
                                        rgba(255,255,255,0.1) 100%
                                    )`,
                                }}
                            />

                            <span className="text-[10px] font-mono text-white/40 w-7 text-right">
                                {formatTime(duration)}
                            </span>
                        </div>
                    ) : (
                        <div className="h-full rounded-full bg-black/30 border border-white/5 flex items-center justify-center">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                                {t.release} {releaseDate}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AudioPlayer = ({ compact = false }: { compact?: boolean }) => {
    const { lang } = useLanguage();
    const t = translations[lang];

    const [mobileTrackIndex, setMobileTrackIndex] = useState(0);

    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const handleNext = () => {
        setMobileTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    const handlePrev = () => {
        setMobileTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    };

    const handleTouchStart = (e: TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const distance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) {
            handleNext(); // Swiped left -> Next track
        } else if (distance < -minSwipeDistance) {
            handlePrev(); // Swiped right -> Previous track
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <section className={compact ? "w-full" : "pt-24 pb-20"}>
            {!compact && (
                <p className="text-cat-orange uppercase tracking-[0.3em] text-sm text-center mb-12">
                    {t.category}
                </p>
            )}

            {/* Compact view keeps one release visible on every device. */}
            {compact && (
                <div
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="mx-auto max-w-sm touch-pan-y"
                >
                    <SinglePlayer
                        track={tracks[mobileTrackIndex]}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        showControls
                    />
                    <div className="mt-4 flex justify-center gap-2">
                        {tracks.map((track, idx) => (
                            <button
                                key={track.title}
                                onClick={() => setMobileTrackIndex(idx)}
                                className={`h-2 rounded-full transition-all ${idx === mobileTrackIndex ? "w-6 bg-cat-orange" : "w-2 bg-white/20"}`}
                                aria-label={`Show ${track.title}`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {!compact && <div className="block md:hidden max-w-xs mx-auto px-2">
                <div
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="touch-pan-y"
                >
                    <SinglePlayer
                        track={tracks[mobileTrackIndex]}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        showControls
                    />
                </div>

                {/* Mobile indicators */}
                <div className="flex justify-center gap-2 mt-4">
                    {tracks.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setMobileTrackIndex(idx)}
                            className={`h-2 rounded-full transition-all ${idx === mobileTrackIndex
                                ? "w-6 bg-cat-orange"
                                : "w-2 bg-white/20"
                                }`}
                            aria-label={`Go to track ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>}

            {/* Desktop / Tablet View: Grid side-by-side */}
            {!compact && <div className="hidden md:grid grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto px-4">
                {tracks.map((track) => (
                    <SinglePlayer key={track.title} track={track} />
                ))}
            </div>}
        </section>
    );
};

export default AudioPlayer;