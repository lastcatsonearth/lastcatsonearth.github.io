const BookingVideoOverlay = ({ url, onClose }: { url: string; onClose: () => void }) => (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md md:p-12"
        onClick={onClose}
    >
        <button
            type="button"
            className="absolute right-6 top-6 z-50 p-2 text-3xl font-light text-white/60 transition-colors hover:text-white"
            onClick={onClose}
            aria-label="Close overlay"
        >
            ×
        </button>
        <div
            className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-xl border border-white/20 bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
        >
            <iframe
                className="h-full w-full"
                src={url}
                title="Last Cats on Earth live video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    </div>
);

export default BookingVideoOverlay;
