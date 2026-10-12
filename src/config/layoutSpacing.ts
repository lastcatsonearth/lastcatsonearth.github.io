/**
 * Layout-only spacing controls.
 *
 * Change these Tailwind classes when adjusting page spacing. The responsive
 * classes after `sm:` apply from the desktop breakpoint upward.
 */
export const homeSpacing = {
  hero: "min-h-[88vh] px-5 pb-12 pt-24 sm:px-10 sm:pb-16",
  heroBrand: "inset-x-5 top-20 sm:inset-x-10 sm:top-16",
  heroKicker: "mb-4 sm:mb-0",
  heroButton: "mt-8",
  shortSection: "px-5 py-16 sm:px-10 sm:py-24",
  shortGrid: "gap-10",
  liveSection: "px-5 py-16 sm:px-10 sm:py-24",
  liveHeader: "mb-10 gap-4",
  musicSection: "px-5 py-16 sm:px-10 sm:py-24",
  musicGrid: "gap-10",
  finalCta: "px-5 py-20 sm:px-10 sm:py-28",
  finalCtaGrid: "gap-8",
  footer: "px-5 py-10 sm:px-10",
} as const;

export const bookingSpacing = {
  page: "px-2 py-6 sm:px-6 sm:py-10",
  card: "p-3 pb-1 sm:p-8 sm:pb-3",
  languageToggle: "-mb-6 px-2 sm:px-6",
  backLink: "mb-8 px-2",
  content: "mt-10",
  footer: "pt-12 pb-0",
  form: "pt-8",
  formHeading: "mb-3",
  formIntro: "mb-5",
  formFields: "space-y-3",
  formButton: "mt-0",
} as const;

export const intentSpacing = {
  page: "px-2 py-6 sm:px-6 sm:py-10",
  main: "p-3 sm:p-6",
  article: "px-2 pb-10",
  munichHero: "min-h-[72vh] px-6 pb-10 pt-28 sm:min-h-[78vh] sm:px-12 sm:pb-14",
  standardHero: "pb-10",
  heroTitle: "mt-4",
  heroIntro: "mt-5",
  heroBooking: "mt-7",
  contentSection: "py-10",
  lineupSection: "py-12",
  lineupList: "mt-10 space-y-12 sm:space-y-16",
  memberRow: "gap-7 pb-10 sm:gap-12",
  memberName: "mt-2",
  memberBio: "mt-3",
  sectionGrid: "gap-8",
  sectionHeading: "mt-3",
  sectionBody: "mt-4",
  sectionLink: "mt-6",
  pointsList: "mt-6 space-y-4",
  heroBrand: "left-6 top-20 sm:left-12 sm:top-24",
  languageToggle: "left-6 top-6 sm:left-12 sm:top-10",
} as const;
