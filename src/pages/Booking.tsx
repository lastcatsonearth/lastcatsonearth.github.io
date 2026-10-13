import { useEffect, useState } from "react";

import BookingLoadingOverlay from "@/components/booking/BookingLoadingOverlay";
import BookingSections from "@/components/booking/BookingSections";
import BookingVideoOverlay from "@/components/booking/BookingVideoOverlay";
import { LanguageProvider } from "@/components/booking/LanguageContext";
import { waitForBookingReady } from "@/components/booking/bookingData";

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
        const description = document.querySelector('meta[name="description"]');
        const canonical = document.querySelector('link[rel="canonical"]');
        document.title = "Book a Munich Rock Band | Last Cats on Earth";
        description?.setAttribute(
            "content",
            "Book Last Cats on Earth, a Munich funk rock and alternative rock band for concerts, festivals, venues, parties, private events and collaborations.",
        );
        canonical?.setAttribute("href", "https://lastcatsonearth.de/booking");

        return () => {
            document.title = "Munich Rock Band | Last Cats on Earth – Funk & Alternative Rock";
            description?.setAttribute(
                "content",
                "Last Cats on Earth are a Munich rock band bringing energetic funk rock and alternative rock live music to concerts, festivals, parties and events in Munich and beyond.",
            );
            canonical?.setAttribute("href", "https://lastcatsonearth.de/");
        };
    }, []);

    useEffect(() => {
        const closeVideo = (event: KeyboardEvent) => {
            if (event.key === "Escape") setActiveVideoUrl(null);
        };
        window.addEventListener("keydown", closeVideo);
        return () => window.removeEventListener("keydown", closeVideo);
    }, []);

    useEffect(() => {
        document.body.style.overflow = activeVideoUrl ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [activeVideoUrl]);

    return (
        <LanguageProvider>
            <div
                className={`relative flex min-h-screen flex-col justify-between overflow-x-hidden bg-black text-white ${isReady ? "" : "max-h-screen overflow-hidden"}`}
                aria-busy={!isReady}
            >
                <BookingSections onVideoSelect={setActiveVideoUrl} />
                {activeVideoUrl && <BookingVideoOverlay url={activeVideoUrl} onClose={() => setActiveVideoUrl(null)} />}
                {!isReady && <BookingLoadingOverlay />}
            </div>
        </LanguageProvider>
    );
};

export default Booking;
