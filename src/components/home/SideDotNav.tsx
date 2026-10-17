import { useEffect, useState } from "react";

interface SectionConfig {
    id: string;
    label: string;
}

interface SideDotNavProps {
    sectionsConfig: SectionConfig[];
    activeSectionIndex: number;
    scrollToSection: (id: string) => void;
}

export const SideDotNav = ({
    sectionsConfig,
    activeSectionIndex,
    scrollToSection,
}: SideDotNavProps) => {
    const [selectedIndex, setSelectedIndex] = useState(activeSectionIndex);

    useEffect(() => {
        setSelectedIndex(activeSectionIndex);
    }, [activeSectionIndex]);

    const handleDotClick = (index: number, id: string) => {
        setSelectedIndex(index);
        scrollToSection(id);
    };

    const isLastSection = selectedIndex === sectionsConfig.length - 1;

    return (
        <nav
            className="hidden sm:flex phone-landscape:hidden fixed right-6 top-1/2 z-30 -translate-y-1/2 flex-col gap-3"
            aria-label="Section navigation"
        >
            {sectionsConfig.map((sec, index) => {
                const isActive = selectedIndex === index;

                return (
                    <button
                        key={sec.id}
                        type="button"
                        onClick={() => handleDotClick(index, sec.id)}
                        aria-label={`Scroll to ${sec.label}`}
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${isActive
                            ? isLastSection
                                ? "bg-black scale-125 shadow-sm"
                                : "bg-cat-orange scale-125 shadow-[0_0_10px_rgba(211,67,3,0.6)]"
                            : isLastSection
                                ? "bg-black/30 hover:bg-black/70 hover:scale-110"
                                : "bg-white/30 hover:bg-white/70 hover:scale-110"
                            }`}
                    />
                );
            })}
        </nav>
    );
};