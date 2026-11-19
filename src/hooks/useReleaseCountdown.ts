import { useEffect, useState } from "react";

export type Countdown = { released: boolean; days: number; hours: number; minutes: number; seconds: number };

const compute = (target: number, now: number): Countdown => {
    const diff = Math.max(0, target - now);
    return {
        released: diff === 0,
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor(diff / 3_600_000) % 24,
        minutes: Math.floor(diff / 60_000) % 60,
        seconds: Math.floor(diff / 1000) % 60,
    };
};

/**
 * Live countdown to a release. The static HTML is rendered as "not released yet";
 * in the browser it ticks every second and flips to released at the exact moment,
 * so the page unlocks by itself without a new deploy.
 */
export const useReleaseCountdown = (releaseAt: string): Countdown & { ready: boolean } => {
    const target = new Date(releaseAt).getTime();
    const [now, setNow] = useState<number | null>(null);

    useEffect(() => {
        setNow(Date.now());
        if (Date.now() >= target) return;
        const id = window.setInterval(() => {
            const t = Date.now();
            setNow(t);
            if (t >= target) window.clearInterval(id);
        }, 1000);
        return () => window.clearInterval(id);
    }, [target]);

    if (now === null) return { ...compute(target, target - 1), released: false, ready: false };
    return { ...compute(target, now), ready: true };
};
