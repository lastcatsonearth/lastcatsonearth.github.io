import BandHeader from "@/components/BandHeader";
import LinksSection from "@/components/LinksSection";
import Footer from "@/components/Footer";
import { Instagram, Mail, Menu, X, Youtube } from "lucide-react";
import { FaApple, FaFacebook, FaSpotify, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const LinksPage = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  return (
  <div className="relative min-h-screen">
    <nav className="fixed inset-0 z-40 pointer-events-none" aria-label="Site navigation">
      <div className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${isNavigationOpen ? "pointer-events-auto opacity-100" : "opacity-0"}`} onClick={() => setIsNavigationOpen(false)} />
      <aside className={`absolute left-0 top-0 flex h-full w-[min(78vw,240px)] flex-col overflow-hidden border-r border-white/15 bg-[#080808]/95 px-4 py-5 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out sm:px-5 ${isNavigationOpen ? "pointer-events-auto translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-lg font-black uppercase leading-[0.9] tracking-tight text-white">Last Cats<br /><span className="text-cat-orange">on Earth</span></p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">Munich · Germany</p>
          </div>
          <button type="button" onClick={() => setIsNavigationOpen(false)} className="rounded-full border border-white/15 p-2 text-white/60 transition hover:border-cat-orange hover:text-cat-orange" aria-label="Close navigation"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 py-5">
          <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">Explore</p>
          {[
            ["Home", "/"],
            ["Music", "/#music"],
            ["EPK", "/booking#contact"],
            ["Links", "/links"],
          ].map(([label, href]) => <Link key={href} to={href} onClick={() => setIsNavigationOpen(false)} className="block border-b border-white/5 py-2 text-lg font-bold tracking-wide text-white/80 transition hover:pl-2 hover:text-cat-orange">{label}</Link>)}
          <p className="mb-2 mt-5 text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">Listen · watch · follow</p>
          <div className="flex flex-wrap items-center gap-1">
            {[
              ["Instagram", "https://www.instagram.com/lastcatsonearth/", <Instagram className="h-6 w-6" />],
              ["YouTube", "https://www.youtube.com/@lastcatsonearth", <Youtube className="h-6 w-6" />],
              ["Facebook", "https://www.facebook.com/lastcatsonearth", <FaFacebook className="h-6 w-6" />],
              ["TikTok", "https://www.tiktok.com/@lastcatsonearthband", <FaTiktok className="h-6 w-6" />],
              ["Spotify", "https://open.spotify.com/intl-it/artist/2nW6fmoJwCEknAfAVhmGwa", <FaSpotify className="h-6 w-6" />],
              ["Apple Music", "https://music.apple.com/at/artist/last-cats-on-earth/1887321356", <FaApple className="h-6 w-6" />],
              ["Contact", "mailto:contact@lastcatsonearth.de", <Mail className="h-6 w-6" />],
            ].map(([label, href, icon]) => (
              <a key={label as string} href={href as string} target={(href as string).startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" aria-label={label as string} title={label as string} className="flex h-11 w-11 items-center justify-center text-cat-orange transition hover:scale-110 hover:brightness-125">
                {icon}
              </a>
            ))}
          </div>
        </div>
        <p className="border-t border-white/10 pt-5 text-[10px] uppercase leading-tight tracking-[0.2em] text-white/30">Original music<br />live shows</p>
      </aside>
      <button type="button" aria-label="Open navigation" aria-expanded={isNavigationOpen} onClick={() => setIsNavigationOpen((open) => !open)} className={`pointer-events-auto absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-cat-orange bg-cat-orange text-black shadow-lg shadow-cat-orange/20 transition hover:border-white hover:bg-white sm:left-8 sm:top-8 ${isNavigationOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}>
        <Menu className="h-5 w-5" />
      </button>
    </nav>
    <main className="relative max-w-md mx-auto px-0 py-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-3">
        <BandHeader linkToHome />
        <LinksSection />
        <div className="-mt-2">
          <Footer />
        </div>
      </div>
    </main>
  </div>
  );
};

export default LinksPage;
