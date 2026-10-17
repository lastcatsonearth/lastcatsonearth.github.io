import { useEffect, useRef, useState } from "react";

/** Becomes true once the element scrolls into view (then stops observing). */
export const useInView = <T extends Element>(threshold = 0.15) => {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                observer.disconnect();
            }
        }, { threshold });
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, inView };
};
