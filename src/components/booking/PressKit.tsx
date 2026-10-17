import { useState } from "react";
import { Check, Copy, Download, FileText, Mail } from "lucide-react";
import { EMAIL } from "@/config/site";
import { bios, pressFiles } from "@/content/press";
import { useLanguage } from "@/i18n/LanguageContext";

const copy = {
    de: {
        kicker: "Für Presse & Veranstalter",
        heading: "Pressematerial",
        photos: "Pressefotos",
        photosSub: "6 Fotos · ZIP",
        logo: "Logo",
        logoSub: "PNG, transparent",
        logoRound: "Logo rund",
        logoRoundSub: "PNG",
        rider: "Tech-Rider",
        riderSub: "Auf Anfrage",
        riderPdf: "PDF",
        copyBio: "Bio kopieren",
        copied: "Kopiert!",
    },
    en: {
        kicker: "For press & promoters",
        heading: "Press material",
        photos: "Press photos",
        photosSub: "6 photos · ZIP",
        logo: "Logo",
        logoSub: "PNG, transparent",
        logoRound: "Round logo",
        logoRoundSub: "PNG",
        rider: "Tech rider",
        riderSub: "On request",
        riderPdf: "PDF",
        copyBio: "Copy bio",
        copied: "Copied!",
    },
} as const;

const fileName = (path: string) => path.split("/").pop();

/** Small "copy bio" button – copies the long press bio (content/press.ts) to the clipboard. */
export const CopyBioButton = () => {
    const { lang } = useLanguage();
    const t = copy[lang];
    const [copied, setCopied] = useState(false);
    const onClick = async () => {
        try {
            await navigator.clipboard.writeText(bios[lang].long);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard blocked */
        }
    };
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-white/80 transition hover:border-cat-orange hover:text-cat-orange"
        >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? t.copied : t.copyBio}
        </button>
    );
};

/** Compact 2×2 grid: press photos (zip), logos, tech rider. */
export const PressDownloads = () => {
    const { lang } = useLanguage();
    const t = copy[lang];
    const riderFile = pressFiles.rider[lang] ?? pressFiles.rider.de ?? pressFiles.rider.en;

    const items: { label: string; sub: string; href: string; download?: boolean; Icon: typeof Download; primary?: boolean }[] = [
        { label: t.photos, sub: t.photosSub, href: pressFiles.zip, download: true, Icon: Download, primary: true },
        { label: t.logo, sub: t.logoSub, href: pressFiles.logo, download: true, Icon: Download },
        { label: t.logoRound, sub: t.logoRoundSub, href: pressFiles.logoRound, download: true, Icon: Download },
        riderFile
            ? { label: t.rider, sub: t.riderPdf, href: riderFile, download: true, Icon: FileText }
            : { label: t.rider, sub: t.riderSub, href: `mailto:${EMAIL}?subject=${encodeURIComponent("Tech-Rider")}`, Icon: Mail },
    ];

    return (
        <div className="w-full">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-cat-orange">{t.kicker}</p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">{t.heading}</h2>
            <ul className="mt-5 grid grid-cols-2 gap-2.5 text-left sm:grid-cols-4 sm:gap-3">
                {items.map(({ label, sub, href, download, Icon, primary }) => (
                    <li key={label}>
                        <a
                            href={href}
                            download={download ? fileName(href) : undefined}
                            className={`group flex h-full items-center justify-between gap-2 rounded-2xl px-4 py-3 transition ${primary ? "bg-cat-orange text-black hover:bg-white" : "border border-white/15 hover:border-cat-orange"}`}
                        >
                            <span className="min-w-0">
                                <span className="block truncate text-sm font-black uppercase">{label}</span>
                                <span className={`block truncate text-[11px] ${primary ? "text-black/60" : "text-white/50"}`}>{sub}</span>
                            </span>
                            <Icon className={`h-4 w-4 shrink-0 ${primary ? "" : "text-white/50 group-hover:text-cat-orange"}`} />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
