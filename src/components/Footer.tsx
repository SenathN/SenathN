import { site } from "../../content/site";

export default function Footer() {
  return (
    <footer className="bg-[#0F0C24] text-[#9A94C4] py-10">
      <div className="container-px max-content flex flex-col md:flex-row justify-between gap-4 text-sm">
        <span className="font-display text-lg text-[#F5F3FF]">{site.name}</span>
        <span>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</span>
      </div>
    </footer>
  );
}
