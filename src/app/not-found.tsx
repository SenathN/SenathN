import Link from "next/link";
import { site } from "../../content/site";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-start container-px max-content">
      <p className="font-display italic text-xl text-[var(--muted)] mb-4">
        {site.name}
      </p>
      <h1 className="font-display text-5xl md:text-7xl mb-6">Page not found.</h1>
      <Link href="/" className="text-[var(--accent)] underline underline-offset-4 text-lg">
        Back home
      </Link>
    </main>
  );
}
