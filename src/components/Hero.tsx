import RibbonsPoster from "./RibbonsPoster";
import HeroScene from "./HeroScene";
import { site } from "../../content/site";

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[560px] w-full bg-[#0F0C24] text-[#F5F3FF] overflow-hidden">
      <RibbonsPoster />
      <HeroScene />
      <div className="relative z-10 h-full container-px max-content flex flex-col justify-between py-28">
        <div className="max-w-xl">
          <p className="font-display italic text-xl md:text-2xl text-[#C4BAFF] mb-3">
            {site.role}
          </p>
          <p className="text-sm md:text-base text-[#9A94C4] max-w-md">
            {site.tagline}
          </p>
        </div>
        <h1 className="name-display whitespace-nowrap md:whitespace-nowrap leading-[0.9]">
          Nimsara
          <br />
          Gamage
        </h1>
      </div>
    </section>
  );
}
