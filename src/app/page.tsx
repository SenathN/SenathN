import IntroScene from "@/components/IntroScene";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[4em_1fr_4em] min-h-screen font-[family-name:var(--font-geist-sans)]">

      <div className="px-[1em] flex flex-col justify-center w-full border-b border-b-stone-600">
        <p>
          Senathn
        </p>
      </div>

      <main className="flex flex-col gap-1 h-[300em]">
        <div>Developer</div>
        {/* <IntroScene/> */}
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Footer  
      </footer>
    </div>
  );
}
