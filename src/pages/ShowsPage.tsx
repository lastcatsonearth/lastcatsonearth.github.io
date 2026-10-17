import { ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BandHeader from "@/components/BandHeader";
import Footer from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { formatShowDate, shows, type Show } from "@/content/shows";
import { useLanguage, useLocalePath, type Lang } from "@/i18n/LanguageContext";

const copy = {
    en: {
        listTitle: "Live Shows in Munich and Beyond | Last Cats on Earth",
        listDescription: "Recent Last Cats on Earth concerts and festival appearances in Munich, Germany and Italy – photos and details from the show archive.",
        listKicker: "Show archive · Munich and beyond",
        listHeading: "Where the Cats have played.",
        listIntro: "Explore recent Last Cats on Earth performances, venues and festival appearances.",
        detailKicker: "Show archive · live performance",
        book: "Book the band",
        allShows: "All shows",
    },
    de: {
        listTitle: "Live-Shows in München und darüber hinaus | Last Cats on Earth",
        listDescription: "Aktuelle Konzerte und Festivalauftritte von Last Cats on Earth in München, Deutschland und Italien – Fotos und Infos aus dem Show-Archiv.",
        listKicker: "Show-Archiv · München und darüber hinaus",
        listHeading: "Hier haben die Cats gespielt.",
        listIntro: "Aktuelle Auftritte, Clubs und Festivals von Last Cats on Earth.",
        detailKicker: "Show-Archiv · Live-Auftritt",
        book: "Band buchen",
        allShows: "Alle Shows",
    },
} as const;

const place = (show: Show, lang: Lang) => `${show.city[lang]}, ${show.country[lang]}`;

const eventJsonLd = (show: Show, lang: Lang) => ({
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: `${SITE_NAME} – ${show.title}`,
    startDate: show.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
        "@type": "Place",
        name: show.title,
        address: { "@type": "PostalAddress", addressLocality: show.city[lang], addressCountry: show.countryCode },
    },
    image: `${SITE_URL}${show.image}`,
    description: show.text[lang],
    performer: { "@id": `${SITE_URL}/#musicgroup` },
});

const ShowsPage = () => {
    const { lang } = useLanguage();
    const p = useLocalePath();
    const t = copy[lang];
    const { slug } = useParams();
    const show = shows.find((entry) => entry.slug === slug);

    return (
        <div className="min-h-screen px-2 py-6 text-white sm:px-6 sm:py-10">
            {show ? (
                <Seo
                    path={`/shows/${show.slug}`}
                    title={`${show.title} ${formatShowDate(show.date, lang)} – ${place(show, lang)} | ${SITE_NAME}`}
                    description={show.text[lang]}
                    image={show.image}
                    jsonLd={eventJsonLd(show, lang)}
                />
            ) : (
                <Seo path="/shows" title={t.listTitle} description={t.listDescription} />
            )}

            <main className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-6">
                <BandHeader linkToHome />
                <article className="mx-auto max-w-2xl px-2 pb-10">
                    <header className="border-b border-white/10 py-10 text-center">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-cat-orange">{show ? t.detailKicker : t.listKicker}</p>
                        <h1 className="mt-4 text-3xl font-bold tracking-wide sm:text-5xl">{show ? show.title : t.listHeading}</h1>
                        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60">
                            {show ? `${place(show, lang)} · ${formatShowDate(show.date, lang)}` : t.listIntro}
                        </p>
                    </header>

                    {show ? (
                        <section className="py-10">
                            <img src={show.image} alt={`${SITE_NAME} live at ${show.title}, ${show.city.en}`} className="h-72 w-full rounded-2xl object-cover" />
                            <p className="mt-6 text-justify text-sm leading-7 text-white/70">{show.text[lang]}</p>
                            <img src={show.secondImage} alt={`${show.title}: audience and stage`} loading="lazy" className="mt-8 h-64 w-full rounded-2xl object-cover" />
                            <div className="mt-8 flex flex-wrap items-center gap-6">
                                <Link to={p("/booking#contact")} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cat-orange hover:text-white">
                                    {t.book} <ArrowUpRight className="h-4 w-4" />
                                </Link>
                                <Link to={p("/shows")} className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white">
                                    ← {t.allShows}
                                </Link>
                            </div>
                        </section>
                    ) : (
                        <div className="space-y-5 py-10">
                            {shows.map((entry) => (
                                <Link key={entry.slug} to={p(`/shows/${entry.slug}`)} className="group grid grid-cols-[96px_1fr] gap-4 rounded-2xl border border-white/10 bg-black/20 p-3 transition hover:border-cat-orange/50">
                                    <img src={entry.image} alt={`${entry.title} live`} loading="lazy" className="h-24 w-24 rounded-xl object-cover opacity-80 transition group-hover:opacity-100" />
                                    <div className="self-center">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-cat-orange">{formatShowDate(entry.date, lang)}</p>
                                        <h2 className="mt-1 text-lg font-bold tracking-wide">{entry.title}</h2>
                                        <p className="mt-1 text-xs text-white/50">{place(entry, lang)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </article>
                <Footer />
            </main>
        </div>
    );
};

export default ShowsPage;
