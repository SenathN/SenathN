import ThemeToggle from "./ThemeToggle";
import { site } from "../../content/site";

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#0f0c24]/70 border-b border-white/10">
      <nav className="container-px max-content flex items-center justify-between h-16 text-[#f5f3ff]">
        <a href="#main" className="font-display text-xl tracking-tight">
          {site.name}
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-[#C4BAFF] transition-colors">
              {item.label}
            </a>
          ))}
        </div>
        <ThemeToggle />
      </nav>
    </header>
  );
}
