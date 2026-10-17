import { useLanguage } from "@/i18n/LanguageContext";

/** EN/DE pill switch. Pass className for positioning, padding to resize the buttons. */
const LangToggle = ({ className = "", padding = "px-2.5 py-1" }: { className?: string; padding?: string }) => {
    const { lang, setLang } = useLanguage();
    return (
        <div className={`flex items-center gap-1 rounded-full border border-white/20 bg-black/50 p-1 text-[9px] font-black uppercase tracking-[0.18em] backdrop-blur-md ${className}`}>
            {(["en", "de"] as const).map((code) => (
                <button
                    key={code}
                    type="button"
                    onClick={() => setLang(code)}
                    aria-pressed={lang === code}
                    className={`rounded-full ${padding} transition ${lang === code ? "bg-cat-orange text-black" : "text-white/60 hover:text-white"}`}
                >
                    {code.toUpperCase()}
                </button>
            ))}
        </div>
    );
};

export default LangToggle;
