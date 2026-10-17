import { Head } from "vite-react-ssg";
import { useLanguage } from "@/i18n/LanguageContext";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/config/site";

type SeoProps = {
    title: string;
    description: string;
    /** Path without the /en prefix, e.g. "/booking". Omit only for pages without a URL of their own (404). */
    path?: string;
    /** Hide this language version from search engines (links still followed). */
    noindex?: boolean;
    /** Absolute URL or /public path of the social preview image. */
    image?: string;
    /** Optional schema.org object(s) rendered as JSON-LD. */
    jsonLd?: object | object[];
};

/**
 * Per-page <head>: title, description, canonical, hreflang (de/en), Open Graph, Twitter.
 * Every page should render exactly one <Seo />.
 */
export const Seo = ({ title, description, path, noindex = false, image = OG_IMAGE, jsonLd }: SeoProps) => {
    const { lang } = useLanguage();
    const de = path && `${SITE_URL}${path}`;
    const en = path && `${SITE_URL}/en${path === "/" ? "" : path}`;
    const url = lang === "de" ? de : en;
    const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

    return (
        <Head>
            <html lang={lang} />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="robots" content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large"} />
            {path && <link rel="canonical" href={url} />}
            {path && <link rel="alternate" hrefLang="de" href={de} />}
            {path && <link rel="alternate" hrefLang="en" href={en} />}
            {path && <link rel="alternate" hrefLang="x-default" href={de} />}

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {path && <meta property="og:url" content={url} />}
            <meta property="og:locale" content={lang === "de" ? "de_DE" : "en_US"} />
            <meta property="og:locale:alternate" content={lang === "de" ? "en_US" : "de_DE"} />
            <meta property="og:image" content={imageUrl} />
            {image === OG_IMAGE && <meta property="og:image:width" content="1200" />}
            {image === OG_IMAGE && <meta property="og:image:height" content="630" />}
            <meta property="og:image:alt" content={`${SITE_NAME} live on stage`} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />

            {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
        </Head>
    );
};
