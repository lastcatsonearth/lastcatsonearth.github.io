import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { homeSpacing } from "@/config/layoutSpacing";
import { useLanguage, useLocalePath } from "@/i18n/LanguageContext";
import Reveal from "@/components/Reveal";
import { members } from "@/content/members";
import { useIsLandscapePhone } from "@/hooks/useIsLandscapePhone";

interface ShortBioSectionProps {
    copy: {
        shortLabel: string;
        short: string;
        shortBody: string;
    };
}

interface BallPhysics {
    id: string;
    name: string;
    role: string;
    photo: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    row: number;
}

export const ShortBioSection = ({
    copy,
}: ShortBioSectionProps) => {
    const p = useLocalePath();
    const { lang } = useLanguage();
    const isLandscapePhone = useIsLandscapePhone();
    // [name, role, photo] – first two on the top row, rest on the bottom row
    const rows = useMemo(() => {
        const all = members.map((m) => [m.name, m.role[lang], m.photo] as [string, string, string]);
        return [all.slice(0, 2), all.slice(2)];
    }, [lang]);
    const [membersRow1, membersRow2] = rows;

    const [balls, setBalls] = useState<BallPhysics[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);


    // Initialize ball positions with wider horizontal padding for bottom row
    useEffect(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width || window.innerWidth;
        const height = rect.height || window.innerHeight;

        const radius = isLandscapePhone ? 32 : 48;
        const initialBalls: BallPhysics[] = [];

        if (isLandscapePhone) {
            const allMembers = [...membersRow1, ...membersRow2];
            allMembers.forEach(([name, role, photo], index) => {
                const col = Math.floor(index / 3);
                const rowInCol = index % 3;
                const stepX = width / 2;
                const stepY = height / 3;
                initialBalls.push({
                    id: name,
                    name,
                    role,
                    photo,
                    x: stepX * col + stepX / 2,
                    y: stepY * rowInCol + stepY / 2,
                    vx: 0,
                    vy: 0,
                    radius,
                    row: col + 1,
                });
            });
        } else {
            // Row 1: normal distribution
            membersRow1.forEach(([name, role, photo], index) => {
                const step = width / (membersRow1.length + 1);
                initialBalls.push({
                    id: name,
                    name,
                    role,
                    photo,
                    x: step * (index + 1),
                    y: 75,
                    vx: 0,
                    vy: 0,
                    radius,
                    row: 1,
                });
            });

            // Row 2: narrower inner margin (multiplying step range) to space them out horizontally
            membersRow2.forEach(([name, role, photo], index) => {
                const horizontalPadding = 50; // pushes outer balls closer to edges
                const availableWidth = width - horizontalPadding * 2;
                const step = availableWidth / (membersRow2.length - 1);
                initialBalls.push({
                    id: name,
                    name,
                    role,
                    photo,
                    x: horizontalPadding + step * index,
                    y: 240,
                    vx: 0,
                    vy: 0,
                    radius,
                    row: 2,
                });
            });
        }

        setBalls(initialBalls);
    }, [membersRow1, membersRow2, isLandscapePhone]);

    return (
        <section
            id="short-bio"
            className={`relative flex h-[calc(100dvh-4rem)] phone-landscape:h-dvh snap-start snap-always flex-col justify-start border-y border-white/10 bg-black/40 px-4 pt-6 pb-2 sm:justify-center sm:px-6 sm:pt-0 sm:pb-8 overflow-hidden ${homeSpacing.shortSection}`}
        >
            {/* Top Header & Bio Block */}
            <div
                className={`mx-auto w-full max-w-6xl space-y-2 sm:space-y-0 ${isLandscapePhone ? "grid grid-cols-2 gap-4 items-center" : ""
                    } lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:items-start ${homeSpacing.shortGrid}`}
            >
                <Reveal>
                    <p className={`font-bold uppercase tracking-[0.3em] text-cat-orange ${isLandscapePhone ? "text-[10px]" : "text-xs"}`}>
                        {copy.shortLabel}
                    </p>
                    <h2
                        className={`font-bold uppercase leading-[0.95] ${isLandscapePhone ? "mt-0.5 text-2xl" : "mt-1 text-3xl sm:mt-2 sm:text-6xl"
                            }`}
                        dangerouslySetInnerHTML={{ __html: copy.short }}
                    />
                </Reveal>
                <Reveal>
                    <p className={`text-justify text-white/80 max-w-2xl ${isLandscapePhone ? "text-xs leading-4 line-clamp-3" : "text-sm leading-5 sm:text-xl sm:leading-8"
                        }`}>
                        {copy.shortBody}
                    </p>
                    <Link
                        to={p("/munich-rock-band")}
                        className={`inline-flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-cat-orange hover:text-white ${isLandscapePhone ? "mt-1 text-[10px]" : "mt-2 sm:mt-4 text-[11px] sm:text-xs"
                            }`}
                    >
                        Meet the Cats <ArrowUpRight className={isLandscapePhone ? "h-3 w-3" : "h-4 w-4"} />
                    </Link>
                </Reveal>
            </div>

            {/* --- MOBILE / LANDSCAPE PLAYGROUND (STATIC) --- */}
            <div
                ref={containerRef}
                className={`relative mx-auto w-full max-w-md pointer-events-none select-none overflow-hidden sm:hidden ${isLandscapePhone ? "mt-1 h-40" : "mt-2 h-80"
                    }`}
            >
                {balls.map((ball) => {
                    const ballSize = isLandscapePhone ? "64px" : "96px";
                    const photoSize = isLandscapePhone ? "h-[64px] w-[64px]" : "h-[96px] w-[96px]";

                    return (
                        <div
                            key={ball.id}
                            className="absolute flex flex-col items-center text-center select-none"
                            style={{
                                left: `${ball.x}px`,
                                top: `${ball.y}px`,
                                transform: "translate(-50%, -50%)",
                                width: ballSize,
                            }}
                        >
                            <div className="relative select-none">
                                <img
                                    src={ball.photo}
                                    alt={`${ball.name}, ${ball.role}`}
                                    draggable={false}
                                    className={`aspect-square ${photoSize} shrink-0 rounded-full border-2 border-cat-orange/80 object-cover shadow-lg shadow-cat-orange/20`}
                                />
                            </div>
                            <h3 className={`font-bold uppercase tracking-wide text-white ${isLandscapePhone ? "mt-0.5 text-[9px]" : "mt-0.5 text-[10px]"}`}>
                                {ball.name}
                            </h3>
                            <p className={`font-bold uppercase tracking-[0.15em] text-cat-orange ${isLandscapePhone ? "text-[7px]" : "text-[7.5px]"}`}>
                                {ball.role}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* --- DESKTOP ONLY: Standard Grid Layout --- */}
            <div className="mx-auto mt-10 hidden w-full max-w-6xl sm:block">
                <div className="flex flex-row justify-between gap-6">
                    <div className="flex w-2/5 justify-around gap-8">
                        {membersRow1.map(([name, role, photo]) => (
                            <Link
                                to={p("/munich-rock-band")}
                                key={name}
                                className="group flex flex-col items-center text-center"
                            >
                                <img
                                    src={photo}
                                    alt={`${name}, ${role}`}
                                    className="aspect-square w-32 rounded-full border border-cat-orange/50 object-cover transition duration-300 group-hover:scale-105 group-hover:border-cat-orange lg:w-36"
                                />
                                <h3 className="mt-1 text-base font-bold uppercase tracking-wide text-white">
                                    {name}
                                </h3>
                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-cat-orange">
                                    {role}
                                </p>
                            </Link>
                        ))}
                    </div>

                    <div className="flex w-3/5 justify-around gap-5">
                        {membersRow2.map(([name, role, photo]) => (
                            <Link
                                to={p("/munich-rock-band")}
                                key={name}
                                className="group flex flex-col items-center text-center"
                            >
                                <img
                                    src={photo}
                                    alt={`${name}, ${role}`}
                                    className="aspect-square w-32 rounded-full border border-cat-orange/50 object-cover transition duration-300 group-hover:scale-105 group-hover:border-cat-orange lg:w-36"
                                />
                                <h3 className="mt-1 text-base font-bold uppercase tracking-wide text-white">
                                    {name}
                                </h3>
                                <p className="text-xs font-bold uppercase tracking-[0.15em] text-cat-orange">
                                    {role}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};