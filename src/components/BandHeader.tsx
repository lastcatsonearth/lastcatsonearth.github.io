import { Link } from "react-router-dom";
import bandLogo from "@/assets/only_cat.png";

interface BandHeaderProps {
  linkToHome?: boolean;
}

const BandHeader = ({ linkToHome = false }: BandHeaderProps) => {
  const wrapper = (children: React.ReactNode) =>
    linkToHome ? (
      <Link to="/" className="cursor-pointer">
        {children}
      </Link>
    ) : (
      <>{children}</>
    );

  return (
    <header className="flex flex-col items-center text-center mb-10">
      {/* Band Logo */}
      {wrapper(
        <div className="relative z-10 -mb-20 -mt-20 opacity-0 animate-fade-in">
          <div className="relative z-100 w-[280px] h-[430px] md:w-[300px] md:h-[260px] lg:h-[380px] overflow-hidden -mt-20 -mb-20 md:-mt-10 md:-mb-12">
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