import type { ShowGallery } from "./PhotoGallery/photoGallery.types";
import { formatShowDate, shows } from "@/content/shows";

// Groups every image under <root>/<show>/ by its folder name, naturally sorted (2 before 10).
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

/** All photos of a show folder: 640px thumbs + full size (same order). */
export const photosByShow: Record<string, { thumbs: string[]; full: string[] }> = Object.fromEntries(
    Object.keys(fullPhotos).map((key) => [key, { thumbs: thumbnails[key] ?? [], full: fullPhotos[key] }]),
);

// Gallery rows are derived from content/shows.ts – edit shows there, not here.
export const galleryShows: ShowGallery[] = shows.map((show) => ({
    showTitle: show.title,
    location: `${show.city.en}, ${show.countryCode}`,
    date: formatShowDate(show.date, "en", "short"),
    photos: thumbnails[show.gallery] ?? [],
    fullPhotos: fullPhotos[show.gallery] ?? [],
}));

const preloadImage = (src: string) =>
    new Promise<void>((resolve) => {
        const image = new Image();
        image.onload = image.onerror = () => resolve();
        image.src = src;
    });

export const waitForBookingReady = () =>
    Promise.race([
        new Promise<void>((resolve) => setTimeout(resolve, 1200)), // never block the page longer than this
        Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
            Promise.all(galleryShows[0].photos.slice(0, 5).map(preloadImage)),
        ]).then(() => undefined),
    ]);
