import { useLanguage } from "@/components/booking/LanguageContext";

const translations = {
    en: {
        category: "Get in touch",
        headline: "BOOK THE CATS",
        subheading: "For bookings and inquiries, contact us directly.",
        emailBtn: "Reach out by Email",
        instagramBtn: "DM on Instagram",
        emailSubject: "Booking Inquiry",
        emailBody: "Hi,\n\nI would like to book Last Cats On Earth.\n\nPlease let me know availability.\n"
    },
    de: {
        category: "Kontakt aufnehmen",
        headline: "DIE CATS BUCHEN",
        subheading: "Für Buchungen und Anfragen wende dich direkt an uns.",
        emailBtn: "Per E-Mail kontaktieren",
        instagramBtn: "DM auf Instagram",
        emailSubject: "Buchungsanfrage",
        emailBody: "Hallo,\n\nich würde Last Cats On Earth gerne buchen.\n\nBitte teilt mir eure Verfügbarkeit mit.\n"
    }
};

const BookingForm = () => {
    const { lang } = useLanguage();
    const t = translations[lang];

    const handleEmailClick = () => {
        const subject = encodeURIComponent(t.emailSubject);
        const body = encodeURIComponent(t.emailBody);

        window.location.href = `mailto:contact@lastcatsonearth.de?subject=${subject}&body=${body}`;
    };

    const handleInstagramClick = () => {
        window.open("https://instagram.com/lastcatsonearth", "_blank");
    };

    return (
        <section className="border-t border-white/5 pt-16 max-w-xl mx-auto w-full text-center">
            <p className="text-cat-orange uppercase tracking-[0.25em] text-sm mb-3">
                {t.category}
            </p>

            <h3 className="text-3xl md:text-2xl font-bold mb-4 tracking-wide">
                {t.headline}
            </h3>

            <p className="text-sm text-white/50 mb-8 tracking-wide">
                {t.subheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                    onClick={handleEmailClick}
                    className="bg-white text-black font-semibold uppercase tracking-wider text-xs px-6 py-3 rounded-lg hover:bg-cat-orange hover:text-white transition"
                >
                    {t.emailBtn}
                </button>

                <button
                    onClick={handleInstagramClick}
                    className="bg-[#E1306C] text-white font-semibold uppercase tracking-wider text-xs px-6 py-3 rounded-lg hover:opacity-80 transition"
                >
                    {t.instagramBtn}
                </button>
            </div>
        </section>
    );
};

export default BookingForm;