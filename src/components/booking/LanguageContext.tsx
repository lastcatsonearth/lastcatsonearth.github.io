import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type Lang = "en" | "de";

interface LanguageContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const lang: Lang = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "de";

    const setLang = useCallback((next: Lang) => {
        if (next === lang) return;
        const base = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
        navigate(next === "en" ? (base === "/" ? "/en" : `/en${base}`) : base);
    }, [lang, pathname, navigate]);

    const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
};