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
        <div className="relative -mb-20 -mt-20 opacity-0 animate-fade-in">
          <div className="w-[300px] h-[500px] md:w-[420px] md:h-[320px] lg:h-[500px] overflow-hidden -mt-20 md:-mt-10 lg:-mb-12">
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