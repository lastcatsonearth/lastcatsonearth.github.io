import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { homeSpacing } from "@/config/layoutSpacing";

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
    membersRow1,
    membersRow2,
    Reveal,
}: ShortBioSectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [balls, setBalls] = useState<BallPhysics[]>([]);
    const [isLandscapePhone, setIsLandscapePhone] = useState(false);
    const activeDragId = useRef<string | null>(null);
    const touchOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    // Detect orientation changes specifically for mobile landscape
    useEffect(() => {
        const checkOrientation = () => {
            const isLandscape = window.innerWidth > window.innerHeight && window.innerHeight < 550;
            setIsLandscapePhone(isLandscape);
        };
        checkOrientation();
        window.addEventListener("resize", checkOrientation);
        window.addEventListener("orientationchange", checkOrientation);
        return () => {
            window.removeEventListener("resize", checkOrientation);
            window.removeEventListener("orientationchange", checkOrientation);
        };
    }, []);

    // Initialize ball positions based strictly on current mode
    useEffect(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width || window.innerWidth;
        const height = rect.height || window.innerHeight;

        // Smaller radius ONLY in landscape mobile mode to fit everything safely
        const radius = isLandscapePhone ? 32 : 48;

        const initialBalls: BallPhysics[] = [];

        if (isLandscapePhone) {
            // Compact landscape distribution for rotated phone
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
            // 100% ORIGINAL PORTRAIT MOBILE POSITIONS
            membersRow1.forEach(([name, role, photo], index) => {
                const step = width / (membersRow1.length + 1);
                initialBalls.push({
                    id: name,
                    name,
                    role,
                    photo,
                    x: step * (index + 1),
                    y: 80,
                    vx: 0,
                    vy: 0,
                    radius,
                    row: 1,
                });
            });

            membersRow2.forEach(([name, role, photo], index) => {
                const step = width / (membersRow2.length + 1);
                initialBalls.push({
                    id: name,
                    name,
                    role,
                    photo,
                    x: step * (index + 1),
                    y: 225,
                    vx: 0,
                    vy: 0,
                    radius,
                    row: 2,
                });
            });
        }

        setBalls(initialBalls);
    }, [membersRow1, membersRow2, isLandscapePhone]);

    // Physics animation loop
    useEffect(() => {
        let animationFrameId: number;

        const updatePhysics = () => {
            setBalls((prevBalls) => {
                if (!containerRef.current) return prevBalls;
                const rect = containerRef.current.getBoundingClientRect();
                const width = rect.width;
                const height = rect.height;

                const next = prevBalls.map((b) => ({ ...b }));

                for (let i = 0; i < next.length; i++) {
                    for (let j = i + 1; j < next.length; j++) {
                        const b1 = next[i];
                        const b2 = next[j];

                        const dx = b2.x - b1.x;
                        const dy = b2.y - b1.y;
                        const dist = Math.hypot(dx, dy);
                        const minDist = b1.radius + b2.radius + 12;

                        if (dist < minDist && dist > 0) {
                            const overlap = minDist - dist;
                            const nx = dx / dist;
                            const ny = dy / dist;

                            if (activeDragId.current === b1.id) {
                                b2.x += nx * overlap;
                                b2.y += ny * overlap;
                                b2.vx += nx * 1.0;
                                b2.vy += ny * 1.0;
                            } else if (activeDragId.current === b2.id) {
                                b1.x -= nx * overlap;
                                b1.y -= ny * overlap;
                                b1.vx -= nx * 1.0;
                                b1.vy -= ny * 1.0;
                            } else {
                                const force = overlap * 0.08;
                                b1.x -= nx * force;
                                b1.y -= ny * force;
                                b2.x += nx * force;
                                b2.y += ny * force;
                            }
                        }
                    }
                }

                return next.map((ball) => {
                    const textBottomOffset = isLandscapePhone ? 20 : 34;
                    const sidePadding = 4;
                    const topPadding = isLandscapePhone ? 8 : 16;

                    const minX = ball.radius + sidePadding;
                    const maxX = width - ball.radius - sidePadding;
                    const minY = ball.radius + topPadding;
                    const maxY = height - ball.radius - textBottomOffset;

                    if (ball.id === activeDragId.current) {
                        ball.x = Math.max(minX, Math.min(maxX, ball.x));
                        ball.y = Math.max(minY, Math.min(maxY, ball.y));
                        return ball;
                    }

                    ball.vx *= 0.80;
                    ball.vy *= 0.80;
                    ball.x += ball.vx + Math.sin(Date.now() * 0.001 + ball.radius) * 0.05;
                    ball.y += ball.vy + Math.cos(Date.now() * 0.001 + ball.radius) * 0.05;

                    if (ball.x <= minX) { ball.x = minX; ball.vx = 0; }
                    if (ball.x >= maxX) { ball.x = maxX; ball.vx = 0; }
                    if (ball.y <= minY) { ball.y = minY; ball.vy = 0; }
                    if (ball.y >= maxY) { ball.y = maxY; ball.vy = 0; }

                    return ball;
                });
            });

            animationFrameId = requestAnimationFrame(updatePhysics);
        };

        animationFrameId = requestAnimationFrame(updatePhysics);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isLandscapePhone]);

    const handleTouchStart = (id: string, clientX: number, clientY: number) => {
        activeDragId.current = id;
        const ball = balls.find((b) => b.id === id);
        if (ball && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            touchOffset.current = {
                x: clientX - rect.left - ball.x,
                y: clientY - rect.top - ball.y,
            };
        }
    };

    const handleTouchMove = (clientX: number, clientY: number) => {
        if (!activeDragId.current || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const rawX = clientX - rect.left - touchOffset.current.x;
        const rawY = clientY - rect.top - touchOffset.current.y;

        const textBottomOffset = isLandscapePhone ? 20 : 34;
        const radius = isLandscapePhone ? 32 : 48;
        const sidePadding = 4;
        const topPadding = isLandscapePhone ? 8 : 16;

        const x = Math.max(radius + sidePadding, Math.min(rect.width - radius - sidePadding, rawX));
        const y = Math.max(radius + topPadding, Math.min(rect.height - radius - textBottomOffset, rawY));

        setBalls((prev) =>
            prev.map((b) => (b.id === activeDragId.current ? { ...b, x, y, vx: 0, vy: 0 } : b))
        );
    };

    const handleTouchEnd = () => {
        activeDragId.current = null;
    };

    return (
        <section
            id="short-bio"
            className={`relative flex h-[calc(100dvh-4rem)] snap-start snap-always flex-col justify-start border-y border-white/10 bg-black/40 px-4 pt-6 pb-2 sm:justify-center sm:px-6 sm:pt-0 sm:pb-8 overflow-hidden ${homeSpacing.shortSection}`}
        >
            {/* Top Header & Bio Block: side-by-side ONLY on rotated landscape mobile */}
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
                        to="/munich-rock-band"
                        className={`inline-flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-cat-orange hover:text-white ${isLandscapePhone ? "mt-1 text-[10px]" : "mt-2 sm:mt-4 text-[11px] sm:text-xs"
                            }`}
                    >
                        Meet the Cats <ArrowUpRight className={isLandscapePhone ? "h-3 w-3" : "h-4 w-4"} />
                    </Link>
                </Reveal>
            </div>

            {/* --- MOBILE / LANDSCAPE PHYSICS PLAYGROUND --- */}
            <div
                ref={containerRef}
                className={`relative mx-auto w-full max-w-md touch-none overflow-hidden sm:hidden ${isLandscapePhone ? "mt-1 h-40" : "mt-2 h-80"
                    }`}
                onTouchMove={(e) => handleTouchMove(e.touches[0].clientX, e.touches[0].clientY)}
                onTouchEnd={handleTouchEnd}
                onMouseMove={(e) => handleTouchMove(e.clientX, e.clientY)}
                onMouseUp={handleTouchEnd}
            >
                {balls.map((ball) => {
                    const ballSize = isLandscapePhone ? "64px" : "96px";
                    const photoSize = isLandscapePhone ? "h-[64px] w-[64px]" : "h-[96px] w-[96px]";

                    return (
                        <div
                            key={ball.id}
                            className="absolute flex flex-col items-center text-center cursor-grab active:cursor-grabbing select-none"
                            style={{
                                left: `${ball.x}px`,
                                top: `${ball.y}px`,
                                transform: "translate(-50%, -50%)",
                                width: ballSize,
                            }}
                            onTouchStart={(e) =>
                                handleTouchStart(ball.id, e.touches[0].clientX, e.touches[0].clientY)
                            }
                            onMouseDown={(e) => handleTouchStart(ball.id, e.clientX, e.clientY)}
                        >
                            <div className="relative select-none">
                                <img
                                    src={ball.photo}
                                    alt={`${ball.name}, ${ball.role}`}
                                    draggable={false}
                                    style={{ transform: "none" }}
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
                                to="/munich-rock-band"
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
                                to="/munich-rock-band"
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