import React from 'react'
import * as motion from "motion/react-client"

const Slider :React.FC<{
    children: React.ReactNode,
    delayC? : number, 
    isLinear?: boolean,
    repeatEvery?: number
}> = ({
    children,
    delayC = 0, 
    isLinear = false,
    repeatEvery = 0
}) => {
    return <div className={` ${isLinear ? 'absolute' : 'relative'} h-[2em]`}>
        <motion.div
            initial={{left: '-5em'}}
            animate={{left: '100vw', display: 'none'}}
            transition={{
                delay: .2 + delayC,
                duration: 1,
                repeat: repeatEvery > 0 ? 20 : 0,
                repeatDelay: repeatEvery,
                ease: 'linear',
                repeatType: 'mirror',
            }}
            className='absolute flex'
        >
            {children}
        </motion.div>
    </div>
}

const BoxSlider :React.FC<{
    children?: React.ReactNode,
    delayC? : number, 
    isLinear?: boolean,
    repeatEvery?: number
}> = ({
    children,
    delayC = 0, 
    isLinear = false,
    repeatEvery = 0
}) => {
    return <Slider delayC={delayC} isLinear={isLinear} repeatEvery={repeatEvery}>
        <div className='bg-red-500 w-[2em] h-[2em] rounded-sm shadow-sm'/>
    </Slider>
}

const BackgroundSlider :React.FC<{
    children?: React.ReactNode,
    delayC? : number, 
    isLinear?: boolean,
    repeatEvery?: number
}> = ({
    children,
    delayC = 0, 
    isLinear = false,
    repeatEvery = 0
}) => {
    return <Slider delayC={delayC} isLinear={isLinear} repeatEvery={repeatEvery}>
        <div className='bg-background w-[150vw] h-[2em]' />
    </Slider>
}

const CircleSlider :React.FC<{
    children?: React.ReactNode,
    delayC? : number, 
    isLinear?: boolean,
    repeatEvery?: number
}> = ({
    children,
    delayC = 0, 
    isLinear = false,
    repeatEvery = 0
}) => {
    return <Slider delayC={delayC} isLinear={isLinear} repeatEvery={repeatEvery}>
        <div className='bg-indigo-700 w-[2em] h-[2em] rounded-[50%] shadow-sm' />
    </Slider>
}
const EntryScene :React.FC = () => {
  return (
    <div className='relative overflow-x-hidden over h-full grid grid-cols-4 items-center'>

        <div className='absolute w-full'>
            <BoxSlider delayC={.1} repeatEvery={6.7}/>
            <BackgroundSlider delayC={.2} isLinear={true}/>
            <BoxSlider delayC={.2} repeatEvery={8.2}/>
            <BoxSlider delayC={.12} repeatEvery={12.9}/>
        </div>

        <div className='absolute w-full top-[10%]'>
            <BoxSlider delayC={1.8} isLinear={true} repeatEvery={12.3} />
            <CircleSlider delayC={1.0} isLinear={true} repeatEvery={14.1} />
            <CircleSlider delayC={1.2} isLinear={true} repeatEvery={5.2} />
        </div>

        <div className='absolute w-full bottom-0 '>
            <BoxSlider delayC={1} repeatEvery={1.5}/>
            <CircleSlider delayC={6.3} repeatEvery={5.5}/>
            <BoxSlider delayC={3.7} repeatEvery={2.5}/>
        </div>

        <h1 className='col-start-3 font-jersey text-[42px]'>Senath.n</h1>

    </div>
  )
}

export default EntryScene