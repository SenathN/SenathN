import { ActiveNav } from "./Interactive";
import { site } from "../../content/site";

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 nav-glass">
      <nav aria-label="Primary" className="container-px max-content flex items-center justify-between h-16">
        <a href="#main" className="font-condensed font-bold text-lg tracking-wide uppercase">
          {site.firstName}
          <span className="text-[var(--dim)]"> {site.lastName}</span>
        </a>
        <ActiveNav items={site.nav} />
        <a href={`mailto:${site.contact.email}`} className="md:hidden mono text-xs link-underline">
          Contact
        </a>
      </nav>
    </header>
  );
}
