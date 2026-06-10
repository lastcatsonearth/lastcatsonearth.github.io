import { useState, useEffect, useRef } from "react";
import { FaSpotify, FaPlay, FaPause } from "react-icons/fa";

interface AudioPlayerProps {
    src: string;
    coverSrc: string;
    title: string;
    artist: string;
}

const AudioPlayer = ({ src, coverSrc, title, artist }: AudioPlayerProps) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => { });
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        if (!audioRef.current) return;
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;
        const newTime = parseFloat(e.target.value);
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    // Reset play state if audio ends
    const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <section className="border-t border-white/5 pt-16 max-w-md mx-auto text-center">
            <p className="text-cat-orange uppercase tracking-[0.3em] text-sm mb-2">Our latest release</p>

            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl relative group">
                <div className="absolute inset-0 border border-dashed border-white/5 rounded-2xl m-1 pointer-events-none group-hover:border-cat-orange/20 transition-colors" />

                {/* Hidden Native Audio Element */}
                <audio
                    ref={audioRef}
                    src={src}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleEnded}
                />

                <div className="relative aspect-square w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden shadow-lg border border-white/10">
                    <img src={coverSrc} alt={`${title} cover art`} className="w-full h-full object-cover" />
                </div>

                <div className="relative z-10 mb-4">
                    <div className="flex items-center justify-center gap-2">
                        <h3 className="text-xl font-bold tracking-widest uppercase">
                            {title}
                        </h3>

                        <a
                            href="https://open.spotify.com/intl-it/track/71CmWXdlgbG0qiwAzn459K?si=7fabed66043e4776"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-500 hover:text-green-400 transition-colors"
                            aria-label="Open in Spotify"
                        >
                            <FaSpotify size={20} />
                        </a>
                    </div>

                    <p className="text-xs text-white/45 tracking-wider mt-1">{artist}</p>
                </div>

                {/* Custom Styled Audio Player Bar */}
                <div className="rounded-full bg-black/50 border border-white/5 px-4 py-2 backdrop-blur-sm max-w-sm mx-auto relative z-10 flex items-center gap-3">
                    <button
                        onClick={togglePlay}
                        className="w-8 h-8 rounded-full bg-cat-orange text-black flex items-center justify-center transition-transform active:scale-95 text-xs flex-shrink-0"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <FaPause size={10} /> : <FaPlay size={10} className="ml-0.5" />}
                    </button>

                    <span className="text-[10px] font-mono text-white/40 w-8 text-left">
                        {formatTime(currentTime)}
                    </span>

                    <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1 accent-cat-orange bg-white/10 rounded-lg appearance-none cursor-pointer"
                        style={{
                            background: `linear-gradient(to right, #f97316 0%, #f97316 ${(currentTime / (duration || 1)) * 100
                                }%, rgba(255,255,255,0.1) ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.1) 100%)`
                        }}
                    />

                    <span className="text-[10px] font-mono text-white/40 w-8 text-right">
                        {formatTime(duration)}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default AudioPlayer;