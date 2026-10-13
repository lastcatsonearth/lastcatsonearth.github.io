import React, { useCallback } from "react";
import type { ShowGallery, PhotoGalleryTranslations, PhotoSelection } from "./photoGallery.types";

interface Props {
    shows: ShowGallery[];
    translations: PhotoGalleryTranslations;
    onPhotoSelect: (selection: PhotoSelection) => void;
}

const MAX_VISIBLE = 5;
const FEATURED_TITLE = "Zamanand Festival";
const FEATURED_POS = ["center", "center", "center", "center", "75% center"];
const DEFAULT_POS = "center 40%";


const rowStyle: React.CSSProperties = {
    contentVisibility: "auto",
    containIntrinsicSize: "auto 260px", // ~real row height; "auto" remembers the measured one
};

const GalleryRow = React.memo(function GalleryRow({
    show,
    showIdx,
    altTemplate,
}: {
    show: ShowGallery;
    showIdx: number;
    altTemplate: string;
}) {
    const total = show.photos.length;
    const remaining = total - MAX_VISIBLE;
    const featured = show.showTitle === FEATURED_TITLE;
    const aspect = featured ? "aspect-[4/3]" : "aspect-[7/3]";

    return (
        <section style={rowStyle} data-show={showIdx} className="space-y-3">
            <header className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-baseline gap-3">
                    <h4 className="text-base md:text-lg font-semibold tracking-wide text-white/90">
                        {show.showTitle}
                    </h4>
                    {show.location && (
                        <span className="text-xs text-white/40 font-mono hidden sm:inline">
                            {show.location}
                        </span>
                    )}
                </div>
                {show.date && (
                    <span className="text-xs uppercase tracking-wider text-cat-orange font-medium">
                        {show.date}
                    </span>
                )}
            </header>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                {show.photos.slice(0, MAX_VISIBLE).map((photo, i) => (
                    <button
                        key={photo}
                        type="button"
                        data-photo={i}
                        className={`relative ${aspect} overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] group [contain:layout_paint] ${i >= 3 ? "hidden sm:block" : ""
                            }`}
                    >
                        <img
                            src={photo}
                            alt={`${altTemplate} ${show.showTitle} ${i + 1}`}
                            loading="lazy"
                            decoding="async"
                            fetchPriority="low"
                            width={400}
                            height={featured ? 300 : 171}
                            draggable={false}
                            style={{ objectPosition: featured ? FEATURED_POS[i] : DEFAULT_POS }}
                            className="h-full w-full object-cover opacity-80 transition-[transform,opacity] duration-300 group-hover:opacity-100 md:group-hover:scale-105"
                        />
                        {i === MAX_VISIBLE - 1 && remaining > 0 && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/70 transition-colors group-hover:bg-black/50">
                                <span className="text-xs md:text-sm font-bold tracking-wider text-white">
                                    +{remaining}
                                </span>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
});

const PhotoGalleryGrid = ({ shows, translations: t, onPhotoSelect }: Props) => {
    // One delegated handler instead of 5 × N closures
    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-photo]");
            const row = btn?.closest<HTMLElement>("[data-show]");
            if (!btn || !row) return;
            onPhotoSelect({ showIdx: +row.dataset.show!, photoIdx: +btn.dataset.photo! });
        },
        [onPhotoSelect]
    );

    return (
        <div className="space-y-10 isolate" onClick={handleClick}>
            {shows.map((show, i) => (
                <GalleryRow key={show.showTitle + i} show={show} showIdx={i} altTemplate={t.altTemplate} />
            ))}
        </div>
    );
};

export default PhotoGalleryGrid;