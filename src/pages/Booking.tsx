import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

import AudioPlayer from "@/components/booking/AudioPlayer";
import VideoMarquee from "@/components/booking/VideoMarquee";
import VideoCarousel from "@/components/booking/VideoCarousel";
import PhotoGallery from "@/components/booking/PhotoGallery";
import BookingForm from "@/components/booking/BookingForm";
import StarfieldCanvas from "@/components/booking/StarfieldCanvas";
import Footer from "@/components/Footer";
import { LanguageProvider, useLanguage } from "@/components/booking/LanguageContext";

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


import zamanandPhoto1 from "@/assets/booking/photos/zamanand/1.jpg";
import zamanandPhoto2 from "@/assets/booking/photos/zamanand/2.jpg";
import zamanandPhoto3 from "@/assets/booking/photos/zamanand/3.jpg";
import zamanandPhoto4 from "@/assets/booking/photos/zamanand/4.jpg";
import zamanandPhoto5 from "@/assets/booking/photos/zamanand/5.jpg";
import zamanandPhoto6 from "@/assets/booking/photos/zamanand/6.jpg";
import zamanandPhoto7 from "@/assets/booking/photos/zamanand/7.jpg";
import zamanandPhoto8 from "@/assets/booking/photos/zamanand/8.jpg";
import zamanandPhoto9 from "@/assets/booking/photos/zamanand/9.jpeg";
import zamanandPhoto10 from "@/assets/booking/photos/zamanand/10.jpeg";
import zamanandPhoto11 from "@/assets/booking/photos/zamanand/11.jpeg";
import zamanandPhoto12 from "@/assets/booking/photos/zamanand/12.jpeg";
import zamanandPhoto13 from "@/assets/booking/photos/zamanand/13.jpeg";
import zamanandPhoto14 from "@/assets/booking/photos/zamanand/14.jpeg";
import zamanandPhoto15 from "@/assets/booking/photos/zamanand/15.jpg";
import zamanandPhoto16 from "@/assets/booking/photos/zamanand/16.jpeg";
import zamanandPhoto17 from "@/assets/booking/photos/zamanand/17.jpeg";
import zamanandPhoto18 from "@/assets/booking/photos/zamanand/18.jpeg";
import zamanandPhoto19 from "@/assets/booking/photos/zamanand/19.jpeg";
import zamanandPhoto20 from "@/assets/booking/photos/zamanand/20.jpeg";
import zamanandPhoto21 from "@/assets/booking/photos/zamanand/21.jpeg";

const galleryShows = [
    {
        showTitle: "Zamanand Festival",
        location: "Munich, DE",
        date: "Sep 2026",
        photos: [
            zamanandPhoto1,
            zamanandPhoto2,
            zamanandPhoto3,
            zamanandPhoto4,
            zamanandPhoto5,
            zamanandPhoto6,
            zamanandPhoto7,
            zamanandPhoto8,
            zamanandPhoto9,
            zamanandPhoto10,
            zamanandPhoto11,
            zamanandPhoto12,
            zamanandPhoto13,
            zamanandPhoto14,
            zamanandPhoto15,
            zamanandPhoto16,
            zamanandPhoto17,
            zamanandPhoto18,
            zamanandPhoto19,
            zamanandPhoto20,
            zamanandPhoto21,
        ],
    },
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

const preloadImage = (src: string) =>
    new Promise<void>((resolve) => {
        const image = new Image();
        image.onload = () => resolve();
        image.onerror = () => resolve();
        image.src = src;
    });

const waitForBookingReady = async () => {
    const criticalImages = galleryShows[0].photos.slice(0, 5).map(p => p.thumb);
    await Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        Promise.all(criticalImages.map(preloadImage)),
    ]);
};

const BookingContent = ({ onVideoSelect }: { onVideoSelect: (url: string | null) => void }) => {
    const { lang, setLang } = useLanguage();

    const sections = ["bio", "videos", "releases", "photos", "contact"];
    const [activeIdx, setActiveIdx] = useState(0);

    const scrollToSection = (index: number) => {
        const el = document.getElementById(sections[index]);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            setActiveIdx(index);
        }
    };

    return (
        <div className="relative z-10 w-full text-white">
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl px-4 sm:px-8 py-3 flex items-center justify-between">
                <a
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-cat-orange transition-transform hover:scale-105"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Home
                </a>

                <nav className="hidden lg:flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.25em]">
                    {sections.map((sec, idx) => (
                        <button
                            key={sec}
                            onClick={() => scrollToSection(idx)}
                            className={`transition-colors capitalize ${activeIdx === idx ? "text-cat-orange underline underline-offset-8" : "text-white/50 hover:text-white"}`}
                        >
                            {sec === "contact" ? "Get in Touch" : sec}
                        </button>
                    ))}
                </nav>

                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <button
                        onClick={() => setLang("en")}
                        className={`transition-colors ${lang === "en" ? "text-cat-orange font-bold" : "text-white/40 hover:text-white"}`}
                    >
                        EN
                    </button>
                    <span className="text-white/20">|</span>
                    <button
                        onClick={() => setLang("de")}
                        className={`transition-colors ${lang === "de" ? "text-cat-orange font-bold" : "text-white/40 hover:text-white"}`}
                    >
                        DE
                    </button>
                </div>
            </header>

            <main className="w-full h-dvh overflow-y-scroll snap-y snap-mandatory scroll-smooth overscroll-y-none">
                <h1 className="sr-only">
                    Book Last Cats on Earth, a Munich Rock Band for Events and Collaborations
                </h1>

                <section id="bio" className="h-dvh w-full snap-start snap-always flex flex-col justify-center items-center px-4 sm:px-8 pt-20">
                    <div className="w-full max-w-5xl mx-auto">
                        <VideoMarquee videos={[]} />
                    </div>
                </section>

                <section id="videos" className="h-dvh w-full snap-start snap-always flex flex-col justify-center items-center px-4 sm:px-8 pt-20">
                    <div className="w-full max-w-5xl mx-auto">
                        <VideoCarousel onVideoSelect={onVideoSelect} />
                    </div>
                </section>

                <section id="releases" className="h-dvh w-full snap-start snap-always flex flex-col justify-center items-center px-4 sm:px-8 pt-20">
                    <div className="w-full max-w-4xl mx-auto">
                        <AudioPlayer />
                    </div>
                </section>

                <section id="photos" className="h-dvh w-full snap-start snap-always flex flex-col justify-center items-center px-4 sm:px-8 pt-20 overflow-y-auto">
                    <div className="w-full max-w-6xl mx-auto py-10">
                        <PhotoGallery shows={galleryShows} />
                    </div>
                </section>

                <section id="contact" className="h-dvh w-full snap-start snap-always flex flex-col justify-between items-center px-4 sm:px-8 pt-24 pb-8 overflow-y-auto">
                    <div className="w-full max-w-xl mx-auto my-auto">
                        <BookingForm />
                    </div>
                    <div className="w-full max-w-4xl mx-auto pb-4">
                        <Footer />
                    </div>
                </section>
            </main>
        </div>
    );
};

const Booking = () => {
    const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let isMounted = true;
        waitForBookingReady().then(() => {
            if (isMounted) setIsReady(true);
        });
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        document.title = "Book a Munich Rock Band | Last Cats on Earth";
        const description = document.querySelector('meta[name="description"]');
        description?.setAttribute(
            "content",
            "Book Last Cats on Earth, a Munich funk rock and alternative rock band for concerts, festivals, venues, parties, private events and collaborations."
        );
        const canonical = document.querySelector('link[rel="canonical"]');
        canonical?.setAttribute("href", "https://lastcatsonearth.de/booking");

        return () => {
            document.title = "Munich Rock Band | Last Cats on Earth – Funk & Alternative Rock";
            description?.setAttribute(
                "content",
                "Last Cats on Earth are a Munich rock band bringing energetic funk rock and alternative rock live music to concerts, festivals, parties and events in Munich and beyond."
            );
            canonical?.setAttribute("href", "https://lastcatsonearth.de/");
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActiveVideoUrl(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

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
            <div
                className={`relative min-h-screen bg-black text-white flex flex-col justify-between overflow-x-hidden ${isReady ? "" : "max-h-screen overflow-hidden"}`}
                aria-busy={!isReady}
            >
                <StarfieldCanvas />

                <BookingContent onVideoSelect={setActiveVideoUrl} />

                {activeVideoUrl && (
                    <div
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-12 animate-fadeIn backdrop-blur-md"
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
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden border border-white/20 shadow-2xl"
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

                {!isReady && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black px-6 text-center">
                        <div>
                            <p className="text-3xl font-black uppercase tracking-wider text-white">Last Cats on Earth</p>
                            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-cat-orange">
                                Loading Press Kit
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </LanguageProvider>
    );
};

export default Booking;