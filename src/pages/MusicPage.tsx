import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import BandHeader from "@/components/BandHeader";
import Footer from "@/components/Footer";
import AudioPlayer from "@/components/booking/AudioPlayer";
import VideoCarousel from "@/components/booking/VideoCarousel";
import { LanguageProvider } from "@/components/booking/LanguageContext";

const MusicPage = () => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Music, Videos and Releases | Last Cats on Earth";
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");
    description?.setAttribute("content", "Listen to Last Cats on Earth releases, watch live videos and discover original music from a Munich funk rock and alternative rock band.");
    return () => {
      document.title = previousTitle;
      if (previousDescription) description?.setAttribute("content", previousDescription);
    };
  }, []);

  return (
    <div className="min-h-screen px-2 py-6 text-white sm:px-6 sm:py-10">
      <LanguageProvider>
        <main className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-6">
          <BandHeader linkToHome />
          <article className="mx-auto max-w-2xl px-2 pb-10">
          <header className="border-b border-white/10 py-10 text-center">
            <p className="text-[11px] uppercase tracking-[0.28em] text-cat-orange">Original music · live videos</p>
            <h1 className="mt-4 text-3xl font-bold tracking-wide sm:text-5xl">Hear the Cats in motion.</h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60">
              Listen to Last Cats on Earth releases, watch live performances and discover the Munich rock band behind the show.
            </p>
          </header>
          <AudioPlayer />
          <VideoCarousel onVideoSelect={setActiveVideoUrl} />
          <div className="border-t border-white/10 pt-8 text-center">
            <Link to="/booking" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cat-orange hover:text-white">
              Book the live show <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          </article>
          <Footer />
          {activeVideoUrl && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4" onClick={() => setActiveVideoUrl(null)}>
              <button
                type="button"
                className="absolute right-6 top-6 z-10 p-2 text-3xl text-white/60 hover:text-white"
                onClick={() => setActiveVideoUrl(null)}
                aria-label="Close video"
              >
                ×
              </button>
              <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-black" onClick={(event) => event.stopPropagation()}>
                <iframe
                  className="h-full w-full"
                  src={activeVideoUrl}
                  title="Last Cats on Earth live video"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </main>
      </LanguageProvider>
    </div>
  );
};

export default MusicPage;
