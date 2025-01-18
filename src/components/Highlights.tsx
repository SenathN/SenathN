"use client"

import React, { useRef, useState } from 'react';
import * as motion from "motion/react-client"

const Highlights :React.FC<{className :string}> = ({className}) => {
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
            description: "Freelance 3D artist",
        },
        {
            cardId: 2,
            title: "Highlight 3",
            description: "Highlight 3",
        },
    ];
    
    const highlightsRef = useRef<HTMLDivElement>(null);
    const [focusState, setFocusState] = useState({ 
        isFullscreen : false,
        cardId: -1 
    });

    const toggleCardFocus = (cardId :number) => {
        if(focusState.isFullscreen && focusState.cardId == cardId ){
            setFocusState({ 
                isFullscreen : false,
                cardId: -1 
            });
        } else {
            setFocusState({ 
                isFullscreen : true,
                cardId: cardId
            });
            if (highlightsRef.current) {
                highlightsRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <section className={`${className}`}>
            <div>
                <h1 className="text-center py-6 text-lg font-light">
                    What I do
                    {JSON.stringify(focusState)}
                </h1>
            </div>
            <motion.div
                layout
                transition={{
                    type: "spring",
                    // visualDuration: .5,
                    duration: .7,
                    bounce: 0.2,
                }}
            >
                <div className={"grid grid-cols-6 gap-[1em] px-4"} ref={highlightsRef}>
                    {cardset.map((element, k) => {

                        const isFocused = focusState.cardId == element.cardId && focusState.isFullscreen;

                        return (<div 
                            key={k} 
                            className={`p-4 bg-red-700 text-white rounded-md cursor-pointer ${ 
                                isFocused 
                                ? `col-span-full left-0 top-0 h-[20em]` 
                                : 'col-span-2 row-start-2'
                            }`}
                            onClick={() => toggleCardFocus(element.cardId)}
                        >
                            <h1 className="text-xl text-center capitalize mb-[1em]">{ element.title }</h1>

                            <p className="text-sm text-stone-200">{ element.description }</p>

                        </div>
                    )}
                )}
                </div>
            </motion.div>
        </section>
    )
}

export default Highlights