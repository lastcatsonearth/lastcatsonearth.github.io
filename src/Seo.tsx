import { Head } from "vite-react-ssg";
import { useLanguage } from "@/components/booking/LanguageContext";

const BASE = "https://lastcatsonearth.de";

export const Seo = ({ title, description, path = "/" }: { title: string; description: string; path?: string }) => {
    const { lang } = useLanguage();
    const de = `${BASE}${path}`;
    const en = `${BASE}/en${path === "/" ? "" : path}`;
    const url = lang === "de" ? de : en;
    return (
        <Head>
            <html lang={lang} />
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            <link rel="alternate" hrefLang="de" href={de} />
            <link rel="alternate" hrefLang="en" href={en} />
            <link rel="alternate" hrefLang="x-default" href={de} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content={lang === "de" ? "de_DE" : "en_DE"} />
            <meta property="og:image" content={`${BASE}/bang_logo.png`} />
        </Head>
    );
};