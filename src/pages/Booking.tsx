import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import BookingLoadingOverlay from "@/components/booking/BookingLoadingOverlay";
import BookingSections from "@/components/booking/BookingSections";
import VideoOverlay from "@/components/VideoOverlay";
import { useLanguage } from "@/i18n/LanguageContext";
import { waitForBookingReady } from "@/components/booking/bookingData";
import { Seo } from "@/components/Seo";

const Booking = () => {
    const { lang } = useLanguage();
    const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);
    const { hash } = useLocation();

    // Jump to the section in the URL (/booking#videos) once the page is ready.
    useEffect(() => {
        if (!isReady || !hash) return;
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    }, [isReady, hash]);

    useEffect(() => {
        let isMounted = true;
        waitForBookingReady().then(() => {
            if (isMounted) setIsReady(true);
        });
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div
            className="fixed inset-0 flex flex-col overflow-hidden bg-black text-white"
            aria-busy={!isReady}
        >
            <Seo
                path="/booking"
                title={lang === "de"
                    ? "Rockband München buchen | Last Cats on Earth – EPK & Booking"
                    : "Book a Munich Rock Band | Last Cats on Earth – EPK & Booking"}
                description={lang === "de"
                    ? "Last Cats on Earth buchen: Münchner Funk- und Alternative-Rockband für Konzerte, Festivals, Firmenfeiern und private Events. Videos, Fotos, Musik und Kontakt."
                    : "Book Last Cats on Earth, a Munich funk rock and alternative rock band for concerts, festivals, venues, parties and private events. Videos, photos, music and contact."}
            />
            <BookingSections onVideoSelect={setActiveVideoUrl} />
            {activeVideoUrl && <VideoOverlay url={activeVideoUrl} onClose={() => setActiveVideoUrl(null)} />}
            {!isReady && <BookingLoadingOverlay />}
        </div>
    );
};

export default Booking;