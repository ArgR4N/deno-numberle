/** @jsx h */
import { h } from "preact";
import { useState, useEffect, useRef, useContext} from "preact/hooks";
import {tw} from '@twind'
import { getPair, getPrime } from "../routes/index.tsx"

//Ts=>
import { NumberSpace, Configuration } from "../routes/index.tsx"

interface HintsProps{
    guesses: NumberSpace[][];
    CONFIG: Configuration;
}
//i
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


    return (
        <div class={tw`px-2 text-xs text-center items-center justify-center flex flex-col gap-2`}>   
            <h3 class={tw`m-0 p-0 `}>The number is <strong class={tw`bg-${COLORS_VALUES['green']} px-1 pb-1 rounded hover:bg-green-300`}> {getEven(NUMBER) ? 'Even' : 'Odd'} </strong></h3> 
            <h3 class={tw`m-0 p-0 `}> & <strong class={tw`bg-${COLORS_VALUES['green']} px-1 pb-1 rounded  hover:bg-green-300`}> {getPrime(NUMBER) ? '' : '!'} Prime </strong> </h3> 
        </div>      
    )
}
