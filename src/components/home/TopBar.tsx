import { ArrowUpRight, Mail, Instagram, Youtube } from "lucide-react";
import { FaApple, FaFacebook, FaSpotify, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocalePath } from "@/components/booking/LanguageContext";

// in cima al componente

interface TopBarProps {
    lang: string;
    setLang: (lang: "en" | "de") => void;
    scrollToSection: (id: string) => void;
}

export const TopBar = ({
    lang,
    setLang,
    scrollToSection,
}: TopBarProps) => {
    const p = useLocalePath();

    return (
        <header className="sticky top-0 left-0 right-0 z-40 flex h-16 w-full shrink-0 items-center justify-between border-b border-white/10 bg-black px-4 sm:px-8">
            {/* Brand Logo at 5% on mobile and 12% on desktop */}
            <div className="absolute left-[5%] sm:left-[12%] flex flex-col">
                <button
                    type="button"
                    onClick={() => scrollToSection("hero-section")}
                    className="text-left font-black uppercase tracking-tight text-white transition hover:text-cat-orange"
                >
                    <span className="text-xs sm:text-sm">
                        Last Cats <span className="text-cat-orange">on Earth</span>
                    </span>
                </button>
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/50 sm:text-[9px]">
                    Munich · Germany
                </span>
            </div>

            {/* Right Controls: EPK Button + Closely Spaced Social Icons + Language Switcher */}
            <div className="ml-auto flex items-center gap-3">
                {/* EPK Button */}
                <Link
                    to={p("/booking#contact")}
                    className="inline-flex items-center gap-1 rounded-full bg-cat-orange px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-black transition hover:bg-white"
                >
                    EPK <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>

                {/* Social Icons */}
                <div className="hidden items-center -space-x-0.5 lg:flex">
                    {[
                        ["Instagram", "https://www.instagram.com/lastcatsonearth/", <Instagram className="h-5 w-5" />],
                        ["YouTube", "https://www.youtube.com/@lastcatsonearth", <Youtube className="h-5 w-5" />],
                        ["Facebook", "https://www.facebook.com/lastcatsonearth", <FaFacebook className="h-5 w-5" />],
                        ["TikTok", "https://www.tiktok.com/@lastcatsonearthband", <FaTiktok className="h-5 w-5" />],
                        ["Spotify", "https://open.spotify.com/intl-it/artist/2nW6fmoJwCEknAfAVhmGwa", <FaSpotify className="h-5 w-5" />],
                        ["Apple Music", "https://music.apple.com/at/artist/last-cats-on-earth/1887321356", <FaApple className="h-5 w-5" />],
                        ["Contact", "mailto:contact@lastcatsonearth.de", <Mail className="h-5 w-5" />],
                    ].map(([label, href, icon]) => (
                        <a
                            key={label as string}
                            href={href as string}
                            target={href?.toString().startsWith("mailto:") ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            aria-label={label as string}
                            title={label as string}
                            className="flex h-8 w-8 items-center justify-center text-cat-orange transition hover:scale-110 hover:brightness-125"
                        >
                            {icon}
                        </a>
                    ))}
                </div>

                {/* Language Switcher */}
                <div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/50 p-1 text-[9px] font-black uppercase tracking-[0.18em] backdrop-blur-md">
                    <button
                        type="button"
                        onClick={() => setLang("en")}
                        className={`rounded-full px-2.5 py-1 transition ${lang === "en" ? "bg-cat-orange text-black" : "text-white/60 hover:text-white"
                            }`}
                    >
                        EN
                    </button>
                    <button
                        type="button"
                        onClick={() => setLang("de")}
                        className={`rounded-full px-2.5 py-1 transition ${lang === "de" ? "bg-cat-orange text-black" : "text-white/60 hover:text-white"
                            }`}
                    >
                        DE
                    </button>
                </div>
            </div>
        </header>
    );
};