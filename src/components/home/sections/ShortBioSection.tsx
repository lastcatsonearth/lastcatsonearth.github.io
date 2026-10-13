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
    const activeDragId = useRef<string | null>(null);
    const touchOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    // Initialize ball positions
    useEffect(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width || window.innerWidth;

        // Member Ball radius = 48px (diameter 96px)
        const radius = 48;

        const initialBalls: BallPhysics[] = [];

        // Top Row: Tony & Alessandro
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

        // Bottom Row: Chris, Tim, Tom
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

        setBalls(initialBalls);
    }, [membersRow1, membersRow2]);

    // Physics animation loop (Collision & Boundary Locking)
    useEffect(() => {
        let animationFrameId: number;

        const updatePhysics = () => {
            setBalls((prevBalls) => {
                if (!containerRef.current) return prevBalls;
                const rect = containerRef.current.getBoundingClientRect();
                const width = rect.width;
                const height = rect.height;

                const next = prevBalls.map((b) => ({ ...b }));

                // 1. Resolve ball-to-ball collisions & push dynamics
                for (let i = 0; i < next.length; i++) {
                    for (let j = i + 1; j < next.length; j++) {
                        const b1 = next[i];
                        const b2 = next[j];

                        const dx = b2.x - b1.x;
                        const dy = b2.y - b1.y;
                        const dist = Math.hypot(dx, dy);
                        const minDist = b1.radius + b2.radius + 12; // Separation padding

                        if (dist < minDist && dist > 0) {
                            const overlap = minDist - dist;
                            const nx = dx / dist;
                            const ny = dy / dist;

                            // Push non-dragged balls away smoothly
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
                                // Gentle bounce collision
                                const force = overlap * 0.08;
                                b1.x -= nx * force;
                                b1.y -= ny * force;
                                b2.x += nx * force;
                                b2.y += ny * force;
                            }
                        }
                    }
                }

                // 2. Strict Boundary Enforcement & Minimal Idle Motion
                return next.map((ball) => {
                    const textBottomOffset = 34;
                    const sidePadding = 4;
                    const topPadding = 16;

                    const minX = ball.radius + sidePadding;
                    const maxX = width - ball.radius - sidePadding;
                    const minY = ball.radius + topPadding;
                    const maxY = height - ball.radius - textBottomOffset;

                    if (ball.id === activeDragId.current) {
                        ball.x = Math.max(minX, Math.min(maxX, ball.x));
                        ball.y = Math.max(minY, Math.min(maxY, ball.y));
                        return ball;
                    }

                    // Damping and subtle floating
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
    }, []);

    // Touch & Mouse Handlers
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

        const textBottomOffset = 34;
        const radius = 48;
        const sidePadding = 4;
        const topPadding = 16;

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
            className={`relative flex h-[calc(100dvh-4rem)] snap-start snap-always flex-col justify-start border-y border-white/10 bg-black/40 px-4 pt-6 pb-2 sm:justify-center sm:px-6 sm:pt-0 sm:pb-8 ${homeSpacing.shortSection}`}
        >
            {/* Top Header & Bio Block */}
            <div
                className={`mx-auto w-full max-w-6xl space-y-2 sm:space-y-0 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:items-start ${homeSpacing.shortGrid}`}
            >
                <Reveal>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-cat-orange">
                        {copy.shortLabel}
                    </p>
                    <h2
                        className="mt-1 text-3xl font-bold uppercase leading-[0.95] sm:mt-2 sm:text-6xl"
                        dangerouslySetInnerHTML={{ __html: copy.short }}
                    />
                </Reveal>
                <Reveal>
                    <p className="max-w-2xl text-justify text-sm leading-5 text-white/80 sm:text-xl sm:leading-8">
                        {copy.shortBody}
                    </p>
                    <Link
                        to="/munich-rock-band"
                        className="mt-2 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-cat-orange hover:text-white sm:mt-4 sm:text-xs"
                    >
                        Meet the Cats <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Reveal>
            </div>

            {/* --- MOBILE ONLY: Seamless Borderless Physics Playground --- */}
            <div
                ref={containerRef}
                className="relative mx-auto mt-2 h-80 w-full max-w-md touch-none overflow-hidden sm:hidden"
                onTouchMove={(e) => handleTouchMove(e.touches[0].clientX, e.touches[0].clientY)}
                onTouchEnd={handleTouchEnd}
                onMouseMove={(e) => handleTouchMove(e.clientX, e.clientY)}
                onMouseUp={handleTouchEnd}
            >
                {balls.map((ball) => (
                    <div
                        key={ball.id}
                        className="absolute flex flex-col items-center text-center cursor-grab active:cursor-grabbing select-none"
                        style={{
                            left: `${ball.x}px`,
                            top: `${ball.y}px`,
                            transform: "translate(-50%, -50%)",
                            width: "96px",
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
                                className="aspect-square h-[96px] w-[96px] shrink-0 rounded-full border-2 border-cat-orange/80 object-cover shadow-lg shadow-cat-orange/20"
                            />
                        </div>
                        <h3 className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                            {ball.name}
                        </h3>
                        <p className="text-[7.5px] font-bold uppercase tracking-[0.15em] text-cat-orange">
                            {ball.role}
                        </p>
                    </div>
                ))}
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