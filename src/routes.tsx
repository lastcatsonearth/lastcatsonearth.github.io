import { Outlet } from "react-router-dom";
import type { RouteRecord } from "vite-react-ssg";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { shows } from "@/content/shows";
import Index from "./pages/Index";
import Booking from "./pages/Booking";
import LinksPage from "./pages/LinksPage";
import MerchPage from "./pages/MerchPage";
import LandingPage from "./pages/LandingPage";
import { landingPath, type LandingKey } from "@/content/landingPages";
import ShowsPage from "./pages/ShowsPage";
import Impressum from "./pages/Impressum";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

// Every page exists twice: German at "/…" and English at "/en/…".
// The language is read from the URL in LanguageProvider.
// Old URLs (/events, /festivals, …) are 301-redirected in public/_redirects.

const Shell = () => (
    <LanguageProvider>
        <Outlet />
    </LanguageProvider>
);

const pages = (): RouteRecord[] => [
    { index: true, element: <Index /> },
    { path: "booking", element: <Booking /> },
    { path: "links", element: <LinksPage /> },
    { path: "merch", element: <MerchPage /> },
    // SEO landing pages (/munich-rock-band, /cover-band-munich, …) – content in content/landingPages.ts
    ...(Object.keys(landingPath) as LandingKey[]).map((key) => ({
        path: landingPath[key].slice(1),
        element: <LandingPage page={key} />,
    })),
    { path: "shows", element: <ShowsPage /> },
    {
        path: "shows/:slug",
        element: <ShowsPage />,
        getStaticPaths: () => shows.map((show) => `shows/${show.slug}`),
    },
    { path: "impressum", element: <Impressum /> },
    { path: "privacy", element: <PrivacyPolicy /> },
    { path: "*", element: <NotFound /> },
];

// "/404" is pre-rendered to dist/404.html, which Cloudflare Pages serves (with status 404) for unknown URLs.
const notFoundPage: RouteRecord = { path: "404", element: <NotFound /> };

export const routes: RouteRecord[] = [
    { path: "/", element: <Shell />, children: [...pages(), notFoundPage] },
    { path: "/en", element: <Shell />, children: pages() },
];
