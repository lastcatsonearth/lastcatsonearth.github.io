import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/components/booking/LanguageContext";
import PhotoGalleryGrid from "./PhotoGalleryGrid";
import PhotoLightbox from "./PhotoLightbox";
import { photoGalleryTranslations } from "./photoGallery.constants";
import { PhotoSelection, ShowGallery } from "./photoGallery.types";

interface PhotoGalleryProps {
    shows: ShowGallery[];
}

const PhotoGallery = ({ shows }: PhotoGalleryProps) => {
    const { lang } = useLanguage();
    const t = photoGalleryTranslations[lang];
    const [activeSelection, setActiveSelection] = useState<PhotoSelection | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const currentShow = activeSelection !== null ? shows[activeSelection.showIdx] : null;

    useEffect(() => {
        if (!activeSelection || !currentShow) return;

        const total = currentShow.photos.length;
        const nextImg = new Image();
        nextImg.src = currentShow.photos[(activeSelection.photoIdx + 1) % total];
        const prevImg = new Image();
        prevImg.src = currentShow.photos[(activeSelection.photoIdx - 1 + total) % total];
    }, [activeSelection, currentShow]);

    const moveSelection = useCallback((direction: 1 | -1) => {
        if (!activeSelection || !currentShow) return;
        setIsLoading(true);
        setActiveSelection({
            showIdx: activeSelection.showIdx,
            photoIdx: (activeSelection.photoIdx + direction + currentShow.photos.length) % currentShow.photos.length,
        });
    }, [activeSelection, currentShow]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (activeSelection === null) return;
            if (e.key === "ArrowLeft") moveSelection(-1);
            else if (e.key === "ArrowRight") moveSelection(1);
            else if (e.key === "Escape") setActiveSelection(null);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeSelection, currentShow, moveSelection]);

    return (
        <section className="border-t border-white/5 pt-12 pb-6">
            <p className="text-cat-orange uppercase tracking-[0.25em] text-xs mb-2 text-center">
                {t.category}
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 tracking-wide">
                {t.headline}
            </h3>

            <PhotoGalleryGrid
                shows={shows}
                translations={t}
                onPhotoSelect={(selection) => {
                    setIsLoading(true);
                    setActiveSelection(selection);
                }}
            />

            {activeSelection !== null && currentShow && (
                <PhotoLightbox
                    show={currentShow}
                    selection={activeSelection}
                    translations={t}
                    isLoading={isLoading}
                    onClose={() => setActiveSelection(null)}
                    onPrevious={() => moveSelection(-1)}
                    onNext={() => moveSelection(1)}
                    onImageLoad={() => setIsLoading(false)}
                />
            )}
        </section>
    );
};

export type { ShowGallery };
export default PhotoGallery;
