// Google reviews of Last Cats on Earth (copied from our Google Maps profile – keep them word for word).
// For each review: `author` = name as shown on Google, `url` = the review's share link
// (Google Maps → our profile → Reviews → ⋮ next to the review → "Share review").
// Without a url, the card links to all our reviews.

const PLACE_ID = "ChIJuch8Y7rfnUcRKO_C8mmquak";

/** Opens Google's "write a review" dialog directly (official short link from our Google Business Profile). */
export const GOOGLE_REVIEW_URL = "https://g.page/r/CSjvwvJpqrmpEBM/review";
/** Shows all our reviews on Google. */
export const GOOGLE_REVIEWS_URL = `https://search.google.com/local/reviews?placeid=${PLACE_ID}`;

export const googleRating = { rating: "5,0", ratingEn: "5.0", count: 16, asOf: "2026-10" };

export type Review = { author: string; text: string; url?: string };

export const reviews: Review[] = [
    {
        author: "", // TODO: name from Google
        text: "I saw Last Cats on Earth live in Munich. It was one of the best nights ever; they are fantastic musicians, and the lead singer has incredible energy. I’ll be back to see you at the next concert—keep it up, guys!",
    },
    {
        author: "", // TODO: name from Google
        text: "If you enjoy watching live rock bands in Munich, these guys are the best. I have watched them perform multiple times already. They do covers and their original music, and it was always great.",
    },
    {
        author: "", // TODO: name from Google
        text: "An absolutely fantastic rock band bringing a fresh wave of energy to the music scene! Powerful sound, incredible passion, and a unique style that makes every song come alive.",
    },
];
