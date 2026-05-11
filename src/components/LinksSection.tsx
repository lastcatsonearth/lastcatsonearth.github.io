import { FaSpotify, FaApple } from "react-icons/fa";
import {
  Instagram,
  Globe,
  Mail,
  Youtube,
  Music,
} from "lucide-react";
import LinkButton from "./LinkButton";

const LinksSection = () => {
  const whatsNew = [
    {
      href: "https://open.spotify.com/intl-it/track/71CmWXdlgbG0qiwAzn459K?si=f77996269ddb4aa6",
      icon: <FaSpotify className="w-5 h-5" />,
      label: "Listen to FLASHBACK!",
      external: true,
      variant: "primary" as const,
    },
  ];

  const ourLinks = [
    {
      href: "https://www.instagram.com/lastcatsonearth/",
      icon: <Instagram className="w-5 h-5" />,
      label: "Instagram",
      external: true,
      variant: "secondary" as const,
    },
    {
      href: "https://www.youtube.com/@lastcatsonearth",
      icon: <Youtube className="w-5 h-5" />,
      label: "YouTube",
      external: true,
      variant: "primary" as const,
    },
    {
      href: "https://lastcatsonearth.de/en/",
      icon: <Globe className="w-5 h-5" />,
      label: "Website",
      external: true,
      variant: "primary" as const,
    },
    {
      href: "https://open.spotify.com/intl-it/artist/2nW6fmoJwCEknAfAVhmGwa?si=VLqYdbF_R_-8cLo5zJJwKw",
      icon: <FaSpotify className="w-5 h-5" />,
      label: "Spotify",
      external: true,
      variant: "secondary" as const,
    },
    {
      href: "https://music.apple.com/at/artist/last-cats-on-earth/1887321356",
      icon: <FaApple className="w-5 h-5" />,
      label: "Apple Music",
      external: true,
      variant: "primary" as const,
    },
    {
      href: "mailto:contact@lastcatsonearth.de",
      icon: <Mail className="w-5 h-5" />,
      label: "Contact",
      external: false,
      variant: "secondary" as const,
    },
  ];

  let animationIndex = 0;

  return (
    <nav className="flex flex-col gap-6">
      {/* What's new */}
      <div>
        <p className="mb-3 text-sm uppercase tracking-widest text-muted-foreground text-center">
          What’s new?
        </p>

        <div className="flex flex-col gap-2">
          {whatsNew.map((link) => {
            const delay = 0.2 + animationIndex++ * 0.05;

            return (
              <div
                key={link.label}
                className="opacity-0"
                style={{
                  animation: `fade-in 0.5s ease-out ${delay}s forwards`,
                }}
              >
                <LinkButton {...link} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Our links */}
      <div>
        <div className="bg-black">
          <p className="-mt-2 mb-3 text-sm uppercase tracking-widest text-muted-foreground text-center">
            Our links
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {ourLinks.map((link) => {
            const delay = 0.2 + animationIndex++ * 0.05;

            return (
              <div
                key={link.label}
                className="opacity-0"
                style={{
                  animation: `fade-in 0.5s ease-out ${delay}s forwards`,
                }}
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