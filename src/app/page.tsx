import fs from "node:fs";
import path from "node:path";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import RangeAccordion from "@/components/RangeAccordion";
import ArtViewer from "@/components/ArtViewer";
import Footer from "@/components/Footer";
import { site } from "../../content/site";

function getArtModels(): string[] {
  const dir = path.join(process.cwd(), "public", "art");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.toLowerCase().endsWith(".glb") || f.toLowerCase().endsWith(".gltf"));
  } catch {
    return [];
  }
}

export default function Home() {
  const artModels = getArtModels();

  return (
    <>
      <Nav />
      <main id="main">
        <Hero />

        <section id="range" className="container-px max-content py-24 md:py-32">
          <h2 className="font-display text-4xl md:text-6xl mb-12 max-w-2xl">
            One engineer, four disciplines.
          </h2>
          <RangeAccordion />
        </section>

        <section id="about" className="container-px max-content py-24 md:py-32">
          <p className="font-display text-3xl md:text-5xl leading-snug max-w-3xl">
            {site.statement.split(". ")[0]}.{" "}
            <span className="text-[var(--accent)]">
              {site.statement.split(". ")[1]}
            </span>
          </p>
          <ul className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
            {site.facts.map((fact) => (
              <li key={fact} className="border-t-2 border-[var(--accent)] pt-4 text-[var(--muted)]">
                {fact}
              </li>
            ))}
          </ul>
        </section>

        <section id="work" className="container-px max-content py-24 md:py-32">
          <h2 className="font-display text-4xl md:text-6xl mb-16">Work</h2>
          <div className="flex flex-col divide-y divide-[var(--line)]">
            {site.experience.map((job, i) => (
              <div key={i} className="grid md:grid-cols-[1fr_2fr] gap-4 py-10">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl">{job.company}</h3>
                  <p className="text-[var(--muted)] mt-1">{job.role}</p>
                  <p className="text-sm text-[var(--muted)] mt-1">{job.period}</p>
                </div>
                <ul className="space-y-2 text-[var(--ink)]">
                  {job.points.map((point) => (
                    <li key={point} className="text-base md:text-lg">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-16">
            {site.projects.map((project) => (
              <div
                key={project.name}
                className="p-8 bg-[var(--ink-tint,#1D1650)] text-[#F5F3FF] rounded-sm flex flex-col justify-between min-h-[220px]"
                style={{ backgroundColor: "#1D1650" }}
              >
                <div>
                  <h3 className="font-display text-2xl mb-2">{project.name}</h3>
                  <p className="text-[#C4BAFF]">{project.description}</p>
                </div>
                <p className="text-sm text-[#9A94C4] mt-6">{project.status}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="form" className="container-px max-content py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-display text-[8rem] md:text-[12rem] leading-none text-[var(--accent)]">
                {site.art.count}
              </p>
              <p className="text-lg md:text-xl max-w-sm">{site.art.caption}</p>
              <p className="text-[var(--muted)] mt-2">{site.art.detail}</p>
            </div>
            <ArtViewer models={artModels} />
          </div>
        </section>

        <section id="contact" className="bg-[#6B4DFF] text-[#F5F3FF] py-32">
          <div className="container-px max-content">
            <h2 className="font-display text-4xl md:text-6xl mb-10">
              Let&rsquo;s build something.
            </h2>
            <a
              href={`mailto:${site.email}`}
              className="font-display text-3xl md:text-6xl underline underline-offset-8 break-all"
            >
              {site.email}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
