import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { homeSpacing } from "@/config/layoutSpacing";

interface Member {
    name: string;
    role: string;
    photo: string;
}

interface ShortBioSectionProps {
    copy: {
        shortLabel: string;
        short: string;
        shortBody: string;
    };
    membersRow1: [string, string, string][];
    membersRow2: [string, string, string][];
    Reveal: React.ComponentType<{ children: React.ReactNode }>;
}

export const ShortBioSection = ({ copy, membersRow1, membersRow2, Reveal }: ShortBioSectionProps) => {
    return (
        <section id="short-bio" className={`flex h-screen snap-start snap-always flex-col justify-center border-y border-white/10 bg-black/40 px-4 pt-16 pb-6 sm:px-6 sm:py-12 ${homeSpacing.shortSection}`}>
            <div className={`mx-auto grid w-full max-w-6xl lg:grid-cols-[0.8fr_1.2fr] lg:items-end ${homeSpacing.shortGrid}`}>
                <Reveal>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-cat-orange">{copy.shortLabel}</p>
                    <h2 className="mt-1 text-3xl font-bold uppercase leading-none sm:mt-2 sm:text-6xl" dangerouslySetInnerHTML={{ __html: copy.short }} />
                </Reveal>
                <Reveal>
                    <p className="max-w-2xl text-justify text-sm leading-6 text-white/70 sm:text-xl sm:leading-8">
                        {copy.shortBody}
                    </p>
                    <Link to="/munich-rock-band" className="mt-2 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cat-orange hover:text-white sm:mt-4">
                        Meet the Cats <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Reveal>
            </div>

            <div className="mx-auto mt-6 w-full max-w-6xl sm:mt-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:gap-6">
                    <div className="flex justify-center gap-8 sm:w-2/5 sm:justify-around">
                        {membersRow1.map(([name, role, photo]) => (
                            <Link to="/munich-rock-band" key={name} className="group flex flex-col items-center text-center">
                                <img src={photo} alt={`${name}, ${role}`} className="aspect-square w-20 rounded-full border border-cat-orange/50 object-cover transition duration-300 group-hover:scale-105 group-hover:border-cat-orange sm:w-32 lg:w-36" />
                                <h3 className="mt-2 text-xs font-bold uppercase tracking-wide text-white sm:text-base">{name}</h3>
                                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-cat-orange sm:text-xs">{role}</p>
                            </Link>
                        ))}
                    </div>

                    <div className="flex justify-center gap-6 sm:w-3/5 sm:justify-around">
                        {membersRow2.map(([name, role, photo]) => (
                            <Link to="/munich-rock-band" key={name} className="group flex flex-col items-center text-center">
                                <img src={photo} alt={`${name}, ${role}`} className="aspect-square w-20 rounded-full border border-cat-orange/50 object-cover transition duration-300 group-hover:scale-105 group-hover:border-cat-orange sm:w-32 lg:w-36" />
                                <h3 className="mt-2 text-xs font-bold uppercase tracking-wide text-white sm:text-base">{name}</h3>
                                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-cat-orange sm:text-xs">{role}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};