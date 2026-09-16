// index.tsx

import BandHeader from "@/components/BandHeader";
import LinksSection from "@/components/LinksSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <main className="relative max-w-md mx-auto px-0 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-3">
          <BandHeader />

          <LinksSection />
          <div className="-mt-2">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;