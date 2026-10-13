import AudioPlayer from "./AudioPlayer";
import BookingForm from "./BookingForm";
import PhotoGallery from "./PhotoGallery";
import VideoCarousel from "./VideoCarousel";
import VideoMarquee from "./VideoMarquee";
import Footer from "@/components/Footer";
import starsBg from "@/assets/stars_background.png";
import { galleryShows } from "./bookingData";
import BookingHeader from "./BookingHeader";

const BookingSections = ({ onVideoSelect }: { onVideoSelect: (url: string | null) => void }) => (
    <div className="relative z-10 w-full text-white">
        <BookingHeader />
        <div className="relative bg-repeat" style={{ backgroundImage: `url(${starsBg})` }}>
            <main className="w-full h-dvh overflow-y-scroll snap-y snap-mandatory scroll-smooth overscroll-y-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">                <h1 className="sr-only">Book Last Cats on Earth, a Munich Rock Band for Events and Collaborations</h1>

                <section id="bio" className="flex h-dvh w-full snap-start snap-always flex-col items-center justify-center px-4 pt-20 sm:px-8">
                    <div className="mx-auto w-full max-w-5xl">
                        <VideoMarquee />
                    </div>
                </section>

                <section id="videos" className="flex h-dvh w-full snap-start snap-always flex-col items-center justify-center px-4 pt-20 sm:px-8">
                    <div className="mx-auto w-full max-w-5xl">
                        <VideoCarousel onVideoSelect={onVideoSelect} />
                    </div>
                </section>

                <section id="releases" className="flex h-dvh w-full snap-start snap-always flex-col items-center justify-center px-4 pt-20 sm:px-8">
                    <div className="mx-auto w-full max-w-4xl">
                        <AudioPlayer />
                    </div>
                </section>

                <section id="photos" className="flex h-dvh w-full snap-start snap-always flex-col items-center justify-center overflow-y-auto px-4 pt-20 sm:px-8">
                    <div className="mx-auto w-full max-w-6xl py-10">
                        <PhotoGallery shows={galleryShows} />
                    </div>
                </section>

                <section id="contact" className="flex h-dvh w-full snap-start snap-always flex-col items-center justify-between overflow-y-auto px-4 pb-8 pt-24 sm:px-8">
                    <div className="mx-auto my-auto w-full max-w-xl">
                        <BookingForm />
                    </div>
                    <div className="mx-auto w-full max-w-4xl pb-4">
                        <Footer />
                    </div>
                </section>
            </main>
        </div>
    </div>
);

export default BookingSections;
