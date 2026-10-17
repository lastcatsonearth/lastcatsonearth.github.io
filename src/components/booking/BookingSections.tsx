import AudioPlayer from "./AudioPlayer";
import BookingForm from "./BookingForm";
import PhotoGallery from "./PhotoGallery";
import VideoCarousel from "./VideoCarousel";
import VideoMarquee from "./VideoMarquee";
import Footer from "@/components/Footer";
import starsBg from "@/assets/stars_background.webp";
import { galleryShows } from "./bookingData";
import BookingHeader from "./BookingHeader";

const BookingSections = ({ onVideoSelect }: { onVideoSelect: (url: string | null) => void }) => (
    <div className="relative z-10 w-full text-white">
        <BookingHeader />
        <div className="relative bg-repeat" style={{ backgroundImage: `url(${starsBg})` }}>
            <main className="w-full h-dvh overflow-y-scroll snap-y snap-mandatory phone-landscape:snap-none scroll-smooth overscroll-y-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">                <h1 className="sr-only">Book Last Cats on Earth, a Munich Rock Band for Events and Collaborations</h1>

                <section id="bio" className="flex h-dvh phone-landscape:h-auto phone-landscape:pt-16 phone-landscape:pb-6 w-full snap-start snap-always flex-col items-center justify-center px-4 pt-20 sm:px-8">
                    <div className="mx-auto w-full max-w-5xl">
                        <VideoMarquee />
                    </div>
                </section>

                <section id="videos" className="flex h-dvh phone-landscape:h-auto phone-landscape:pt-6 phone-landscape:pb-6 w-full snap-start snap-always flex-col items-center justify-center px-4 pt-20 sm:px-8">
                    <div className="mx-auto w-full max-w-5xl">
                        <VideoCarousel onVideoSelect={onVideoSelect} />
                    </div>
                </section>

                <section id="releases" className="flex h-dvh phone-landscape:h-auto phone-landscape:pt-6 phone-landscape:pb-6 w-full snap-start snap-always flex-col items-center justify-center px-4 pt-20 sm:px-8">
                    <div className="mx-auto w-full max-w-4xl">
                        <AudioPlayer />
                    </div>
                </section>

                <section id="photos" className="h-dvh phone-landscape:h-auto phone-landscape:pt-6 phone-landscape:pb-6 w-full snap-start snap-always flex flex-col [justify-content:safe_center] items-center px-4 sm:px-8 pt-16 sm:pt-20 touch-pan-y overflow-hidden phone-landscape:overflow-visible">                    <div className="w-full max-w-6xl mx-auto py-4 sm:py-10">
                    <PhotoGallery shows={galleryShows} />
                </div>
                </section>

                <section id="contact" className="h-dvh phone-landscape:h-auto phone-landscape:pt-6 phone-landscape:pb-6 w-full snap-start snap-always flex flex-col justify-center items-center px-4 sm:px-8 pt-20 touch-pan-y">
                    <div className="w-full max-w-xl mx-auto my-auto">
                        <BookingForm />
                    </div>
                </section>

                <section id="links" className="h-dvh phone-landscape:h-auto phone-landscape:pt-6 phone-landscape:pb-6 w-full snap-start snap-always flex flex-col justify-between items-center px-4 sm:px-8 pt-24 pb-8 touch-pan-y">
                    <div className="w-full max-w-4xl mx-auto my-auto text-center">
                        {/* Optional quick wrap or summary if needed, or leave space */}
                        <p className="text-cat-orange uppercase tracking-[0.25em] text-xs mb-4">Last Cats on Earth</p>
                        <h3 className="text-3xl font-bold uppercase tracking-wide">Let's make some noise.</h3>
                    </div>
                    <div className="w-full max-w-4xl mx-auto pb-4">
                        <Footer compact />
                    </div>
                </section>
            </main>
        </div>
    </div>
);

export default BookingSections;
