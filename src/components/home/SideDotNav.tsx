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
    const isLastSection = activeSectionIndex === sectionsConfig.length - 1;

    return (
        <nav
            className="hidden sm:flex fixed right-6 top-1/2 z-30 -translate-y-1/2 flex-col gap-3"
            aria-label="Section navigation"
        >
            {sectionsConfig.map((sec, index) => (
                <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    aria-label={`Scroll to ${sec.label}`}
                    className={`h-3 rounded-full transition-all duration-300 ${activeSectionIndex === index
                        ? isLastSection
                            ? "w-8 bg-black"
                            : "w-8 bg-cat-orange"
                        : isLastSection
                            ? "w-3 bg-black/40 hover:bg-black/80"
                            : "w-3 bg-white/40 hover:bg-white/80"
                        }`}
                />
            ))}
        </nav>
    );
};