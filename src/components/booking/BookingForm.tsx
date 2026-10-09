import { FormEvent, useState } from "react";
import { useLanguage } from "@/components/booking/LanguageContext";

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
        emailSubject: "Nachricht von der Website",
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
        <section id="contact" className="scroll-mt-6 border-t border-white/5 pt-8 max-w-xl mx-auto w-full text-center">
            <p className="text-cat-orange uppercase tracking-[0.25em] text-sm mb-2">
                {t.category}
            </p>

            <h3 className="text-3xl md:text-2xl font-bold mb-3 tracking-wide">
                {t.headline}
            </h3>

            <p className="text-sm text-white/50 mb-5 tracking-wide">
                {t.subheading}
            </p>

            <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-3 text-left">
                <label className="block space-y-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                    Email address
                    <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none placeholder:text-white/35 focus:border-cat-orange" />
                </label>
                <label className="block space-y-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                    Subject
                    <input name="subject" required placeholder="Your subject" className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none placeholder:text-white/35 focus:border-cat-orange" />
                </label>
                <label className="block space-y-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                    Message
                    <textarea name="message" required rows={7} placeholder="Write your message here." className="mt-1 w-full resize-none rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none placeholder:text-white/35 focus:border-cat-orange" />
                </label>
                <button type="submit" className="w-full rounded-lg bg-cat-orange px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-white">
                    {sent ? "Opening your email app..." : "Send booking inquiry"}
                </button>
            </form>

            <p className="mt-4 text-xs text-white/40">
                Prefer Instagram? <button type="button" onClick={handleInstagramClick} className="text-cat-orange hover:text-white">Send us a DM.</button>
            </p>
        </section>
    );
};

export default BookingForm;