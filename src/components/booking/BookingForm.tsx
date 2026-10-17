import { useLanguage } from "@/i18n/LanguageContext";
import { bookingSpacing } from "@/config/layoutSpacing";
import ContactForm from "@/components/ContactForm";
import { EMAIL } from "@/config/site";

const translations = {
    en: {
        category: "Get in touch",
        headline: "BOOK THE CATS",
        subheading: "Tell us about your event – the request goes straight to our inbox.",
    },
    de: {
        category: "Kontakt aufnehmen",
        headline: "DIE CATS BUCHEN",
        subheading: "Erzählt uns von eurem Event – die Anfrage landet direkt bei uns.",
    }
};

const BookingForm = () => {
    const { lang } = useLanguage();
    const t = translations[lang];

    const handleInstagramClick = () => {
        window.open("https://instagram.com/lastcatsonearth", "_blank");
    };

    return (
        <div className={`scroll-mt-6 max-w-xl mx-auto w-full text-center ${bookingSpacing.form}`}>
            <p className="text-cat-orange uppercase tracking-[0.25em] mb-1 text-xs sm:text-sm">
                {t.category}
            </p>

            <h3 className={`text-2xl sm:text-3xl md:text-2xl font-bold tracking-wide ${bookingSpacing.formHeading}`}>
                {t.headline}
            </h3>

            <p className={`text-xs sm:text-sm text-white/50 tracking-wide mb-4`}>
                {t.subheading}
            </p>

            <ContactForm />

            {/* Direct channels in one compact row */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
                <a href={`mailto:${EMAIL}`} className="font-bold text-white/80 underline underline-offset-4 hover:text-cat-orange">{EMAIL}</a>
                <button type="button" onClick={handleInstagramClick} className="font-bold text-cat-orange hover:text-white">Instagram DM</button>
                <a href="https://www.gigheaven.com/members/lastcatsonearth.html" target="_blank" rel="noopener noreferrer">
                    <img
                        src="https://www.gigheaven.com/badge/orange.svg?l=37462"
                        height="40"
                        width="40"
                        alt="Last Cats on Earth - Gig Heaven"
                        referrerPolicy="unsafe-url"
                        className="h-10 w-10 transition-transform hover:scale-105"
                    />
                </a>
            </div>
        </div>
    );
};

export default BookingForm;