import type { MouseEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import { externalProps, socialsWithMail } from "@/config/site";
import { useLanguage, useLocalePath } from "@/i18n/LanguageContext";

const labels = {
    en: { follow: "Listen • Watch • Follow", rights: "All rights reserved.", privacy: "Privacy Policy" },
    de: { follow: "Hören • Sehen • Folgen", rights: "Alle Rechte vorbehalten.", privacy: "Datenschutz" },
} as const;

// On mobile, try the Instagram app first and fall back to the website.
const openInstagramApp = (e: MouseEvent<HTMLAnchorElement>) => {
    const ua = navigator.userAgent || navigator.vendor;
    if (/Instagram/i.test(ua) || !/iPhone|iPad|iPod|Android/i.test(ua)) return;
    e.preventDefault();
    window.location.href = "instagram://user?username=lastcatsonearth";
    setTimeout(() => window.open("https://www.instagram.com/lastcatsonearth/", "_blank", "noopener,noreferrer"), 1500);
};

const SocialIcon = ({ href, label, children }: { href: string; label: string; children: ReactNode }) => (
    <a
        href={href}
        {...externalProps(href)}
        aria-label={label}
        onClick={label === "Instagram" ? openInstagramApp : undefined}
        className="group relative flex flex-col items-center"
    >
        {/* Hover label */}
        <span className="pointer-events-none absolute -top-7 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground opacity-0 shadow-md transition-all duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100">
            {label}
            <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-primary" />
        </span>
        <span className="p-3 text-cat-orange transition-all duration-300 group-hover:scale-110 group-hover:brightness-110">
            {children}
        </span>
    </a>
);

/** compact: no bottom padding (used where the footer sits at the very bottom of a full-screen section). */
const Footer = ({ compact = false }: { compact?: boolean }) => {
    const p = useLocalePath();
    const { lang } = useLanguage();
    const t = labels[lang];

    return (
        <footer>
            <p className="mb-1 text-center text-sm font-bold uppercase tracking-[0.2em] text-cat-orange">{t.follow}</p>

            <div className="-mt-1 flex flex-nowrap items-center justify-center">
                {socialsWithMail.map(({ label, href, Icon }) => (
                    <SocialIcon key={label} href={href} label={label}>
                        <Icon className="h-7 w-7" />
                    </SocialIcon>
                ))}
            </div>

            <div className={`mt-1 space-y-1 border-t border-border pt-4 text-center text-xs text-muted-foreground ${compact ? "" : "pb-4"}`}>
                <p>© {new Date().getFullYear()} Last Cats on Earth. {t.rights}</p>
                <p className="flex items-center justify-center gap-2">
                    <Link to={p("/impressum")} className="underline underline-offset-4 transition-colors hover:text-cat-orange">Impressum</Link>
                    <span aria-hidden="true">•</span>
                    <Link to={p("/privacy")} className="underline underline-offset-4 transition-colors hover:text-cat-orange">{t.privacy}</Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
