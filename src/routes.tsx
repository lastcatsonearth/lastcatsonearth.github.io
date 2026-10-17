import { Outlet } from "react-router-dom";
import type { RouteRecord } from "vite-react-ssg";
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
import { Head } from "vite-react-ssg";


const queryClient = new QueryClient();

export const Redirect = ({ to }: { to: string }) => (
    <Head>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`https://lastcatsonearth.de${to}`} />
        <meta httpEquiv="refresh" content={`0; url=${to}`} />
    </Head>
);

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


const children = (): RouteRecord[] => [
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
    {
        path: "shows/:slug",
        element: <ShowsPage />,
        getStaticPaths: () => [
            "shows/zamanand-festival-munich-september-2026",
            "shows/woodstock-party-renazzo-july-2026",
            "shows/alte-utting-munich-june-2026",
        ],
    },
    { path: "events", element: <Redirect to="/party-band-munich" /> },
    { path: "party-and-event-band", element: <Redirect to="/party-band-munich" /> },
    { path: "festivals", element: <Redirect to="/munich-rock-band" /> },
    { path: "festival-and-venue-band", element: <Redirect to="/live-band-munich" /> },
];

export const routes: RouteRecord[] = [
    { path: "/", element: <Shell />, children: children() },
    { path: "/en", element: <Shell />, children: children() },
];
