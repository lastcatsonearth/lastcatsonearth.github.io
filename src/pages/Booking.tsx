import { useState, useEffect } from "react";

import BandHeader from "@/components/BandHeader";
import StarfieldCanvas from "@/components/booking/StarfieldCanvas";
import VideoMarquee from "@/components/booking/VideoMarquee";
import AudioPlayer from "@/components/booking/AudioPlayer";
import VideoCarousel from "@/components/booking/VideoCarousel";
import PhotoGallery from "@/components/booking/PhotoGallery";
import BookingForm from "@/components/booking/BookingForm";
import Footer from "@/components/Footer";
import { LanguageProvider, useLanguage } from "@/components/booking/LanguageContext";

import flashbackAudio from "@/assets/booking/music/flashback.mp3";
import flashbackCover from "@/assets/booking/music/flashback.jpg";

// Alte Utting Photos
import uttingPhoto1 from "@/assets/booking/photos/alte_utting/photo_1.png";
import uttingPhoto2 from "@/assets/booking/photos/alte_utting/photo_2.png";
import uttingPhoto3 from "@/assets/booking/photos/alte_utting/photo_3.png";
import uttingPhoto4 from "@/assets/booking/photos/alte_utting/photo_4.png";
import uttingPhoto5 from "@/assets/booking/photos/alte_utting/photo_5.png";

// Renazzo Photos
import renazzoPhoto1 from "@/assets/booking/photos/renazzo/1.jpg";
import renazzoPhoto2 from "@/assets/booking/photos/renazzo/2.jpg";
import renazzoPhoto3 from "@/assets/booking/photos/renazzo/3.jpg";
import renazzoPhoto4 from "@/assets/booking/photos/renazzo/4.jpg";
import renazzoPhoto5 from "@/assets/booking/photos/renazzo/5.jpg";
import renazzoPhoto6 from "@/assets/booking/photos/renazzo/6.jpg";

import loopVideo1 from "@/assets/booking/videos/loop_1.mp4";
import loopVideo2 from "@/assets/booking/videos/loop_2.mp4";
import loopVideo3 from "@/assets/booking/videos/loop_3.mp4";

const liveLoops = [loopVideo1, loopVideo2, loopVideo3];

const galleryShows = [
    {
        showTitle: "Woodstock Party",
        location: "Renazzo, IT",
        date: "Jul 2026",
        photos: [renazzoPhoto1, renazzoPhoto2, renazzoPhoto3, renazzoPhoto4, renazzoPhoto5, renazzoPhoto6],
    },
    {
        showTitle: "Alte Utting",
        location: "Munich, DE",
        date: "Jun 2026",
        photos: [uttingPhoto1, uttingPhoto2, uttingPhoto3, uttingPhoto4, uttingPhoto5],
    },
];

const BookingContent = ({ onVideoSelect }: { onVideoSelect: (url: string | null) => void }) => {
    const { lang, setLang } = useLanguage();

    return (
        <>
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
                <PhotoGallery shows={galleryShows} />
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

    // Prevent background body scrolling when the video modal is open
    useEffect(() => {
        if (activeVideoUrl) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [activeVideoUrl]);

    return (
        <LanguageProvider>
            <div className="relative min-h-screen bg-black text-white px-6 pt-10 flex flex-col justify-between touch-pan-y overflow-x-clip">
                <StarfieldCanvas />

                <div className="relative z-10 w-full flex-grow">
                    <BookingContent onVideoSelect={setActiveVideoUrl} />

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

                <div className="relative z-10 mt-24 mb-10 w-full max-w-6xl mx-auto">
                    <Footer />
                </div>
            </div>
        </LanguageProvider>
    );
};

export default Booking;