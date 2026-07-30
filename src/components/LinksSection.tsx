import React, { useState, useEffect } from "react";
import { FaSpotify, FaApple, FaYoutube } from "react-icons/fa";
import {
  Instagram,
  Briefcase,
  Mail,
  Youtube,
  ShoppingBag,
  Heart,
  CalendarDays,
  MoreHorizontal
} from "lucide-react";
import LinkButton from "./LinkButton";

const LinksSection = () => {
  const [showToast, setShowToast] = useState(false);
  const [showBrowserHint, setShowBrowserHint] = useState(false);

  // Show the browser hint 1.5 seconds after load
  useEffect(() => {
    // Check if the user agent contains 'Instagram'
    const isInstagram = /Instagram/i.test(navigator.userAgent);

    if (isInstagram) {
      const timer = setTimeout(() => setShowBrowserHint(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDonateClick = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const whatsNew = [
    {
      href: "https://open.spotify.com/intl-it/track/71CmWXdlgbG0qiwAzn459K?si=f77996269ddb4aa6",
      icon: <FaSpotify className="w-5 h-5" />,
      label: "Listen to FLASHBACK!",
      external: true,
      variant: "primary" as const,
    },
    {
      href: "https://www.youtube.com/watch?v=2qNXd6pIi-Y&t=3448s",
      icon: <FaYoutube className="w-5 h-5" />,
      label: "Watch our latest show!",
      external: true,
      variant: "primary" as const,
    }
  ];

  const ourLinks = [
    // {
    //   href: "https://www.instagram.com/lastcatsonearth/",
    //   icon: <Instagram className="w-5 h-5" />,
    //   label: "Instagram",
    //   external: true,
    //   variant: "secondary" as const,
    // },
    // {
    //   href: "https://www.youtube.com/@lastcatsonearth",
    //   icon: <Youtube className="w-5 h-5" />,
    //   label: "YouTube",
    //   external: true,
    //   variant: "primary" as const,
    // },
    // {
    //   href: "https://lastcatsonearth.de/booking",
    //   icon: <Briefcase className="w-5 h-5" />,
    //   label: "Portfolio",
    //   external: true,
    //   variant: "primary" as const,
    // },
    // {
    //   href: "https://open.spotify.com/intl-it/artist/2nW6fmoJwCEknAfAVhmGwa?si=VLqYdbF_R_-8cLo5zJJwKw",
    //   icon: <FaSpotify className="w-5 h-5" />,
    //   label: "Spotify",
    //   external: true,
    //   variant: "secondary" as const,
    // },
    // {
    //   href: "https://music.apple.com/at/artist/last-cats-on-earth/1887321356",
    //   icon: <FaApple className="w-5 h-5" />,
    //   label: "Apple Music",
    //   external: true,
    //   variant: "primary" as const,
    // },
    // {
    //   href: "mailto:contact@lastcatsonearth.de",
    //   icon: <Mail className="w-5 h-5" />,
    //   label: "Contact",
    //   external: false,
    //   variant: "secondary" as const,
    // },
  ];

  let animationIndex = 0;

  return (
    <nav className="flex flex-col gap-6 relative">
      {/* Browser Hint Tooltip */}

      {showBrowserHint && (
        <div
          onClick={() => setShowBrowserHint(false)}
          className="fixed top-4 right-4 z-[100] flex flex-col items-end animate-in fade-in slide-in-from-top-2 duration-500 cursor-pointer"
        >
          <div className="bg-cat-orange text-black text-[10px] font-bold py-2 px-3 rounded-lg shadow-2xl flex items-center gap-2 border border-black/10">
            <span>Click</span>
            <div className="flex gap-0.5 bg-black/20 p-1 rounded">
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-black rounded-full"></div>
            </div>
            <span>to view in browser</span>
            {/* The Arrow pointing up */}
            <div className="absolute -top-1 right-3 w-2 h-2 bg-cat-orange rotate-45 border-t border-l border-black/10"></div>
          </div>
        </div>
      )}
      <div className="bg-black -mt-6 -mb-3">

        {/* Band Name */}
        <h1 className="font-sceageus [-webkit-font-smoothing:antialiased] text-3xl -mt-10 md:text-4xl tracking-[-0.03em] leading-none text-white text-outline-black opacity-0 animate-fade-in-delay-1 lg:mt-10">
          LAST CATS ON EARTH
        </h1>

        {/* Subtitle */}
        <p className="-mt-0 text-sm text-cat-orange font-medium tracking-widest uppercase opacity-0 animate-fade-in-delay-2 text-center mx-auto">
          EXPLORE OUR MUSIC & UPCOMING GIGS
        </p>
      </div>
      {/* What's new */}
      <div>
        <p className="mb-3 text-sm uppercase tracking-widest text-muted-foreground text-center">
          What's new?
        </p>
        <div className="flex flex-col gap-2">
          {whatsNew.map((link) => {
            const delay = 0.2 + animationIndex++ * 0.05;
            return (
              <div
                key={link.label}
                className="opacity-0"
                style={{ animation: `fade-in 0.5s ease-out ${delay}s forwards` }}
              >
                <LinkButton {...link} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Next gig */}
      {/* <div>
        <p className="-mt-2 mb-3 text-sm uppercase tracking-widest text-muted-foreground text-center">
          Next gig
        </p>
        <div className="flex flex-col gap-2">
          <div
            className="opacity-0"
            style={{ animation: `fade-in 0.5s ease-out ${0.2 + animationIndex++ * 0.05}s forwards` }}
          >
            <LinkButton
              href="https://www.instagram.com/alteutting/"
              icon={<CalendarDays className="w-5 h-5" />}
              label="Alte Utting • Fri 5 Jun • 19:00"
              external={true}
              variant="secondary"
            />
          </div>
        </div>
      </div> */}

      {/* Support us */}
      <div>
        <p className="-mt-2 mb-3 text-sm uppercase tracking-widest text-muted-foreground text-center">
          Support us
        </p>
        <div className="flex flex-col gap-2">
          <div
            className="opacity-0"
            style={{ animation: `fade-in 0.5s ease-out ${0.2 + animationIndex++ * 0.05}s forwards` }}
          >
            <a
              href="/merch"
              className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl bg-cat-orange text-black font-semibold hover:brightness-110 hover:scale-[1.02] transition-all duration-200"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Explore our Merch</span>
            </a>
          </div>

          <div
            className="opacity-0 relative"
            style={{ animation: `fade-in 0.5s ease-out ${0.2 + animationIndex++ * 0.05}s forwards` }}
          >
            <button
              onClick={handleDonateClick}
              className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl border border-cat-orange/60 text-cat-orange hover:bg-cat-orange/10 hover:border-cat-orange hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              <span className="font-semibold">Donate to the band</span>
            </button>

            {showToast && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-bounce bg-cat-orange text-white text-xs py-1.5 px-3 rounded-full whitespace-nowrap shadow-lg z-10">
                We're working on it! &lt;3
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-cat-orange rotate-45"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Our links */}
      <div>
        {/* <p className="-mt-2 mb-3 text-sm uppercase tracking-widest text-muted-foreground text-center">
          Our links
        </p> */}
        <div className="flex flex-col gap-2">
          {ourLinks.map((link) => {
            const delay = 0.2 + animationIndex++ * 0.05;
            return (
              <div
                key={link.label}
                className="opacity-0"
                style={{ animation: `fade-in 0.5s ease-out ${delay}s forwards` }}
              >
                <LinkButton {...link} />
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default LinksSection;