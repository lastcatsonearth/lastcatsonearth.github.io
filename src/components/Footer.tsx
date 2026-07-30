import { Instagram, Globe, Mail, Youtube } from "lucide-react";
import { FaSpotify, FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";

const SocialIcon = ({
  href,
  icon,
  label,
  external = true,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) => {
  const className =
    "p-3 text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-110";

  // Use standard <a> for external links (Spotify, YouTube, mailto, etc.)
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={className}
      >
        {icon}
      </a>
    );
  }

  // Use React Router <Link> for internal routes (/booking, /merch, /)
  return (
    <Link to={href} aria-label={label} className={className}>
      {icon}
    </Link>
  );
};

const Footer = () => {
  return (
    <footer className="mt-6 pt-8 border-t border-border">
      <div className="bg-black py-4 -mt-4">
        <div className="-mt-6 flex items-center justify-center gap-4">
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

          {/* Fixed: Internal router link to /booking on your new domain */}
          <SocialIcon
            href="/booking"
            icon={<Globe className="w-5 h-5" />}
            label="Website"
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

        <p className="bg-black text-center text-xs text-muted-foreground mt-2 mb-4">
          © 2025 Last Cats on Earth. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;