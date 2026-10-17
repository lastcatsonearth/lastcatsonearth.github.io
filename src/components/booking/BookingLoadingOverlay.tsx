const BookingLoadingOverlay = () => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black px-6 text-center">
        <div>
            <p className="text-3xl font-black uppercase tracking-wider text-white">Last Cats on Earth</p>
            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-cat-orange">Press Kit</p>
        </div>
    </div>
);

export default BookingLoadingOverlay;
