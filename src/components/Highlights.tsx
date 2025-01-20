"use client"

import React, { useRef, useState } from 'react';
import * as motion from "motion/react-client"

const Highlights :React.FC<{className :string}> = ({className}) => {
    
    const saveScrollPos = () => {
      localStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    const cardset 
    :{ 
        cardId: number
        title: string 
        description: string 
    }[] 
    = [
        {
            cardId: 0,
            title: "Backend developer",
            description: "Experienced developer with 2 years of experience in industry.",
        },
        {
            cardId: 1,
            title: "3D Artist",
            description: "Freelance 3D artist for Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, esse commodi? Optio hic autem, explicabo, minima temporibus sequi ducimus aliquam excepturi consectetur, repudiandae officiis eos veniam est reiciendis earum tempore!",
        },
        {
            cardId: 2,
            title: "Highlight 3",
            description: "Highlight 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eius distinctio voluptatibus error adipisci dolorum animi illum dolore dignissimos debitis ea illo soluta expedita dolor voluptates nobis repudiandae, explicabo consequuntur!",
        },
    ];
    
    const highlightsTitleRef = useRef<HTMLDivElement>(null);

    const [focusState, setFocusState] = useState({ 
        isFullscreen : false,
        cardId: -1 
    });

    const toggleCardFocus = (cardId :number, focusRef? :any) => {
        if(focusState.cardId == cardId ){
            setFocusState({ 
                isFullscreen : false,
                cardId: -1 
            });
            const scrollPosition = localStorage.getItem("scrollPosition");
            if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
            }
            // if (highlightsTitleRef.current) {
            //     highlightsTitleRef.current.scrollTo({ behavior: 'smooth' });
            // }
        } else {
            saveScrollPos();

            setFocusState({ 
                isFullscreen : true,
                cardId: cardId
            });
            if (focusRef.current) {
                focusRef.current.scrollIntoView({ behavior: 'smooth' });
            }
            // if (highlightsTitleRef.current) {
            //     highlightsTitleRef.current.scrollTo({ behavior: 'smooth' });
            // }
        }
    };

    return (
        <motion.section className={`${className} relative ${focusState.isFullscreen ? 'px-0' : 'md:px-12'}`} initial={{y: '1em'}} whileInView={{y: 0}}>
            <div ref={highlightsTitleRef} >
                <h1 className="font-jersey text-[36px] text-center pb-6 font-light">
                    What I do
                </h1>
                {JSON.stringify(focusState)}
            </div>
            <motion.div
                className={"grid grid-cols-12 gap-[1em]"}
                layout
                transition={{
                    type: "spring",
                    duration: 2,
                    bounce: 0.2,
                }}
            >
                {cardset.map((element, k) => {

                    const isFocused = focusState.cardId == element.cardId && focusState.isFullscreen;
                    const highlightCardsRef = useRef<HTMLDivElement>(null);

                    return <motion.div
                        key={k}
                        ref={highlightCardsRef}
                        className={`
                            p-4 bg-red-700 text-white rounded-md cursor-pointer col-span-full
                            ${ 
                                focusState.cardId == -1 
                                ? `mx-4 md:mx-0 md:col-span-4` // no selections
                                : ( focusState.cardId == element.cardId 
                                    ? 'w-[100vw] h-[100vh]' // a card is selected
                                    : `mx-4 md:col-span-6 ` // other cards that was not selected
                                )
                            }`}
                        layout
                        transition={{
                            type: "spring",
                            duration: 1,
                            bounce: 0.2,
                        }}
                        onClick={() => toggleCardFocus(element.cardId, highlightCardsRef)}
                    >
                        <h1 className="font-jersey text-[36px] text-center capitalize mb-[1em]">{ element.title }</h1>
                        <p className="text-sm text-stone-200">{ element.description }</p>

                    </motion.div>

                })}
            </motion.div>
        </motion.section>
    )
}

export default Highlights