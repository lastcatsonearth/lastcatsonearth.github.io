import { useLanguage } from "@/components/booking/LanguageContext";

const listingsLabel = {
    en: "Listings",
    de: "Listings",
};

const Listings = () => {
    const { lang } = useLanguage();

    return (
        <div className="mt-14 border-t border-white/5 pt-10">
            <p className="text-cat-orange uppercase tracking-[0.25em] text-sm mb-5">
                {listingsLabel[lang]}
            </p>

            <a
                href="https://www.gigheaven.com/members/lastcatsonearth.html"
                target="_blank"
                rel="noopener"
                aria-label="View Last Cats On Earth on Gig Heaven"
            >
                <img
                    src="https://www.gigheaven.com/badge/orange.svg?l=37462"
                    height="80"
                    width="80"
                    alt="Last Cats on Earth - Gig Heaven"
                    referrerPolicy="unsafe-url"
                />
            </a>
        </div>
    );
};

export default Listings;
