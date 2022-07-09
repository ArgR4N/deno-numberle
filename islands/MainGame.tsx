/** @jsx h */
import { h } from "preact";
import { useState, useEffect, useRef, useContext} from "preact/hooks";
import {tw} from '@twind'

//Ts =>
import { NumberSpace, Configuration } from "../routes/index.tsx"

//Components =>
import Wordle from "./Wordle.tsx"
import Keyboard from "./Keyboard.tsx"
import Hints from "./Hints.tsx"
//Interfaces =>
interface MainGameProps{ CONFIG: Configuration }

//Main function =>
export default function MainGame( { CONFIG }:MainGameProps ) {
    const { MAX_TRIES, NUMBER_LENGTH } = CONFIG
    const [previousGuesses, setPreviousGuesses] = useState(
        Array(MAX_TRIES).fill('')
            .map(_ => Array(NUMBER_LENGTH).fill('')
                .map(_ => new NumberSpace()))
        )
  
  return <div class={tw`flex items-center justify-center flex-col `}>
        <Wordle 
            CONFIG={CONFIG} 
            previousGuesses = { previousGuesses }
            setPreviousGuesses = { setPreviousGuesses }
        />
        <span class={tw`bg-gray-100 items-center justify-center rounded flex p-2`}>
            <Keyboard 
                guesses = { previousGuesses }
            />
            <hr class={tw`border-l-1  border-gray-700 h-12`}/>
            <Hints 
                guesses = { previousGuesses }
                CONFIG = { CONFIG }
            />
        </span>
    </div>
}
