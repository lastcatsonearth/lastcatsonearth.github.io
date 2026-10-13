export interface ShowGallery {
    showTitle: string;
    location?: string;
    date?: string;
    photos: string[];
    fullPhotos: string[];
}

export interface PhotoSelection {
    showIdx: number;
    photoIdx: number;
}

export interface PhotoGalleryTranslations {
    category: string;
    headline: string;
    viewAll: string;
    altTemplate: string;
    lightboxAlt: string;
    counterTemplate: string;
    back: string;
}

