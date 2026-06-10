import { FaSpotify } from "react-icons/fa";

interface AudioPlayerProps {
    src: string;
    coverSrc: string;
    title: string;
    artist: string;
}


const AudioPlayer = ({ src, coverSrc, title, artist }: AudioPlayerProps) => (
    <section className="border-t border-white/5 pt-16 max-w-md mx-auto text-center">
        <p className="text-cat-orange uppercase tracking-[0.3em] text-sm mb-2">Our latest release</p>

        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl relative group">
            <div className="absolute inset-0 border border-dashed border-white/5 rounded-2xl m-1 pointer-events-none group-hover:border-cat-orange/20 transition-colors" />

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

            <div className="rounded-full bg-black/40 border border-white/5 p-2 backdrop-blur-sm max-w-sm mx-auto relative z-10">
                <audio
                    controls
                    className="w-full filter invert contrast-200 h-9 accent-cat-orange"
                    src={src}
                >
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
    </section>
);

export default AudioPlayer;