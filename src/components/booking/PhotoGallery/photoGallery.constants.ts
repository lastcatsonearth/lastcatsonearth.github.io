import type { PhotoGalleryTranslations } from "./photoGallery.types";

export const photoGalleryTranslations: Record<"en" | "de", PhotoGalleryTranslations> = {
    en: {
        category: "Photos",
        headline: "FROM THE SHOWS",
        viewAll: "View all photos",
        altTemplate: "Stage action photo",
        lightboxAlt: "Expanded shot",
        counterTemplate: "of",
        back: "Back",
    },
    de: {
        category: "Fotos",
        headline: "VON DEN SHOWS",
        viewAll: "Alle Fotos ansehen",
        altTemplate: "Konzertfoto",
        lightboxAlt: "Vergrößerte Ansicht",
        counterTemplate: "von",
        back: "Zurück",
    },
};
