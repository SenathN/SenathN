import Footer from "@/components/Footer";
import Highlights from "@/components/Highlights";
import IntroScene from "@/components/IntroScene";
import * as motion from "motion/react-client"

export default function Home() {

  return (
    <div className={"relative grid grid-rows-[4em_1fr_4em] min-h-screen"}>

      <div className="px-[1em] flex flex-col justify-center w-full border-b border-b-stone-600">
        <motion.div
            initial={{ y: '-100%' }}
            whileInView={{ y: 0 }}
            transition={{
                duration: 0.4,
                y: { type: "tween", bounce: 0, delay: .2},
            }}
        >
          <p className="font-jersey text-[42px]">
            Senath.n
          </p>
        </motion.div>
      </div>

      <main className="flex flex-col gap-1 items-center">
        
        <section className="h-[60vh] relative">
          <IntroScene/>
          <div className="absolute left-0 bottom-0 md:w-1/3 px-2 md:px-4 text-left">
            <motion.div
                initial={{ opacity: 0, y: '50%' }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.4,
                    x: { type: "tween", bounce: 0, delay: .5},
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

        <Separator/>
        
        <Highlights className="w-full md:px-12"/>

        <Separator/>

      </main>

      <Footer patternColor="red" className="mt-[5em]"/>
    </div>
  );
}

const Separator = () => {
  return (
    <div className="w-full my-[5em] flex gap-[4em] text-stone-500 justify-center">
      {/* { ['*','*','*','*'].map(l => <span>{l}</span>) } */}
      <hr className="mx-10 h-[.1em] w-full bg-stone-300"/>
    </div>);
}