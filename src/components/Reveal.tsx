import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

/** Fades + slides its children in the first time they scroll into view. */
const Reveal = ({ children }: { children: ReactNode }) => {
    const { ref, inView } = useInView<HTMLDivElement>(0.12);
    return <div ref={ref} className={`home-reveal ${inView ? "home-reveal-visible" : ""}`}>{children}</div>;
};

export default Reveal;
