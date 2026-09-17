import type { ShowGallery, PhotoGalleryTranslations, PhotoSelection } from "./photoGallery.types";

interface PhotoGalleryGridProps {
    shows: ShowGallery[];
    translations: PhotoGalleryTranslations;
    onPhotoSelect: (selection: PhotoSelection) => void;
}

const PhotoGalleryGrid = ({ shows, translations: t, onPhotoSelect }: PhotoGalleryGridProps) => (
    <div className="space-y-10">
        {shows.map((show, showIdx) => {
            const visiblePhotos = show.photos.slice(0, 5);
            const remainingCount = show.photos.length - 5;
            const isFeatured = show.showTitle === "Zamanand Festival";

            return (
                <div key={showIdx} className="space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
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
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                        {visiblePhotos.map((photo, photoIdx) => {
                            const isLastItem = photoIdx === 4 && remainingCount > 0;

                            return (
                                <div
                                    key={photoIdx}
                                    onClick={() => onPhotoSelect({ showIdx, photoIdx })}
                                    className={`relative ${isFeatured ? "aspect-[4/3]" : "aspect-[7/3]"
                                        } bg-white/[0.02] border border-white/10 rounded-lg overflow-hidden group cursor-pointer ${photoIdx >= 3 ? "hidden sm:block" : ""
                                        }`}
                                >
                                    <img
                                        src={photo}
                                        alt={`${t.altTemplate} - ${show.showTitle} ${photoIdx + 1}`}
                                        className={`w-full h-full object-cover ${isFeatured ? "object-center" : "object-[center_40%]"
                                            } opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300`}
                                    />
                                    {isLastItem && (
                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center group-hover:bg-black/40 transition-colors">
                                            <span className="text-xs md:text-sm font-bold text-white tracking-wider">
                                                +{remainingCount}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        })}
    </div>
);

export default PhotoGalleryGrid;
