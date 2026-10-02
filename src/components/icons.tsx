// Small duotone line icons, hand-drawn to match the Range panels and
// contact links. Stroke-only, currentColor, so they inherit each panel's
// text colour automatically — no extra hue enters the palette.

type IconProps = { className?: string };

export function BackendIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="15" width="18" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7" cy="6.5" r="0.9" fill="currentColor" />
      <circle cx="7" cy="17.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function InfrastructureIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 16a4 4 0 0 1-.6-7.96A5 5 0 0 1 15 7a3.5 3.5 0 0 1 3 6.9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M12 13v6m0 0-2-2m2 2 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InterfacesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="7" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function FormIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3 20 7.5v9L12 21 4 16.5v-9L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 12v9M12 12 4 7.5M12 12l8-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function EmailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.5" cy="8" r="1" fill="currentColor" />
      <path d="M7.5 11v6M12 17v-3.5c0-1.5 1-2.5 2.3-2.5S16.5 12 16.5 13.5V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="11" x2="12" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export const rangeIcons = {
  backend: BackendIcon,
  infrastructure: InfrastructureIcon,
  interfaces: InterfacesIcon,
  form: FormIcon,
} as const;
