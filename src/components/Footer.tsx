import { Instagram, Briefcase, Mail, Youtube } from "lucide-react";
import { FaSpotify, FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}

const SocialIcon = ({
  href,
  icon,
  label,
  external = true,
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
      <div className="p-3 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110">
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
  return (
    <div className="mt-0">
      {/* Label placed above the horizontal rule */}
      <p className="mb-4 text-sm uppercase tracking-widest text-muted-foreground text-center">
        Our links
      </p>

      {/* Horizontal border line */}
      <footer className="border-t border-border pt-6 bg-black -mt-2 -mb-10 overflow-visible">
        {/* Force icons on a single line with flex-nowrap and overflow-visible */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 flex-nowrap -mt-5 overflow-visible">
          <SocialIcon
            href="https://www.instagram.com/lastcatsonearth/"
            icon={<Instagram className="w-5 h-5" />}
            label="Instagram"
          />

          <SocialIcon
            href="https://www.youtube.com/@lastcatsonearth"
            icon={<Youtube className="w-5 h-5" />}
            label="YouTube"
          />

          <SocialIcon
            href="/booking"
            icon={<Briefcase className="w-5 h-5" />}
            label="Portfolio"
            external={false}
          />

          <SocialIcon
            href="https://open.spotify.com/intl-it/artist/2nW6fmoJwCEknAfAVhmGwa?si=VLqYdbF_R_-8cLo5zJJwKw"
            icon={<FaSpotify className="w-5 h-5" />}
            label="Spotify"
          />

          <SocialIcon
            href="https://music.apple.com/at/artist/last-cats-on-earth/1887321356"
            icon={<FaApple className="w-5 h-5" />}
            label="Apple Music"
          />

          <SocialIcon
            href="mailto:contact@lastcatsonearth.de"
            icon={<Mail className="w-5 h-5" />}
            label="Contact"
            external={true}
          />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 mb-4">
          © 2026 Last Cats on Earth. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;