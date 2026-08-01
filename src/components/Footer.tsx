import { Instagram, Briefcase, Mail, Youtube } from "lucide-react";
import { FaSpotify, FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const SocialIcon = ({
  href,
  icon,
  label,
  external = true,
  onClick,
}: SocialIconProps) => {
  const content = (
    <div className="relative flex flex-col items-center group">
      {/* Orange Vignette / Tooltip */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-200 z-50">
        <div className="bg-primary text-primary-foreground text-[10px] font-semibold py-0.5 px-2 rounded shadow-md whitespace-nowrap uppercase tracking-wider flex items-center justify-center">
          {label}
          {/* Arrow pointing to icon */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rotate-45" />
        </div>
      </div>

      {/* Icon Wrapper */}
      <div className="p-3 text-cat-orange transition-all duration-300 group-hover:scale-110 group-hover:brightness-110">
        {icon}
      </div>
    </div>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={href} aria-label={label}>
      {content}
    </Link>
  );
};

const Footer = () => {
  const handleInstagramClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const ua = navigator.userAgent || navigator.vendor;
    const isInstagramApp = /Instagram/i.test(ua);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);

    if (isInstagramApp) {
      return;
    }

    if (isMobile) {
      e.preventDefault();
      const appUri = "instagram://user?username=lastcatsonearth";
      const webUri = "https://www.instagram.com/lastcatsonearth/";

      window.location.href = appUri;

      setTimeout(() => {
        window.open(webUri, "_blank", "noopener,noreferrer");
      }, 1500);
    }
  };

  return (
    <div className="mt-0">
      {/* Label placed above the horizontal rule */}
      <div className="flex justify-center mb-4">
        <p className="inline-block px-3 py-1 bg-black font-bold text-sm uppercase tracking-[0.2em] text-cat-orange rounded-full">
          LISTEN • WATCH • FOLLOW
        </p>
      </div>

      {/* Horizontal border line */}
      <footer className="bg-black -mt-2 -mb-10 overflow-visible">
        {/* Icons */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 flex-nowrap -mt-5 overflow-visible">
          <SocialIcon
            href="https://www.instagram.com/lastcatsonearth/"
            icon={<Instagram className="w-6 h-6" />}
            label="Instagram"
            onClick={handleInstagramClick}
          />

          <SocialIcon
            href="https://www.youtube.com/@lastcatsonearth"
            icon={<Youtube className="w-6 h-6" />}
            label="YouTube"
          />

          <SocialIcon
            href="/booking"
            icon={<Briefcase className="w-6 h-6" />}
            label="Portfolio"
            external={false}
          />

          <SocialIcon
            href="https://open.spotify.com/intl-it/artist/2nW6fmoJwCEknAfAVhmGwa?si=VLqYdbF_R_-8cLo5zJJwKw"
            icon={<FaSpotify className="w-6 h-6" />}
            label="Spotify"
          />

          <SocialIcon
            href="https://music.apple.com/at/artist/last-cats-on-earth/1887321356"
            icon={<FaApple className="w-6 h-6" />}
            label="Apple Music"
          />

          <SocialIcon
            href="mailto:contact@lastcatsonearth.de"
            icon={<Mail className="w-6 h-6" />}
            label="Contact"
            external={true}
          />
        </div>

        {/* Horizontal line above credits */}
        <div className="border-t border-border mt-4 pt-4" />

        <p className="text-center text-xs text-muted-foreground mt-2 mb-4">
          © 2026 Last Cats on Earth. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;