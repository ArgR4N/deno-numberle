/** @jsx h */
import { h } from "preact";
import { useState, useEffect, useRef, useContext} from "preact/hooks";
import {tw} from '@twind'

//Ts =>
import { NumberSpace, Configuration } from "../routes/index.tsx"

//Components =>
import Wordle from "./Wordle.tsx"
import Keyboard from "./Keyboard.tsx"

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
  
  return <div>
        <Wordle 
            CONFIG={CONFIG} 
            previousGuesses = { previousGuesses }
            setPreviousGuesses = { setPreviousGuesses }
        />

        <Keyboard 
            guesses = { previousGuesses }
        />
    </div>
}
