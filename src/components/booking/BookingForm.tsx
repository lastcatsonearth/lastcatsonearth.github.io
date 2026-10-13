import { FormEvent, useState } from "react";
import { useLanguage } from "@/components/booking/LanguageContext";
import { bookingSpacing } from "@/config/layoutSpacing";

const translations = {
    en: {
        category: "Get in touch",
        headline: "BOOK THE CATS",
        subheading: "For bookings and inquiries, contact us directly.",
        emailSubject: "Message from the website",
    },
    de: {
        category: "Kontakt aufnehmen",
        headline: "DIE CATS BUCHEN",
        subheading: "Für Buchungen und Anfragen wende dich direkt an uns.",
        emailSubject: "Nachrichten von der Website",
    }
};

const BookingForm = () => {
    const { lang } = useLanguage();
    const t = translations[lang];
    const [sent, setSent] = useState(false);

    const handleInstagramClick = () => {
        window.open("https://instagram.com/lastcatsonearth", "_blank");
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const subjectText = String(data.get("subject") || "").trim();
        const message = String(data.get("message") || "").trim();
        const subject = encodeURIComponent(subjectText || t.emailSubject);
        const body = encodeURIComponent(message);
        setSent(true);
        window.location.href = `mailto:contact@lastcatsonearth.de?subject=${subject}&body=${body}`;
    };

    return (
        <div className={`scroll-mt-6 max-w-xl mx-auto w-full text-center ${bookingSpacing.form}`}>
            <p className="text-cat-orange uppercase tracking-[0.25em] mb-1 text-xs sm:text-sm">
                {t.category}
            </p>

            <h3 className={`text-2xl sm:text-3xl md:text-2xl font-bold tracking-wide ${bookingSpacing.formHeading}`}>
                {t.headline}
            </h3>

            <p className={`text-xs sm:text-sm text-white/50 tracking-wide mb-3 sm:mb-5 ${bookingSpacing.formIntro}`}>
                {t.subheading}
            </p>

            <form onSubmit={handleSubmit} className={`mx-auto max-w-xl text-left space-y-2.5 sm:space-y-4 ${bookingSpacing.formFields}`}>
                <label className="block space-y-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                    Email address
                    <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="mt-0.5 sm:mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-normal normal-case tracking-normal text-white outline-none placeholder:text-white/35 focus:border-cat-orange"
                    />
                </label>
                <label className="block space-y-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                    Subject
                    <input
                        name="subject"
                        required
                        placeholder="Your subject"
                        className="mt-0.5 sm:mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-normal normal-case tracking-normal text-white outline-none placeholder:text-white/35 focus:border-cat-orange"
                    />
                </label>
                <label className="block space-y-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                    Message
                    <textarea
                        name="message"
                        required
                        rows={7}
                        placeholder="Write your message here."
                        className="mt-0.5 sm:mt-1 w-full resize-none rounded-lg border border-white/10 bg-black/30 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-normal normal-case tracking-normal text-white outline-none placeholder:text-white/35 focus:border-cat-orange sm:rows-5"
                    />
                </label>
                <button type="submit" className="w-full rounded-lg bg-cat-orange px-5 py-2.5 sm:px-6 sm:py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-white">
                    {sent ? "Opening your email app..." : "Send booking inquiry"}
                </button>
            </form>

            <p className="mt-2.5 sm:mt-4 text-xs text-white/40">
                Prefer Instagram? <button type="button" onClick={handleInstagramClick} className="text-cat-orange hover:text-white">Send us a DM.</button>
            </p>

            <div className="mt-3 sm:mt-6 flex justify-center">
                <a
                    href="https://www.gigheaven.com/members/lastcatsonearth.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="https://www.gigheaven.com/badge/orange.svg?l=37462"
                        height="64"
                        width="64"
                        alt="Last Cats on Earth - Gig Heaven"
                        referrerPolicy="unsafe-url"
                        className="h-16 w-16 sm:h-20 sm:w-20 transition-transform hover:scale-105"
                    />
                </a>
            </div>
        </div>
    );
};

export default BookingForm;