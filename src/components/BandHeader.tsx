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

      <div className="bg-black -mb-6">

        {/* Band Name */}
        <h1 className="font-sceageus [-webkit-font-smoothing:antialiased] text-3xl -mt-10 md:text-4xl tracking-[-0.03em] leading-none text-white text-outline-black opacity-0 animate-fade-in-delay-1 lg:mt-10">
          LAST CATS ON EARTH
        </h1>

        {/* Subtitle */}
        <p className="-mt-0 text-sm text-cat-orange font-medium tracking-widest uppercase opacity-0 animate-fade-in-delay-2">
          EXPLORE OUR MUSIC & UPCOMING GIGS
        </p>
      </div>
    </header>
  );
};

export default BandHeader;