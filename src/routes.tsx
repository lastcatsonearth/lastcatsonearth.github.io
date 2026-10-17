import { Outlet, Navigate, type RouteObject } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { LanguageProvider, type Lang } from "@/components/booking/LanguageContext";
import Index from "./pages/Index";
import Booking from "./pages/Booking";
import LinksPage from "./pages/LinksPage";
import MerchPage from "./pages/MerchPage";
import IntentPage from "./pages/IntentPage";
import ShowsPage from "./pages/ShowsPage";
import Impressum from "./pages/Impressum";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Shell = () => (
    <LanguageProvider>
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster /><Sonner />
                <Outlet />
            </TooltipProvider>
        </QueryClientProvider>
    </LanguageProvider>
);


const children = (): RouteObject[] => [
    { index: true, element: <Index /> },
    { path: "booking", element: <Booking /> },
    { path: "links", element: <LinksPage /> },
    { path: "merch", element: <MerchPage /> },
    { path: "munich-rock-band", element: <IntentPage intent="munich" /> },
    { path: "live-band-munich", element: <IntentPage intent="live" /> },
    { path: "party-band-munich", element: <IntentPage intent="party" /> },
    { path: "shows", element: <ShowsPage /> },
    { path: "impressum", element: <Impressum /> },
    { path: "privacy", element: <PrivacyPolicy /> },
    { path: "*", element: <NotFound /> },
];

export const routes: RouteObject[] = [
    { path: "/", element: <Shell />, children: children() },
    { path: "/en", element: <Shell />, children: children() },
];
