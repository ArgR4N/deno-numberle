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


const getRelevantColor = ( keys:NumberSpace[][] ):NumberSpace[] =>{
    const KeysGuide =new Array(10).fill('')
    .map((_e, i) => new NumberSpace(`${i}`))

    keys.forEach(keyArray => {
        keyArray.forEach(key =>{
            if(key.color != 'gray'){
                if(key.color != KeysGuide[Number(key.value)].color && KeysGuide[Number(key.value)].color != 'green'){
                    KeysGuide[Number(key.value)].color = key.color
                }else if(key.color == 'green'){
                    KeysGuide[Number(key.value)].color = key.color
                }
            }
        })
    });
    return KeysGuide
}


export default function Keyboard( { guesses }:KeyboardProps ){
    const DefaultKeys = new Array(10).fill('')
    .map((_e, i) => new NumberSpace(`${i}`))
    const [keys , setKeys] = useState(DefaultKeys)

    useEffect(() => {
        setKeys(getRelevantColor(guesses))
    }, [guesses])

    return(
        <ol style={{width:'100px'}} class={tw`flex items-center justify-center flex-wrap gap-1`}>
          {keys.map(({ value, color }) =>(
            <li class={tw`bg-${color}-200 rounded px-2 text-gray-700`}>
                <p>{ value }</p>
            </li>
          ))}  
        </ol>
    )
}