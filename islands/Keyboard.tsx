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


export default function Keyboard( { guesses, setActualGuess, actualGuess, addChar, delChar, checkRow }:KeyboardProps ){
    const DefaultKeys = new Array(10).fill('')
    .map((_e, i) => new NumberSpace(`${i}`))
    const [keys , setKeys] = useState(DefaultKeys)

    useEffect(() => {
        setKeys(getRelevantColor(guesses))
    }, [guesses])

    return(
        <ol style={{width:'100px'}} class={tw`flex items-center justify-center flex-wrap gap-1`}>

          {keys.map(({ value, color }) =>(
            <li >
                <button onClick = {_ => addChar(value)} class={tw`focus:outline-none bg-${color}-200 hover:bg-${color}-300 rounded px-2 text-gray-700`}>{ value }</button>
            </li>
          ))}  
            <li >
                <button onClick = {_ => checkRow()} class={tw`focus:outline-none bg-${'green'}-500 hover:bg-${'green'}-600 rounded px-2 hover:text-green-600 text-green-500`}>{ '1' }</button>
            </li>
            <li >
                <button onClick = {_ => delChar()} class={tw`focus:outline-none bg-${'red'}-500 hover:bg-${'red'}-600 rounded px-2 hover:text-red-600 text-red-500`}>{ '1' }</button>
            </li>
        </ol>
    )
}