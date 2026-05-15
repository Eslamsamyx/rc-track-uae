import type { NavLink } from "./types";

export const primaryNav: NavLink[] = [
  {
    href: "/experiences",
    labelKey: "nav.experiences",
    children: [
      { href: "/experiences/trial", labelKey: "nav.expTrial" },
      { href: "/experiences/open-practice", labelKey: "nav.expOpenPractice" },
      { href: "/experiences/birthday-parties", labelKey: "nav.expBirthday" },
      { href: "/experiences/corporate-events", labelKey: "nav.expCorporate" },
      { href: "/experiences/schools", labelKey: "nav.expSchools" },
      { href: "/tourist", labelKey: "nav.expTourist" },
    ],
  },
  {
    href: "/tracks",
    labelKey: "nav.tracks",
    children: [
      { href: "/tracks/city", labelKey: "nav.tracksCity" },
      { href: "/tracks/village", labelKey: "nav.tracksVillage" },
    ],
  },
  { href: "/memberships", labelKey: "nav.memberships" },
  { href: "/academy", labelKey: "nav.academy" },
  { href: "/events", labelKey: "nav.events" },
  { href: "/shop", labelKey: "nav.shop" },
  { href: "/blog", labelKey: "nav.blog" },
];

export const footerExplore: NavLink[] = [
  { href: "/about", labelKey: "nav.about" },
  { href: "/tracks", labelKey: "nav.tracks" },
  { href: "/gallery", labelKey: "nav.gallery" },
  { href: "/blog", labelKey: "nav.blog" },
  { href: "/events", labelKey: "nav.events" },
];

export const footerExperiences: NavLink[] = [
  { href: "/experiences/trial", labelKey: "nav.expTrial" },
  { href: "/experiences/open-practice", labelKey: "nav.expOpenPractice" },
  { href: "/experiences/birthday-parties", labelKey: "nav.expBirthday" },
  { href: "/experiences/corporate-events", labelKey: "nav.expCorporate" },
  { href: "/experiences/schools", labelKey: "nav.expSchools" },
  { href: "/academy", labelKey: "nav.academy" },
];

export const footerSupport: NavLink[] = [
  { href: "/contact", labelKey: "nav.contact" },
  { href: "/faq", labelKey: "nav.faq" },
  { href: "/orders", labelKey: "nav.shop" },
  { href: "/careers", labelKey: "nav.careers" },
  { href: "/press", labelKey: "nav.press" },
];

export const footerLegal: NavLink[] = [
  { href: "/privacy", labelKey: "privacy.title" },
  { href: "/terms", labelKey: "terms.title" },
  { href: "/cookies", labelKey: "cookies.title" },
];
