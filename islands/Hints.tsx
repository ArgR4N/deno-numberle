/** @jsx h */
import { h } from "preact";
import { useState, useEffect, useRef, useContext} from "preact/hooks";
import {tw} from '@twind'

//Ts=>
import { NumberSpace, Configuration } from "../routes/index.tsx"

interface HintsProps{
    guesses: NumberSpace[][];
    CONFIG: Configuration;
}

const getRelevantColor = ( keys:NumberSpace[][] ):string =>{
    const KeysGuide:string[] = ['?', '?', '?', '?']

    keys.forEach(keyArray => {
        keyArray.forEach((key, i)=>{
            if(key.color == 'green'){
                    KeysGuide[i] = key.value
            }
        })
    });
    return KeysGuide.join(" ")
}

export default function Hints({ guesses, CONFIG }: HintsProps){
    const { COLORS_VALUES, NUMBER } = CONFIG

    const [knowChars, setKnowChars] = useState('? ? ? ?')

    useEffect(() =>{
        setKnowChars(getRelevantColor(guesses))
    }, [guesses])

    const getPrime = ( ) => {
        let isPrime = true;
        // check if number is equal to 1
        if (NUMBER === 1) {
            return 'Is not Prime | !Prime'
        }
        
        // check if number is greater than 1
        else if (NUMBER > 1) {
        
            // looping through 2 to number-1
            for (let i = 2; i < NUMBER; i++) {
                if (NUMBER % i == 0) {
                    isPrime = false;
                    break;
                }
            }
        
            if (isPrime) {
                return 'Prime'
            } else {
                return '!Prime'
            }   
    }
}

    const getPair = ( ) => CONFIG.NUMBER % 2 != 0 ? 'Odd' : 'Pair'

    return (
        <div class={tw`px-2 text-xs text-center items-center justify-center flex flex-col gap-2`}>   
            <h3 class={tw`m-0 p-0 `}><strong class={tw`bg-${COLORS_VALUES['gray']} p-1  rounded `}>{ knowChars }</strong> is <strong class={tw`bg-${COLORS_VALUES['green']} px-1 pb-1 rounded `}> {getPrime()} </strong></h3> 
            <h3 class={tw`m-0 p-0 `}> & <strong class={tw`bg-${COLORS_VALUES['green']} px-1 pb-1 rounded `}> {getPair()} </strong> </h3> 
        </div>      
    )
}