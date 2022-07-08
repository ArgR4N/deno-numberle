/** @jsx h */
import { h } from "preact";
import { useState, useEffect, useRef, useContext} from "preact/hooks";
import {tw} from '@twind'

//Ts=>
import { NumberSpace } from "../routes/index.tsx"

//Interfaces =>
interface KeyboardProps {
    guesses: NumberSpace[][]
}

// const getRelevantColor = ( keys:NumberSpace[][] ):NumberSpace[] =>{
//   return new NumberSpace
// }


export default function Keyboard( { guesses }:KeyboardProps ){
    const [keys , setKeys] = useState([1, 2])

    useEffect(() => {
        // setKeys(getRelevantColor(keys))
    }, [guesses[0]])

    return(
        <ol>
          {/* {keys.map(e =>(
            <span class={tw`bg-red-200 absolute inset-0`}>
                { e }
                { console.log(e) }
            </span>
          ))}   */}
        </ol>
    )
}