import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { useLanguage, useLocalePath } from "@/i18n/LanguageContext";

const NotFound = () => {
    const { lang } = useLanguage();
    const p = useLocalePath();
    const de = lang === "de";

    return (
        <div className="flex min-h-screen items-center justify-center bg-black px-6 text-center text-white">
            <Seo
                title={de ? "Seite nicht gefunden | Last Cats on Earth" : "Page not found | Last Cats on Earth"}
                description={de ? "Diese Seite existiert nicht." : "This page does not exist."}
                noindex
            />
            <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-cat-orange">404</p>
                <h1 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-6xl">
                    {de ? "Hier spielt gerade niemand." : "Nobody's playing here."}
                </h1>
                <div className="mt-8 flex flex-wrap justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <Link to={p("/")} className="rounded-full bg-cat-orange px-5 py-3 text-black transition hover:bg-white">
                        {de ? "Zur Startseite" : "Back home"}
                    </Link>
                    <Link to={p("/booking")} className="rounded-full border border-cat-orange px-5 py-3 text-cat-orange transition hover:bg-cat-orange hover:text-black">
                        EPK
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
