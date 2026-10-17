import { Link } from "react-router-dom";
import bandLogo from "@/assets/only_cat.webp";
import { useLanguage, useLocalePath } from "@/i18n/LanguageContext";


interface BandHeaderProps {
  linkToHome?: boolean;
}

const BandHeader = ({ linkToHome = false }: BandHeaderProps) => {
  const p = useLocalePath();
  const wrapper = (children: React.ReactNode) =>
    linkToHome ? (
      <Link to={p("/")} className="cursor-pointer">
        {children}
      </Link>
    ) : (
      <>{children}</>
    );

  return (
    <header className="flex flex-col items-center text-center mb-10 mt-10 phone-landscape:my-4">
      {/* Band Logo */}
      {wrapper(
        <div className="relative z-10 -mb-20 -mt-20 phone-landscape:my-0 opacity-0 animate-fade-in">
          <div className="relative z-100 w-[280px] h-[430px] md:w-[300px] md:h-[260px] lg:h-[380px] overflow-hidden -mt-20 -mb-20 md:-mt-10 md:-mb-12 phone-landscape:my-0 phone-landscape:h-[160px] phone-landscape:w-[200px]">
            <img
              src={bandLogo}
              alt="LCoE Band Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

    </header>
  );
};

export default BandHeader;