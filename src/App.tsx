import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import MerchPage from "./pages/MerchPage";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";
import Impressum from "./pages/Impressum";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import IntentPage from "./pages/IntentPage";
import MusicPage from "./pages/MusicPage";
import ShowsPage from "./pages/ShowsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/merch" element={<MerchPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/munich-rock-band" element={<IntentPage intent="munich" />} />
          <Route path="/live-band-munich" element={<IntentPage intent="live" />} />
          <Route path="/party-band-munich" element={<IntentPage intent="party" />} />
          <Route path="/events" element={<IntentPage intent="events" />} />
          <Route path="/festivals" element={<IntentPage intent="festivals" />} />
          <Route path="/festival-and-venue-band" element={<IntentPage intent="festival" />} />
          <Route path="/party-and-event-band" element={<IntentPage intent="party" />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/shows" element={<ShowsPage />} />
          <Route path="/shows/:slug" element={<ShowsPage />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;