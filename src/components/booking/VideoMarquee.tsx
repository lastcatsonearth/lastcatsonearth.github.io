import { useLanguage } from "@/i18n/LanguageContext";
import heroPhoto from "@/assets/booking/photos/zamanand/1.webp";

const translations = {
    en: {
        tagline: "Born in Munich. Made for the stage.",
        bioHeading: "LAST CATS ON EARTH",
        subHeading: "ELECTRONIC PRESS KIT",
        bio1: (
            <>
                Based in Munich, <strong>Last Cats on Earth</strong> deliver a high-octane mix of hard rock, funk, and alternative rock sounds.
                Our main rule is originality: whether it's our original tracks or reinterpreting famous covers, we always do it our own way.
            </>
        ),
        bio2: (
            <>
                Our DNA is heavily influenced by the Californian pop-rock of the early 2000s, reworking those sounds with influences
                from funk, rap, punk, and electronic music. Our latest single, <strong>NEVER STOP</strong>, is out now, following
                our debut <strong>FLASHBACK!</strong>.
            </>
        ),
        bio3: (
            <>
                From intimate venues to bigger festival stages, our live shows keep everyone on their toes by constantly shifting gears:
                from hard-hitting instrumentals and melodic hooks to rap verses, choreography, and direct crowd interaction.
            </>
        ),
        bio4: (
            <>
                We don't just play music: <strong>the stage is our home.</strong>
            </>
        ),
    },
    de: {
        tagline: "Aus München. Für die Bühne gemacht.",
        bioHeading: "LAST CATS ON EARTH",
        subHeading: "ELECTRONIC PRESS KIT",
        bio1: (
            <>
                Ansässig in München liefern <strong>Last Cats on Earth</strong> einen energiereichen Mix aus Hard Rock, Funk und Alternative Rock.
                Unsere wichtigste Regel ist Originalität: Egal ob eigene Tracks oder Neuinterpretationen bekannter Cover, wir machen es immer auf unsere Art.
            </>
        ),
        bio2: (
            <>
                Unsere DNA ist stark vom kalifornischen Pop-Rock der frühen 2000er geprägt, mit Einflüssen aus Funk, Rap, Punk und elektronischer Musik. Unsere Single <strong>NEVER STOP</strong> ist jetzt draußen!
            </>
        ),
        bio3: (
            <>
                Von Club-Gigs bis zu Festival-Bühnen: Unsere Shows wechseln ständig den Gang – mit harten Instrumentals, Rap-Versen, Choreografien und direkter Interaktion mit dem Publikum.
            </>
        ),
        bio4: (
            <>
                Wir machen nicht einfach nur Musik: <strong>Die Bühne ist unser Zuhause.</strong>
            </>
        ),
    }
};

const VideoMarquee = () => {
    const { lang } = useLanguage();
    const t = translations[lang];

    return (
        <section className="w-full max-w-6xl mx-auto px-4 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                {/* Colonna Sinistra: Foto visibile SOLO su desktop (hidden lg:block) */}
                <div className="hidden lg:block lg:col-span-5 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cat-orange to-amber-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
                    <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl">
                        <img
                            src={heroPhoto}
                            alt="Last Cats on Earth live performance"
                            className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                        </div>
                    </div>
                </div>

                {/* Colonna Destra (o tutto schermo su mobile): Press Kit & Bio */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="border-l-4 border-cat-orange pl-5 sm:pl-6 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cat-orange">
                            {t.subHeading}
                        </p>
                        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-white">
                            {t.bioHeading}
                        </h2>
                        <p className="text-sm sm:text-base font-bold uppercase tracking-wider text-white/70">
                            {t.tagline}
                        </p>
                    </div>

                    <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-white/85 pt-2">
                        <p className="border-t border-white/10 pt-3">{t.bio1}</p>
                        <p className="border-t border-white/10 pt-3">{t.bio2}</p>
                        <p className="border-t border-white/10 pt-3">{t.bio3}</p>
                        <p className="border-t border-white/10 pt-3 text-cat-orange font-bold">{t.bio4}</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default VideoMarquee;