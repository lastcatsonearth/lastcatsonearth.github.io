import { useEffect } from "react";

import BandHeader from "@/components/BandHeader";
import LinksSection from "@/components/LinksSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <main className="relative max-w-md mx-auto px-6 py-12">
        <BandHeader />
        <LinksSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;