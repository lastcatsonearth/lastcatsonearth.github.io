// Single source of truth for site-wide facts: URL, contact, social profiles.
// Change a link here and it updates the header, footer, links page and nav.
import type { ComponentType } from "react";
import { Instagram, Mail, Youtube } from "lucide-react";
import { FaApple, FaFacebook, FaSpotify, FaTiktok } from "react-icons/fa";

export const SITE_URL = "https://lastcatsonearth.de";
export const SITE_NAME = "Last Cats on Earth";
export const EMAIL = "contact@lastcatsonearth.de";
/** Formspree form for booking/contact requests (merch reservations use their own form in MerchPage.tsx). */
export const BOOKING_FORM_ENDPOINT = "https://formspree.io/f/xvkzlyrd";
/** Default social preview image (1200×630, lives in /public). */
export const OG_IMAGE = "/og-image.jpg";

export type Social = {
    label: string;
    href: string;
    Icon: ComponentType<{ className?: string }>;
};

export const socials: Social[] = [
    { label: "Instagram", href: "https://www.instagram.com/lastcatsonearth/", Icon: Instagram },
    { label: "YouTube", href: "https://www.youtube.com/@lastcatsonearth", Icon: Youtube },
    { label: "Facebook", href: "https://www.facebook.com/lastcatsonearth", Icon: FaFacebook },
    { label: "TikTok", href: "https://www.tiktok.com/@lastcatsonearthband", Icon: FaTiktok },
    { label: "Spotify", href: "https://open.spotify.com/artist/2nW6fmoJwCEknAfAVhmGwa", Icon: FaSpotify },
    { label: "Apple Music", href: "https://music.apple.com/at/artist/last-cats-on-earth/1887321356", Icon: FaApple },
];

/** Socials + the contact mail, for icon rows that also show "Contact". */
export const socialsWithMail: Social[] = [
    ...socials,
    { label: "Contact", href: `mailto:${EMAIL}`, Icon: Mail },
];

/** Props for an external <a>: new tab for web links, same tab for mailto. */
export const externalProps = (href: string) =>
    href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" };
