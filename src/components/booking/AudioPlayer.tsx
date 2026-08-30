import { useState, useRef } from "react";
import { FaSpotify, FaPlay, FaPause } from "react-icons/fa";
import { useLanguage } from "@/components/booking/LanguageContext";

import flashbackAudio from "@/assets/booking/music/flashback/flashback.mp3";
import flashbackCover from "@/assets/booking/music/flashback/flashback.jpg";
import neverStopAudio from "@/assets/booking/music/never_stop/never_stop.mp3";
import neverStopCover from "@/assets/booking/music/never_stop/never_stop.png";

interface Track {
    src: string;
    coverSrc: string;
    title: string;
    artist: string;
    spotifyUrl?: string;
    released?: boolean;
    releaseDate?: string;
}

const tracks: Track[] = [
    {
        src: flashbackAudio,
        coverSrc: flashbackCover,
        title: "FLASHBACK!",
        artist: "Last Cats on Earth",
        spotifyUrl:
            "https://open.spotify.com/track/71CmWXdlgbG0qiwAzn459K?si=bb888fa0d45b4e7e",
        released: true,
    },
    {
        src: neverStopAudio,
        coverSrc: neverStopCover,
        title: "NEVER STOP",
        artist: "Last Cats on Earth",
        released: false,
        releaseDate: "11 September",
    },
];

const translations = {
    en: {
        category: "Our latest releases",
        release: "Releases",
        altTemplate: "cover art",
        play: "Play",
        pause: "Pause",
        spotify: "Open in Spotify",
    },
    de: {
        category: "Unsere neuesten Veröffentlichungen",
        release: "Veröffentlicht am",
        altTemplate: "Cover-Artwork",
        play: "Abspielen",
        pause: "Pausieren",
        spotify: "In Spotify öffnen",
    },
};

const SinglePlayer = ({ track }: { track: Track }) => {
    const { lang } = useLanguage();
    const t = translations[lang];

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const released = track.released ?? true;

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

    const progress =
        duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="text-center">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-7 backdrop-blur-md shadow-2xl relative group w-fit mx-auto">
                <div className="absolute inset-0 border border-dashed border-white/5 rounded-2xl m-1 pointer-events-none group-hover:border-cat-orange/20 transition-colors" />

                <audio
                    ref={audioRef}
                    src={released ? track.src : undefined}
                    onTimeUpdate={() =>
                        audioRef.current &&
                        setCurrentTime(audioRef.current.currentTime)
                    }
                    onLoadedMetadata={() =>
                        audioRef.current &&
                        setDuration(audioRef.current.duration)
                    }
                    onEnded={() => {
                        setIsPlaying(false);
                        setCurrentTime(0);
                    }}
                />

                {/* Cover */}
                <div className="relative aspect-square w-60 h-60 mx-auto rounded-lg overflow-hidden shadow-lg border border-white/10">
                    <img
                        src={track.coverSrc}
                        alt={`${track.title} ${t.altTemplate}`}
                        className="w-full h-full object-cover"
                    />

                    {!released && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-xs uppercase tracking-[0.2em] text-white/80 text-center px-4">
                                {t.release} {track.releaseDate}
                            </span>
                        </div>
                    )}
                </div>

                {/* Song information */}
                <div className="relative z-10 mt-6 mb-5">
                    <div className="flex items-center justify-center gap-2">
                        <h3 className="text-xl font-bold tracking-widest uppercase">
                            {track.title}
                        </h3>

                        {track.spotifyUrl && (
                            <a
                                href={track.spotifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-500 hover:text-green-400 transition-colors"
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
                <div className="h-10 w-60 relative z-10">
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
                        /* Same height as the real player */
                        <div className="h-full rounded-full bg-black/30 border border-white/5 flex items-center justify-center">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                                {t.release} {track.releaseDate}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AudioPlayer = () => {
    const { lang } = useLanguage();
    const t = translations[lang];

    return (
        <section className="pt-24 pb-20">
            <p className="text-cat-orange uppercase tracking-[0.3em] text-sm text-center mb-12">
                {t.category}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
                {tracks.map((track) => (
                    <SinglePlayer key={track.title} track={track} />
                ))}
            </div>
        </section>
    );
};

export default AudioPlayer;