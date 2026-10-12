import { ArrowUpRight, Mail, X, Instagram, Youtube } from "lucide-react";
import { FaApple, FaFacebook, FaSpotify, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

interface NavigationDrawerProps {
    isNavigationOpen: boolean;
    setIsNavigationOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
    copy: {
        menu: string[];
        exploreLabel: string;
        workLabel: string;
        bookLabel: string;
        followLabel: string;
    };
}

export const NavigationDrawer = ({
    isNavigationOpen,
    setIsNavigationOpen,
    copy,
}: NavigationDrawerProps) => {
    return (
        <nav className="fixed inset-0 z-50 pointer-events-none" aria-label="Homepage navigation">
            <div
                className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${isNavigationOpen ? "pointer-events-auto opacity-100" : "opacity-0"
                    }`}
                onClick={() => setIsNavigationOpen(false)}
                aria-hidden="true"
            />
            <aside
                id="homepage-menu"
                className={`absolute left-0 top-0 flex h-full w-[min(78vw,240px)] flex-col overflow-hidden border-r border-white/15 bg-[#080808]/95 px-4 pt-20 pb-5 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out sm:px-5 ${isNavigationOpen ? "pointer-events-auto translate-x-0" : "-translate-x-full"
                    }`}
                aria-hidden={!isNavigationOpen}
            >
                <div className="flex items-start justify-between border-b border-white/10 pb-4">
                    <div>
                        <p className="text-lg font-black uppercase leading-[0.9] tracking-tight text-white">
                            Last Cats<br />
                            <span className="text-cat-orange">on Earth</span>
                        </p>
                        <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">
                            Munich · Germany
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsNavigationOpen(false)}
                        className="rounded-full border border-white/15 p-2 text-white/60 transition hover:border-cat-orange hover:text-cat-orange"
                        aria-label="Close navigation"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 py-5">
                    <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">
                        {copy.exploreLabel}
                    </p>
                    <div className="space-y-0">
                        {[
                            ["Home", "#top"],
                            ["Music", "#music"],
                            ["EPK", "/booking#contact"],
                            ["Links", "/links"],
                        ].map(([label, href], index) =>
                            href.startsWith("#") ? (
                                <a
                                    key={href}
                                    href={href}
                                    onClick={() => setIsNavigationOpen(false)}
                                    className="block border-b border-white/5 py-2 text-lg font-bold tracking-wide text-white/80 transition hover:pl-2 hover:text-cat-orange"
                                >
                                    {copy.menu[index]}
                                </a>
                            ) : href.startsWith("http") ? (
                                <a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsNavigationOpen(false)}
                                    className="block border-b border-white/5 py-2.5 text-lg font-bold tracking-wide text-white/80 transition hover:pl-2 hover:text-cat-orange"
                                >
                                    {label}
                                </a>
                            ) : (
                                <Link
                                    key={href}
                                    to={href}
                                    onClick={() => setIsNavigationOpen(false)}
                                    className="block border-b border-white/5 py-2 text-lg font-bold tracking-wide text-white/80 transition hover:pl-2 hover:text-cat-orange"
                                >
                                    {copy.menu[index]}
                                </Link>
                            )
                        )}
                    </div>

                    <p className="mb-2 mt-5 text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">
                        {copy.workLabel}
                    </p>
                    <div className="space-y-0">
                        <Link
                            to="/booking#contact"
                            onClick={() => setIsNavigationOpen(false)}
                            className="flex items-center justify-between rounded-xl bg-cat-orange px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
                        >
                            {copy.bookLabel} <ArrowUpRight className="h-5 w-5" />
                        </Link>
                    </div>

                    <p className="mb-2 mt-5 text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">
                        {copy.followLabel}
                    </p>
                    <div className="flex flex-wrap items-center gap-1">
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
                                className="flex h-11 w-11 items-center justify-center text-cat-orange transition hover:scale-110 hover:brightness-125"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>
                <p className="border-t border-white/10 pt-5 text-[10px] uppercase leading-tight tracking-[0.2em] text-white/30">
                    Original music<br />
                    live shows
                </p>
            </aside>
        </nav>
    );
};