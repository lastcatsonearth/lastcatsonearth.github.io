import React, { useState, useEffect } from "react";
import { FaSpotify, FaApple, FaYoutube, FaFacebook } from "react-icons/fa";
import { SiBandsintown } from "react-icons/si";
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

  const handleDonateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const whatsNew = [
    {
      href: "https://open.spotify.com/intl-it/track/7AJohGsgWQTzB32uLrYuYk?si=f128b3f87145490d",
      icon: <FaSpotify className="w-5 h-5" />,
      label: "Listen to NEVER STOP!",
      external: true,
      variant: "primary" as const,
    },
    {
      icon: <FaYoutube className="w-5 h-5" />,
      href: "https://www.youtube.com/watch?v=dWhzsrdGyko",
      label: "Watch our latest show!",
      external: true,
      variant: "primary" as const,
    },
    {
      icon: <SiBandsintown className="w-5 h-5" />,
      href: "https://www.bandsintown.com/e/108894107?&came_from=210&_ga=2.232485528.661324463.1789403087-2097931406.1787566403",
      label: "Come to our next show!",
      external: true,
      variant: "primary" as const,
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      href: "https://lastcatsonearth.de/booking",
      label: "Check out our portfolio",
      external: true,
      variant: "secondary" as const,
    }
  ];

  const ourLinks: Array<React.ComponentProps<typeof LinkButton>> = [
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
    //   className: "bg-cat-orange text-black font-semibold hover:brightness-110 border-none",
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
      <div className="mt-6 -mb-3 text-center">

        {/* Subtitle */}
        <p className="text-2xl md:text-2xl text-cat-white font-bold tracking-[0.15em] uppercase opacity-0 animate-fade-in-delay-2 text-center mx-auto">
          MUNICH FUNKY CATS
        </p>
        <p className="text-s md:text-xs text-cat-white tracking-[0.15em] uppercase opacity-0 animate-fade-in-delay-2 text-center mx-auto">

        </p>
        <p className="text-s md:text-s text-cat-white tracking-[0.15em] uppercase opacity-0 animate-fade-in-delay-2 text-center mx-auto">
          ORIGINAL MUSIC • LIVE SHOWS
        </p>
      </div>

      {/* What's new */}
      <div>
        <div className="flex justify-center">
          <p className="mb-1 font-bold text-sm uppercase tracking-[0.2em] text-cat-orange px-3 py-1 rounded-md">
            WHAT'S NEW?
          </p>
        </div>
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

      {/* Our links */}
      <div>
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