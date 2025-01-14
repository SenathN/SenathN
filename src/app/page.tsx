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

      <main className="flex flex-col gap-1 items-center">
        <div>
          <IntroScene/>
          <div className="my-[2em] flex gap-[2em] text-stone-500 justify-center">
            { ['*','*','*','*'].map(l => <span>{l}</span>) }
          </div>
        </div>
        
        <section>
          Developer
        </section>

      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Footer  
      </footer>
    </div>
  );
}
