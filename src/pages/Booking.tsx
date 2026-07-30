import { useState, useEffect } from "react";
import { Instagram, Globe, Mail, Youtube } from "lucide-react";
import { FaSpotify, FaApple } from "react-icons/fa";

import BandHeader from "@/components/BandHeader";
import StarfieldCanvas from "@/components/booking/StarfieldCanvas";
import VideoMarquee from "@/components/booking/VideoMarquee";
import AudioPlayer from "@/components/booking/AudioPlayer";
import VideoCarousel from "@/components/booking/VideoCarousel";
import PhotoGallery from "@/components/booking/PhotoGallery";
import BookingForm from "@/components/booking/BookingForm";
import { LanguageProvider, useLanguage } from "@/components/booking/LanguageContext";

import flashbackAudio from "@/assets/booking/music/flashback.mp3";
import flashbackCover from "@/assets/booking/music/flashback.jpg";
import photo1 from "@/assets/booking/photos/photo_1.png";
import photo2 from "@/assets/booking/photos/photo_2.png";
import photo3 from "@/assets/booking/photos/photo_3.png";
import photo4 from "@/assets/booking/photos/photo_4.png";
import photo5 from "@/assets/booking/photos/photo_5.png";
import loopVideo1 from "@/assets/booking/videos/loop_1.mp4";
import loopVideo2 from "@/assets/booking/videos/loop_2.mp4";
import loopVideo3 from "@/assets/booking/videos/loop_3.mp4";

const livePhotos = [photo1, photo2, photo3, photo4, photo5];
const liveLoops = [loopVideo1, loopVideo2, loopVideo3];

const SocialIcon = ({
    href,
    icon,
    label,
    external = true,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
    external?: boolean;
}) => (
    <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={label}
        className="p-3 text-white/40 transition-all duration-300 hover:text-cat-orange hover:scale-110"
    >
        {icon}
    </a>
);

const BookingContent = ({ onVideoSelect }: { onVideoSelect: (url: string | null) => void }) => {
    const { lang, setLang } = useLanguage();

    return (
        <>
            {/* Language Switcher Controller - Fixed syntax error and added z-index padding */}
            <div className="relative z-30 max-w-6xl mx-auto w-full flex justify-end gap-2 text-m font-medium uppercase tracking-wider -mb-6 px-4 sm:px-6 pr-6 sm:pr-12">
                <button
                    onClick={() => setLang("en")}
                    className={`transition-colors ${lang === "en" ? "text-cat-orange" : "text-white/40 hover:text-white"}`}
                >
                    EN
                </button>
                <span className="text-white/20">|</span>
                <button
                    onClick={() => setLang("de")}
                    className={`transition-colors ${lang === "de" ? "text-cat-orange" : "text-white/40 hover:text-white"}`}
                >
                    DE
                </button>
            </div>

            <BandHeader linkToHome />

            <main className="max-w-6xl mx-auto mt-10 space-y-0">
                <VideoMarquee videos={liveLoops} />

                <VideoCarousel onVideoSelect={onVideoSelect} />

                <PhotoGallery photos={livePhotos} />

                <AudioPlayer
                    src={flashbackAudio}
                    coverSrc={flashbackCover}
                    title="Flashback"
                    artist="Last Cats on Earth"
                />

                <BookingForm />
            </main>
        </>
    );
};

const Booking = () => {
    const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

    // Set document title on page mount
    useEffect(() => {
        document.title = "Last Cats on Earth | Booking";
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActiveVideoUrl(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <LanguageProvider>
            <div className="relative min-h-screen bg-black text-white px-6 pt-10 overflow-x-hidden flex flex-col justify-between">
                <StarfieldCanvas />

                <div className="relative z-10 w-full flex-grow">
                    <BookingContent onVideoSelect={setActiveVideoUrl} />

                    {/* YouTube video lightbox */}
                    {activeVideoUrl && (
                        <div
                            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-12 animate-fadeIn backdrop-blur-sm"
                            onClick={() => setActiveVideoUrl(null)}
                        >
                            <button
                                className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-light transition-colors z-50 p-2"
                                onClick={() => setActiveVideoUrl(null)}
                                aria-label="Close overlay"
                            >
                                ✕
                            </button>
                            <div
                                className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <iframe
                                    className="w-full h-full"
                                    src={activeVideoUrl}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}
                </div>

                <footer className="relative z-10 mt-24 pt-8 border-t border-white/10 w-full max-w-6xl mx-auto">
                    <div className="bg-black py-4">
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            <SocialIcon href="https://www.instagram.com/lastcatsonearth/" icon={<Instagram className="w-5 h-5" />} label="Instagram" />
                            <SocialIcon href="https://www.youtube.com/@lastcatsonearth" icon={<Youtube className="w-5 h-5" />} label="YouTube" />
                            <SocialIcon href="https://lastcatsonearth.github.io/booking" icon={<Globe className="w-5 h-5" />} label="Website" />
                            <SocialIcon href="https://open.spotify.com/intl-it/artist/2nW6fmoJwCEknAfAVhmGwa?si=VLqYdbF_R_-8cLo5zJJwKw" icon={<FaSpotify className="w-5 h-5" />} label="Spotify" />
                            <SocialIcon href="https://music.apple.com/at/artist/last-cats-on-earth/1887321356" icon={<FaApple className="w-5 h-5" />} label="Apple Music" />
                            <SocialIcon href="mailto:contact@lastcatsonearth.de" icon={<Mail className="w-5 h-5" />} label="Contact" external={false} />
                        </div>
                        <p className="bg-black text-center text-[11px] uppercase tracking-wider text-white/30 mt-4 mb-2">
                            © 2026 Last Cats on Earth. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </LanguageProvider>
    );
};

export default Booking;