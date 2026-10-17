import { useState } from "react";
import { ArrowUpRight, Check, Copy, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import { Seo } from "@/components/Seo";
import { EMAIL, SITE_NAME, SITE_URL } from "@/config/site";
import { useLanguage, useLocalePath } from "@/i18n/LanguageContext";

const copy = {
    de: {
        title: "Kontakt & Booking | Last Cats on Earth – Rockband München",
        description: "Last Cats on Earth buchen: Anfrage für Konzert, Festival, Firmenfeier oder Party direkt per Formular oder E-Mail an contact@lastcatsonearth.de.",
        kicker: "Kontakt & Booking",
        heading: "Lass uns",
        highlight: "laut werden.",
        intro: "Konzert, Festival, Firmenfeier oder Party: Schick uns die Eckdaten und wir melden uns mit Verfügbarkeit und Angebot.",
        formTitle: "Booking-Anfrage",
        direct: "Lieber direkt?",
        emailLabel: "E-Mail",
        copy: "Kopieren",
        copied: "Kopiert",
        dm: "Instagram-DM",
        epkLabel: "Für Veranstalter",
        epk: "Pressekit ansehen",
        epkText: "Videos, Fotos, Musik und Bio auf einer Seite.",
    },
    en: {
        title: "Contact & Booking | Last Cats on Earth – Munich Rock Band",
        description: "Book Last Cats on Earth: send a request for a concert, festival, company event or party via the form or email contact@lastcatsonearth.de.",
        kicker: "Contact & booking",
        heading: "Let's get",
        highlight: "loud.",
        intro: "Concert, festival, company event or party: send us the basics and we'll come back with availability and a quote.",
        formTitle: "Booking request",
        direct: "Rather go direct?",
        emailLabel: "Email",
        copy: "Copy",
        copied: "Copied",
        dm: "Instagram DM",
        epkLabel: "For promoters",
        epk: "View press kit",
        epkText: "Videos, photos, music and bio on one page.",
    },
} as const;

const ContactPage = () => {
    const { lang } = useLanguage();
    const p = useLocalePath();
    const t = copy[lang];
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: t.title,
        url: `${SITE_URL}${lang === "en" ? "/en" : ""}/contact`,
        about: { "@id": `${SITE_URL}/#musicgroup` },
        mainEntity: { "@type": "MusicGroup", "@id": `${SITE_URL}/#musicgroup`, name: SITE_NAME, email: EMAIL },
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Seo path="/contact" title={t.title} description={t.description} jsonLd={jsonLd} />
            <SiteHeader />

            <main className="mx-auto w-full max-w-6xl px-5 pb-20 pt-12 sm:px-8 sm:pt-20">
                <header className="max-w-3xl">
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-cat-orange">{t.kicker}</p>
                    <h1 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl phone-landscape:text-5xl">
                        {t.heading} <span className="text-cat-orange">{t.highlight}</span>
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">{t.intro}</p>
                </header>

                <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
                    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8" aria-labelledby="form-title">
                        <h2 id="form-title" className="text-xl font-black uppercase tracking-wide">{t.formTitle}</h2>
                        <div className="mt-6"><ContactForm /></div>
                    </section>

                    <aside className="space-y-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">{t.direct}</p>

                        <div className="rounded-3xl border border-white/10 p-6">
                            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cat-orange"><Mail className="h-4 w-4" /> {t.emailLabel}</p>
                            <a href={`mailto:${EMAIL}`} className="mt-2 block break-all text-lg font-black transition hover:text-cat-orange sm:text-xl">{EMAIL}</a>
                            <button
                                type="button"
                                onClick={copyEmail}
                                className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 transition hover:border-cat-orange hover:text-cat-orange"
                            >
                                {copied ? <><Check className="h-3.5 w-3.5" /> {t.copied}</> : <><Copy className="h-3.5 w-3.5" /> {t.copy}</>}
                            </button>
                        </div>

                        <a
                            href="https://ig.me/m/lastcatsonearth"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between rounded-3xl border border-white/10 p-6 transition hover:border-cat-orange"
                        >
                            <span>
                                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cat-orange"><Instagram className="h-4 w-4" /> Instagram</span>
                                <span className="mt-2 block text-lg font-black">{t.dm} · @lastcatsonearth</span>
                            </span>
                            <ArrowUpRight className="h-5 w-5 text-white/40 transition group-hover:text-cat-orange" />
                        </a>

                        <Link to={p("/booking")} className="group flex items-center justify-between rounded-3xl bg-cat-orange p-6 text-black transition hover:bg-white">
                            <span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60">{t.epkLabel}</span>
                                <span className="mt-1 block text-lg font-black uppercase">{t.epk}</span>
                                <span className="mt-1 block text-sm text-black/70">{t.epkText}</span>
                            </span>
                            <ArrowUpRight className="h-6 w-6 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </aside>
                </div>
            </main>

            <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
                <Footer />
            </div>
        </div>
    );
};

export default ContactPage;
