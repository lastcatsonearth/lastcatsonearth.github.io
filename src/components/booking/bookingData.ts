import type { ShowGallery } from "./PhotoGallery/photoGallery.types";

const groupAssets = (assets: Record<string, string>) => {
    const grouped: Record<string, string[]> = {};

    Object.keys(assets)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .forEach((path) => {
            const parts = path.split("/");
            const folder = parts[parts.length - 2];
            if (folder) (grouped[folder] ??= []).push(assets[path]);
        });

    return grouped;
};

const thumbnails = groupAssets(
    import.meta.glob("/src/assets/booking/thumbs/**/*.webp", { import: "default", eager: true }) as Record<string, string>,
);
const fullPhotos = groupAssets(
    import.meta.glob("/src/assets/booking/photos/**/*.webp", { import: "default", eager: true }) as Record<string, string>,
);

export const galleryShows: ShowGallery[] = [
    {
        showTitle: "Zamanand Festival",
        location: "Munich, DE",
        date: "Sep 2026",
        photos: thumbnails.zamanand,
        fullPhotos: fullPhotos.zamanand,
    },
    {
        showTitle: "Woodstock Party",
        location: "Renazzo, IT",
        date: "Jul 2026",
        photos: thumbnails.renazzo,
        fullPhotos: fullPhotos.renazzo,
    },
    {
        showTitle: "Alte Utting",
        location: "Munich, DE",
        date: "Jun 2026",
        photos: thumbnails.alte_utting,
        fullPhotos: fullPhotos.alte_utting,
    },
];

const preloadImage = (src: string) =>
    new Promise<void>((resolve) => {
        const image = new Image();
        image.onload = image.onerror = () => resolve();
        image.src = src;
    });

export const waitForBookingReady = async () => {
    await Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        Promise.all(galleryShows[0].photos.slice(0, 5).map(preloadImage)),
    ]);
};
