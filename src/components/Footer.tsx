import { site } from "../../content/site";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="container-px max-content py-8 flex flex-col md:flex-row justify-between gap-3 mono text-[11px] text-[var(--muted)] uppercase tracking-wider">
        <span className="text-[var(--ink)]">{site.name}</span>
        <span>{site.role}</span>
        <span>&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
