import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BandHeader from "@/components/BandHeader";
import Footer from "@/components/Footer";
import zamanandPhoto1 from "@/assets/booking/photos/zamanand/1.jpg";
import zamanandPhoto6 from "@/assets/booking/photos/zamanand/6.jpg";
import renazzoPhoto1 from "@/assets/booking/photos/renazzo/1.jpg";
import uttingPhoto2 from "@/assets/booking/photos/alte_utting/photo_2.png";

const shows = [
  { slug: "zamanand-festival-munich-september-2026", title: "Zamanand Festival", location: "Munich, Germany", date: "September 2026", image: zamanandPhoto1, secondImage: zamanandPhoto6, text: "A high-energy festival set in Munich, moving between hard rock, funk, alternative hooks and direct crowd work." },
  { slug: "woodstock-party-renazzo-july-2026", title: "Woodstock Party", location: "Renazzo, Italy", date: "July 2026", image: renazzoPhoto1, secondImage: zamanandPhoto1, text: "A live party set built for movement, connection and the kind of night where the audience becomes part of the show." },
  { slug: "alte-utting-munich-june-2026", title: "Alte Utting", location: "Munich, Germany", date: "June 2026", image: uttingPhoto2, secondImage: zamanandPhoto6, text: "A Munich venue show bringing original material and reworked covers into an intimate, characterful room." },
];

const ShowsPage = () => {
  const { slug } = useParams();
  const show = shows.find((entry) => entry.slug === slug);
  const isDetail = Boolean(slug);

  useEffect(() => {
    document.title = show
      ? `${show.title} – Last Cats on Earth`
      : "Live Shows in Munich | Last Cats on Earth";
    return () => {
      document.title = "Munich Rock Band | Last Cats on Earth – Funk & Alternative Rock";
    };
  }, [show]);

  return (
    <div className="min-h-screen px-2 py-6 text-white sm:px-6 sm:py-10">
      <main className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:p-6">
        <BandHeader linkToHome />
        <article className="mx-auto max-w-2xl px-2 pb-10">
          <header className="border-b border-white/10 py-10 text-center">
            <p className="text-[11px] uppercase tracking-[0.28em] text-cat-orange">{isDetail ? "Show archive · live performance" : "Show archive · Munich and beyond"}</p>
            <h1 className="mt-4 text-3xl font-bold tracking-wide sm:text-5xl">{show ? show.title : "Where the Cats have played."}</h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60">
              {show ? `${show.location} · ${show.date}` : "Explore recent Last Cats on Earth performances, venues and festival appearances."}
            </p>
          </header>
          {show ? (
            <section className="py-10">
              <img src={show.image} alt={`${show.title} live performance`} className="intent-image-visible h-72 w-full rounded-2xl object-cover" />
              <p className="mt-6 text-justify text-sm leading-7 text-white/70">{show.text}</p>
              <img src={show.secondImage} alt={`${show.title} audience and stage`} className="intent-image-visible mt-8 h-64 w-full rounded-2xl object-cover" />
              <Link to="/booking" className="mt-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cat-orange hover:text-white">Book the band <ArrowUpRight className="h-4 w-4" /></Link>
            </section>
          ) : (
            <div className="space-y-5 py-10">
              {shows.map((entry) => (
                <Link key={entry.slug} to={`/shows/${entry.slug}`} className="group grid grid-cols-[96px_1fr] gap-4 rounded-2xl border border-white/10 bg-black/20 p-3 transition hover:border-cat-orange/50">
                  <img src={entry.image} alt={`${entry.title} live`} className="h-24 w-24 rounded-xl object-cover opacity-80 transition group-hover:opacity-100" />
                  <div className="self-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cat-orange">{entry.date}</p>
                    <h2 className="mt-1 text-lg font-bold tracking-wide">{entry.title}</h2>
                    <p className="mt-1 text-xs text-white/50">{entry.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </article>
        <Footer />
      </main>
    </div>
  );
};

export default ShowsPage;
