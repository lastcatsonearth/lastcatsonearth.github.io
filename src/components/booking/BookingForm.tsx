import { useState } from "react";

const BookingForm = () => {
    const handleEmailClick = () => {
        const subject = encodeURIComponent("Booking Inquiry");
        const body = encodeURIComponent(
            "Hi,\n\nI would like to book Last Cats On Earth.\n\nPlease let me know availability.\n"
        );

        window.location.href = `mailto:contact@lastcatsonearth.de?subject=${subject}&body=${body}`;
    };

    const handleInstagramClick = () => {
        window.open("https://instagram.com/lastcatsonearth", "_blank");
    };

    return (
        <section className="border-t border-white/5 pt-16 max-w-xl mx-auto w-full text-center">
            <p className="text-cat-orange uppercase tracking-[0.25em] text-sm mb-3">
                Get in touch
            </p>

            <h3 className="text-3xl md:text-2xl font-bold mb-4 tracking-wide">
                BOOK THE CATS
            </h3>

            <p className="text-sm text-white/50 mb-8 tracking-wide">
                For bookings and inquiries, contact us directly.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                    onClick={handleEmailClick}
                    className="bg-white text-black font-semibold uppercase tracking-wider text-xs px-6 py-3 rounded-lg hover:bg-cat-orange hover:text-white transition"
                >
                    Reach out by Email
                </button>

                <button
                    onClick={handleInstagramClick}
                    className="bg-[#E1306C] text-white font-semibold uppercase tracking-wider text-xs px-6 py-3 rounded-lg hover:opacity-80 transition"
                >
                    DM on Instagram
                </button>
            </div>
        </section>
    );
};

export default BookingForm;