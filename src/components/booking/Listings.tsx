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
                href="https://www.gigheaven.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Last Cats On Earth on Gig Heaven"
                className="mx-auto flex w-fit items-center rounded-xl border border-white/10 bg-white/5 px-6 py-4 transition hover:border-cat-orange hover:bg-white/10"
            >
                <span className="text-lg font-bold tracking-wide text-white">
                    Gig <span className="text-cat-orange">Heaven</span>
                </span>
            </a>
        </div>
    );
};

export default Listings;
