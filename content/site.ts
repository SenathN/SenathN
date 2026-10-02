// Edit content/profile.json — this file only adds types and page-level wiring.
import profile from "./profile.json";

export type IconName =
  | "server" | "cloud" | "window" | "cube" | "pin" | "people" | "stack"
  | "mail" | "linkedin" | "github" | "arrow" | "phone" | "globe";

export type Profile = typeof profile;

export const site = {
  ...profile,
  nav: [
    { label: "Home", href: "#main" },
    { label: "Range", href: "#range" },
    { label: "Work", href: "#work" },
    { label: "Craft", href: "#craft" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
