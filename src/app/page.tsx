import Footer from "@/components/Footer";
import IntroScene from "@/components/IntroScene";
import { delay } from "motion";
import * as motion from "motion/react-client"

export default function Home() {
  const cardset 
  :{ 
    title: string 
    description: string 
  }[] 
  = [
    {
      title: "Backend developer",
      description: "Experienced developer with 2 years of experience in industry.",
    },
    {
      title: "3D Artist",
      description: "Freelance 3D artist",
    },
    {
      title: "Highlight 3",
      description: "Highlight 3",
    },
  ]

  return (
    <div className="grid grid-rows-[4em_1fr_4em] min-h-screen font-[family-name:var(--font-geist-sans)]">

      <div className="px-[1em] flex flex-col justify-center w-full border-b border-b-stone-600">
        <p>
          Senathn
        </p>
      </div>

      <main className="flex flex-col gap-1 items-center">
        <section className="h-[60vh] relative">
          <IntroScene/>
          <div className="absolute left-0 bottom-0 md:w-1/3 px-2 md:px-4 text-left">
            <motion.div
                initial={{ opacity: 0, x: '-110%' }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.4,
                    x: { type: "tween", visualDuration: 0.8, bounce: 0, delay: 2},
                }}
            >
              <p>Paragraph of introduction</p>
              <p className="text-sm text-stone-700 font-light">
                This paragraph is a sub paragraph that will be a 
                smaller description to what you are about to explorer
                I will just add more text to make it testing
                </p>
                
            </motion.div>
          </div>
        </section>

        <div className="my-[2em] flex gap-[4em] text-stone-500 justify-center">
          { ['*','*','*','*'].map(l => <span>{l}</span>) }
        </div>
        
        <section className="w-full p-4 md:px-12">
          <div>
            <h1 className="text-center py-6 text-lg font-light">
              Developer
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1em]">
              {
                cardset.map((element, k) => 
                  <div key={k} className="p-4 bg-red-600 text-white rounded-md">

                    <h1 className="text-xl text-center capitalize mb-[1em]">
                      {element.title}
                    </h1>
                    <p className="text-sm text-stone-200">
                      {element.description}
                    </p>
                  </div>
                )
              }
          </div>
        </section>

      </main>

      <Footer patternColor="red"/>
    </div>
  );
}
