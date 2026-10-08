import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import BandHeader from "@/components/BandHeader";
import Footer from "@/components/Footer";
import liveStagePhoto from "@/assets/booking/photos/zamanand/1.jpg";
import crowdPhoto from "@/assets/booking/photos/alte_utting/photo_2.png";
import festivalPhoto from "@/assets/booking/photos/zamanand/6.jpg";

type IntentKey = "munich" | "festival" | "party";

const pageContent: Record<
  IntentKey,
  {
    title: string;
    description: string;
    eyebrow: string;
    heading: string;
    intro: string;
    points: string[];
    sectionTitle: string;
    sectionText: string;
    image: string;
    imageAlt: string;
    imageCaption: string;
    secondImage: string;
    secondImageAlt: string;
  }
> = {
  munich: {
    title: "Munich Rock Band for Live Shows | Last Cats on Earth",
    description:
      "Last Cats on Earth are a Munich rock band playing energetic funk rock and alternative rock for clubs, concerts, festivals, venues and events.",
    eyebrow: "Munich · Germany",
    heading: "A Munich rock band built for live rooms.",
    intro:
      "Last Cats on Earth combine hard rock, funk, alternative rock, rap and pop-rock energy into an original live set. We are based in Munich and available for shows across Bavaria, Germany and beyond.",
    points: ["Original music and reworked covers", "High-energy live performance", "Flexible set for clubs and events"],
    sectionTitle: "From Munich to your stage",
    sectionText:
      "Whether you are booking a club night, a concert series or a local showcase, we bring a focused, adaptable performance and a sound that keeps the room moving.",
    image: liveStagePhoto,
    imageAlt: "Last Cats on Earth performing on stage",
    imageCaption: "Live from Munich",
    secondImage: crowdPhoto,
    secondImageAlt: "Last Cats on Earth performing for a live audience",
  },
  festival: {
    title: "Festival and Venue Rock Band | Last Cats on Earth",
    description:
      "Book Last Cats on Earth for festivals, venues and concert series. A Munich funk rock and alternative rock band with an energetic live show.",
    eyebrow: "For promoters · venues · festivals",
    heading: "A live set that moves with the crowd.",
    intro:
      "Last Cats on Earth are available for festivals, open-air stages, clubs, cultural events and concert series. Our set moves from hard-hitting instrumentals to melodic hooks, rap verses and direct crowd work.",
    points: ["Festival-ready live set", "Club and open-air formats", "Professional booking communication"],
    sectionTitle: "Built for a real stage",
    sectionText:
      "We care about the full show: timing, energy, connection with the audience and fitting the format of your event. Tell us about your stage, date and audience and we will get back to you.",
    image: festivalPhoto,
    imageAlt: "Last Cats on Earth playing a festival show",
    imageCaption: "Made for bigger stages",
    secondImage: liveStagePhoto,
    secondImageAlt: "Last Cats on Earth performing live in Munich",
  },
  party: {
    title: "Rock Band for Parties and Events in Munich | Last Cats on Earth",
    description:
      "Book a Munich rock band for parties, private events, company events and celebrations. Last Cats on Earth bring funk rock and alternative rock live.",
    eyebrow: "For parties · events · collaborations",
    heading: "Make the event sound like nothing else.",
    intro:
      "Looking for live music with personality? Last Cats on Earth bring an energetic mix of funk rock, alternative rock and original songs to private parties, company events, celebrations and creative collaborations.",
    points: ["Energetic, memorable performance", "Originals and distinctive covers", "Direct communication with the band"],
    sectionTitle: "Tell us what you are planning",
    sectionText:
      "Share the event, location, date and the atmosphere you want to create. We can then talk through the right set-up and availability.",
    image: crowdPhoto,
    imageAlt: "Last Cats on Earth playing for a live audience",
    imageCaption: "Make it a night",
    secondImage: festivalPhoto,
    secondImageAlt: "Last Cats on Earth playing an outdoor event",
  },
};

const FlyingImage = ({
  src,
  alt,
  caption,
  direction = "left",
}: {
  src: string;
  alt: string;
  caption: string;
  direction?: "left" | "right";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <figure
      ref={ref}
      className={`intent-image intent-image-${direction} ${visible ? "intent-image-visible" : ""}`}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      <figcaption className="absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
        {caption}
      </figcaption>
    </figure>
  );
};

const IntentPage = ({ intent }: { intent: IntentKey }) => {
  const content = pageContent[intent];
  const location = useLocation();

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const previousDescription = description?.getAttribute("content");
    const previousCanonical = canonical?.getAttribute("href");

    document.title = content.title;
    description?.setAttribute("content", content.description);
    canonical?.setAttribute("href", `https://lastcatsonearth.de${location.pathname}`);

    return () => {
      document.title = previousTitle;
      if (previousDescription) description?.setAttribute("content", previousDescription);
      if (previousCanonical) canonical?.setAttribute("href", previousCanonical);
    };
  }, [content, location.pathname]);

  return (
    <div className="min-h-screen px-2 py-6 text-white sm:px-6 sm:py-10">
      <main className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-6">
        <BandHeader linkToHome />

        <article className="mx-auto max-w-2xl px-2 pb-10">
          <header className="border-b border-white/10 pb-10 text-center">
            <p className="text-[11px] uppercase tracking-[0.28em] text-cat-orange">{content.eyebrow}</p>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-wide sm:text-5xl">
              {content.heading}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60">{content.intro}</p>
            <Link
              to="/booking"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-cat-orange px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:brightness-110"
            >
              Go to booking <ArrowUpRight className="h-4 w-4" />
            </Link>
          </header>

          <section className="border-b border-white/10 py-10" aria-labelledby="fit-heading">
            <div className="grid items-center gap-8 sm:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-cat-orange">Why the Cats</p>
                <h2 id="fit-heading" className="mt-3 text-2xl font-bold tracking-wide">
                  Made to be felt.
                </h2>
                <ul className="mt-6 space-y-4">
                  {content.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm text-white/70">
                      <Check className="h-4 w-4 shrink-0 text-cat-orange" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <FlyingImage
                src={content.image}
                alt={content.imageAlt}
                caption={content.imageCaption}
                direction="right"
              />
            </div>
          </section>

          <section className="py-10" aria-labelledby="details-heading">
            <div className="grid items-center gap-8 sm:grid-cols-[0.95fr_1.05fr]">
              <FlyingImage
                src={content.secondImage}
                alt={content.secondImageAlt}
                caption="No two shows feel the same"
                direction="left"
              />
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-cat-orange">The live experience</p>
                <h2 id="details-heading" className="mt-3 text-2xl font-bold tracking-wide">
                  {content.sectionTitle}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/60">{content.sectionText}</p>
                <Link
                  to="/booking"
                  className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cat-orange transition hover:text-white"
                >
                  See live videos and booking details <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </article>

        <Footer />
      </main>
    </div>
  );
};

export default IntentPage;
